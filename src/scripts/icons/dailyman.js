import {spawnwindow} from "/src/scripts/window.js";

document.getElementById("dailyman").addEventListener("click", function(event) {
event.preventDefault();
var width = window.innerWidth;
var height = window.innerHeight;
var winwidth = 816;
var winheight = 624;

spawnwindow({
title:"Daily Man (The Game)",
icon:"/media/icons/dailyman.png",
src:"https://dailyman.netlify.app/",
x:Math.abs(Math.floor(Math.random()*width)-winwidth),
y:Math.abs(Math.floor(Math.random()*height)-winheight),
width:winwidth+"px",
height:winheight+"px"
})
})
