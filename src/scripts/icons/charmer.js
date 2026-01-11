import {createicon} from "/src/scripts/icon.js";

const now = new Date();
const month = now.getMonth();
const frida = createicon({src:"winning smile.png",title:"charmer.love"});

async function createaudio() {



    const audioElement = new Audio("/media/sfx/love.ogg");
    audioElement.volume = 0.5;


    const imageElement = document.createElement('img');
    imageElement.src = "/media/icons/full/winning smile.png";
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
});
};


frida.addEventListener("click", function(event) {
event.preventDefault();

createaudio();

});
