const dir = "/media/sfx/julez/";

async function createaudio() {
    const max = 13;
    const rand = Math.round(Math.random()*max);

    const audioElement = new Audio(dir+rand+".ogg");
    audioElement.volume = 0.9;
    audioElement.id = "julesaudio";


document.body.appendChild(audioElement);


audioElement.play();

audioElement.addEventListener('ended', (event) => {
window.open("https://julessite.net", '_top');
audioElement.remove();
});
};

document.getElementById("julessite").addEventListener("click", function(event) {
event.preventDefault();
if(!document.getElementById("julesaudio")) {
createaudio();
};
});

