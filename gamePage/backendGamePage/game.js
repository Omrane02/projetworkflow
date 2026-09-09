// game.js
// Nécessite que backend.js soit chargé avant (il définit "questions")

let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = [];

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function initGame() {
    shuffledQuestions = shuffleArray(questions);
    currentQuestionIndex = 0;
    score = 0;

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
        <p>Ton score final : ${score} / ${shuffledQuestions.length}</p>
        <button id="restart-btn">Rejouer</button>
    `;

    document.getElementById('restart-btn').addEventListener('click', initGame);
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
    initGame();
});