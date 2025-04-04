function timeAgo(time) {
const timeDifference = Math.floor(Date.now() / 1000) - time;

if (timeDifference < 60) {
return `${timeDifference} second${timeDifference !== 1 ? 's' : ''} ago`;
} else if (timeDifference < 3600) {
const minutes = Math.floor(timeDifference / 60);
return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
} else if (timeDifference < 86400) {
const hours = Math.floor(timeDifference / 3600);
return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
} else {
const days = Math.floor(timeDifference / 86400);
return `${days} day${days !== 1 ? 's' : ''} ago`;
}
}

function timeAgoShort(time) {
const timeDifference = Math.floor(Date.now() / 1000) - time;

if (timeDifference < 60) {
return `${timeDifference}s`;
} else if (timeDifference < 3600) {
const minutes = Math.floor(timeDifference / 60);
return `${minutes}m`;
} else if (timeDifference < 86400) {
const hours = Math.floor(timeDifference / 3600);
return `${hours}h`;
} else {
const days = Math.floor(timeDifference / 86400);
return `${days}d`;
}
}

function basename(path) {
   return path.split('/').reverse()[0];
}

function getFilenameWithoutExtension(path) {
return path.split('/').pop().split('\\').pop().split('.').slice(0, -1).join('.');
}

let cachedCensoredIds = null; 

async function censoredids() {
if (!cachedCensoredIds) {
const response = await fetch('/censor.txt');
const text = await response.text();
cachedCensoredIds = text.split("\n").map(name => name.trim()).filter(name => name);
}
return cachedCensoredIds;
}

const mainsong = async () => {
const names = await censoredids();
const response = await fetch('/.netlify/functions/lastfm');
// doesnt have to be my specific thing this is just to hide my api key from you bastards
// also my own rate limiting and error handling fuck yuo
const myJson = await response.json();

const recenttracks = myJson.recenttracks.track;

//const maxtracks = recenttracks.length;
//const trackid = Math.floor(Math.random() * maxtracks);
let trackid = null;
trackid = 0;

const trackname = myJson.recenttracks.track?.[trackid].name || "";
const albumname = myJson.recenttracks.track?.[trackid].album?.["#text"] || "";
const artist = myJson.recenttracks.track?.[trackid].artist?.["#text"] || "";
const image = myJson.recenttracks.track?.[trackid].image?.[0]?.["#text"] || "";
const fmurl = myJson.recenttracks.track?.[trackid].url || "";
const trackdate = myJson.recenttracks.track?.[trackid].date?.uts || "";
const fmuser = myJson.recenttracks?.["@attr"]?.user || "";
const totalscrobbs = myJson.recenttracks?.["@attr"]?.total || "1";

const coverid = basename(image);

const coveridnoext = getFilenameWithoutExtension(coverid);

const censored = names.includes(coveridnoext);
let censorurl = "";

if(censored) {
censorurl = `&censored=10`;
}

const cdnurl = `https://cdn.novassite.net/albumcovers/?size=800&format=webp&file=${coverid}${censorurl}&noerror`;
console.log(`track: ${trackname}\nalbum: ${albumname}\nartist: ${artist}\ncover: ${cdnurl}\ncoverid: ${coverid}\ncensored: ${censored}`);

var coverimage = document.getElementById("cover");
coverimage.src = cdnurl;
coverimage.onerror = function () {
  coverimage.src = '/media/missing512.jpeg'; // Fallback image
};

document.getElementById("mainfmlink").href=fmurl; 
document.getElementById("mainfmlink").title=`${trackname} by ${artist}`; 

document.getElementById("trackname").innerHTML=trackname; 
document.getElementById("albumname").innerHTML=albumname; 
document.getElementById("artistname").innerHTML=artist; 

document.getElementById("poweredby").href=`https://www.last.fm/user/${fmuser}`; 


const nowplaying = myJson.recenttracks.track?.[trackid]?.["@attr"]?.nowplaying || "false";

if (nowplaying == "true") {
document.getElementById("nowplaying").innerHTML="<b>currently playing</b>"; 
document.getElementById("nowplaying").className="listening"; 
} else {
document.getElementById("nowplaying").innerHTML=`<b>${timeAgo(trackdate)}</b>`;
document.getElementById("nowplaying").className="";
}


let numlen = totalscrobbs.length;
let target = Math.pow(10, numlen - 1);
target = Math.ceil(totalscrobbs / target) * target;
let away = target - totalscrobbs;

if (away === 0) {
target = Math.pow(10, numlen - 1);
target = Math.ceil(totalscrobbs / target + 1) * target;
away = target - totalscrobbs;
}

let final = away*3.5;

if (final >= 1440) {
final = final / 1440;
final = Math.round(final);

final = final + ' whole day' + (final > 1 ? 's' : '');
} else if (final >= 60) {
final = final / 60;
final = Math.round(final);

final = final + ' hour' + (final > 1 ? 's' : '');
} else {
final = Math.round(final);
final = final + ' minutes';
}

const lfmJoinDate = 1720828800;
const dateDiff = Math.round((Date.now() / 1000 - lfmJoinDate) / (60 * 60 * 24));
const songsPerDay = Math.round(totalscrobbs / dateDiff);

let daysNeeded = away / songsPerDay;
daysNeeded = Math.ceil(daysNeeded);

const daysNeededText = daysNeeded + ' day' + (daysNeeded > 1 ? 's' : '');

document.getElementById("goals").innerHTML=
`${totalscrobbs} total scrobbles<br>
(just ${away} more till ${target}!)<br>
(thats around ${final} worth of music)<br>
(itl take about ${daysNeededText} to reach this goal)<br>
(with an average of ${songsPerDay} songs per day)`;


let text = "";
const lastTen = recenttracks.slice(-10);

lastTen.forEach(myFunction);

document.getElementById("previoustracks").innerHTML = text;
 
function myFunction(item, index) {
const trackname = item.name || "";
const albumname = item.album?.["#text"] || "";
const artist = item.artist?.["#text"] || "";
const image = item.image?.[0]?.["#text"] || "";
const fmurl = item.url || "";
const trackdate = item.date?.uts || "";

const shorttrackdate = `[${timeAgoShort(trackdate)}]`;
const funnydate = shorttrackdate.padStart(5, "!"); 
let funnierdate = funnydate.replace(/!/g, "&nbsp;");

const coverid = basename(image);

const cdnurl = `https://cdn.novassite.net/albumcovers/?size=16&format=webp&file=${coverid}&noerror`;

  text += `<i>${funnierdate}</i> <a href="${fmurl}" target="blank"><img style="border-radius:2px;width:16px;height:16px;" src="${cdnurl}" onerror="this.onerror=null;this.src='/media/missing16.jpeg'" "> <span title="${trackname}" class='pastsong'>${trackname}</span> - <span title="${artist}" class='pastartist'>${artist}</span><br>`;
}
// that error handling is fucking ass LMAO
}

setInterval(mainsong, 30000);

mainsong();
