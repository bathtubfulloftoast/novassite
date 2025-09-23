async function createaudio() {



    const audioElement = new Audio("/media/sfx/MEGALOVANIA.ogg");
    audioElement.volume = 1;


    const imageElement = document.createElement('img');
    imageElement.src = "/media/BLUE.PNG";
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
window.open("https://youtu.be/P_nvW4TeF3M", '_blank');
audioElement.remove();
imageElement.remove();
});
};

document.getElementById("remember").addEventListener("click", function(event) {
event.preventDefault();
createaudio();
});

