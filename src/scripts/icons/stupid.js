import {createicon} from "/src/scripts/icon.js";

const icon = createicon({src:"text.png",title:"CLICK.ME"});

let counter = 0;

async function createaudio() {
counter = counter+1

    const HAHElement = document.createElement('audio');

    if(counter == 1) {
    HAHElement.src = "/media/sfx/stupid1.ogg";
    } else if (counter == 2 ){
    HAHElement.src = "/media/sfx/HAH2.ogg";
    } else if (counter == 3){
    HAHElement.src = "/media/sfx/stopnow3.ogg";
    } else if (counter == 4){
    HAHElement.src = "/media/sfx/saidstop4.ogg";
    } else if (counter == 5){
    HAHElement.src = "/media/sfx/stopit5.ogg";
    } else if (counter == 6){
    HAHElement.src = "/media/sfx/saidstop6.ogg";
    } else if (counter == 7){
    HAHElement.src = "/media/sfx/wonttalk7.ogg";
    } else {
    HAHElement.src = "/media/sfx/witchlaugh.ogg";
    }
    HAHElement.volume = 0.2;
    HAHElement.id = "laughaudio";


    if (counter !== 8) {
    document.body.appendChild(HAHElement);
    HAHElement.play();
    }


HAHElement.addEventListener('ended', (event) => {
HAHElement.remove();
if (counter > 7) {
document.write("");
}
});


};

icon.addEventListener("click", function(event) {
event.preventDefault();
if(!document.getElementById("laughaudio")) {
createaudio();
}
});

