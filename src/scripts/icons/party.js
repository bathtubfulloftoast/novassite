import {spawnwindow} from "/src/scripts/window.js";
import {createicon} from "/src/scripts/icon.js";

const icon = createicon({src:"party.png",title:"copy.party"});

icon.addEventListener("click", function(event) {
event.preventDefault();
var width = window.innerWidth;
var height = window.innerHeight;
var winwidth = 800;
var winheight = 600;

spawnwindow({
title:"copyparty",
icon:"/media/icons/party.png",
src:"//cdn.novassite.net/dump",
x:Math.abs(Math.floor(Math.random()*width)-winwidth),
y:Math.abs(Math.floor(Math.random()*height)-winheight),
width:winwidth+"px",
height:winheight+"px",
open:true
})
})
