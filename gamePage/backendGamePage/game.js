// game.js
// Nécessite que questions.js soit chargé avant
// (il définit "easyQuestions", "mediumQuestions", "hardQuestions")

let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = [];
let currentLevel = null;

const LEVELS = {
    easy: { label: "Facile", data: () => easyQuestions },
    medium: { label: "Moyen", data: () => mediumQuestions },
    hard: { label: "Difficile", data: () => hardQuestions },
};

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function ensureLevelSelectContainer() {
    let container = document.getElementById('level-select-container');
    if (container) return container;

    container = document.createElement('div');
    container.id = 'level-select-container';

    const title = document.createElement('h2');
    title.textContent = "Choisis un niveau";
    container.appendChild(title);

    const btnWrapper = document.createElement('div');
    btnWrapper.id = 'level-buttons';

    Object.entries(LEVELS).forEach(([key, { label }]) => {
        const btn = document.createElement('button');
        btn.textContent = label;
        btn.classList.add('level-btn');
        btn.dataset.level = key;
        btn.addEventListener('click', () => startGame(key));
        btnWrapper.appendChild(btn);
    });

    container.appendChild(btnWrapper);

    // Insère avant le quiz-container si possible, sinon à la fin du body
    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer && quizContainer.parentNode) {
        quizContainer.parentNode.insertBefore(container, quizContainer);
    } else {
        document.body.appendChild(container);
    }

    return container;
}

function showLevelSelect() {
    const levelContainer = ensureLevelSelectContainer();
    levelContainer.style.display = 'block';
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'none';
}

function startGame(level) {
    if (!LEVELS[level]) return;

    currentLevel = level;
    shuffledQuestions = shuffleArray(LEVELS[level].data());
    currentQuestionIndex = 0;
    score = 0;

    document.getElementById('level-select-container').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('result-container').style.display = 'none';

    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex >= shuffledQuestions.length) {
        showFinalResult();
        return;
    }

    const q = shuffledQuestions[currentQuestionIndex];

    document.getElementById('question-counter').textContent =
        `Question ${currentQuestionIndex + 1} / ${shuffledQuestions.length}`;
    document.getElementById('score-display').textContent = `Score : ${score}`;
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
    }

    document.getElementById('score-display').textContent = `Score : ${score}`;
    document.getElementById('next-btn').style.display = 'inline-block';
}

function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
}

function showFinalResult() {
    document.getElementById('quiz-container').style.display = 'none';

    const resultContainer = document.getElementById('result-container');
    resultContainer.style.display = 'block';
    resultContainer.innerHTML = `
        <h2>Quiz terminé !</h2>
        <p>Niveau : ${LEVELS[currentLevel].label}</p>
        <p>Ton score final : ${score} / ${shuffledQuestions.length}</p>
        <button id="restart-btn">Choisir un autre niveau</button>
        <button id="replay-btn">Rejouer ce niveau</button>
    `;

    document.getElementById('restart-btn').addEventListener('click', showLevelSelect);
    document.getElementById('replay-btn').addEventListener('click', () => startGame(currentLevel));
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
    showLevelSelect();
});
