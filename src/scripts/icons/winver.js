import {spawnwindow} from "/src/scripts/window.js";
import {createicon} from "/src/scripts/icon.js";

const icon = createicon({src:"nova.png",title:"site.version"});

icon.addEventListener("click", function(event) {
event.preventDefault();
var width = window.innerWidth;
var height = window.innerHeight;
var winwidth = 400;
var winheight = 470;

spawnwindow({
title:"About NovasSite",
icon:"/nova.png",
src:"/winver/",
x:Math.round((width-winwidth)/2),
y:Math.round((height-winheight)/2),
width:winwidth+"px",
height:winheight+"px",
open:true,
maximize:false,
minimize:false,
scroll:false,
})
})
