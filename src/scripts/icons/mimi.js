import {createicon} from "/src/scripts/icon.js";

const icon = createicon({src:"eepster.png",title:"eepy.mimi"});

async function createaudio() {



    const audioElement = new Audio("/media/sfx/mimi.ogg");
    audioElement.volume = 0.2;
    audioElement.id = "eepyaudio";


    document.body.appendChild(audioElement);


    audioElement.play();

audioElement.addEventListener('ended', (event) => {
audioElement.remove();
});

};

icon.addEventListener("click", function(event) {
event.preventDefault();
if(!document.getElementById("eepyaudio")) {
createaudio();
}
});

