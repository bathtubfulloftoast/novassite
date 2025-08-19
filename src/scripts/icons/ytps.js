
const response = await fetch('/ytps.txt');
const text = await response.text();
const sauce = text.split("\n").map(name => name.trim()).filter(name => name);



const max = sauce.length;


const audioUrl = "/media/YTP.webm";



async function createaudio() {



    const audioElement = document.createElement('video');
    audioElement.src = audioUrl;
    audioElement.volume = 0.5;
    audioElement.id = "ytpaudio";
    audioElement.style.position = "absolute";
    audioElement.style.left = 0;
    audioElement.style.top = 0;
    audioElement.style.zIndex = 150;
    audioElement.style.width = "100vw";
    audioElement.style.height = "100vh";
    audioElement.style.background = "#000";

    document.body.appendChild(audioElement);


    audioElement.play();

audioElement.addEventListener('ended', (event) => {
const id = Math.floor(Math.random() * max);
// let url = 'https://www.youtube.com/watch?v='+sauce[id]; // regular player (slower cause youtube hates everyone)
// let url = 'https://inv.nadeko.net/watch?v='+sauce[id]; // invidious instance (ad free and not bloated) [regular people wouldn't care and it doesnt support the original creators]
let url = 'https://www.youtube.com/embed/'+sauce[id]+'?autoplay=true'; // youtube embed (faster supports the creators) [loves to not work any time a video is mildly anything (eg: age restricted {doesnt have to be actually age restricted} or affected by copyright in any way)]

// this was the first code to optimize storing the video links
// i feel bad for it because im not renaming the code fuck you

window.open(url, '_blank');
audioElement.remove();
});

};

document.getElementById("tarsh").addEventListener("click", function(event) {
event.preventDefault();
if(!document.getElementById("ytpaudio")) {
createaudio();
}
});

