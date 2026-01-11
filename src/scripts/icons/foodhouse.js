import {spawnwindow} from "/src/scripts/window.js";
import {createicon} from "/src/scripts/icon.js";

const icon = createicon({src:"foodhouse.png",title:"food.house"});

icon.addEventListener("click", function(event) {
event.preventDefault();
var width = window.innerWidth;
var height = window.innerHeight;
var winwidth = 560;
var winheight = 315;

spawnwindow({
title:"FoodTube",
icon:"/media/icons/foodhouse.png",
src:"//www.youtube.com/embed/aeufEIA2qYE?start=39&autoplay=true",
x:Math.abs(Math.floor(Math.random()*width)-winwidth),
y:Math.abs(Math.floor(Math.random()*height)-winheight),
width:winwidth+"px",
height:winheight+"px",
open:true
})
})
