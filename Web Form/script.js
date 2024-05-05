// Define variables
const questionContainerElement = document.getElementById('question-container');
const questionTextElement = document.getElementById('question-text');
const answerOptionsElement = document.getElementById('answer-options');
const nextButtonElement = document.getElementById('next-button');

let currentQuestionIndex = 0;
let answers = [];

// Function to parse CSV file and load questions
function loadQuestionsFromCSV(csvFile) {
  Papa.parse(csvFile, {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: function (results) {
      const parsedQuestions = results.data;
      parseQuestions(parsedQuestions);
      displayCurrentQuestion();
    }
  });
}

// Function to parse questions array
function parseQuestions(parsedQuestions) {
  questions = parsedQuestions.map(question => {
    const { QuestionNumber, QuestionText, QuestionType, Options, FinalMessage } = question;
    return {
      questionNumber: QuestionNumber,
      questionText: QuestionText,
      questionType: QuestionType,
      options: Options ? Options.split(',') : [],
      finalMessage: FinalMessage
    };
  });
}

// Function to display current question
function displayCurrentQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionTextElement.textContent = currentQuestion.questionNumber + '. ' + currentQuestion.questionText;

  // Clear previous options
  answerOptionsElement.innerHTML = '';

  // Display options based on question type
  if (currentQuestion.questionType === 'text') {
    const textField = document.createElement('input');
    textField.type = 'text';
    textField.id = 'answer-input';
    answerOptionsElement.appendChild(textField);
  } else if (currentQuestion.questionType === 'single') {
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
  } else if (currentQuestion.questionType === 'multiple') {
    for (let i = 0; i < currentQuestion.options.length; i++) {
      const option = document.createElement('input');
      option.type = 'checkbox';
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

  // Modify button text for the "End" question type
  if (currentQuestion.questionType === 'End') {
    nextButtonElement.textContent = 'Submit';
  } else {
    nextButtonElement.textContent = 'Next';
  }
}

// Function to show next question or display final message
function showNextQuestion() {
  const selectedAnswer = getSelectedAnswer();

  // Store the answer for the current question
  answers[currentQuestionIndex] = selectedAnswer;

  // Increment the current question index
  currentQuestionIndex++;

  // Check if it's the last question
  if (currentQuestionIndex === questions.length) {
    displayFinalMessage();
  } else {
    displayCurrentQuestion();
  }
}

// Function to retrieve the selected answer
function getSelectedAnswer() {
  const answerElements = document.getElementsByName('answer');
  let selectedAnswer = '';

  for (let i = 0; i < answerElements.length; i++) {
    if (answerElements[i].checked) {
      selectedAnswer = answerElements[i].value;
      break;
    }
  }

  if (selectedAnswer === '') {
    selectedAnswer = document.getElementById('answer-input').value;
  }

  return selectedAnswer;
}

// Function to display final message or additional content
function displayFinalMessage() {
  questionContainerElement.classList.add('hide');

  // Retrieve the final message from the current question
  const currentQuestion = questions[currentQuestionIndex];
  const finalMessage = currentQuestion.finalMessage;

  // Create a paragraph element for the final message
  const finalMessageElement = document.createElement('p');
  finalMessageElement.textContent = finalMessage;

  // Append the final message element to the question container
  questionContainerElement.appendChild(finalMessageElement);
}

// Load questions from CSV file
loadQuestionsFromCSV('questions.csv');
