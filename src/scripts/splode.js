const imageUrl = "/media/splode.webm";
const audioUrl = "/media/splode.ogg";
let imageBlobUrl = null;
let audioBlobUrl = null;

function countdown() {
var timeleft = 3;
document.getElementById("countdown").style.color="#fff";

var downloadTimer = setInterval(function(){
    if(timeleft <= 0){
        clearInterval(downloadTimer);
        document.getElementById("countdown").innerHTML = "<b>page will refresh</b>";
        window.location.replace("/");
    } else {
        document.getElementById("countdown").innerHTML = "the page will refresh in "+timeleft + " seconds";
    }
    timeleft -= 1;
}, 1000);
}

async function fetchBlob(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
}

async function preloadBlobs() {
    imageBlobUrl = await fetchBlob(imageUrl);
    audioBlobUrl = await fetchBlob(audioUrl);
}

preloadBlobs();

async function createimage() {
const imageBlobUrl = await fetchBlob(imageUrl);
const audioBlobUrl = await fetchBlob(audioUrl);

const imageElement = document.createElement('video');
const audioElement = document.createElement('audio');
imageElement.src = imageBlobUrl;
audioElement.src = audioBlobUrl;

imageElement.style.height = "100vh";
imageElement.style.width = "100vw";
imageElement.style.objectFit = "contain";
imageElement.style.margin = "0";
imageElement.style.imageRendering = "pixelated";

document.body.innerHTML = '';
document.body.style.backgroundColor="#000";

document.body.appendChild(audioElement);
document.body.appendChild(imageElement);

document.body.requestFullscreen();
    
audioElement.play();
imageElement.play();

imageElement.addEventListener('ended', (event) => {
imageElement.remove();
});

audioElement.addEventListener('ended', (event) => {
document.body.innerHTML = '<h1>you have exploded.</h1><br><p id="countdown"></p>';
document.title='SPLODED.';
document.body.style.color="#ff0000";
document.body.style.textAlign="center";
countdown();
});
}

document.getElementById("explodebutton").addEventListener("click", function(event) {
    event.preventDefault();
    createimage();
});
