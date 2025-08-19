const audioUrl = "/media/sfx/buddy.ogg";



async function createaudio() {



    const audioElement = document.createElement('audio');
    audioElement.src = audioUrl;
    audioElement.volume = 0.3;


    const imageElement = document.createElement('img');
    imageElement.src = "/media/icons/full/delta.png";
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
imageElement.remove();
audioElement.remove();
});
};

document.getElementById("deltarune").addEventListener("click", function(event) {
event.preventDefault();
createaudio();
});

