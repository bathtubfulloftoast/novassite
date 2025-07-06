document.addEventListener("DOMContentLoaded", async function() {

async function grabdiscord() {
const response = await fetch('/api/discord');
// const response = await fetch('/discord.json');

let data = await response.json();

var now = new Date().getTime();


const nickname = data.nickname;
const username = data.username;

const userid = data.id;
const avatarid = data.avatar;
const onlinestatus = data.status;
const accent = data.accentColor;

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

const activitylist = document.getElementById("activities");
activitylist.innerHTML = "";


for (const item of data.activities) {
if (item.type !== 4) {
const createdTime = new Date(item.createdTimestamp);
const startTime = item.timestamps?.start
? new Date(item.timestamps.start)
: null;
const endTime = item.timestamps?.end
? new Date(item.timestamps.end)
: null;

const lareimg = item.assets?.largeImage;

const blurbwrap = document.createElement("div");
blurbwrap.className = "blurb";

const infowrap = document.createElement("div");
infowrap.className = "infowrap";

const activitytype = document.createElement("b");
activitytype.innerHTML = `${item.name}:<br>`;

const activityinfo = document.createElement("span");
activityinfo.innerHTML = `${item.details || ""}<br>${
    item.state || ""
}<br>`;

const activitytime = document.createElement("span");

function updateActivityTime() {
const now = new Date();
const distance = now - createdTime;

const ph = Math.floor(distance / (1000 * 60 * 60));
const pm = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
const ps = Math.floor((distance % (1000 * 60)) / 1000);

const timepassed = `${ph}h ${pm}m ${ps}s`;

if (endTime) {
    const legnth = endTime - startTime;
    let current = now - startTime;

    if (current > legnth) {
        current = legnth;
    }

    const lh = String(
        Math.floor(legnth / (1000 * 60 * 60))
    ).padStart(2, "0");
    const lm = String(
        Math.floor((legnth % (1000 * 60 * 60)) / (1000 * 60))
    ).padStart(2, "0");
    const ls = String(
        Math.floor((legnth % (1000 * 60)) / 1000)
    ).padStart(2, "0");

    const ch = String(
        Math.floor(current / (1000 * 60 * 60))
    ).padStart(2, "0");
    const cm = String(
        Math.floor((current % (1000 * 60 * 60)) / (1000 * 60))
    ).padStart(2, "0");
    const cs = String(
        Math.floor((current % (1000 * 60)) / 1000)
    ).padStart(2, "0");

    const ctime = lh === "00" ? `${cm}:${cs}` : `${ch}:${cm}:${cs}`;
    const ltime = lh === "00" ? `${lm}:${ls}` : `${lh}:${lm}:${ls}`;

activitytime.innerHTML = `<progress style="width:300px" value="${current}" max="${legnth}"></progress><br>${ctime} - ${ltime}`;
} else {
    activitytime.innerHTML = timepassed;
}
}

updateActivityTime();
setInterval(updateActivityTime, 1000);

// Initial call
updateActivityTime();

// Update every second
setInterval(updateActivityTime, 1000);


if(lareimg) {
const activityimg = document.createElement('img');

if(lareimg.startsWith("spotify:")) {
const spotifysplit = lareimg.split(":", 2);
activityimg.src = `https://i.scdn.co/image/`+spotifysplit[1];

} else if(lareimg.startsWith("mp:external/")) {
const spotifysplit = lareimg.split("mp:external/", 2);
activityimg.src = `https://media.discordapp.net/external/`+spotifysplit[1];
} else {
activityimg.src = `https://cdn.discordapp.com/app-assets/${item.applicationId}/${lareimg}.png?size=256`;
}
activityimg.className = "activityimg";
activityimg.title = item.assets.largeText?? "a discord activity";
infowrap.appendChild(activityimg);

activityimg.onerror = function () {
activityimg.src = '/media/missing_activity.webp';
};

}


blurbwrap.appendChild(activitytype);
infowrap.appendChild(activityinfo);
activityinfo.appendChild(activitytime);

activitylist.appendChild(blurbwrap);
blurbwrap.appendChild(infowrap);

}
}

document.getElementById("username").innerHTML = nickname;
document.getElementById("username").title = `${username} on discord`;

document.getElementById("creationdate").innerHTML = `Account Created: ${month}/${day}/${year}`;



var coverimage = document.getElementById("pfp");
coverimage.src = `https://cdn.discordapp.com/avatars/${userid}/${avatarid}.webp?size=512`;

if(accent) {
coverimage.style.backgroundColor = "#"+accent.toString(16).padEnd(6, "0");
}

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
