async function createaudio() {

    const audioElement = new Audio("/media/sfx/speen.ogg");
    audioElement.volume = 0.2;
    audioElement.id = "speenaudio";


    document.body.appendChild(audioElement);


    audioElement.play();

audioElement.addEventListener('ended', (event) => {
window.open("/misc/novaview", '_blank'); // SPINN1!!!1\
// also fuck you no spamming
audioElement.remove();
});

};

document.getElementById("speen").addEventListener("click", function(event) {
event.preventDefault();
if(!document.getElementById("speenaudio")) {
createaudio();
}
});

