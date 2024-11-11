// JavaScript code to manage stopwatch functionality
let startTime, updatedTime, difference, timerInterval;
let isRunning = false;
let lapTimes = [];
let lapCount = 1;

// Time Display element
const timeDisplay = document.getElementById('timeDisplay');
const startPauseBtn = document.getElementById('startPauseBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapList = document.getElementById('lapList');

// Function to format time
function formatTime(ms) {
    let hours = Math.floor(ms / 3600000);
    let minutes = Math.floor((ms % 3600000) / 60000);
    let seconds = Math.floor((ms % 60000) / 1000);
    let milliseconds = Math.floor((ms % 1000) / 10);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Start/Pause functionality
startPauseBtn.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateTime, 10);
        startPauseBtn.innerText = 'Pause';
    } else {
        isRunning = false;
        clearInterval(timerInterval);
        difference = updatedTime;
        startPauseBtn.innerText = 'Start';
    }
});

// Update time display
function updateTime() {
    updatedTime = new Date().getTime() - startTime;
    timeDisplay.innerText = formatTime(updatedTime);
}

// Reset functionality
resetBtn.addEventListener('click', () => {
    isRunning = false;
    clearInterval(timerInterval);
    timeDisplay.innerText = '00:00:00';
    startPauseBtn.innerText = 'Start';
    difference = 0;
    lapList.innerHTML = '';
    lapCount = 1;
});

// Lap functionality
lapBtn.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = document.createElement('li');
        lapTime.innerText = `Lap ${lapCount}: ${formatTime(updatedTime)}`;
        lapList.appendChild(lapTime);
        lapCount++;
    }
});
