document.querySelector("#start").addEventListener("click", startQuiz);


var questions = [
  {
    question: "Commonly used data types DO not include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    correctAnswer: "booleans"
  },
  {
    question: "The condition in an if / else statement is enclosed with ______.",
    choices: ["quotes", "boocurly brackets", "parenthesis", "square brackets"],
    correctAnswer: "parenthesis"
  },
  {
    question: "Commonly used data types DO not include:",
    choices: ["stringgs", "booleans", "alerts", "numbers"],
    correctAnswer: "boolgeans"
  }

];

var currentQuestionIndex = 0;
var timeleft = 60; 
var Timer;

function startQuiz() {
  
  document.getElementById("countdown").innerHTML = "Time: " + timeleft;

  
  if (!Timer) {
    Timer = setInterval(function () {
      if (timeleft <= 0) {
        clearInterval(Timer);
        document.getElementById("countdown").innerHTML = "All Done";
        endQuiz();
      } else {
        timeleft -= 1;
        document.getElementById("countdown").innerHTML = "Time: " + timeleft;
      }
    }, 1000);
  }

  displayQuestion();
}

var message = document.createElement("p");
message.id = "feedback-message";
message.style.fontSize = "25px";
message.style.textAlign = "left";

function displayQuestion() {
  var container = document.querySelector("#quiz");
  container.innerHTML = ""; 

  var line = document.createElement("hr");

  var h1 = document.createElement("h1");
  h1.innerHTML = questions[currentQuestionIndex].question;
  h1.style.textAlign = "left";

  container.appendChild(h1);

  var choices = questions[currentQuestionIndex].choices;
  for (var i = 0; i < choices.length; i++) {
    var btn = createButton(choices[i]);
    container.appendChild(btn);

    if (i === 0) {
      
      btn.style.marginTop = "20px";
    }

    btn.addEventListener("click", function () {
      checkAnswer(this.textContent);
    });
  }

  container.appendChild(line);
  container.appendChild(message);
}

function createButton(textContent) {
  var button = document.createElement("button");
  button.textContent = textContent;
  button.style.display = "block"; // Ensure buttons are block-level elements
  button.style.marginBottom = "20px";
  button.style.fontSize = "20px";
  button.style.width = "50%";
  button.style.padding = "10px";
  return button;
}

function checkAnswer(selected) {
  var message = document.getElementById("feedback-message");

  if (selected === questions[currentQuestionIndex].correctAnswer) {
    message.textContent = "Correct!";
  } else {
    timeleft -= 10; 
    message.textContent = "Wrong!";
  }

  // Proceed to the next question after a delay
  setTimeout(function () {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      // Display the next question
      displayQuestion();
    } else {
      // Quiz has ended, you can add any final actions here
      clearInterval(Timer);
      document.getElementById("countdown").innerHTML = "All Done";
      endQuiz();
    }
  }, 0); // Adjust the delay as needed
}

function endQuiz() {
  // Clear the quiz container
  var container = document.querySelector("#quiz");
  container.innerHTML = "";

  // Display the "All Done" heading with the final score
  var allDoneHeading = document.createElement("h1");
  allDoneHeading.innerHTML = "All Done!";
  allDoneHeading.style.textAlign = "left";
  container.appendChild(allDoneHeading);

  var finalScore = document.createElement("p");
  finalScore.innerHTML = "Your final score is: " + timeleft;
  finalScore.style.textAlign = "left";
  container.appendChild(finalScore);

  var initialsForm = document.createElement("form");
  var initialsInput = document.createElement("input");
  var btn = document.createElement("button");

  initialsInput.type = "text";
  initialsInput.placeholder = "Enter Initials";

  btn.textContent = "Submit";
  btn.addEventListener("click", function () {
    // Handle the submission of initials and score
    saveHighscore(initialsInput.value, timeleft);
    alert("Initials submitted: " + initialsInput.value);
    // Redirect to highscores.html
    window.location.href = "highscores.html";
  });

  initialsForm.appendChild(initialsInput);
  initialsForm.appendChild(btn);

  container.appendChild(initialsForm);
}

function saveHighscore(initials, score) {
  // Retrieve existing highscores from storage
  var highscores = getHighscoresFromStorage();

  // Add the new highscore
  highscores.push({ initials: initials, score: score });

  // Save the updated highscores back to storage
  localStorage.setItem("highscores", JSON.stringify(highscores));
}

function getHighscoresFromStorage() {
  // Retrieve highscores from local storage or any other storage mechanism
  var highscoresString = localStorage.getItem("highscores");
  var highscores = highscoresString ? JSON.parse(highscoresString) : [];
  return highscores;
}
