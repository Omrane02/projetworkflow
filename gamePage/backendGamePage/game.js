// game.js
// Nécessite que backend.js soit chargé avant (il définit "questions")

let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = [];
let gameMode = 'classic';
let survivalTimer = null;
let survivalTimeLeft = 20;

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function getCurrentMode() {
    return gameMode;
}

function clearSurvivalTimer() {
    if (survivalTimer) {
        clearInterval(survivalTimer);
        survivalTimer = null;
    }
}

function updateTimerDisplay() {
    const timerDisplay = document.getElementById('timer-display');
    if (timerDisplay) {
        timerDisplay.textContent = `Temps : ${survivalTimeLeft}s`;
    }
}

function startSurvivalTimer() {
    clearSurvivalTimer();
    survivalTimeLeft = 20;
    updateTimerDisplay();

    survivalTimer = setInterval(() => {
        survivalTimeLeft -= 1;
        updateTimerDisplay();

        if (survivalTimeLeft <= 0) {
            clearSurvivalTimer();
            showFinalResult('Temps écoulé !');
        }
    }, 1000);
}

function initGame(mode = gameMode) {
    gameMode = mode;
    shuffledQuestions = shuffleArray(questions);
    currentQuestionIndex = 0;
    score = 0;

    clearSurvivalTimer();
    if (gameMode === 'survie') {
        startSurvivalTimer();
    }

    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('next-btn').style.display = 'none';

    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex >= shuffledQuestions.length) {
        shuffledQuestions = shuffleArray(questions);
        currentQuestionIndex = 0;
    }

    const q = shuffledQuestions[currentQuestionIndex];
    const questionText = document.getElementById('question-text');
    const questionCounter = document.getElementById('question-counter');

    if (gameMode === 'survie') {
        questionCounter.textContent = `Question survie ${currentQuestionIndex + 1}`;
        if (survivalTimer === null) {
            startSurvivalTimer();
        }
    } else {
        questionCounter.textContent = `Question ${currentQuestionIndex + 1} / ${shuffledQuestions.length}`;
    }

    document.getElementById('score-display').textContent = `Score : ${score}`;
    questionText.textContent = q.question;

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
        document.getElementById('score-display').textContent = `Score : ${score}`;
        document.getElementById('next-btn').style.display = 'inline-block';
        return;
    }

    if (btnElement) {
        btnElement.classList.add('incorrect');
    }

    showFinalResult('Mauvaise réponse !');
}

function nextQuestion() {
    currentQuestionIndex++;

    if (gameMode === 'survie') {
        if (survivalTimer !== null) {
            survivalTimeLeft = 20;
            updateTimerDisplay();
        }
        showQuestion();
        return;
    }

    showQuestion();
}

function showFinalResult(message = 'Quiz terminé !') {
    clearSurvivalTimer();
    document.getElementById('quiz-container').style.display = 'none';

    const resultContainer = document.getElementById('result-container');
    resultContainer.style.display = 'block';

    if (gameMode === 'survie') {
        resultContainer.innerHTML = `
            <h2>Mode survie</h2>
            <p>${message}</p>
            <p>Ton score final : ${score}</p>
            <button id="restart-btn">Rejouer</button>
        `;
    } else {
        resultContainer.innerHTML = `
            <h2>Quiz terminé !</h2>
            <p>Ton score final : ${score} / ${shuffledQuestions.length}</p>
            <button id="restart-btn">Rejouer</button>
        `;
    }

    document.getElementById('restart-btn').addEventListener('click', () => initGame(gameMode));
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
    document.getElementById('mode-classic').addEventListener('click', () => initGame('classic'));
    document.getElementById('mode-survie').addEventListener('click', () => initGame('survie'));
    initGame('classic');
});