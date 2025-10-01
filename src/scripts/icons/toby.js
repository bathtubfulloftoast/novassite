async function asatreat() {
    const treat = new Audio("/media/sfx/littletreat.ogg");

    const tobyfox = document.createElement('img');
    tobyfox.src = "/media/radiation.png";
    tobyfox.style.opacity = "0";
    tobyfox.style.transition = "opacity 3s linear,bottom 3s ease-in-out";
    tobyfox.style.position="absolute";
    tobyfox.style.bottom=0;
    tobyfox.style.transform="scale(9)";
    tobyfox.style.imageRendering="pixelated";

    const rapper = document.createElement('div');
    rapper.style.display="block";
    rapper.style.position="absolute";
    rapper.style.width="100vw";
    rapper.style.height="100vh";
    rapper.style.top=0;
    rapper.style.left=0;
    rapper.style.zIndex = 150;
    rapper.style.justifyContent = "center";
    rapper.style.alignItems = "center";
    rapper.style.textAlign = "center";

    document.body.appendChild(rapper);
    rapper.appendChild(tobyfox);

    void tobyfox.offsetHeight;

    requestAnimationFrame(() => {
        tobyfox.style.opacity = "1";
        tobyfox.style.bottom = "50vh";
    });

    await new Promise(r => setTimeout(r, 4000));
    treat.play();

    treat.addEventListener("ended", function(event) {
        rapper.remove();
    })
}



document.getElementById("tobyfox").addEventListener("click", function(event) {
    event.preventDefault();
    asatreat();
})
