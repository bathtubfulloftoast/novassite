async function createaudio() {

const audioElement = document.createElement('video');
audioElement.src = "/media/hp scareical.mp4";
audioElement.volume = 0.5;
audioElement.style.position = "absolute";
audioElement.style.left = 0;
audioElement.style.top = 0;
audioElement.style.zIndex = 150;
audioElement.style.width = "100vw";
audioElement.style.height = "100vh";
audioElement.style.background = "#000";

document.body.appendChild(audioElement);

audioElement.play();


audioElement.addEventListener('ended', (event) => {
audioElement.remove();
});

};

document.getElementById("hitpoint").addEventListener("click", function(event) {
event.preventDefault();
createaudio();

});

