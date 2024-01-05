


function displayHighScores() {
 var highScoresContainer = document.querySelector("#highscores");

 // Retrieve high scores from storage
 var highscores = getHighscoresFromStorage();


 highScoresContainer.innerHTML = "";


 highscores.forEach(function (entry, index) {
   var entryLi = document.createElement("div");
   entryLi.classList.add("highscore-entry");

   var scoreNumberSpan = document.createElement("span");
   scoreNumberSpan.classList.add("score-number");
   scoreNumberSpan.textContent = (index + 1) + ".";

   var dashSpan = document.createElement("span");
   dashSpan.classList.add("score-dash");
   dashSpan.textContent = " - ";

   var initialsSpan = document.createElement("span");
   initialsSpan.classList.add("score-initials");
   initialsSpan.textContent = entry.initials;

   var valueSpan = document.createElement("span");
   valueSpan.classList.add("score-value");
   valueSpan.textContent = entry.score;

   entryLi.appendChild(scoreNumberSpan);
   entryLi.appendChild(dashSpan);
   entryLi.appendChild(initialsSpan);
   entryLi.appendChild(dashSpan);
   entryLi.appendChild(valueSpan);

   highScoresContainer.appendChild(entryLi);
 });
}


function saveHighscore(initials, score) {
 
 var highscores = getHighscoresFromStorage();

 
 highscores.push({ initials: initials, score: score });

 
 highscores.sort(function (a, b) {
   return b.score - a.score;
 });

 
 localStorage.setItem("highscores", JSON.stringify(highscores));
}


function getHighscoresFromStorage() {
 
 var highscoresString = localStorage.getItem("highscores");
 var highscores = highscoresString ? JSON.parse(highscoresString) : [];
 return highscores;
}


var clearHighscoresButton = document.getElementById("clear-highscores");
clearHighscoresButton.addEventListener("click", function () {
 
 var confirmClear = confirm("Are you sure you want to clear highscores?");
 if (confirmClear) {
  
   localStorage.removeItem("highscores");
   
   location.reload();
 }
});


window.onload = displayHighScores;
