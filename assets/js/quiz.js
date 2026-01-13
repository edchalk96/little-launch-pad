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
        if (!audio) {
            window.speechSynthesis.cancel();
        }    
    });

    function updateIcon(state) {
        if (state) {
            icon.classList.replace("fa-volume-xmark", "fa-volume-high");
        } else {
            icon.classList.replace("fa-volume-high", "fa-volume-xmark");
        }
    }

    //Section for repeating question
    const repeatButton = document.getElementById("repeat-button");

    repeatButton.addEventListener("click", function() {
        speak()
    })

    //Section to run the quiz

    runQuiz();
});

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

let answer;

//Section for colours quiz

function runColours() {

    //Array for the 4 possible options; | Credit to MDN - https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
    const options = document.querySelectorAll(".colours-answer-selection");
    const answerPosition = Math.floor(Math.random() * options.length);

    let colourOptions = ["Red", "Yellow", "Blue", "Green", "Orange", "Purple", "Pink", "Black", "White"];

    //Randomly selecting correct answer
    let num1 = Math.floor(Math.random() * 9);
    answer = colourOptions[num1];

    //Assigning answer and rnadom colours to each option - Credit to MDN for information on splicng an array | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced

    if (num1 > -1) {
        colourOptions = colourOptions.toSpliced(num1, 1);
    }

    for (let i = 0; i < options.length; i++) {
        if (i === answerPosition) {
            options[i].style.backgroundColor = answer;
        } else {
            const randomColour = Math.floor(Math.random() * colourOptions.length);
            options[i].style.backgroundColor = colourOptions[randomColour];

            colourOptions = colourOptions.toSpliced(randomColour, 1);
        }
    }

    generateQuestion();

    // if (userAnswer === answer) {

    // }

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

    const isAudioEnabled = localStorage.getItem("audioEnabled") !== "false";

    if (isAudioEnabled) {
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