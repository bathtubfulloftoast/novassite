document.addEventListener("DOMContentLoaded", async function() {

async function grabdiscord() {
const response = await fetch('/discord.json');
let data = await response.json();


const nickname = data.nickname;
const userid = data.id;
const avatarid = data.avatar;
const onlinestatus = data.status;


for (var item of data.activities) {
if (item.type == 4) {
document.getElementById("status").innerHTML = item.state;
break;
}
}

document.getElementById("username").innerHTML = nickname;


document.getElementById("addfriend").href = `https://discord.com/users/${userid}`;

document.getElementById("addfriend").addEventListener("click", function(event) {
event.preventDefault();
window.top.location.href = `https://discord.com/users/${userid}`;
});


var coverimage = document.getElementById("pfp");
coverimage.src = `https://cdn.discordapp.com/avatars/${userid}/${avatarid}.webp?size=512`;

var onlineimg = document.getElementById("onlineimg");
var onlinetext = document.getElementById("online");

onlineimg.className = "sprite";


if (onlinestatus == "online") {
onlineimg.className += " online";
onlinetext.innerHTML = "Online";
} else if (onlinestatus == "idle") {
onlineimg.className += " idle";
onlinetext.innerHTML = "Idle";
} else if (onlinestatus == "dnd") {
onlineimg.className += " dnd";
onlinetext.innerHTML = "Do Not Disturb";
} else {
onlineimg.className += " offline";
onlinetext.innerHTML = "Offline";
}

}


await grabdiscord();
});
