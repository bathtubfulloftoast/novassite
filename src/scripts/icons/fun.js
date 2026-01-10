import {spawnwindow} from "/src/scripts/window.js";

function createaudio() {

var width = window.innerWidth;
var height = window.innerHeight;
var winwidth = 560;
var winheight = 315;

    const audioElement = new Audio("/media/sfx/fun.ogg");
    audioElement.volume = 0.2;
    audioElement.id = "pinkieaudio";

    document.body.appendChild(audioElement);

    audioElement.play();

audioElement.addEventListener('ended', (event) => {

spawnwindow({
title:"FunTube",
icon:"/media/icons/fluttershit.png", // entirely forgot that was the filename LMAO
src:"//www.youtube.com/embed/b1Vjorjlon4?autoplay=true",
x:Math.abs(Math.floor(Math.random()*width)-winwidth),
y:Math.abs(Math.floor(Math.random()*height)-winheight),
width:winwidth+"px",
height:winheight+"px",
open:true
})
audioElement.remove();

});

};

document.getElementById("pinkie").addEventListener("click", function(event) {
event.preventDefault();
if(!document.getElementById("pinkieaudio")) {
createaudio();
}
});
// this tabbing sucks but fuck you :D
