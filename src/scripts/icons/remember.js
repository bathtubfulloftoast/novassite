import {spawnwindow} from "/src/scripts/window.js";
import {createicon} from "/src/scripts/icon.js";
import {bgm} from "/src/scripts/startup.js";

const icon = createicon({src:"remember.png",title:"i.remember"});

var width = window.innerWidth;
var height = window.innerHeight;
var winwidth = 480;
var winheight = 270;

async function createaudio() {



    const audioElement = new Audio("/media/sfx/MEGALOVANIA.ogg");
    audioElement.volume = 1;


    const imageElement = document.createElement('img');
    imageElement.src = "/media/BLUE.PNG";
    imageElement.style.position = "absolute";
    imageElement.style.left = 0;
    imageElement.style.top = 0;
    imageElement.style.zIndex = 150;
    imageElement.style.width = "100vw";
    imageElement.style.height = "100vh";

    document.body.appendChild(imageElement);

    bgm.pause();
    audioElement.play();

audioElement.addEventListener('ended', (event) => {

spawnwindow({
title:"BlueTube",
icon:"/media/icons/remember.png",
src:"https://youtube.com/embed/P_nvW4TeF3M?autoplay=true",
x:Math.abs(Math.floor(Math.random()*width)-winwidth),
y:Math.abs(Math.floor(Math.random()*height)-winheight),
width:winwidth+"px",
height:winheight+"px",
open:true
})

audioElement.remove();
imageElement.remove();
});
};

icon.addEventListener("click", function(event) {
event.preventDefault();
createaudio();
});

