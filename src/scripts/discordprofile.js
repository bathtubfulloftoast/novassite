document.addEventListener("DOMContentLoaded", async function() {

function wrapEmojis(input) {
/*
im going to be so god damn fr when i tell you i used chatgpt for this emoji shit.
i searched fucking endlessly for any way to possibly do this shit
and all i got were regex that matches specific emoji
twemoji (something not being updated for other devs to use)
and to do the thing i did which was have the emoji font after the normal font (fun fact that didnt fucking work???)
i imported noto fonts directly i specified character codes in css
i got the setofont ttf file and used that
i did all the research i could for my damn self and i found fucking nothing.
this rant is over and stupid and im so fucking mad
*/

  const emojiRegex = /^\p{Extended_Pictographic}(?:\u200D\p{Extended_Pictographic})*$/u;
  const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });

  const container = document.createElement("div");
  container.innerHTML = input;

  function wrapTextNode(node) {
    const parent = node.parentNode;
    const segments = Array.from(segmenter.segment(node.textContent));

    segments.forEach(({ segment }) => {
      if (!segment) return;

      if (emojiRegex.test(segment)) {
        const span = document.createElement("span");
        span.className = "emoji";
        span.textContent = segment;
        parent.insertBefore(span, node);
      } else {
        parent.insertBefore(document.createTextNode(segment), node);
      }
    });

    parent.removeChild(node);
  }

  function walk(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      wrapTextNode(node);
    } else if (
      node.nodeType === Node.ELEMENT_NODE &&
      node.tagName !== "SCRIPT" &&
      node.tagName !== "STYLE"
    ) {
      Array.from(node.childNodes).forEach(walk);
    }
  }

  walk(container);
  return container.innerHTML;
}

async function grabdiscord() {
const response = await fetch('/api/discord');
// const response = await fetch('/discord.json');

let data = await response.json();

var now = new Date().getTime();


const nickname = data.nickname;
const username = data.username;

const userid = data.id;
const avatarid = data.avatar;
const bannerid = data.banner;
const onlinestatus = data.status;
const accent = data.accentColor;

const creationdate = new Date(data.creationtime);
var day = String(creationdate.getDate()).padStart(2, '0');
var month = String(creationdate.getMonth() + 1).padStart(2, '0');
var year = creationdate.getFullYear();

for (var item of data.activities) {
if (item.type == 4) {
if(item.emoji.imageURL) {
document.getElementById("status").innerHTML = `<img src="${item.emoji.imageURL}?size=16" class="statusemoji"> ${item.state??""}`;
} else if (!item.emoji.imageURL && item.emoji.name) {
document.getElementById("status").innerHTML = `<span class="emoji">${item.emoji.name}</span> ${item.state??""}`
} else {
document.getElementById("status").innerHTML = item.state;
}
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

const lareimg = item.assets?.largeImage??"null";

let shareurl = "";
const syncid = item.syncId;
if(item.name == "Spotify") {
shareurl = `https://open.spotify.com/track/${syncid}`;
}
// this code is shit lol


const blurbwrap = document.createElement("div");
blurbwrap.className = "blurb";

const infowrap = document.createElement("div");
infowrap.className = "infowrap";

const activitytype = document.createElement("b");
activitytype.innerHTML = `${item.name}:<br>`;

const activityinfo = document.createElement("span");
if (shareurl) {
activityinfo.innerHTML = `<a href="${shareurl}" target="_top">${item.details || ""}<br>${item.state || ""}</a><br>`;
// if else my beloved
} else {
activityinfo.innerHTML = `${item.details || ""}<br>${item.state || ""}<br>`;
}

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

if (item.assets) {
activityimg.title = item.assets.largeText ?? "a discord activity";
} else {
activityimg.title = "a discord activity";
}

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

document.getElementById("username").innerHTML = wrapEmojis(nickname);
document.getElementById("username").title = `${username} on discord`;

document.getElementById("creationdate").innerHTML = `Account Created: ${month}/${day}/${year}`;



var coverimage = document.getElementById("pfp");
coverimage.src = `https://cdn.discordapp.com/avatars/${userid}/${avatarid}.webp?size=512`;

coverimage.onerror = function () {
coverimage.src = '/media/pfp.png';
};

if(accent) {
coverimage.style.backgroundColor = "#"+accent.toString(16).padStart(6, "0");
}

coverimage.style.border = "5px solid var(--bg0)";

const top = document.getElementsByClassName("top")[0];

// top.style.backgroundImage = `url(https://cdn.discordapp.com/banners/${userid}/${bannerid}.webp?size=1024)`;
// top.style.backgroundPosition = "center";
// top.style.backgroundRepeat = "no-repeat";
// top.style.backgroundSize = "100% 100%";
// grrr...
// im not paying for a banner idc

var onlineimg = document.getElementById("onlineimg");
var onlinetext = document.getElementById("online");

onlineimg.className = "sprite";


if (onlinestatus == "online") {
onlineimg.className += " online";
onlinetext.innerHTML = "Online";
coverimage.style.borderColor = "var(--green)";
} else if (onlinestatus == "idle") {
onlineimg.className += " idle";
onlinetext.innerHTML = "Idle";
coverimage.style.borderColor = "var(--yellow)";
} else if (onlinestatus == "dnd") {
onlineimg.className += " dnd";
onlinetext.innerHTML = "Do Not Disturb";
coverimage.style.borderColor = "var(--red)";
} else {
onlineimg.className += " offline";
onlinetext.innerHTML = "Offline";
}

// document.getElementById("addfriend").href = `https://discord.com/users/${userid}`;
document.getElementById("addfriend").href = `/discord/user#${userid}`;


document.title = nickname;
}


await grabdiscord();
});
