"use strict";
var buttonGreen = document.querySelector('#green');
var buttonRed = document.querySelector('#red');
var buttonYellow = document.querySelector('#yellow');
var buttonBlue = document.querySelector('#blue');
var titleLevel = document.querySelector('h1');
var buttonColours = ['red', 'blue', 'green', 'yellow'];
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var started = false;
// random Color
var nextSequence = function () {
    level++;
    userClickedPattern = [];
    titleLevel.innerText = "Level " + level;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    var buttonSelected = document.getElementById(randomChosenColour);
    buttonSelected.classList.add('blink_me');
    setTimeout(function () {
        buttonSelected.classList.remove('blink_me');
    }, 300);
    playSound(randomChosenColour);
    window.removeEventListener('keypress', nextSequence);
};
var handleClick = function (e) {
    var userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
};
var playSound = function (name) {
    var audio = new Audio("/sounds/" + name + ".mp3");
    audio.play();
};
var animatePress = function (currentColour) {
    var buttonSelected = document.getElementById(currentColour);
    buttonSelected.classList.add('pressed');
    setTimeout(function () {
        buttonSelected.classList.remove('pressed');
    }, 100);
};
var checkAnswer = function (currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
    }
    else {
        playSound('wrong');
        document.body.classList.add('game-over');
        setTimeout(function () {
            document.body.classList.remove('game-over');
        }, 200);
        titleLevel.innerText = 'Game Over, Press Any Key to Restart';
        startOver();
    }
};
buttonGreen.addEventListener('click', handleClick);
buttonRed.addEventListener('click', handleClick);
buttonYellow.addEventListener('click', handleClick);
buttonBlue.addEventListener('click', handleClick);
window.addEventListener('keypress', function () {
    if (!started) {
        nextSequence();
    }
    started = true;
});
var startOver = function () {
    level = 0;
    gamePattern = [];
    started = false;
};
