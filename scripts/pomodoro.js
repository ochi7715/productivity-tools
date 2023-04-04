const pomodoroClock = document.querySelector(".pomodoroClock");
const pomodoroStartStopBtn = document.getElementById("pomodoroStartStopBtn");
const pomodoroResetBtn = document.getElementById("pomodoroResetBtn");
const pomodoroWorkLength = document.getElementById("pomodoroWorkLength");
const pomodoroBreakLength = document.getElementById("pomodoroBreakLength");
const pomodoroClockLabel = document.getElementById("pomodoroClockLabel");
const pomodoroSettingsBtn = document.getElementById("pomodoroSettingsBtn");
const pomodoroModal = document.getElementById("pomodoroModal");
const pomodoroSaveBtn = document.querySelector(".pomodoroModal-saveBtn");

let isTimerRunning = false;
let timerIntervalId;
let remainingTimeInSeconds;
let isWorkTime = true;
let initialTimeInSeconds;

function updatePomodoroClock(time) {
    const mins = Math.floor(time / 60).toString().padStart(2, "0");
    const secs = (time % 60).toString().padStart(2, "0");
    pomodoroClock.textContent = `${mins}:${secs}`;
}

function startPomodoroTimer() {
    if (!isTimerRunning) {
        isTimerRunning = true;
        pomodoroStartStopBtn.innerHTML = "Stop";
        pomodoroWorkLength.disabled = true;
        pomodoroBreakLength.disabled = true;
        pomodoroResetBtn.disabled = true;
        if (!remainingTimeInSeconds) {
            initialTimeInSeconds = isWorkTime
                ? pomodoroWorkLength.value * 60
                : pomodoroBreakLength.value * 60;
            remainingTimeInSeconds = initialTimeInSeconds;
        }
        timerIntervalId = setInterval(updatePomodoroTimer, 1000);
    } else {
        stopPomodoroTimer();
    }
}

function stopPomodoroTimer() {
    clearInterval(timerIntervalId);
    isTimerRunning = false;
    pomodoroStartStopBtn.innerHTML = "Start";
    pomodoroResetBtn.disabled = false;
}

function resetPomodoroTimer() {
    stopPomodoroTimer();
    isWorkTime = true;
    pomodoroClockLabel.innerHTML = "Work";
    pomodoroClock.innerHTML = formatPomodoroTime(pomodoroWorkLength.value * 60);
    pomodoroWorkLength.disabled = false;
    pomodoroBreakLength.disabled = false;
    remainingTimeInSeconds = pomodoroWorkLength.value * 60;
}

function updatePomodoroTimer() {
    remainingTimeInSeconds--;
    pomodoroClock.innerHTML = formatPomodoroTime(remainingTimeInSeconds);

    if (remainingTimeInSeconds === 0) {
        if (isWorkTime) {
            isWorkTime = false;
            pomodoroClockLabel.innerHTML = "Break";
            remainingTimeInSeconds = pomodoroBreakLength.value * 60;
            alert("Time for a break!");
        } else {
            isWorkTime = true;
            pomodoroClockLabel.innerHTML = "Work";
            remainingTimeInSeconds = pomodoroWorkLength.value * 60;
            alert("Time to get back to work!");
        }
        pomodoroClock.innerHTML = formatPomodoroTime(remainingTimeInSeconds);
    }
}

function formatPomodoroTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secondsRemaining = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${secondsRemaining < 10 ? "0" : ""}${secondsRemaining}`;
}

pomodoroWorkLength.addEventListener("change", function () {
    if (!isTimerRunning && isWorkTime) {
        pomodoroClock.innerHTML = formatTime(pomodoroWorkLength.value * 60);
    }
    remainingTimeInSeconds = isWorkTime
        ? pomodoroWorkLength.value * 60
        : pomodoroBreakLength.value * 60;
});

pomodoroBreakLength.addEventListener("change", function () {
    if (!isTimerRunning && !isWorkTime) {
        pomodoroClock.innerHTML = formatTime(pomodoroBreakLength.value * 60);
    }
});

pomodoroStartStopBtn.addEventListener("click", startPomodoroTimer);
pomodoroResetBtn.addEventListener("click", resetPomodoroTimer);

pomodoroSettingsBtn.addEventListener("click", function () {
    pomodoroModal.style.display = "block";
});

pomodoroSaveBtn.onclick = function () {
    pomodoroModal.style.display = "none";
};

window.addEventListener("click", function (event) {
    if (event.target === pomodoroModal) {
        pomodoroModal.style.display = "none";
    }
});