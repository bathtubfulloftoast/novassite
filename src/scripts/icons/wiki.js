import {spawnwindow} from "/src/scripts/window.js";

document.getElementById("wiki").addEventListener("click", function(event) {
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
