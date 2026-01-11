import {createicon} from "/src/scripts/icon.js";

const icon = createicon({src:"rotten.png",title:"WeAre#1"});


async function createaudio() {



const audioElement = document.createElement('video');
audioElement.src = "/media/rotten.webm";
audioElement.volume = 0.5;
audioElement.style.position = "absolute";
audioElement.style.left = 0;
audioElement.style.top = 0;
audioElement.style.zIndex = 150;
audioElement.style.width = "100vw";
audioElement.style.height = "100vh";
audioElement.style.objectFit = "cover";

document.body.appendChild(audioElement);

audioElement.play();


audioElement.addEventListener('ended', (event) => {
audioElement.remove();
});

};

icon.addEventListener("click", function(event) {
event.preventDefault();
createaudio();

});

