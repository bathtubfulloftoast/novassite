const audioUrl = "/media/sfx/vineboom.ogg";



async function createaudio() {



    const audioElement = document.createElement('audio');
    audioElement.src = audioUrl;
    audioElement.volume = 0.6;


    const imageElement = document.createElement('img');
    imageElement.src = "/media/icons/azure.gif";
    imageElement.style.position = "absolute";
    imageElement.style.left = 0;
    imageElement.style.top = 0;
    imageElement.style.zIndex = 150;
    imageElement.style.width = "100vw";
    imageElement.style.height = "100vh";


    document.body.appendChild(audioElement);
    document.body.appendChild(imageElement);


    audioElement.play();

audioElement.addEventListener('ended', (event) => {
audioElement.remove();
imageElement.remove();
window.open("https://azurecomettttt.carrd.co/", '_blank');
});
};

document.getElementById("azure").addEventListener("click", function(event) {
event.preventDefault();

createaudio();

});

