const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".result-text");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".btn-restart");

let currentIndex = 0;
let questions = [];
let correctAnswers = 0;

async function fetchQuestions() {
  try {
    const res = await fetch("api.php");
    questions = await res.json();
    startGame();
  } catch (error) {
    alert("Erro ao carregar perguntas.");
    console.error(error);
  }
}

function nextQuestion(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  if (isCorrect) {
    correctAnswers++;
  }

  currentIndex++;

  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    finish();
  }
}

function loadQuestion() {
  clearAnswers();

  const item = questions[currentIndex];
  spnQtd.innerHTML = `Pergunta ${currentIndex + 1} de ${questions.length}`;
  question.innerHTML = item.question;

  item.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.classList.add("answer");
    button.innerHTML = answer.option;
    button.dataset.correct = answer.correct;
    button.addEventListener("click", nextQuestion);

    answers.appendChild(button);
  });
}

function clearAnswers() {
  while (answers.firstChild) {
    answers.removeChild(answers.firstChild);
  }
}

function finish() {
  textFinish.innerHTML = `Você acertou ${correctAnswers} de ${questions.length}`;
  content.style.display = "none";
  contentFinish.style.display = "flex";
}

btnRestart.onclick = () => {
  content.style.display = "flex";
  contentFinish.style.display = "none";

  currentIndex = 0;
  correctAnswers = 0;
  startGame();
};

function startGame() {
  content.style.display = "flex";
  contentFinish.style.display = "none";

  currentIndex = 0;
  correctAnswers = 0;
  loadQuestion();
}

// Iniciar carregando as perguntas
fetchQuestions();
