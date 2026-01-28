// Code to wait for the DOM to finish loading before the quiz game is run

document.addEventListener("DOMContentLoaded", function() {

    runQuiz();

    //Section for repeating question
    const repeatButton = document.getElementById("repeat-button");

    repeatButton.addEventListener("click", function() {
        speak();
    });
});

//Check for which quiz to run
function runQuiz() {

    //Credit to Thomas Amindsen, stackoverflow + W3 schools | https://stackoverflow.com/questions/50692992/how-to-run-a-javascript-function-only-on-a-certain-page-or-pages + https://www.w3schools.com/js/js_window_location.asp
   if (window.location.pathname == "/little-launch-pad/colours-quiz.html") {
        runColours();
    } else if (window.location.pathname == "/little-launch-pad/numbers-quiz.html") {
        runNumbers();
    } else if (window.location.pathname == "/little-launch-pad/shapes-quiz.html") {
        runShapes();
    } else if (window.location.pathname == "/little-launch-pad/feelings-quiz.html") {
        runFeelings();
    } else {
        console.log("No quiz found");
    }
}

//Code to toggle audio on and off with visual representation | Credit W3 Schools, https://www.w3schools.com/jsref/prop_win_localstorage.asp
const audioButton = document.getElementById("audioButton");
const icon = document.querySelector(".fa-volume-high");
let savedAudio = localStorage.getItem("audioEnabled");
let audio = (savedAudio === null) ? true : (savedAudio === "true");
updateIcon(audio);
let isAudioEnabled = localStorage.getItem("audioEnabled");

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
let correctAnswerSelection;
let userAnswer;
let userAnswerSelection;
let incorrect = 0;

//Array for the 4 possible options; | Credit to MDN - https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
const options = document.querySelectorAll(".answer-selection");

//Audio feedback | Credit to Linial in stackoverflow - https://stackoverflow.com/questions/25095173/playing-a-audio-file-in-an-onclick-event
let audioElement = document.createElement("audio");

//Section for colours quiz

function runColours() {

    let num1 = Math.floor(Math.random() * 9);
    let answerPosition = Math.floor(Math.random() * options.length);
    let colourOptions = ["red", "yellow", "blue", "green", "orange", "purple", "pink", "black", "white"];

    //Randomly selecting correct answer
    
    answer = colourOptions[num1];

    //Assigning answer and random colours to each option - Credit to MDN for information on splicng an array | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced

    if (num1 > -1) {
        colourOptions = colourOptions.toSpliced(num1, 1);
    }

    for (let i = 0; i < options.length; i++) {
        if (i === answerPosition) {
            options[i].style.backgroundColor = answer;
            options[i].setAttribute("data-answer", answer);
            correctAnswerSelection = options[i];
        } else {
            const randomColour = Math.floor(Math.random() * colourOptions.length);
            options[i].style.backgroundColor = colourOptions[randomColour];
            options[i].setAttribute("data-answer", colourOptions[randomColour]);

            colourOptions = colourOptions.toSpliced(randomColour, 1);
        }
    }

    const quizType = "colour is";

    generateQuestion(quizType);
}

function runNumbers() {

    let num1 = Math.floor(Math.random() * 9);
    let answerPosition = Math.floor(Math.random() * options.length);    
    let numberOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

    //Randomly selecting correct answer
    
    answer = numberOptions[num1];

    //Assigning answer and random numbers to each option

    if (num1 > -1) {
        numberOptions = numberOptions.toSpliced(num1, 1);
    }

    for (let i = 0; i < options.length; i++) {
        if (i === answerPosition) {
            options[i].firstElementChild.removeAttribute("class");
            options[i].firstElementChild.classList.add("fa-solid", `fa-${answer}`);
            correctAnswerSelection = options[i];
            options[i].setAttribute("data-answer", answer);
        } else {
            const randomNumber = Math.floor(Math.random() * numberOptions.length);
            let randomNumberText = numberOptions[randomNumber];
            options[i].firstElementChild.removeAttribute("class");
            options[i].firstElementChild.classList.add("fa-solid", `fa-${randomNumberText}`);
            options[i].setAttribute("data-answer", numberOptions[randomNumber]);

            numberOptions = numberOptions.toSpliced(randomNumber, 1);
        }
    }

    const quizType = "number is";

    generateQuestion(quizType);
}

function runShapes() {
    
    let num1 = Math.floor(Math.random() * 9);
    let answerPosition = Math.floor(Math.random() * options.length);    
    let shapeOptions = ["circle", "square", "triangle", "star", "diamond", "hexagon", "pentagon", "heart", "egg"];

    //Randomly selecting correct answer
    
    answer = shapeOptions[num1];

    //Assigning answer and random numbers to each option

    if (num1 > -1) {
        shapeOptions = shapeOptions.toSpliced(num1, 1);
    }

    for (let i = 0; i < options.length; i++) {
        if (i === answerPosition) {
            options[i].firstElementChild.removeAttribute("class");
            options[i].firstElementChild.classList.add("bi", `bi-${answer}`);
            correctAnswerSelection = options[i];
            options[i].setAttribute("data-answer", answer);
        } else {
            const randomShape = Math.floor(Math.random() * shapeOptions.length);
            let randomShapeText = shapeOptions[randomShape];
            options[i].firstElementChild.removeAttribute("class");
            options[i].firstElementChild.classList.add("bi", `bi-${randomShapeText}`);
            options[i].setAttribute("data-answer", shapeOptions[randomShape]);

            shapeOptions = shapeOptions.toSpliced(randomShape, 1);
        }
    }

    const quizType = "shape is";

    generateQuestion(quizType);
}

function runFeelings() {
    
    let num1 = Math.floor(Math.random() * 5);
    let answerPosition = Math.floor(Math.random() * options.length);    
    let feelingOptions = ["angry", "calm", "happy", "love", "sad","scared"];

    //Randomly selecting correct answer
    
    answer = feelingOptions[num1];

    //Assigning answer and random numbers to each option

    if (num1 > -1) {
        feelingOptions = feelingOptions.toSpliced(num1, 1);
    }

    //Credit to GeeksForGeeks for image creation - https://www.geeksforgeeks.org/javascript/how-to-create-an-image-element-dynamically-using-javascript/
    for (let i = 0; i < options.length; i++) {
        if (i === answerPosition) {
            options[i].innerHTML = "";
            let feelingImg = document.createElement("img");
            feelingImg.src = `./assets/images/${answer}-feeling.png`;
            feelingImg.alt = `${answer}-emoji`;
            options[i].appendChild(feelingImg);
            correctAnswerSelection = options[i];
            options[i].setAttribute("data-answer", answer);
        } else {
            options[i].innerHTML = "";
            const randomFeeling = Math.floor(Math.random() * feelingOptions.length);
            let randomFeelingText = feelingOptions[randomFeeling];
            let feelingImg = document.createElement("img");
            feelingImg.src = `./assets/images/${randomFeelingText}-feeling.png`;
            feelingImg.alt = `${randomFeeling}-emoji`;
            options[i].appendChild(feelingImg);
            options[i].setAttribute("data-answer", feelingOptions[randomFeeling]);

            feelingOptions = feelingOptions.toSpliced(randomFeeling, 1);
        }
    }

    //"face is feeling" is being used here in place of "feeling" for it to read better to the user
    const quizType = "face is feeling";

    generateQuestion(quizType);
}

//Checking users answer on click of an option
let animationRunning = false;

$(".answer-selection").click(function(event){
    if (animationRunning) return; //If the animation is running, this will prevent another click event triggering another animation before the quiz has reloaded

    userAnswer = $(this).attr("data-answer");
    userAnswerSelection = $(this);
    checkAnswer(event);
});

function checkAnswer(event) {
    if (userAnswer === answer) {
        animationRunning = true;
        correctAnswer(event);
    } else {
        incorrectAnswer();
    }
}

function generateQuestion(quizType) {
    document.getElementById("question-heading").innerHTML = `Which ${quizType} ${answer}?`;
    speak();
}

function correctAnswer(event) {

    showCoords(event);

    if (isAudioEnabled === "true") {
        audioElement.setAttribute("src", "./assets/sounds/rocket-whoosh.mp3");
        audioElement.play();
    }
    
    incorrect = 0;

    //Credit to MDN - https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout 
    setTimeout(() => {
        runQuiz();
        animationRunning = false;
    }, 2500);
}

//Credit to jackhals (reddit) and MDN- https://jsfiddle.net/320ch6um/ + https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style
function showCoords(event) {

    //Creating the img element and assigning it the rocket image
    let rocketImage = document.createElement("img");
    rocketImage.src = "./assets/images/positive-feedback-rocket.png";

    //Adding CSS styling to the new element including the position relative to the click event
    rocketImage.style.position = "fixed";
    rocketImage.style.left = (event.clientX - 50) + "px";
    rocketImage.style.top = (event.clientY - 50) + "px";
    rocketImage.style.width = "200px";
    rocketImage.style.zIndex = "1000";

    //Adds the created css class and appends the created img element to the selected answer
    rocketImage.classList.add("rocket-animation");
    document.body.appendChild(rocketImage);

    //Removes the rocket after animation has finished
    setTimeout(() => {
        rocketImage.remove();
    }, 2500);
}

function incorrectAnswer () {

    incorrect++;

    userAnswerSelection.removeClass("incorrect-animation");

    userAnswerSelection.addClass("incorrect-animation");
    
    userAnswerSelection.one("animationend", function() {
        userAnswerSelection.removeClass("incorrect-animation");
    });

    if (incorrect >= 3) {
        answerNudge();
    }

    if (isAudioEnabled === "true" && incorrect < 3) {
        audioElement.setAttribute("src", "./assets/sounds/cowbell-sharp-hit.mp3");
        audioElement.play();
    }
}

function answerNudge() {
    
    correctAnswerSelection.classList.remove("answer-nudge");

    correctAnswerSelection.classList.add("answer-nudge");
    setTimeout(() => {
        correctAnswerSelection.classList.remove("answer-nudge");
    }, 2000);

    if (isAudioEnabled === "true") {
        audioElement.setAttribute("src", "./assets/sounds/cartoon-close-bells.mp3");
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
