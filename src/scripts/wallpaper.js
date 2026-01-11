document.addEventListener("DOMContentLoaded", async function() {
const now = new Date();
const month = now.getMonth()+1;
const day = now.getDate();
const hour = now.getHours();
var minute= now.getMinutes();
const date = `${month}-${day}`;
minute = minute/60;

const percent = (hour+minute)/24;
const deg = Math.round(percent*360);
// lets hope this math works out :D

const paperdoll = document.getElementById("bnuy");

if(date == "12-25") {
document.body.style.background = "#fff";
paperdoll.style.backgroundImage = "url('/media/wallpapers/mariah.png')";
paperdoll.style.backgroundSize = "45vh";
paperdoll.style.backgroundPosition = "center";
return;
}

else if(date == "6-9") {
document.body.style.backgroundImage = "url('/media/wallpapers/yippee.png')";
document.body.style.backgroundColor = "var(--bright-purple)";
document.body.style.backgroundPosition = "center 30%";
document.body.style.backgroundRepeat = "no-repeat";
paperdoll.style.backgroundImage = "url('/confetti.gif')";
paperdoll.style.backgroundRepeat = "repeat-x";
paperdoll.style.backgroundSize = "50% 100vh";
paperdoll.style.backgroundPosition = "center center";

return;
}


if([3,4,5].includes(month)) {//spring
document.body.style.backgroundImage = `linear-gradient(${deg}deg,var(--bg),var(--bright-blue))`;

paperdoll.style.backgroundImage = "url('/media/wallpapers/bunny.png')";
}

else if([6,7,8].includes(month)) {//summer
document.body.style.backgroundImage = `linear-gradient(${deg}deg,var(--fg0),var(--aqua))`;

paperdoll.style.backgroundImage = "url('/media/wallpapers/bird.png')";
paperdoll.style.backgroundSize = "70vh";

}

else if([9,10,11].includes(month)) {//fall
document.body.style.backgroundImage = `linear-gradient(${deg}deg,var(--bg),var(--bright-orange))`;

paperdoll.style.backgroundImage = "url('/media/wallpapers/demon.png')";
}

else if([12,1,2].includes(month)) {//winter
document.body.style.backgroundImage = `linear-gradient(${deg}deg,var(--bg),var(--purple))`;

paperdoll.style.backgroundImage = "url('/media/wallpapers/deer.png')";
paperdoll.style.backgroundPosition = "right bottom";
paperdoll.style.backgroundSize = "50vh";

}
});
