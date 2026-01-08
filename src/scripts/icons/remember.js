import {spawnwindow} from "/src/scripts/window.js";

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


    audioElement.play();

audioElement.addEventListener('ended', (event) => {

spawnwindow({
title:"BlueTube",
icon:"/media/icons/remember.png",
src:"https://youtube.com/embed/P_nvW4TeF3M",
x:Math.abs(Math.floor(Math.random()*width)-winwidth),
y:Math.abs(Math.floor(Math.random()*height)-winheight),
width:winwidth+"px",
height:winheight+"px"
})

audioElement.remove();
imageElement.remove();
});
};

document.getElementById("remember").addEventListener("click", function(event) {
event.preventDefault();
createaudio();
});

