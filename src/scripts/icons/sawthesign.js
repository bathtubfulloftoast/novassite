async function createaudio() {

const audioElement = document.createElement('video');
audioElement.src = "/media/SD Card.mp4";
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
window.open('https://youtu.be/C8H-k1z9Z7A?si=Q3_v1Fz6QjhfknHK&t=62', '_blank');
audioElement.remove();
});

};

document.getElementById("thesign").addEventListener("click", function(event) {
event.preventDefault();
createaudio();

});

