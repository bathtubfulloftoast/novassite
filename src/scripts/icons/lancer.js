import {createicon} from "/src/scripts/icon.js";

const icon = createicon({src:"lancer.png",title:"lancer"});

icon.addEventListener("click", function(event) {
event.preventDefault();

const audioElement = new Audio("/media/sfx/splat.ogg");
audioElement.volume = 0.2;

audioElement.play();

});

