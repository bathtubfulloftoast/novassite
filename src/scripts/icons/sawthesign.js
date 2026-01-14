import {spawnwindow} from "/src/scripts/window.js";
import {createicon} from "/src/scripts/icon.js";
import {bgm} from "/src/scripts/startup.js";

const icon = createicon({src:"sign.webp",title:"isawthe.sign"});

var width = window.innerWidth;
var height = window.innerHeight;
var winwidth = 560;
var winheight = 315;

async function createaudio() {

const audioElement = document.createElement('video');
audioElement.src = "/media/SD Card.mp4";
audioElement.volume = 0.5;
audioElement.style.position = "absolute";
audioElement.style.left = 0;
audioElement.style.top = 0;
audioElement.style.zIndex = 150;
audioElement.style.width = "100vw";
audioElement.style.height = "100vh";
audioElement.style.background = "#000";

document.body.appendChild(audioElement);
bgm.pause();
audioElement.play();


audioElement.addEventListener('ended', (event) => {
spawnwindow({
title:"SignTube",
icon:"/media/sdcard.png", // entirely forgot that was the filename LMAO
src:"//www.youtube.com/embed/C8H-k1z9Z7A?start=62&autoplay=true",
x:Math.abs(Math.floor(Math.random()*width)-winwidth),
y:Math.abs(Math.floor(Math.random()*height)-winheight),
width:winwidth+"px",
height:winheight+"px",
open:true
});
audioElement.remove();
});

};

icon.addEventListener("click", function(event) {
event.preventDefault();
createaudio();

});

