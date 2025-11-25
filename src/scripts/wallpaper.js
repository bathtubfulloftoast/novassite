document.addEventListener("DOMContentLoaded", async function() {
const now = new Date();
const month = now.getMonth()+1;
const day = now.getDate();
const date = `${month}-${day}`;

const paperdoll = document.getElementById("bnuy");

if(date == "12-25") {
document.body.style.background = "#fff";
paperdoll.style.backgroundImage = "url('/media/wallpapers/mariah.png')";
paperdoll.style.backgroundSize = "45vh";
paperdoll.style.backgroundPosition = "center";

document.getElementById("novasprofile").src="https://www.youtube.com/embed/aAkMkVFwAoo?si=kGSB-eRC5Eat_jPB";
document.getElementById("novasprofile").height="450px";

document.querySelectorAll(".icon").forEach((icon) => {
icon.querySelector("img").src = "/media/icons/christmas.png";
icon.querySelector("img").alt = "mariah carey";

icon.querySelector("span").innerHTML = "mariah.carey";


});

return;
}


if([3,4,5].includes(month)) {//spring
document.body.style.backgroundImage = "linear-gradient(-45deg,var(--bg),var(--bright-blue))";

paperdoll.style.backgroundImage = "url('/media/wallpapers/bunny.png')";
}

else if([6,7,8].includes(month)) {//summer
document.body.style.backgroundImage = "linear-gradient(180deg,var(--bg),var(--aqua))";

paperdoll.style.backgroundImage = "url('/media/wallpapers/bird.png')";
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
