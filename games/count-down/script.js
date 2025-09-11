let timer = null;
let timeLeft = 0;
let isRunning = false;
let isPaused = false;

// DOM elements
const timeText = document.getElementById('timeText');
const timeCircle = document.getElementById('timeCircle');
const controlBtn = document.getElementById('controlBtn');
const secondsInput = document.getElementById('seconds');
const millisecondsInput = document.getElementById('milliseconds');

// Initialize the timer display
function initializeTimer() {
    updateTime();
    updateDisplay();
}

// Update time from input fields
function updateTime() {
    const seconds = parseInt(secondsInput.value) || 0;
    const milliseconds = parseInt(millisecondsInput.value) || 0;
    timeLeft = seconds * 1000 + milliseconds;
    updateDisplay();
}

// Update the display
function updateDisplay() {
    const totalSeconds = Math.floor(timeLeft / 1000);
    const milliseconds = timeLeft % 1000;

    timeText.textContent = `${totalSeconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;

    // Update circle appearance based on time remaining
    timeCircle.classList.remove('warning', 'danger', 'running');

    if (isRunning) {
        timeCircle.classList.add('running');

        // Add warning when less than 5 seconds
        if (timeLeft <= 5000 && timeLeft > 1000) {
            timeCircle.classList.add('warning');
        }
        // Add danger when less than 1 second
        else if (timeLeft <= 1000) {
            timeCircle.classList.add('danger');
        }
    }
}

// Toggle timer (start/stop/reset)
function toggleTimer() {
    if (!isRunning && !isPaused) {
        // Start timer
        startTimer();
    } else if (isRunning) {
        // Pause timer
        pauseTimer();
    } else if (isPaused) {
        // Resume timer
        resumeTimer();
    }
}

// Start the timer
function startTimer() {
    if (timeLeft <= 0) {
        alert('请设置倒计时时间！');
        return;
    }

    isRunning = true;
    isPaused = false;
    controlBtn.textContent = '暂停';
    controlBtn.style.backgroundColor = '#ff9800';

    // Disable input fields
    secondsInput.disabled = true;
    millisecondsInput.disabled = true;

    timer = setInterval(() => {
        timeLeft -= 10; // Update every 10ms for smoother display
        updateDisplay();

        if (timeLeft <= 0) {
            timerFinished();
        }
    }, 10);
}

// Pause the timer
function pauseTimer() {
    isRunning = false;
    isPaused = true;
    controlBtn.textContent = '继续';
    controlBtn.style.backgroundColor = '#4caf50';

    clearInterval(timer);
    timer = null;
}

// Resume the timer
function resumeTimer() {
    isRunning = true;
    isPaused = false;
    controlBtn.textContent = '暂停';
    controlBtn.style.backgroundColor = '#ff9800';

    timer = setInterval(() => {
        timeLeft -= 10; // Update every 10ms for smoother display
        updateDisplay();

        if (timeLeft <= 0) {
            timerFinished();
        }
    }, 10);
}

// Reset the timer
function resetTimer() {
    isRunning = false;
    isPaused = false;
    controlBtn.textContent = '开始';
    controlBtn.style.backgroundColor = '#4caf50';

    clearInterval(timer);
    timer = null;

    // Enable input fields
    secondsInput.disabled = false;
    millisecondsInput.disabled = false;

    // Reset to original time
    updateTime();
    updateDisplay();
}

// Timer finished
function timerFinished() {
    isRunning = false;
    isPaused = false;
    controlBtn.textContent = '重置';
    controlBtn.style.backgroundColor = '#f44336';

    clearInterval(timer);
    timer = null;

    // Show finished animation
    timeCircle.classList.remove('running', 'warning', 'danger');
    timeCircle.style.animation = 'timeFinished 0.5s ease-in-out 3';

    // Play sound effect (if available)
    playFinishSound();

    // Show alert
    setTimeout(() => {
        alert('时间到！');
    }, 100);
}

// Play finish sound
function playFinishSound() {
    // Create a simple beep sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
        // Fallback: just show visual feedback
        console.log('Audio not supported');
    }
}

// Add CSS for finished animation
const style = document.createElement('style');
style.textContent = `
    @keyframes timeFinished {
        0%, 100% { transform: scale(1); }
        25% { transform: scale(1.2); }
        50% { transform: scale(0.8); }
        75% { transform: scale(1.1); }
    }
`;
document.head.appendChild(style);

// Handle reset button click
controlBtn.addEventListener('click', function () {
    if (this.textContent === '重置') {
        resetTimer();
    }
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function () {
    initializeTimer();

    // Add keyboard shortcuts
    document.addEventListener('keydown', function (e) {
        if (e.code === 'Space') {
            e.preventDefault();
            toggleTimer();
        } else if (e.code === 'KeyR') {
            e.preventDefault();
            resetTimer();
        }
    });

    // Add input validation
    secondsInput.addEventListener('input', function () {
        let value = parseInt(this.value);
        if (value > 59) this.value = 59;
        if (value < 0) this.value = 0;
        updateTime();
    });

    millisecondsInput.addEventListener('input', function () {
        let value = parseInt(this.value);
        if (value > 999) this.value = 999;
        if (value < 0) this.value = 0;
        updateTime();
    });
});
