document.addEventListener("DOMContentLoaded", async function() {
const now = new Date();
const month = now.getMonth()+1;
// const month = 6;

const paperdoll = document.getElementById("bnuy");


if([3,4,5].includes(month)) {//spring
document.body.style.backgroundImage = "linear-gradient(-45deg,var(--bg),var(--bright-blue))";

paperdoll.style.backgroundImage = "url('/media/wallpapers/bunny.png')";
}

else if([6,7,8].includes(month)) {//summer
document.body.style.backgroundImage = "linear-gradient(180deg,var(--bg),var(--aqua))";

paperdoll.style.backgroundImage = "url('/media/wallpapers/dog.png')";
paperdoll.style.backgroundSize = "70vh";

}

else if([9,10,11].includes(month)) {//fall
document.body.style.backgroundImage = "linear-gradient(128deg,var(--bg),var(--bright-orange))";

paperdoll.style.backgroundImage = "url('/media/wallpapers/demon.png')";
}

else if([12,1,2].includes(month)) {//winter
document.body.style.backgroundImage = "linear-gradient(128deg,var(--bg),var(--purple))";

paperdoll.style.backgroundImage = "url('/media/wallpapers/deer.png')";
paperdoll.style.backgroundPosition = "right bottom";
paperdoll.style.backgroundSize = "50vh";

}
});
