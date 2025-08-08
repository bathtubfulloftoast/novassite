document.addEventListener("DOMContentLoaded", async function() {

async function weather() {
    const response = await fetch('/api/fm-top');
    let data = await response.json();


let text = "";
data.toptracks.track.forEach(myFunction);

document.getElementById("topsongs").innerHTML = text;

function myFunction(item, index) {
const trackname = item.name || "";
const trackurl = item.url || "";
const plays = item.playcount || "";

text += `<a href="${trackurl}" target="_blank">${trackname}</a> | ${plays} Plays<br>`;
}


}
await weather();
});
