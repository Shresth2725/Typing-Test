const textDisplay = document.getElementById("text-display");
const textInput = document.getElementById("text-input");
const timerElement = document.getElementById("timer");
const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");
const restartButton = document.getElementById("restart");
const stopButton = document.getElementById("stop");

const sampleTexts = [
    "JavaScript is a powerful programming language.",
    "The quick brown fox jumps over the lazy dog.",
    "Practice makes a person perfect in coding.",
    "Artificial intelligence is transforming the world.",
    "Debugging is like being the detective in a crime movie.",
    "A well-structured algorithm can save hours of work.",
    "Learning to code opens up endless possibilities.",
    "Simplicity is the soul of efficient programming.",
    "Every great developer starts as a beginner.",
    "Consistent practice leads to mastery in any skill."
];


let currentText = "";
let timer;
let startTime;
let totalTyped = 0;
let correctTyped = 0;
let hasStarted = false;
let firstKeyIgnored = false;

function setNewText() {
    currentText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    textDisplay.textContent = currentText;
    textDisplay.style.visibility = "hidden";
    textInput.value = "";
    textInput.focus();
    totalTyped = 0;
    correctTyped = 0;
    hasStarted = false;
    firstKeyIgnored = false;
    timerElement.textContent = "0";
    wpmElement.textContent = "0";
    accuracyElement.textContent = "100";
    stopButton.disabled = true;
}

function startTimer() {
    startTime = new Date();
    timer = setInterval(() => {
        let elapsedTime = Math.floor((new Date() - startTime) / 1000);
        timerElement.textContent = elapsedTime;
        updateWPM(elapsedTime);
    }, 1000);
}

function updateWPM(seconds) {
    if (seconds > 0) {
        let wordsTyped = totalTyped / 5;
        let wpm = Math.round((wordsTyped / (seconds / 60)));
        wpmElement.textContent = wpm;
    }
}

function updateAccuracy() {
    let accuracy = totalTyped > 0 ? Math.round((correctTyped / totalTyped) * 100) : 100;
    accuracyElement.textContent = accuracy;
}

textInput.addEventListener("input", function (event) {
    let typedText = textInput.value;

    if (!hasStarted) {
        textDisplay.style.visibility = "visible";
        hasStarted = true;
        return;
    }

    if (!firstKeyIgnored) {
        firstKeyIgnored = true;
        startTimer();
        stopButton.disabled = false;
        return;
    }

    if (event.inputType === "deleteContentBackward") return;

    totalTyped++;
    if (typedText === currentText.substring(0, typedText.length)) {
        correctTyped++;
    }

    updateAccuracy();
    if (typedText.length >= currentText.length && typedText.endsWith(".")) {
        clearInterval(timer);
        stopButton.disabled = true;
    }
});

stopButton.addEventListener("click", () => {
    clearInterval(timer);
    stopButton.disabled = true;
});

restartButton.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
    setNewText();
});

setNewText();
