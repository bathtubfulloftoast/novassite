import {createicon} from "/src/scripts/icon.js";

const icon = createicon({src:"delta.png",title:"datar.une"});

async function createaudio() {



    const audioElement = new Audio("/media/sfx/buddy.ogg");
    audioElement.volume = 0.3;


    const imageElement = document.createElement('img');
    imageElement.src = "/media/icons/full/delta.png";
    imageElement.style.position = "absolute";
    imageElement.style.left = 0;
    imageElement.style.top = 0;
    imageElement.style.zIndex = 150;
    imageElement.style.width = "100vw";
    imageElement.style.height = "100vh";

    document.body.appendChild(imageElement);


    audioElement.play();

audioElement.addEventListener('ended', (event) => {
imageElement.remove();
audioElement.remove();
});
};

icon.addEventListener("click", function(event) {
event.preventDefault();
createaudio();
});

