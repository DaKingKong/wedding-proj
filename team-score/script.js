// Initialize scores array to store team scores
let scores = [0, 0, 0, 0];

// Function to change a team's score
function changeScore(teamNumber, change) {
    const teamIndex = teamNumber - 1;
    scores[teamIndex] += change;

    // Ensure score doesn't go below 0
    if (scores[teamIndex] < 0) {
        scores[teamIndex] = 0;
    }

    // Update the display
    updateScoreDisplay(teamNumber);

    // Add visual feedback
    addScoreAnimation(teamNumber, change);
}


// Function to update the score display
function updateScoreDisplay(teamNumber) {
    const scoreElement = document.getElementById(`score${teamNumber}`);
    const teamIndex = teamNumber - 1;
    scoreElement.textContent = scores[teamIndex];
}

// Function to save team names to localStorage
function saveTeamNames() {
    const teamNames = [];
    for (let i = 1; i <= 4; i++) {
        const nameElement = document.getElementById(`name${i}`);
        teamNames.push(nameElement.textContent);
    }
    localStorage.setItem('teamNames', JSON.stringify(teamNames));
}

// Function to load team names from localStorage
function loadTeamNames() {
    const savedNames = localStorage.getItem('teamNames');
    if (savedNames) {
        const teamNames = JSON.parse(savedNames);
        for (let i = 1; i <= 4; i++) {
            const nameElement = document.getElementById(`name${i}`);
            if (teamNames[i - 1]) {
                nameElement.textContent = teamNames[i - 1];
            }
        }
    }
}

// Function to add visual animation when score changes
function addScoreAnimation(teamNumber, change) {
    const scoreElement = document.getElementById(`score${teamNumber}`);
    const teamCard = document.getElementById(`team${teamNumber}`);

    // Add pulse animation
    scoreElement.style.animation = 'scorePulse 0.3s ease-in-out';
    setTimeout(() => {
        scoreElement.style.animation = '';
    }, 300);

    // Add color flash based on increase/decrease
    if (change > 0) {
        teamCard.style.borderColor = '#4caf50';
        setTimeout(() => {
            teamCard.style.borderColor = '#e8f5e8';
        }, 300);
    } else {
        teamCard.style.borderColor = '#f44336';
        setTimeout(() => {
            teamCard.style.borderColor = '#e8f5e8';
        }, 300);
    }

    // Trigger pop animation for all corner images
    triggerCornerImagePop();
}

// Function to trigger random cute animation for all corner images
function triggerCornerImagePop() {
    const cornerImages = document.querySelectorAll('.corner-image');
    const animations = ['bounce', 'wiggle', 'spin', 'shake', 'pulse'];
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];

    cornerImages.forEach(img => {
        img.style.animation = `${randomAnimation} 0.8s ease-out`;
        setTimeout(() => {
            img.style.animation = '';
        }, 800);
    });
}

// Function to show notification messages
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4caf50;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        font-weight: bold;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes scorePulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    @keyframes resetPulse {
        0% { transform: scale(1); background-color: rgba(255, 255, 255, 0.7); }
        50% { transform: scale(1.05); background-color: rgba(255, 193, 7, 0.3); }
        100% { transform: scale(1); background-color: rgba(255, 255, 255, 0.7); }
    }
    
    @keyframes bounce {
        0%, 100% { transform: translateY(0) scale(1); }
        25% { transform: translateY(-20px) scale(1.1); }
        50% { transform: translateY(-10px) scale(0.9); }
        75% { transform: translateY(-15px) scale(1.05); }
    }
    
    @keyframes wiggle {
        0%, 100% { transform: rotate(0deg); }
        10% { transform: rotate(-10deg); }
        20% { transform: rotate(10deg); }
        30% { transform: rotate(-8deg); }
        40% { transform: rotate(8deg); }
        50% { transform: rotate(-5deg); }
        60% { transform: rotate(5deg); }
        70% { transform: rotate(-3deg); }
        80% { transform: rotate(3deg); }
        90% { transform: rotate(-1deg); }
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg) scale(1); }
        25% { transform: rotate(90deg) scale(1.1); }
        50% { transform: rotate(180deg) scale(0.9); }
        75% { transform: rotate(270deg) scale(1.05); }
        100% { transform: rotate(360deg) scale(1); }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10% { transform: translateX(-10px); }
        20% { transform: translateX(10px); }
        30% { transform: translateX(-8px); }
        40% { transform: translateX(8px); }
        50% { transform: translateX(-5px); }
        60% { transform: translateX(5px); }
        70% { transform: translateX(-3px); }
        80% { transform: translateX(3px); }
        90% { transform: translateX(-1px); }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 0.8; }
        25% { transform: scale(1.15); opacity: 1; }
        50% { transform: scale(0.95); opacity: 0.9; }
        75% { transform: scale(1.08); opacity: 0.95; }
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Keyboard shortcuts for quick score changes
document.addEventListener('keydown', function (event) {
    // Only trigger if no input field is focused
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        return;
    }

    switch (event.key) {
        case '1':
            changeScore(1, 1);
            break;
        case '2':
            changeScore(2, 1);
            break;
        case '3':
            changeScore(3, 1);
            break;
        case '4':
            changeScore(4, 1);
            break;
        case 'q':
            changeScore(1, -1);
            break;
        case 'w':
            changeScore(2, -1);
            break;
        case 'e':
            changeScore(3, -1);
            break;
        case 'r':
            changeScore(4, -1);
            break;
        case ' ':
            event.preventDefault();
            break;
    }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all score displays
    for (let i = 1; i <= 4; i++) {
        updateScoreDisplay(i);
    }

    // Load saved team names
    loadTeamNames();

    // Add event listeners for team name editing
    for (let i = 1; i <= 4; i++) {
        const nameElement = document.getElementById(`name${i}`);
        nameElement.addEventListener('blur', saveTeamNames);
        nameElement.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.target.blur();
            }
        });
    };
});
