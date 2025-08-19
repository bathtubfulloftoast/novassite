const audioUrl = "/media/sfx/splat.ogg";



async function createaudio() {



    const audioElement = document.createElement('audio');
    audioElement.src = audioUrl;
    audioElement.volume = 0.2;


    document.body.appendChild(audioElement);


    audioElement.play();

audioElement.addEventListener('ended', (event) => {
audioElement.remove();
});

};

document.getElementById("lancer").addEventListener("click", function(event) {
createaudio();

});

