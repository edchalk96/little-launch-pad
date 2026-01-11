// Code to wait for the DOM to finish loading before the quiz game is run

document.addEventListener("DOMContentLoaded", function() {

        //Code to toggle audio on and off with visual representation
    let audio = true;
    let audioButton = document.getElementById("audioButton");
    let icon = document.querySelector(".fa-volume-high");
    
    audioButton.addEventListener("click", function () {
        audio = !audio;
        if (audio === false) {
            icon.classList.replace("fa-volume-high", "fa-volume-xmark");
        } else {
            icon.classList.replace("fa-volume-xmark", "fa-volume-high");
        }
    });

    console.log("Script loaded on this page!");

    //Section to run the quiz game

    runQuiz();
});

function runQuiz() {
    
    console.log(window.location.pathname)

    //Credit to Thomas Amindsen, stackoverflow + W3 schools | https://stackoverflow.com/questions/50692992/how-to-run-a-javascript-function-only-on-a-certain-page-or-pages + https://www.w3schools.com/js/js_window_location.asp
    if (window.location.pathname == "/colours-quiz.html") {
        runColours();
    } else if (window.location.pathname == "/numbers-quiz.html") {
        runNumbers();
    } else if (window.location.pathname == "/shapes-quiz.html") {
        runShapes();
    } else if (window.location.pathname == "/feelings-quiz.html") {
        runFeelings();
    }
}

function repeatAudio () {
    
}

function runColours() {
    console.log("Colours running");
}

function runNumbers() {
    console.log("Numbers running");
}

function runShapes() {
    console.log("Shapes running");
}

function runFeelings() {
    console.log("Feelings running");
}

function correctAnswer () {

}

function incorrectAnswer () {

}

function answerNudge() {

}