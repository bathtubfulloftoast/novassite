async function createaudio() {



    const audioElement = new Audio("/media/sfx/lobotomy.ogg");
    audioElement.volume = 0.08;


    const container = document.createElement('div');
    container.style.position = "absolute";
    container.style.left = 0;
    container.style.top = 0;
    container.style.zIndex = 150;
    container.style.width = "100vw";
    container.style.height = "100vw";
    container.style.background = "white";
    container.style.cursor = "none";


    document.body.appendChild(container);



    audioElement.play();

audioElement.addEventListener('ended', (event) => {
audioElement.remove();
container.remove();

});
};

document.getElementById("gettingyou").addEventListener("click", function(event) {
event.preventDefault();
createaudio();
});

