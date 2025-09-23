async function createaudio() {



    const audioElement = new Audio("/media/sfx/tf2notif.ogg");
    audioElement.volume = 0.5;


    const imageElement = document.createElement('img');
    imageElement.src = "/media/icons/full/liberals.png";
    imageElement.id = "liberalsimg";
    imageElement.style.zIndex = 151;
    imageElement.style.width = "100vw";
    imageElement.style.position = "fixed";
    imageElement.style.top = "30vh";


    const container = document.createElement('div');
    container.id = "liberalcontainer";
    container.style.position = "absolute";
    container.style.left = 0;
    container.style.top = 0;
    container.style.zIndex = 150;
    container.style.width = "100vw";
    container.style.height = "100vw";
    container.style.background = "black";

    document.body.appendChild(container);

    container.appendChild(imageElement);


    audioElement.play();

audioElement.addEventListener('ended', (event) => {
audioElement.remove();
container.remove();

});
};

document.getElementById("liberals").addEventListener("click", function(event) {
event.preventDefault();

createaudio();

});

//this code has become illegible.
// idc tho thats an issue for me in the future lmao

//fuck you.
