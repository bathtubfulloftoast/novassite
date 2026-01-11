import {createicon} from "/src/scripts/icon.js";

const now = new Date();
const month = now.getMonth();
const logan = createicon({src:"sml.png",title:"SML.wiki"});

async function createaudio() {



const audioElement = document.createElement('video');
audioElement.src = "/media/brooklyn.mp4";
audioElement.volume = 0.5;
audioElement.style.position = "absolute";
audioElement.style.left = 0;
audioElement.style.top = 0;
audioElement.style.zIndex = 150;
audioElement.style.width = "100vw";
audioElement.style.height = "100vh";
audioElement.style.background = "#000";

document.body.appendChild(audioElement);

audioElement.play();


audioElement.addEventListener('ended', (event) => {
window.open('https://smlwiki.com', '_blank');
audioElement.remove();
});

};
if(month !== 9) {
logan.remove();
} else {
logan.addEventListener("click", function(event) {
event.preventDefault();
createaudio();

});
}
