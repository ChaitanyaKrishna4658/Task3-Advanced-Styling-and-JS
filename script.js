const questions = [
    {
        question: "Who developed Python Programming Language?",
        answers: [
            { text: "Wick van Rossum", correct: false },
            { text: "Rasmus Lerdorf", correct: false },
            { text: "Guido van Rossum", correct: true },
            { text: "Niene Stom", correct: false }
        ]
    },
    {
        question: "What year was Python first released?",
        answers: [
            { text: "1989", correct: true },
            { text: "1995", correct: false },
            { text: "2000", correct: false },
            { text: "1980", correct: false }
        ]
    },
    {
        question: "Which keyword is used for function in Python?",
        answers: [
            { text: "function", correct: false },
            { text: "define", correct: false },
            { text: "def", correct: true },
            { text: "fun", correct: false }
        ]
    },
    {
        question: "Which data type is immutable in Python?",
        answers: [
            { text: "List", correct: false },
            { text: "Dictionary", correct: false },
            { text: "Set", correct: false },
            { text: "Tuple", correct: true }
        ]
    },
    {
        question: "Which of these is not a core data type in Python?",
        answers: [
            { text: "Tuples", correct: false },
            { text: "Lists", correct: false },
            { text: "Class", correct: true },
            { text: "Dictionary", correct: false }
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('ans-buttons');
const nextButton = document.getElementById('next-button');

let currentQuestionIndex = 0;
let score = 0;
let isQuizOver = false;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    isQuizOver = false;
    nextButton.innerText = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
    if (currentQuestionIndex === questions.length - 1) {
        nextButton.innerText = "Submit";
    } else {
        nextButton.innerText = "Next";
    }
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("wrong");
    }

    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
    });

    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    if (isQuizOver) {
        startQuiz();
        return;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionElement.innerHTML = `&#127881; You scored ${score} out of ${questions.length}!`;
    if( score <= 2){
        questionElement.innerHTML += "<br>Keep practicing, you can do better!";
    }
    else if (score === 3) {
        questionElement.innerHTML += " Good Try, Better luck next time!";
    }
    else {
        questionElement.innerHTML += "<br>Excellent! You have a good understanding of Python.";
    }
    nextButton.innerText = "Play Again";
    nextButton.style.display = "block";
    isQuizOver = true;
}

startQuiz();
