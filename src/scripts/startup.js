function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
// why is this dogshit
// die i hate javascript
// i shouldve never gotten into javascript
// https://www.w3schools.com/js/js_cookies.asp

// const bgm = new Audio("/media/sfx/bgm.ogg");
// bgm.volume = 0;

// function fadeTo(target, duration = 1000) {
//     bgm.loop="true";
//     bgm.play();
//     const start = bgm.volume;
//     const delta = target - start;
//     const startTime = performance.now();
//
//     function step() {
//         const now = performance.now();
//         const progress = Math.min((now - startTime) / duration, 1);
//         bgm.volume = start + delta * progress;
//
//         if (progress < 1) requestAnimationFrame(step);
//     }
//
//     requestAnimationFrame(step);
// }


document.addEventListener("DOMContentLoaded", async function() {
    const width = window.outerWidth;
    let hash = window.location.hash;
    let hashValue = hash.substring(1);


    if (width<1500) {
    if (hashValue !== "fromtree") {
    window.location.replace("/tree#warn");
    return;
    }
    }

    const img = document.getElementById("sickassloadingimage");
    const wrap = document.getElementById("loadingImg");
    const sound = new Audio("/media/sfx/startup.ogg");

    if (getCookie("startupseen")) {
        loadingImg.remove();
        // fadeTo(1, 2000);
    };


    loadingImg.style.transition = "opacity 2s ease-in-out"
    img.style.transition = "opacity 2s ease-in-out"
    img.style.opacity=1;

    if(window.chrome){
        loadingImg.remove();
        alert("please enable autoplay and popups\nand be aware that this site is designed for firefox (which youre not using)\nexpect me forgetting to add shit that makes shit work on chrome.");
        document.cookie = "startupseen=true";
    }
    // fuck safari lmao
    const autoplay = navigator.getAutoplayPolicy(sound);

    if(autoplay == "allowed") {
        await new Promise(r => setTimeout(r, 3000));
        sound.play();
        await new Promise(r => setTimeout(r, 500));
        loadingImg.style.opacity=0;
        await new Promise(r => setTimeout(r, 2000));
        loadingImg.remove();
        document.cookie = "startupseen=true";

        sound.addEventListener('ended', async (event) => {
            await new Promise(r => setTimeout(r, 1000));
            // fadeTo(1, 1000);
        });

    } else {
        alert("please enable autoplay and popups\nthese are required for most of the jokes on the site.\nand more importantly the startup that this is interrupting.\nif you dont enable these i will genuinely hate you as a person\nyes im being /srs garfield.");
    }



});
