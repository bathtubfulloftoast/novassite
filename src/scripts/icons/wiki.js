import {spawnwindow} from "/src/scripts/window.js";
import {createicon} from "/src/scripts/icon.js";

const icon = createicon({src:"wiki.png",title:"nova.wiki"});

icon.addEventListener("click", function(event) {
event.preventDefault();
var width = window.innerWidth;
var height = window.innerHeight;
var winwidth = 800;
var winheight = 600;

spawnwindow({
title:"Nova Wiki",
icon:"/media/icons/wiki.png",
src:"//wiki.novassite.net",
x:Math.abs(Math.floor(Math.random()*width)-winwidth),
y:Math.abs(Math.floor(Math.random()*height)-winheight),
width:winwidth+"px",
height:winheight+"px",
open:true
})
})
