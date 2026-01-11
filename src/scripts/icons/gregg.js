import {createicon} from "/src/scripts/icon.js";

const now = new Date();
const month = now.getMonth();
const gregg = createicon({src:"gregg.png",title:"hh.gregg"});
let counter = 0;

if (month !== 6) {
gregg.remove();
} else {
gregg.addEventListener("click", function(event) {
event.preventDefault();
const hh = new Audio(`/media/sfx/gregg${counter}.ogg`);
hh.play();
if (counter >= 8) {
counter=0
}
else {
counter = counter+1;
}

});
}
