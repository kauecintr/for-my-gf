const questions = [
    {
        question: "Qual é meu doce favorito?",
        answers: [
            { id: 1, text: "Chiclete de melância", correct: false },
            { id: 2, text: "Churros", correct: true },
            { id: 3, text: "Danone", correct: false },
            { id: 4, text: "Amandita", correct: false },
        ],
    },

    {
        question: "Qual é a capital da França?",
        answers: [
            { id: 1, text: "Paris", correct: true },
            { id: 2, text: "Londres", correct: false },
            { id: 3, text: "Berlim", correct: false },
            { id: 4, text: "Madri", correct: false },
        ],
    },

    {
        question: "Qual é a capital da França?",
        answers: [
            { id: 1, text: "Paris", correct: true },
            { id: 2, text: "Londres", correct: false },
            { id: 3, text: "Berlim", correct: false },
            { id: 4, text: "Madri", correct: false },
        ],
    },

    {
        question: "Qual é a capital da França?",
        answers: [
            { id: 1, text: "Paris", correct: true },
            { id: 2, text: "Londres", correct: false },
            { id: 3, text: "Berlim", correct: false },
            { id: 4, text: "Madri", correct: false },
        ],
    },
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Próxima";
    showQuestion();
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.dataset.id = answer.id;
        button.classList.add("btn");
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function selectAnswer(e){
    answers = questions[currentQuestionIndex].answers;
    const correctAnswer = answers.filter((answer) => answer.correct == true)[0];

    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.id == correctAnswer.id;
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach((button) => {
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Você acertou ${score} de ${questions.length} perguntas!`;
    nextButton.innerHTML = "Recomeçar";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})


startQuiz();