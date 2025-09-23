 function createaudio() {



    const audioElement = new Audio("/media/sfx/fun.ogg");
    audioElement.volume = 0.2;
    audioElement.id = "pinkieaudio";


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

