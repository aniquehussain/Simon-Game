greeting();
function greeting(){
var greet = prompt("What is your name");
return alert("Welcome to the Simon Game " + greet);
}

var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

// On CLick

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);

});


// Keypress

$(document).keypress(function() {
  if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
})


// Functions
function playSound(name) {
  var audio = new Audio(name + ".mp3");
  audio.play();
}


function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = (Math.floor(Math.random() * 4));

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
  animatePress(randomChosenColor);
}


function animatePress(key) {
  var activeButton = $("." + key);
  activeButton.addClass("pressed");
  setTimeout(function() {
    activeButton.removeClass("pressed")
  }, 100);

}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");
    if (userClickedPattern.length === gamePattern.length) {
     setTimeout(function(){
       nextSequence();
     },1000);
    }
  }
  else {
  var wrong = new Audio("wrong.mp3");
  wrong.play();
  $("#level-title").text("Game Over ------ Score : " + ((level - 1) * 5));
   setTimeout(function(){
     location.reload();
   },3000);

  }
}
