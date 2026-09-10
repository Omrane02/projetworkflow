// game.js
// Nécessite que backend.js soit chargé avant (il définit "questions")

let currentQuestionIndex = 0;
let score = 0;
let lives = 3;
let shuffledQuestions = [];
let currentMode = "classic";
let gameEnded = false;

function getModeFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("mode") === "survie" ? "survie" : "classic";
}

function updateGameStatus() {
    const scoreDisplay = document.getElementById('score-display');
    const livesDisplay = document.getElementById('lives-display');
    const questionCounter = document.getElementById('question-counter');

    scoreDisplay.textContent = `Score : ${score}`;

    if (currentMode === 'survie') {
        livesDisplay.textContent = `Vies : ${'❤️ '.repeat(lives).trim() || '0'}`;
        livesDisplay.classList.remove('hidden');
    } else {
        livesDisplay.classList.add('hidden');
    }

    if (questionCounter) {
        questionCounter.textContent = `Question ${currentQuestionIndex + 1} / ${shuffledQuestions.length}`;
    }
}

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function initGame() {
    currentMode = getModeFromUrl();
    shuffledQuestions = shuffleArray(questions);
    currentQuestionIndex = 0;
    score = 0;
    lives = 3;
    gameEnded = false;

    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('result-container').style.display = 'none';

    updateGameStatus();
    showQuestion();
}

function showQuestion() {
    if (gameEnded) {
        return;
    }

    if (currentMode === 'survie' && lives <= 0) {
        showFinalResult();
        return;
    }

    if (currentQuestionIndex >= shuffledQuestions.length) {
        showFinalResult();
        return;
    }

    const q = shuffledQuestions[currentQuestionIndex];

    updateGameStatus();
    document.getElementById('question-text').textContent = q.question;

    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';

    q.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.textContent = answer;
        btn.classList.add('answer-btn');
        btn.addEventListener('click', () => selectAnswer(index, btn));
        answersContainer.appendChild(btn);
    });

    document.getElementById('next-btn').style.display = 'none';
}

function selectAnswer(selectedIndex, btnElement) {
    if (gameEnded) {
        return;
    }

    const q = shuffledQuestions[currentQuestionIndex];
    const buttons = document.querySelectorAll('.answer-btn');

    buttons.forEach((btn, index) => {
        btn.disabled = true;
        if (index === q.correct) {
            btn.classList.add('correct');
        }
    });

    if (selectedIndex === q.correct) {
        score++;
    } else {
        btnElement.classList.add('incorrect');

        if (currentMode === 'survie') {
            lives = Math.max(0, lives - 1);
            updateGameStatus();
        }
    }

    if (currentMode === 'survie' && lives <= 0) {
        gameEnded = true;
        document.getElementById('next-btn').style.display = 'none';
        showFinalResult();
        return;
    }

    updateGameStatus();
    document.getElementById('next-btn').style.display = 'inline-block';
}

function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
}

function showFinalResult() {
    gameEnded = true;
    document.getElementById('quiz-container').style.display = 'none';

    const resultContainer = document.getElementById('result-container');
    resultContainer.style.display = 'block';

    const survivalText = currentMode === 'survie'
        ? (lives <= 0 ? 'Tu as perdu toutes tes vies !' : 'Tu as survécu au challenge !')
        : 'Quiz terminé !';

    resultContainer.innerHTML = `
        <h2>${survivalText}</h2>
        <p>Ton score final : ${score} / ${shuffledQuestions.length}</p>
        <p>${currentMode === 'survie' ? `Vies restantes : ${lives}` : ''}</p>
        <button id="restart-btn">Rejouer</button>
    `;

    document.getElementById('restart-btn').addEventListener('click', initGame);
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
    initGame();
});