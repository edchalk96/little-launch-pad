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

    //Section to run the quiz game
});

