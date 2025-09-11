// Pinyin game data - parsed from answers.md
const pinyinData = [
    {
        question: "cd",
        answers: ["场地", "草地", "菜单", "程度", "重叠", "长度", "沉淀", "存档", "词典", "成都"]
    },
    {
        question: "kd",
        answers: ["肯定", "宽带", "空地", "宽度", "开大", "快递", "快点", "开店", "口袋", "考点"]
    },
    {
        question: "sm",
        answers: ["上面", "声明", "神秘", "生命", "说明", "审美", "扫描", "睡眠", "宿命", "扫码"]
    },
    {
        question: "gf",
        answers: ["规范", "官方", "工坊", "干饭", "过分", "高分", "购房", "国服", "股份", "光伏"]
    },
    {
        question: "bb",
        answers: ["版本", "拜拜", "宝宝", "爆表", "宝宝", "不变", "包包", "白板", "表白", "背包"]
    }
];

let currentQuestionIndex = 0;
let isAnswerRevealed = false;

// Initialize the pinyin game
function initPinyinGame() {
    updateQuestionCounter();
    displayQuestion();
    updateNavigationButtons();
}

// Display the current question
function displayQuestion() {
    const question = pinyinData[currentQuestionIndex];
    const questionElement = document.getElementById('question-text');
    const answersContainer = document.getElementById('answers-container');

    questionElement.textContent = question.question;

    // Clear previous answers
    answersContainer.innerHTML = '';

    // Create answer options (hidden by default)
    question.answers.forEach((answer, index) => {
        const answerElement = document.createElement('div');
        answerElement.className = 'answer-option hidden';
        answerElement.textContent = answer;
        answersContainer.appendChild(answerElement);
    });

    // Reset reveal button
    const revealBtn = document.getElementById('reveal-btn');
    revealBtn.disabled = false;
    revealBtn.textContent = '显示答案';
    isAnswerRevealed = false;
}

// Reveal all answers
function revealAnswer() {
    if (isAnswerRevealed) return;

    const answerElements = document.querySelectorAll('.answer-option');

    // Show all answers with animation delay
    answerElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.remove('hidden');
            el.classList.add('revealed');
        }, index * 100);
    });

    // Update reveal button
    const revealBtn = document.getElementById('reveal-btn');
    revealBtn.disabled = true;
    revealBtn.textContent = '已显示';

    isAnswerRevealed = true;
}

// Navigate to next question
function nextQuestion() {
    if (currentQuestionIndex < pinyinData.length - 1) {
        currentQuestionIndex++;
        updateQuestionCounter();
        displayQuestion();
        updateNavigationButtons();
    }
}

// Navigate to previous question
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        updateQuestionCounter();
        displayQuestion();
        updateNavigationButtons();
    }
}

// Update question counter
function updateQuestionCounter() {
    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
    document.getElementById('total-questions').textContent = pinyinData.length;
}

// Update navigation button states
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.disabled = currentQuestionIndex === pinyinData.length - 1;

    if (currentQuestionIndex === pinyinData.length - 1) {
        nextBtn.textContent = '完成';
    } else {
        nextBtn.textContent = '下一题';
    }
}

// Keyboard navigation
document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'ArrowLeft':
            if (currentQuestionIndex > 0) {
                previousQuestion();
            }
            break;
        case 'ArrowRight':
            if (currentQuestionIndex < pinyinData.length - 1) {
                nextQuestion();
            }
            break;
        case 'Enter':
        case ' ':
            if (!isAnswerRevealed) {
                revealAnswer();
            }
            break;
    }
});

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', initPinyinGame);
