// Define the list of questions
const questions = [
  "Question 1: What is your name?",
  "Question 2: What is your age?",
  "Question 3: What is your favorite color?"
];

let currentQuestionIndex = 0;

// Get DOM elements
const questionTextElement = document.getElementById('question-text');
const answerInputElement = document.getElementById('answer-input');
const nextButtonElement = document.getElementById('next-button');
const questionContainerElement = document.getElementById('question-container');

// Function to display current question
function displayCurrentQuestion() {
  questionTextElement.textContent = questions[currentQuestionIndex];
}

// Function to show next question
function showNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayCurrentQuestion();
  } else {
    questionContainerElement.style.display = 'none';
  }
}

// Event listener for the next button
nextButtonElement.addEventListener('click', showNextQuestion);

// Initialize the form
displayCurrentQuestion();
questionContainerElement.style.display = 'block';
nextButtonElement.style.display = 'block';