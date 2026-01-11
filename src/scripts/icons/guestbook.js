import {spawnwindow} from "/src/scripts/window.js";
import {createicon} from "/src/scripts/icon.js";

const icon = createicon({src:"tobyclip.png",title:"guest.book"});

icon.addEventListener("click", function(event) {
event.preventDefault();
var width = window.innerWidth;
var height = window.innerHeight;
var winwidth = 800;
var winheight = 600;

spawnwindow({
title:"GuestBook",
icon:"/media/icons/tobyclip.png",
src:"/guestbook/",
x:Math.abs(Math.floor(Math.random()*width)-winwidth),
y:Math.abs(Math.floor(Math.random()*height)-winheight),
width:winwidth+"px",
height:winheight+"px",
open:true
})
});

