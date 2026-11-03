// Dom Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
    {
        question: "what is the capital of France?",
        answers: [
            { text: "London", correct: false},
            { text: "Berlin", correct: false},
            { text: "Paris", correct: true},
            { text: "Madrid", correct: false},
        ],
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false},
            { text: "Mars", correct: true},
            { text: "Jupiter", correct: false},
            { text: "Saturn", correct: false},
        ],
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false},
            { text: "Indian Ocean", correct: false},
            { text: "Artic Ocean", correct: false},
            { text: "Pacific Ocean", correct: true},
        ],
    },
    {
        question: "Which ot these is NOT a programming Language?",
        answers: [
            { text: "Java", correct: false},
            { text: "Python", correct: false},
            { text: "Banana", correct: true},
            { text: "Javascript", correct: false},
        ],
    },
    {
        question: "what is the chemical symbol for gold?",
        answers: [
            { text: "Go", correct: false},
            { text: "Gd", correct: false},
            { text: "Au", correct: true},
            { text: "Ag", correct: false},
        ],
    },
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    answersDisabled = false;

    scoreSpan.textContent = score;

    startScreen.classList.remove("active");
    resultScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}
function selectAnswer(isCorrect, button) {
    if (answersDisabled) return;

    answersDisabled = true;

    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
        button.classList.add("correct");
    } else {
        button.classList.add("wrong");
    }

    // Show the correct answer
    Array.from(answersContainer.children).forEach(btn => {
        const answer =
            quizQuestions[currentQuestionIndex].answers[
                Array.from(answersContainer.children).indexOf(btn)
            ];

        if (answer.correct) {
            btn.classList.add("correct");
        }

        btn.disabled = true;
    });

    setTimeout(() => {
        currentQuestionIndex++;

        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }

        answersDisabled = false;
    }, 1000);
}

function showQuestion() {

    const currentQuestion = quizQuestions[currentQuestionIndex];

    questionText.textContent = currentQuestion.question;

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {

        const button = document.createElement("button");

        button.innerText = answer.text;

        button.classList.add("answer-btn");

        button.addEventListener("click", () => {
            selectAnswer(answer.correct, button);
        });

        answersContainer.appendChild(button);
    });

    updateProgressBar();
}
function updateProgressBar() {

    const progress =
        ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

    progressBar.style.width = progress + "%";
}
function showResults() {

    quizScreen.classList.remove("active");

    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    if (score === quizQuestions.length) {
        resultMessage.textContent = "🎉 Perfect Score!";
    }
    else if (score >= quizQuestions.length * 0.7) {
        resultMessage.textContent = "😊 Great Job!";
    }
    else if (score >= quizQuestions.length * 0.4) {
        resultMessage.textContent = "🙂 Good Try!";
    }
    else {
        resultMessage.textContent = "😔 Keep Practicing!";
    }
}
function restartQuiz() {
    // Reset quiz state
    currentQuestionIndex = 0;
    score = 0;
    answersDisabled = false;

    scoreSpan.textContent = score;
    currentQuestionSpan.textContent = 1;
    

    // Hide result screen
    resultScreen.classList.remove("active");

    // Hide quiz screen
    quizScreen.classList.remove("active");

    // Show start screen
    startScreen.classList.add("active");

    // Reset progress bar
    progressBar.style.width = "0%";
}

// function startQuiz() {
//     startScreen.classList.remove("active");
//     resultScreen.classList.remove("active");
//     quizScreen.classList.add("active");

//     showQuestion();
// }