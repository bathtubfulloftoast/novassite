import {createicon} from "/src/scripts/icon.js";

const icon = createicon({src:"protogent.png",title:"anti.virus"});

async function createaudio() {

const audioElement = await new Audio("/media/sfx/blips.ogg");
audioElement.volume = 0.3;

const response = await fetch('/404/404/');
const data = await response.text();

audioElement.addEventListener('ended', (event) => {
window.open("https://www.youtube.com/watch?v=jyZun_uFzac&t=7s", '_blank');
location.reload();
});

await document.write(data);
await audioElement.play();



};

icon.addEventListener("click", function(event) {
event.preventDefault();
createaudio();
});

