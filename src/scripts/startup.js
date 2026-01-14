export function getCookie(cname) {
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

let initialized = false;

export const bgm = new Audio("/media/sfx/bgm.ogg");
bgm.volume = 0;
bgm.loop="true";
const muter = document.getElementById("muter");
const bgvolume = 0.2;


function fadeTo(target, duration = 1000) {
    bgm.play();
    const start = bgm.volume;
    const delta = target - start;
    const startTime = performance.now();

    function step() {
        const now = performance.now();
        const progress = Math.min((now - startTime) / duration, 1);
        bgm.volume = start + delta * progress;

        if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}


document.addEventListener("DOMContentLoaded", async function() {
    const img = document.getElementById("sickassloadingimage");
    const wrap = document.getElementById("loadingImg");
    const sound = new Audio("/media/sfx/startup.ogg");
    window.scrollTo(0,0);

    if (getCookie("startupseen")) {
        loadingImg.remove();
        if (getCookie("bgmute") == "true") {
        muter.src="/media/mute.png";
        bgm.pause();
        bgm.volume = bgvolume;
        } else {
        fadeTo(bgvolume, 2000);
        muter.src = "/media/unmute.png";
        document.cookie = "bgmute=false";
        }
    };


    loadingImg.style.transition = "opacity 2s ease-in-out"
    img.style.transition = "opacity 2s ease-in-out"
    img.style.opacity=1;

    if(window.chrome){
        loadingImg.remove();
        alert("please enable autoplay and popups\nand be aware that this site is designed for firefox (which youre not using)\nexpect me forgetting to add shit that makes shit work on chrome.");
        document.cookie = "startupseen=true";
        fadeTo(bgvolume, 2000);
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
            fadeTo(bgvolume, 1000);
        });

    } else {
    alert("please enable autoplay and popups\nthese are required for most of the jokes on the site.\nand more importantly the startup that this is interrupting.\nthe site will try to open a little snowman in order to show the popup prompt (he is friendly!)\nwhen youve allowed stuff just refresh.");
    sound.play();
    var handle = window.open('/snow/');
    handle.blur();
    window.focus();
    }


});



muter.addEventListener("click", function(event) {
    event.preventDefault();
    if (bgm.paused) {
        muter.src="/media/unmute.png";
        bgm.play();
        document.cookie = "bgmute=false";
    } else {
    muter.src = "/media/mute.png";
    bgm.pause();
    document.cookie = "bgmute=true";
    }
});

document.addEventListener("visibilitychange", () => {
if (getCookie("bgmute") !== "true") {//i love you bgmute cookie oh my god this code is so BAAAAAADDDDD
if(document.visibilityState=="hidden") {
bgm.pause();
} else {
bgm.play();
}
}
});

bgm.addEventListener("pause", () => {
muter.src="/media/mute.png";
});

bgm.addEventListener("play", () => {
muter.src="/media/unmute.png";
});

if ("mediaSession" in navigator) {
  navigator.mediaSession.metadata = new MediaMetadata({
    title: "nova.ogg",
    artist: "cassidy5bear",
    album: "Novassite OST",
    artwork: [{ src: "/nova.svg" }],
  });
}

initialized = true;
