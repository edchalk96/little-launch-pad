// Code to wait for the DOM to finish loading before the quiz game is run

document.addEventListener("DOMContentLoaded", function() {

    //Code to toggle audio on and off with visual representation | Credit W3 Schools, https://www.w3schools.com/jsref/prop_win_localstorage.asp
    const audioButton = document.getElementById("audioButton");
    const icon = document.querySelector(".fa-volume-high");
    let savedAudio = localStorage.getItem("audioEnabled");
    let audio = (savedAudio === null) ? true : (savedAudio === "true");
    updateIcon(audio);
    
    audioButton.addEventListener("click", function () {
        audio = !audio;
        localStorage.setItem("audioEnabled", audio);
        updateIcon(audio);            
    });

    function updateIcon(state) {
        if (state) {
            icon.classList.replace("fa-volume-xmark", "fa-volume-high");
        } else {
            icon.classList.replace("fa-volume-high", "fa-volume-xmark");
        }
    }

    console.log("Script loaded on this page!");

    //Section to run the quiz

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

let answer;

//Section for colours quiz

const colourOptions = ["Red", "Yellow", "Blue", "Green", "Orange", "Purple", "Pink", "Brown", "Black", "White"];


function runColours() {

    //Random numbers to select a colour from the array
    let num1 = Math.floor(Math.random() * 10);
    let num2 = Math.floor(Math.random() * 10);
    let num3 = Math.floor(Math.random() * 10);
    let num4 = Math.floor(Math.random() * 10);

    //Random number between 1 and 4 for placement
    let num5 = Math.ceil(Math.random() * 4);

    //Selecting answer
    answer = colourOptions[num1];

    generateQuestion();

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

}

function incorrectAnswer () {

}

function answerNudge() {

}

//Code to gemerate text-to-speech using Web Speech API | Credit to MDN - https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis

function speak() {

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
        console.log(selectedVoice.name)
    } else {
        console.warn("Target voice not found");
    }

    synth.speak(utterance);

    };

    if (synth.getVoices().length === 0) {
        synth.onvoiceschanged = setVoice;
    } else {
        setVoice();
    }
}