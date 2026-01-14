import {createicon} from "/src/scripts/icon.js";
import {bgm,getCookie} from "/src/scripts/startup.js";

const icon = createicon({src:"aproval.webp",title:"creek.flow"});

async function createaudio() {



    const audioElement = new Audio("/media/sfx/creeky.ogg");
    audioElement.volume = 0.5;


    const imageElement = document.createElement('img');
    imageElement.src = "/media/aliceflow.png";
    imageElement.style.position = "absolute";
    imageElement.style.left = 0;
    imageElement.style.top = 0;
    imageElement.style.zIndex = 150;
    imageElement.style.width = "100vw";
    imageElement.style.height = "100vh";


    document.body.appendChild(audioElement);
    document.body.appendChild(imageElement);

    bgm.pause();
    audioElement.play();

audioElement.addEventListener('ended', (event) => {
audioElement.remove();
imageElement.remove();
if(getCookie("bgmute") !== "true") {
bgm.play();
}
});
};

icon.addEventListener("click", function(event) {
event.preventDefault();

createaudio();

});

