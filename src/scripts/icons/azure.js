import {createicon} from "/src/scripts/icon.js";

const icon = createicon({src:"azure.png",title:"azure.comet"});

async function createaudio() {



    const audioElement = new Audio("/media/sfx/vineboom.ogg");
    audioElement.volume = 0.6;


    const imageElement = document.createElement('img');
    imageElement.src = "/media/icons/azure.png";
    imageElement.style.position = "absolute";
    imageElement.style.left = 0;
    imageElement.style.top = 0;
    imageElement.style.zIndex = 150;
    imageElement.style.width = "100vw";
    imageElement.style.height = "100vh";

    document.body.appendChild(imageElement);


    audioElement.play();

audioElement.addEventListener('ended', (event) => {
audioElement.remove();
imageElement.remove();
window.open("https://azurecomettttt.carrd.co/", '_blank');
});
};

icon.addEventListener("click", function(event) {
event.preventDefault();

createaudio();

});

