// Game state
let gameState = {
    currentStep: 0,
    isAnimating: false,
    animationSteps: []
};

// Generate animation steps from 1 to 100
function generateAnimationSteps() {
    const steps = [];
    let currentPlayer = 1;

    for (let num = 1; num <= 100; num++) {
        const isJump = num % 7 === 0 || num.toString().includes('7');
        const display = isJump ? "❤️" : num.toString();

        steps.push({
            player: currentPlayer,
            number: num,
            display: display,
            isJump: isJump
        });

        // Move to next player
        currentPlayer = currentPlayer === 4 ? 1 : currentPlayer + 1;
    }

    return steps;
}

// DOM elements
// currentNumberElement removed - no longer needed

// Initialize the game
function initGame() {
    gameState.animationSteps = generateAnimationSteps();
    updatePlayerStates();
    startAutoPlay();
}

// Start auto-play animation
function startAutoPlay() {
    gameState.isAnimating = true;
    showNextStep();
}

// Show next step in the animation
function showNextStep() {
    const step = gameState.animationSteps[gameState.currentStep];

    // Clear all dialog bubbles first
    for (let i = 1; i <= 4; i++) {
        const dialogBubble = document.getElementById(`dialog${i}`);
        dialogBubble.classList.remove('show', 'jump-number');
        dialogBubble.textContent = '';
    }

    // Show the current number in the speaking player's dialog bubble
    const currentDialogBubble = document.getElementById(`dialog${step.player}`);
    currentDialogBubble.textContent = step.display;
    currentDialogBubble.classList.add('show');

    if (step.isJump) {
        currentDialogBubble.classList.add('jump-number');
    }

    // Update number display
    // currentNumberElement removed - no longer needed

    // Add speaking animation
    // currentNumberElement removed - no longer needed

    // Add special styling for jump number
    // currentNumberElement removed - no longer needed

    // Highlight the current player
    updatePlayerStates();

    // Add jumping animation for the player
    if (step.isJump) {
        const playerCard = document.getElementById(`player${step.player}`);
        playerCard.classList.add('jumping');

        setTimeout(() => {
            playerCard.classList.remove('jumping');
        }, 800);
    }

    // Remove speaking animation after delay
    // currentNumberElement removed - no longer needed

    // Move to next step after delay
    setTimeout(() => {
        gameState.currentStep = (gameState.currentStep + 1) % gameState.animationSteps.length;
        showNextStep();
    }, 1200);
}

// Update player states
function updatePlayerStates() {
    for (let i = 1; i <= 4; i++) {
        const playerCard = document.getElementById(`player${i}`);

        // Remove active class from all players
        playerCard.classList.remove('active');

        const currentStep = gameState.animationSteps[gameState.currentStep];
        if (i === currentStep.player) {
            playerCard.classList.add('active');
        }
    }
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes jump {
        0%, 100% { transform: translateY(0) scale(1); }
        25% { transform: translateY(-20px) scale(1.05); }
        50% { transform: translateY(-40px) scale(1.1); }
        75% { transform: translateY(-20px) scale(1.05); }
    }
`;
document.head.appendChild(style);

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', function () {
    initGame();
});