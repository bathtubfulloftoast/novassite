import {spawnwindow} from "/src/scripts/window.js";
import {createicon} from "/src/scripts/icon.js";

const icon = createicon({src:"among.png",title:"Among Us"});

const amongusvideos = [
"Ns3YxbIhTRM",
"yIHa5cjuTBk",
"PShRULA8sOY",
"6yvfU8xK_VQ",
"GYtBoxGB6Wo",
"KByREO4gB0M",
"oZ-51rj2_WI",
"4kzxy8eIjLI",
"SB0jgNzKMSo"
];

const max = amongusvideos.length;

icon.addEventListener("click", function(event) {
const poop = Math.round(Math.random()* (50 - 20) + 20);

var width = window.innerWidth;
var height = window.innerHeight;
var winwidth = 16*poop;
var winheight = 9*poop;

event.preventDefault();
const id = Math.floor(Math.random() * max);
let url = 'https://youtube.com/embed/'+amongusvideos[id];

spawnwindow({
title:"SUSTube",
icon:"/media/icons/among.png",
src:url,
x:Math.abs(Math.floor(Math.random()*width)-winwidth),
y:Math.abs(Math.floor(Math.random()*height)-winheight),
width:winwidth+"px",
height:winheight+"px",
open:true
});

})
