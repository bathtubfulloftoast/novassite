document.addEventListener("DOMContentLoaded", async function() {

async function grabdiscord() {
const response = await fetch('/api/discord');
let data = await response.json();


const nickname = data.nickname;
const username = data.username;

const userid = data.id;
const avatarid = data.avatar;
const onlinestatus = data.status;

const creationdate = new Date(data.creationtime);
var day = String(creationdate.getDate()).padStart(2, '0');
var month = String(creationdate.getMonth() + 1).padStart(2, '0');
var year = creationdate.getFullYear();

for (var item of data.activities) {
if (item.type == 4) {
document.getElementById("status").innerHTML = item.state;
break;
}
}

document.getElementById("username").innerHTML = nickname;
document.getElementById("username").title = `${username} on discord`;

document.getElementById("creationdate").innerHTML = `Account Created: ${month}/${day}/${year}`;



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

document.getElementById("addfriend").href = `https://discord.com/users/${userid}`;


document.title = nickname;
}


await grabdiscord();
});
