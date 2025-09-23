async function createaudio() {

    const katamariElement = new Audio("/media/sfx/katamari intro.ogg");
    katamariElement.volume = 0.3;

    const fuckElement = new Audio("/media/sfx/fuckthat.ogg");//ey... fucj that...
    fuckElement.volume = 0.3;

    const murderElement = new Audio("/media/sfx/murderevery1intro.ogg");
    murderElement.volume = 0.3;

    const femtIMG = document.createElement('img');
    femtIMG.src = "/media/icons/femt.gif";
    femtIMG.style.position = "absolute";
    femtIMG.style.left = 0;
    femtIMG.style.top = 0;
    femtIMG.style.zIndex = 150;
    femtIMG.style.width = "100vw";
    femtIMG.style.height = "100vh";

    const loveSICK = document.createElement('img');
    loveSICK.src = "/media/LOVESICK.png";
    loveSICK.id = "liberalsimg";
    loveSICK.style.zIndex = 151;
    loveSICK.style.height = "100vh";


    const container = document.createElement('div');
    container.style.position = "absolute";
    container.style.left = 0;
    container.style.top = 0;
    container.style.zIndex = 150;
    container.style.width = "100vw";
    container.style.height = "100vw";
    container.style.background = "black";
    container.style.textAlign = "center";

    document.body.appendChild(femtIMG);


    katamariElement.play();

katamariElement.addEventListener('ended', (event) => {
katamariElement.remove();
fuckElement.play();
});

fuckElement.addEventListener('ended', (event) => {
fuckElement.remove();
document.body.appendChild(container);
container.appendChild(loveSICK);
femtIMG.remove();
murderElement.play();
});

murderElement.addEventListener('ended', (event) => {
murderElement.remove();
container.remove();
window.open("https://femtanyl.bandcamp.com/track/murder-every-1-u-know-feat-takihasdied-2", '_blank');
});
};

document.getElementById("femt").addEventListener("click", function(event) {
event.preventDefault();
createaudio();
});

