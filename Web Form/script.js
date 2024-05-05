// Define the list of questions
let questions = [];

// Read questions from CSV file
function readQuestionsFromCSV(file) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      const rows = data.split('\n');
      const headers = rows[0].split(',');

      for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].split(',');
        const question = {
          questionNumber: cells[0],
          questionText: cells[1],
          questionType: cells[2],
          options: cells.slice(3)
        };
        questions.push(question);
      }

      displayCurrentQuestion();
      questionContainerElement.style.display = 'block';
      nextButtonElement.style.display = 'block';
    })
    .catch(error => {
      console.error('Error reading CSV file:', error);
    });
}

// Function to display current question
function displayCurrentQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionTextElement.textContent = currentQuestion.questionNumber + '. ' + currentQuestion.questionText;

  // Clear previous options
  while (answerOptionsElement.firstChild) {
    answerOptionsElement.firstChild.remove();
  }

  // Display options based on question type
  if (currentQuestion.questionType === 'text') {
    const textField = document.createElement('input');
    textField.type = 'text';
    textField.id = 'answer-input';
    answerOptionsElement.appendChild(textField);
  } else if (currentQuestion.questionType === 'multiple') {
    for (let i = 0; i < currentQuestion.options.length; i++) {
      const option = document.createElement('input');
      option.type = 'radio';
      option.name = 'answer';
      option.value = currentQuestion.options[i];
      option.id = 'option-' + i;
      const label = document.createElement('label');
      label.htmlFor = 'option-' + i;
      label.textContent = currentQuestion.options[i];
      answerOptionsElement.appendChild(option);
      answerOptionsElement.appendChild(label);
      answerOptionsElement.appendChild(document.createElement('br'));
    }
  }
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

// Get DOM elements
const questionTextElement = document.getElementById('question-text');
const answerOptionsElement = document.getElementById('answer-options');
const nextButtonElement = document.getElementById('next-button');
const questionContainerElement = document.getElementById('question-container');

// Event listener for the next button
nextButtonElement.addEventListener('click', showNextQuestion);

// Define the current question index
let currentQuestionIndex = 0;

// Initialize the form by reading questions from CSV
readQuestionsFromCSV('questions.csv');
