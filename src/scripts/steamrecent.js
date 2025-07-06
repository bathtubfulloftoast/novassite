document.addEventListener("DOMContentLoaded", async function() {

async function weather() {
    const response = await fetch('/api/steam-recent');
    let data = await response.json();


let text = "";
data.response.games.forEach(myFunction);

document.getElementById("recentgames").innerHTML = text;

function myFunction(item, index) {
const gamename = item.name || "No Name";
const appid = item.appid || "10";
const playtime = item.playtime_2weeks || 0; // i have this data im gonna use it okay

let playtimeformat = "";
if(playtime > 60) {
playtimeformat = Math.round(playtime/60)+"H";
} else {
playtimeformat = `${playtime}M`;
}

text += `<a href="https://store.steampowered.com/app/${appid}" target="_blank">${gamename}</a> | ${playtimeformat}<br>`;
}


}
await weather();
});
