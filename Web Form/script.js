function readCSV(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && (rawFile.status === 200 || rawFile.status === 0)) {
      var allText = rawFile.responseText;
      callback(allText);
    }
  };
  rawFile.send(null);
}

function parseCSV(csvData) {
  var lines = csvData.split("\n");
  var questionsContainer = document.getElementById("questionsContainer");

  for (var i = 0; i < lines.length; i++) {
    var row = lines[i].split(",");

    var question = row[0];
    var options = row.slice(1);

    var questionElement = document.createElement("p");
    questionElement.textContent = question;
    questionsContainer.appendChild(questionElement);

    if (options.length > 0) {
      var selectElement = document.createElement("select");
      for (var j = 0; j < options.length; j++) {
        var option = document.createElement("option");
        option.textContent = options[j];
        selectElement.appendChild(option);
      }
      questionsContainer.appendChild(selectElement);
    } else {
      var inputElement = document.createElement("input");
      inputElement.setAttribute("type", "text");
      questionsContainer.appendChild(inputElement);
    }
  }
}

document.addEventListener("DOMContentLoaded", function() {
  readCSV("questions.csv", parseCSV);
});
