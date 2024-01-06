document.querySelector("#start").addEventListener("click", startQuiz);

// questions array
var questions = [
  {
    question: "Commonly used data types DO not include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    correctAnswer: "booleans"
  },
  {
    question: "The condition in an if / else statement is enclosed with ______.",
    choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    correctAnswer: "parenthesis"
  },
  {
    question: "Arrays in JasaScript can be used to store _________",
    choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    correctAnswer: "all of the above"
  },
  {
    question: "String values must be enclosed within ________ when being assigned to variables",
    choices: ["commas", "curly brackets", "quotes", "parenthesis"],
    correctAnswer: "curly brackets"
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    correctAnswer: "for loops"
  }

];

var currentQuestionIndex = 0;
var timeleft = 60; 
var Timer;

// timer will start
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

// message will be created
var message = document.createElement("p");
message.id = "feedback-message";
message.style.fontSize = "25px";
message.style.textAlign = "left";

// displays question by by sorting through questions array
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

// style and display/create buttons
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

// displays message if answer is wrong or right
function checkAnswer(selected) {
  var message = document.getElementById("feedback-message");

  if (selected === questions[currentQuestionIndex].correctAnswer) {
    message.textContent = "Correct!";
  } else {
    timeleft -= 10; 
    message.textContent = "Wrong!";
  }

  // Proceed to the next question after answer
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
  }, 0); // Adjust delay if wanted
}

function endQuiz() {
  // Clear the quiz
  var container = document.querySelector("#quiz");
  container.innerHTML = "";

  // Display all done 
  var allDoneHeading = document.createElement("h1");
  allDoneHeading.innerHTML = "All Done!";
  allDoneHeading.style.textAlign = "left";
  container.appendChild(allDoneHeading);

 // display final score
  var finalScore = document.createElement("p");
  finalScore.innerHTML = "Your final score is: " + timeleft;
  finalScore.style.textAlign = "left";
  container.appendChild(finalScore);

  // input form is created
  var initialsForm = document.createElement("form");
  var initialsInput = document.createElement("input");
  var btn = document.createElement("button");

  initialsInput.type = "text";
  initialsInput.placeholder = "Enter Initials";

  btn.textContent = "Submit";

  // listens for click
  btn.addEventListener("click", function () {
    // saves score
    saveHighscore(initialsInput.value, timeleft);
    alert("Initials submitted: " + initialsInput.value);
    // go to the highscores page
    window.location.href = "highscores.html";
  });

  initialsForm.appendChild(initialsInput);
  initialsForm.appendChild(btn);

  container.appendChild(initialsForm);
}

function saveHighscore(initials, score) {
  // Retrieve scores from storage
  var highscores = getHighscoresFromStorage();

  // Adds the new highscore
  highscores.push({ initials: initials, score: score });

  // Save the updated highscores back to storage
  localStorage.setItem("highscores", JSON.stringify(highscores));
}

function getHighscoresFromStorage() {
  // Retrieve scores from local storage
  var highscoresString = localStorage.getItem("highscores");
  var highscores = highscoresString ? JSON.parse(highscoresString) : [];
  return highscores;
}


