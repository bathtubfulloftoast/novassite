async function createaudio() {

const audioElement = document.createElement('video');
audioElement.src = "/media/petitititititition.mp4";
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
window.open('/guestbook', '_top');
audioElement.remove();
});

};

document.getElementById("guestbook").addEventListener("click", function(event) {
event.preventDefault();
createaudio();

});

