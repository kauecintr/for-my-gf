const questions = [
    {
        question: "Qual é meu doce favorito?",
        answers: [
            { id: 1, text: "Palha Italiana", correct: false },
            { id: 2, text: "Churros", correct: true },
            { id: 3, text: "Danone", correct: false },
            { id: 4, text: "Amandita", correct: false },
        ],
    },

    {
        question: "Qual desses times eu torço?",
        answers: [
            { id: 1, text: "Real Madrid", correct: false },
            { id: 2, text: "Dortmund", correct: true },
            { id: 3, text: "Internazionale", correct: false },
            { id: 4, text: "Chelsea", correct: false },
        ],
    },

    {
        question: "Qual é minha série favorita?",
        answers: [
            { id: 1, text: "Peaky Blinders", correct: false },
            { id: 2, text: "Vikings", correct: false },
            { id: 3, text: "Dark", correct: false },
            { id: 4, text: "Breaking Bad", correct: true },
        ],
    },

    {
        question: "Qual é meu mangá favorito?",
        answers: [
            { id: 1, text: "Vinland Saga", correct: true },
            { id: 2, text: "One Piece", correct: false },
            { id: 3, text: "Monster", correct: false },
            { id: 4, text: "20th Century Boys", correct: false },
        ],
    },

    {
        question: "Qual meu personagem favorito?",
        answers: [
            { id: 1, text: "Luffy", correct: false },
            { id: 2, text: "Kurapika", correct: false },
            { id: 3, text: "Thorfinn", correct: true },
            { id: 4, text: "Killua", correct: false },
        ],
    },

    {
        question: "Qual é a parte que mais gosto do seu rosto?",
        answers: [
            { id: 1, text: "Olhos", correct: true },
            { id: 2, text: "Boca", correct: false },
            { id: 3, text: "Nariz", correct: false },
            { id: 4, text: "Sorriso", correct: false },
        ],
    },
    
    {
        question: "Quem é a mulher mais linda do mundo?",
        answers: [
            { id: 1, text: "Estefany Andrade Lima", correct: true },
            { id: 2, text: "^", correct: false },
            { id: 3, text: "^", correct: false },
            { id: 4, text: "^", correct: false },
        ],
    },

    {
        question: "Quem é o maior terror do Corinthians?",
        answers: [
            { id: 1, text: "Calleri", correct: false },
            { id: 2, text: "Luciano", correct: false },
            { id: 3, text: "Lucas Moura", correct: true },
            { id: 4, text: "Luis Fabiano", correct: false },
        ],
    },

    {
        question: "Qual o primeiro país que vamos viajar?",
        answers: [
            { id: 1, text: "Japão", correct: false },
            { id: 2, text: "Irlanda", correct: true },
            { id: 3, text: "China", correct: false },
            { id: 4, text: "Canadá", correct: false },
        ],
    },

    {
        question: "Quer ficar mais quanto tempo comigo?",
        answers: [
            { id: 1, text: "Infinito", correct: true },
            { id: 2, text: "2 anos", correct: true },
            { id: 3, text: "1 dia", correct: false },
            { id: 4, text: "5 segundos", correct: false },
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


//////////
function calcularTempoJuntos(dataInicio) {
    const hoje = new Date();
    
    let anos = hoje.getFullYear() - dataInicio.getFullYear();
    let meses = hoje.getMonth() - dataInicio.getMonth();
    let dias = hoje.getDate() - dataInicio.getDate();
  
    if (dias < 0) {
      meses--;
      const ultimoMes = new Date(hoje.getFullYear(), hoje.getMonth(), 0).getDate();
      dias += ultimoMes;
    }
  
    if (meses < 0) {
      anos--;
      meses += 12;
    }
  
    return { anos, meses, dias };
  }
  
  const dataInicio = new Date("2024-01-20");
  const tempo = calcularTempoJuntos(dataInicio);
  
  // Monta a frase bonitinha
  let frase = '';
  if (tempo.anos > 0) frase += `${tempo.anos} ano${tempo.anos > 1 ? 's' : ''}, `;
  frase += `${tempo.meses} mês${tempo.meses !== 1 ? 'es' : ''} e `;
  frase += `${tempo.dias} dia${tempo.dias !== 1 ? 's' : ''}`;
  
  document.getElementById("contador").textContent = frase;
  /////////////////



  function soltarCoracoes() {
    const coracao = document.createElement('div');
    coracao.classList.add('coracao');
    coracao.textContent = '🤍';
  
    coracao.style.left = Math.random() * 100 + 'vw';
    coracao.style.top = Math.random() * 80 + 10 + 'vh';
  
    document.body.appendChild(coracao);
  
    setTimeout(() => {
      coracao.remove();
    }, 2000);
  }
  ////////////////////////


  function abrirCartinha() {
    const carta = document.getElementById('cartinha');
    carta.style.display = 'block';
  }
  ///////////////////////////////


  const elementos = document.querySelectorAll('.scroll-reveal');

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;

    elementos.forEach(el => {
      const elTop = el.getBoundingClientRect().top + scrollY;
      if (scrollY + windowHeight > elTop + 100) {
        el.classList.add('show');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('load', revealOnScroll);