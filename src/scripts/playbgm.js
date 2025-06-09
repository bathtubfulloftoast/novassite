const now = new Date();
const currentHour = now.getHours();

//sunset 8PM
//sunrise 6AM

let audioUrl = "";

if(currentHour >= 20) {
    audioUrl = "/media/tomo_night.ogg";
} else if(currentHour <= 6) {
    audioUrl = "/media/tomo_night.ogg";
} else {
    audioUrl = "/media/tomo.ogg";
}

let audioBlobUrl = null;


async function fetchBlob(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
}

async function preloadBlobs() {
    audioBlobUrl = await fetchBlob(audioUrl);
}

preloadBlobs();

async function createaudio() {
    if(document.getElementById("bgmusic")) {
        document.getElementById("bgmusic").remove();
    }
    const audioBlobUrl = await fetchBlob(audioUrl);

    const audioElement = document.createElement('audio');
    audioElement.src = audioBlobUrl;
    audioElement.loop = true;
    audioElement.id = "bgmusic";
    audioElement.volume = 0.05;


    document.body.appendChild(audioElement);


    audioElement.play();
};

createaudio();

document.getElementById("playbgm").addEventListener("click", function(event) {
    event.preventDefault();
    createaudio();
    document.getElementById("playbgm").remove();

});
