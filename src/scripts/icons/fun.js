const audioUrl = "/media/sfx/fun.ogg";



async function createaudio() {



    const audioElement = document.createElement('audio');
    audioElement.src = audioUrl;
    audioElement.volume = 0.2;
    audioElement.id = "pinkieaudio";


    document.body.appendChild(audioElement);


    audioElement.play();

audioElement.addEventListener('ended', (event) => {
window.open("https://youtu.be/b1Vjorjlon4", '_blank'); // i will be reusing this code again out of sheer laziness fuck you
audioElement.remove();

});

};

document.getElementById("pinkie").addEventListener("click", function(event) {
event.preventDefault();
if(!document.getElementById("pinkieaudio")) {
createaudio();
}
});

