async function loadImage(url) {
    return new Promise(r => { let i = new Image(); i.onload = (() => r(i)); i.src = url; i.style.background = "red"; });
}

const canvas = document.createElement("canvas");
canvas.width = 36;
canvas.height = 52;
canvas.style.cursor="pointer";
canvas.style.imageRendering="pixelated";
canvas.style.position= "absolute";
canvas.style.right="20px";
canvas.style.bottom="22px";
canvas.style.zIndex="100";

const ctx = canvas.getContext("2d");

// ctx.fillStyle = "rgb(0 255 0)";
// ctx.fillRect(0, 0, canvas.width, canvas.height);
// ctx.scale(2, 2)

let img = await loadImage("/media/door.png");
ctx.drawImage(img, 0, 0);

canvas.addEventListener("mouseover", function(event) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, -38, 0);
})

canvas.addEventListener("mouseout", function(event) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
})

if(Math.round(Math.random()*100) == 66 ) {
document.body.appendChild(canvas);

const doorsound = new Audio("/media/sfx/mus_doorclose.ogg");
const black = document.createElement("div");
black.style.background="#000"; // holy shit its black
black.style.width="100vw";
black.style.height="100vh";
black.style.zIndex=150;
black.style.position="absolute"
black.style.left=0;
black.style.top=0;

canvas.addEventListener("click", function(event) {
document.body.appendChild(black);
doorsound.play();
canvas.remove();
})

doorsound.addEventListener('ended', async (event) => {
await new Promise(r => setTimeout(r, 500));
// window.open("/secret/wing", '_blank');
window.open("https://deltarune.com/lancer/", '_blank');

black.remove();
});
}
