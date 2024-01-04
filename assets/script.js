document.querySelector("#start").addEventListener("click", startQuiz);

function startQuiz() {
  var timeleft = 60;
  var Timer = setInterval(function(){
    if (timeleft <= 0) {
      clearInterval(Timer);
      document.getElementById("countdown").innerHTML = "Out of Time";
      // Add any actions you want to perform when the time runs out
    } else {
      document.getElementById("countdown").innerHTML = "Time: " + timeleft;
    }
    timeleft -= 1;
  }, 1000);

  var h1 = document.querySelector("#quiz h1");
  h1.innerHTML = "Commonly used data types DO not include:";
  h1.style.textAlign = "left";

  var par = document.querySelector("#quiz p");
  par.remove();

  var btn = document.querySelector("#start");
  btn.innerHTML = "strings";
  btn.style.margin = "20px 0 20px 0"; // Set margin-top and margin-bottom to 20px, and margin-left and margin-right to 0
  btn.style.fontSize = "20px";
  btn.style.width = "150px";
  btn.style.textAlign = "left";
  btn.style.padding = "10px";

  var container = document.querySelector("#quiz");

  // Create a new button element
  var btn2 = document.createElement("button");
  btn2.textContent = "booleans";
  btn2.id = "btn2";
  btn2.style.marginBottom = "20px"; // Set margin-bottom for spacing
  btn2.style.fontSize = "20px";
  btn2.style.width = "150px";
  btn2.style.textAlign = "left";
  btn2.style.padding = "10px";

  // Append the new button to the quiz section
  container.appendChild(btn2);

  // Create a new button element
  var btn3 = document.createElement("button");
  btn3.textContent = "New Button 2";
  btn3.id = "btn3";
  btn3.style.marginBottom = "20px"; // Set margin-bottom for spacing
  btn3.style.fontSize = "20px";
  btn3.style.width = "150px";
  btn3.style.textAlign = "left";
  btn3.style.padding = "10px";

  // Append the new button to the quiz section
  container.appendChild(btn3);

  var btn4 = document.createElement("button");
  btn4.textContent = "New Button 2";
  btn4.id = "btn4";
  btn4.style.marginBottom = "20px"; // Set margin-bottom for spacing
  btn4.style.fontSize = "20px";
  btn4.style.width = "150px";
  btn4.style.textAlign = "left";
  btn4.style.padding = "10px";

  // Append the new button to the quiz section
  container.appendChild(btn4);

  btn.style.display = "block";
  btn2.style.display = "block";
  btn3.style.display = "block";
  btn4.style.display = "block";

  container.style.textAlign = "left";

var feedback = document.createElement("p")
container.appendChild(feedback);

btn.addEventListener("click", function () {
  checkAnswer("strings");
});

btn2.addEventListener("click", function () {
  checkAnswer("booleans");
});

function checkAnswer(selected) {
  if (selected === "strings") {
    console.log("correct!")

  } else if (selected === "booleans") {
    timeleft -= 10;
    console.log("wrong!")
  } 
    

}

}
