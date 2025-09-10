// Quiz data - parsed from questions.md
const quizData = [
    {
        question: "新郎新娘都喜欢的音乐风格",
        answers: ["台湾原住民", "爵士", "Kpop"],
        correct: 1
    },
    {
        question: "新郎新娘都喜欢的菜",
        answers: ["新疆菜", "法餐", "披萨"],
        correct: 2
    },
    {
        question: "新娘赖床的时候会发出什么怪声",
        answers: ["呜嘟嘟嘟", "哎呀呀呀", "啊嘎嘎嘎"],
        correct: 2
    },
    {
        question: "以下哪个歌手新郎不会模仿",
        answers: ["刘德华", "伍佰", "张宇"],
        correct: 0
    },
    {
        question: "新郎去日本购物最喜欢买什么",
        answers: ["二手玩偶", "高端厨具", "中古电子产品"],
        correct: 0
    },
    {
        question: "新郎新娘第一次一起旅游的目的地",
        answers: ["泸沽湖", "冲绳", "济州岛"],
        correct: 0
    },
    {
        question: "新郎在朋友圈发的最频繁的内容",
        answers: ["读书笔记", "烂梗", "自拍美照"],
        correct: 1
    },
    {
        question: "新郎新娘一起在家最喜欢的娱乐项目",
        answers: ["玩Switch", "看电影", "看恋综"],
        correct: 2
    },
    {
        question: "新郎的mbti是",
        answers: ["INTJ", "INFJ", "ENTP"],
        correct: 1
    },
    {
        question: "哪个是新郎新娘的共同点",
        answers: ["没有蛀牙", "没有近视", "不说梦话"],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let isAnswerRevealed = false;

// Initialize the quiz
function initQuiz() {
    updateQuestionCounter();
    displayQuestion();
    updateNavigationButtons();
}

// Display the current question
function displayQuestion() {
    const question = quizData[currentQuestionIndex];
    const questionElement = document.getElementById('question-text');
    const answersContainer = document.getElementById('answers-container');

    questionElement.textContent = question.question;

    // Clear previous answers
    answersContainer.innerHTML = '';

    // Create answer options
    question.answers.forEach((answer, index) => {
        const answerElement = document.createElement('div');
        answerElement.className = 'answer-option';
        answerElement.textContent = answer;
        answerElement.onclick = () => selectAnswer(index);
        answersContainer.appendChild(answerElement);
    });

    // Reset reveal button
    const revealBtn = document.getElementById('reveal-btn');
    revealBtn.disabled = false;
    revealBtn.textContent = '答案';
    isAnswerRevealed = false;
}

// Handle answer selection
function selectAnswer(selectedIndex) {
    if (isAnswerRevealed) return;

    const answerElements = document.querySelectorAll('.answer-option');
    const question = quizData[currentQuestionIndex];

    // Remove any existing selections
    answerElements.forEach(el => el.classList.remove('selected'));

    // Mark selected answer
    answerElements[selectedIndex].classList.add('selected');
}

// Reveal the correct answer
function revealAnswer() {
    if (isAnswerRevealed) return;

    const answerElements = document.querySelectorAll('.answer-option');
    const question = quizData[currentQuestionIndex];

    // Mark all answers as revealed
    answerElements.forEach(el => el.classList.add('revealed'));

    // Highlight correct answer
    answerElements[question.correct].classList.add('correct');

    // Highlight incorrect answers if any were selected
    answerElements.forEach((el, index) => {
        if (el.classList.contains('selected') && index !== question.correct) {
            el.classList.add('incorrect');
        }
    });

    // Update reveal button
    const revealBtn = document.getElementById('reveal-btn');
    revealBtn.disabled = true;
    revealBtn.textContent = '答案';

    isAnswerRevealed = true;
}

// Navigate to next question
function nextQuestion() {
    if (currentQuestionIndex < quizData.length - 1) {
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
    document.getElementById('total-questions').textContent = quizData.length;
}

// Update navigation button states
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.disabled = currentQuestionIndex === quizData.length - 1;

    if (currentQuestionIndex === quizData.length - 1) {
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
            if (currentQuestionIndex < quizData.length - 1) {
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

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', initQuiz);
