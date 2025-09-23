async function createaudio() {

    const audioElement = new Audio("/media/sfx/splat.ogg");
    audioElement.volume = 0.2;

    audioElement.play();


};

document.getElementById("lancer").addEventListener("click", function(event) {
event.preventDefault();
createaudio();

});

