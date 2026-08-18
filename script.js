let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let lapCounter = 1;

// Elements
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('lapsList');
const statusText = document.getElementById('statusText');
const statusIndicator = document.querySelector('.status-indicator');

// Format milliseconds into HH:MM:SS.ms
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);

    const pad = (num, digits = 2) => String(num).padStart(digits, '0');

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
}

// Update Status Text and Dots
function setStatus(state) {
    statusIndicator.classList.remove('paused');
    if (state === 'running') {
        statusText.textContent = 'Running';
    } else if (state === 'paused') {
        statusText.textContent = 'Paused';
        statusIndicator.classList.add('paused');
    } else {
        statusText.textContent = 'Ready';
    }
}

// Start Function
function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        display.textContent = formatTime(elapsedTime);
    }, 10);

    startBtn.disabled = true;
    pauseBtn.disabled = false;
    lapBtn.disabled = false;
    setStatus('running');
}

// Pause Function
function pause() {
    clearInterval(timerInterval);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
    setStatus('paused');
}

// Reset Function
function reset() {
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    lapCounter = 1;

    display.textContent = "00:00:00.00";
    lapsList.innerHTML = "";

    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
    setStatus('ready');
}

// Add Lap Record
function addLap() {
    const lapItem = document.createElement('li');
    lapItem.innerHTML = `
        <span>Lap ${lapCounter++}</span>
        <span>${formatTime(elapsedTime)}</span>
    `;
    lapsList.prepend(lapItem);
}

// Event Listeners
startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', addLap);