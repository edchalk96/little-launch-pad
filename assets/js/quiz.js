// Code to wait for the DOM to finish loading before the quiz game is run

document.addEventListener("DOMContentLoaded", function() {

    //Section for repeating question
    const repeatButton = document.getElementById("repeat-button");

    repeatButton.addEventListener("click", function() {
        speak()
    })

    //Section to run the quiz

    runQuiz();
});

//Check for which quiz to run
function runQuiz() {

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

//Code to toggle audio on and off with visual representation | Credit W3 Schools, https://www.w3schools.com/jsref/prop_win_localstorage.asp
const audioButton = document.getElementById("audioButton");
const icon = document.querySelector(".fa-volume-high");
let savedAudio = localStorage.getItem("audioEnabled");
let audio = (savedAudio === null) ? true : (savedAudio === "true");
updateIcon(audio);
let isAudioEnabled = localStorage.getItem("audioEnabled");;

audioButton.addEventListener("click", function () {
    audio = !audio;
    localStorage.setItem("audioEnabled", audio);
    updateIcon(audio);  
    if (!audio) {
        window.speechSynthesis.cancel();
    }    
    isAudioEnabled = localStorage.getItem("audioEnabled");
});

function updateIcon(state) {
    if (state) {
        icon.classList.replace("fa-volume-xmark", "fa-volume-high");
    } else {
        icon.classList.replace("fa-volume-high", "fa-volume-xmark");
    }
}

//Global scope variables
let answer;

    //Array for the 4 possible options; | Credit to MDN - https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
const options = document.querySelectorAll(".answer-selection");

let userAnswer;
let incorrect = 0;
    //Audio feedback | Credit to Linial in stackoverflow - https://stackoverflow.com/questions/25095173/playing-a-audio-file-in-an-onclick-event
let audioElement = document.createElement("audio")

//Section for colours quiz

function runColours() {

    console.log()

    const answerPosition = Math.floor(Math.random() * options.length);

    let colourOptions = ["Red", "Yellow", "Blue", "Green", "Orange", "Purple", "Pink", "Black", "White"];

    //Randomly selecting correct answer
    let num1 = Math.floor(Math.random() * 9);
    answer = colourOptions[num1];

    //Assigning answer and random colours to each option - Credit to MDN for information on splicng an array | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced

    if (num1 > -1) {
        colourOptions = colourOptions.toSpliced(num1, 1);
    }

    for (let i = 0; i < options.length; i++) {
        if (i === answerPosition) {
            options[i].style.backgroundColor = answer;
            options[i].setAttribute("data-answer", answer);
        } else {
            const randomColour = Math.floor(Math.random() * colourOptions.length);
            options[i].style.backgroundColor = colourOptions[randomColour];
            options[i].setAttribute("data-answer", colourOptions[randomColour]);

            colourOptions = colourOptions.toSpliced(randomColour, 1);
        }
    }

    generateQuestion();
}

//Checking users answer on click of an option
$(".answer-selection").click(function(){
        userAnswer = $(this).attr("data-answer")
        checkAnswer()
})

function checkAnswer() {
    if (userAnswer === answer) {
        correctAnswer();
    } else {
        incorrectAnswer();
    }
}

function generateQuestion() {
    document.getElementById("question-heading").innerHTML = `Which colour is ${answer}?`;
    speak()
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

    if (isAudioEnabled === "true") {
        audioElement.setAttribute("src", "/assets/sounds/rocket-whoosh.mp3")
        audioElement.play();
    }    

    //Credit to W3 Schools - https://www.w3schools.com/js/js_timing.asp
    setTimeout(runQuiz, 3000);
}

function incorrectAnswer () {

    incorrect++;

    if (incorrect >= 3) {
        answerNudge();
    }

    if (isAudioEnabled === "true" && incorrect < 3) {
        audioElement.setAttribute("src", "/assets/sounds/cowbell-sharp-hit.mp3");
        audioElement.play();
    }
    
    // incorrectAnimation();
}

// setTimeout()

function answerNudge() {

    if (isAudioEnabled === "true") {
        audioElement.setAttribute("src", "/assets/sounds/cartoon-close-bells.mp3");
        audioElement.play();
    }  

}

//Code to gemerate text-to-speech using Web Speech API | Credit to MDN - https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis

function speak() {

    if (isAudioEnabled === "true") {
        const synth = window.speechSynthesis;
        const textToSpeak = document.getElementById("question-heading").innerText;

        const utterance = new SpeechSynthesisUtterance(textToSpeak);

        utterance.pitch = 1.3;
        utterance.rate = 0.8;

        const setVoice = () => {
            const voices = synth.getVoices();
            const selectedVoice = voices.find(voice =>
                voice.name === "Google UK English Female" ||
                voice.name.includes("en-GB") && voice.name.includes("Female")
        );

        if (selectedVoice) {
            utterance.voice = selectedVoice;
        } 

        synth.speak(utterance);

        };

        if (synth.getVoices().length === 0) {
            synth.onvoiceschanged = setVoice;
        } else {
            setVoice();
        }
    }
}
