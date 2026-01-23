import {spawnwindow} from "/src/scripts/window.js";
import {createicon} from "/src/scripts/icon.js";
import {bgm} from "/src/scripts/startup.js";

const icon = createicon({src:"idiot.png",title:"youare.anidiot"});

if (Math.round(Math.random()*100) !== 25) {
icon.remove();
}

const idiot = new Audio("/media/sfx/idiot.ogg");

let count = 1;

icon.addEventListener("click", async function(event) {
event.preventDefault();
bgm.pause();
icon.remove();

var width = window.innerWidth;
var height = window.innerHeight;

idiot.play();
await spawnwindow({
title:"you IDIOT!",
icon:"/media/icons/flowey.png",
src:`/misc/idiot/`,
x:0,
y:0,
width:"800px",
height:height+"px",
open:true
});

idiot.addEventListener('ended', async (event) => {

if(count > 10) {
bgm.play();
return;
} else {
count = count*2;
}

for (let i = 0; i < count; i++) {
const poop = Math.round(Math.random()* (200 - 100) + 100);
var winwidth = 4*poop;
var winheight = 3*poop;

spawnwindow({
title:"hydra",
icon:"/media/icons/flowey.png",
src:"/misc/idiot/",
x:Math.abs(Math.floor(Math.random()*width)-winwidth),
y:Math.abs(Math.floor(Math.random()*height)-winheight),
width:winwidth+"px",
height:winheight+"px",
open:true
});
}

idiot.play();

});
})
