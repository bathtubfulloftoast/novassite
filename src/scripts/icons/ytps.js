import {spawnwindow} from "/src/scripts/window.js";
import {createicon} from "/src/scripts/icon.js";
import {bgm} from "/src/scripts/startup.js";

const icon = createicon({src:"tarsh.png",title:"\"The Bin\""});

var width = window.innerWidth;
var height = window.innerHeight;

let cached = false;
let text;

async function redirect() {

if (cached == true) {
text = window.localStorage.getItem("ytps");
} else {
const response = await fetch('/ytps.json');
text = await response.text();

await window.localStorage.setItem("ytps", text);
cached = true;
}


const sauce = JSON.parse(text);

const max = sauce.length;

const id = Math.floor(Math.random() * max);
// let url = 'https://www.youtube.com/watch?v='+sauce[id];
// regular player (slower cause youtube hates everyone)

// let url = 'https://inv.nadeko.net/watch?v='+sauce[id];
// invidious instance (ad free and not bloated) [regular people wouldn't care and it doesnt support the original creators]

let url = 'https://www.youtube.com/embed/'+sauce[id].id+'?autoplay=true';
// youtube embed (faster supports the creators) [loves to not work any time a video is mildly anything (eg: age restricted {doesnt have to be actually age restricted} or affected by copyright in any way)]

// this was the first code to optimize storing the video links
// i feel bad for it because im not renaming the code fuck you

spawnwindow({
title:sauce[id].title + " - " + sauce[id].creator,
icon:"/media/icons/tarsh.png",
x:Math.round((width-800)/2),
y:Math.round((height-450)/2),
src:url,
width:"800px",
height:"450px",
open:true
})
}

function createaudio() {
// console.log(cached);

    const audioElement = document.createElement('video');
    audioElement.src = "/media/YTP.webm";
    audioElement.volume = 0.5;
    // audioElement.volume = 0;
    audioElement.style.position = "absolute";
    audioElement.style.left = 0;
    audioElement.style.top = 0;
    audioElement.style.zIndex = 150;
    audioElement.style.width = "100vw";
    audioElement.style.height = "100vh";
    audioElement.style.background = "#000";
    if (cached == true) {
    redirect();
    } else {
    document.body.appendChild(audioElement);
    bgm.pause();
    audioElement.play();
    }

audioElement.addEventListener('ended', (event) => {
redirect();
audioElement.remove();
});

};

icon.addEventListener("click", function(event) {
event.preventDefault();
createaudio();
});

