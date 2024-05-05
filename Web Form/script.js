// JavaScript (script.js)

function parseCSV(csv) {
  const lines = csv.split('\n');
  const headers = lines[0].split(',');

  const questions = [];
  for (let i = 1; i < lines.length; i++) {
    const currentLine = lines[i].split(',');
    const question = {
      number: currentLine[0],
      text: currentLine[1],
      type: currentLine[2],
      options: currentLine.slice(3)
    };
    questions.push(question);
  }

  return questions;
}

function loadQuestionsFromCSV(csvFile) {
  fetch(csvFile)
    .then(response => response.text())
    .then(csvData => {
      const questions = parseCSV(csvData);
      showQuestion(questions[0]);
    })
    .catch(error => {
      console.error('Error loading CSV:', error);
    });
}

function showQuestion(question) {
  const questionText = document.getElementById('question-text');
  const answerOptions = document.getElementById('answer-options');

  questionText.textContent = question.text;

  // Clear previous answer options
  answerOptions.innerHTML = '';

  if (question.type === 'MCQ') {
    // Create radio buttons for multiple-choice questions
    for (let i = 0; i < question.options.length; i++) {
      const option = question.options[i];

      const label = document.createElement('label');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'answer';
      input.value = option;

      label.appendChild(input);
      label.appendChild(document.createTextNode(option));

      answerOptions.appendChild(label);
    }
  } else if (question.type === 'Text') {
    // Create text input for text-based questions
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'answer';

    answerOptions.appendChild(input);
  } else if (question.type === 'TextArea') {
    // Create text area for text-area-based questions
    const textarea = document.createElement('textarea');
    textarea.name = 'answer';

    answerOptions.appendChild(textarea);
  }
}

function showNextQuestion() {
  // Retrieve selected answer
  let selectedAnswer;
  const selectedOption = document.querySelector('input[name="answer"]:checked');
  if (selectedOption) {
    selectedAnswer = selectedOption.value;
  } else {
    selectedAnswer = document.querySelector('input[name="answer"]').value;
  }
  console.log('Selected Answer:', selectedAnswer);

  // Perform necessary actions with the selected answer

  // Retrieve the next question
  const currentQuestionIndex = 0; // Replace with the index of the current question
  const nextQuestion = questions[currentQuestionIndex + 1];

  // Display the next question
  showQuestion(nextQuestion);
}

// Load questions from CSV when the page is loaded
window.onload = function() {
  const csvFile = 'questions.csv'; // Replace with the path to your question CSV file
  loadQuestionsFromCSV(csvFile);
};
