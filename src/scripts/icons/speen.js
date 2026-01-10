import {spawnwindow} from "/src/scripts/window.js";

async function createaudio() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var winwidth = 800;
    var winheight = 600;

    const audioElement = new Audio("/media/sfx/speen.ogg");
    audioElement.volume = 0.2;
    audioElement.id = "speenaudio";


    document.body.appendChild(audioElement);


    audioElement.play();

audioElement.addEventListener('ended', (event) => {
spawnwindow({
title:"Nova Spinner",
icon:"/media/icons/speen.gif",
src:"/misc/novaview/",
x:Math.abs(Math.floor(Math.random()*width)-winwidth),
y:Math.abs(Math.floor(Math.random()*height)-winheight),
width:winwidth+"px",
height:winheight+"px",
open:true
})
// SPINN1!!!1\
// also fuck you no spamming
audioElement.remove();
});

};

document.getElementById("speen").addEventListener("click", function(event) {
event.preventDefault();
if(!document.getElementById("speenaudio")) {
createaudio();
}
});

