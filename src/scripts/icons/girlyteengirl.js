import {createicon} from "/src/scripts/icon.js";

const icon = createicon({src:"GIRLY.png",title:"FUCKYOU.FUCK"});

icon.addEventListener("click", function(event) {
event.preventDefault();
window.open("https://www.reddit.com/R/girlyteengirlhate/", '_blank');
})
