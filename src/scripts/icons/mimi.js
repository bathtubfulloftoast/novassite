async function createaudio() {



    const audioElement = new Audio("/media/sfx/mimi.ogg");
    audioElement.volume = 0.2;
    audioElement.id = "eepyaudio";


    document.body.appendChild(audioElement);


    audioElement.play();

audioElement.addEventListener('ended', (event) => {
audioElement.remove();
});

};

document.getElementById("eepster").addEventListener("click", function(event) {
event.preventDefault();
if(!document.getElementById("eepyaudio")) {
createaudio();
}
});

