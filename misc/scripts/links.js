let cachedlinks = null;

async function getlinks() {
if (!cachedlinks) {
const response = await fetch('/links.json');
cachedlinks = await response.json();
}
return cachedlinks;
}

document.addEventListener("DOMContentLoaded", async function() {

async function badges() {
const links = await getlinks();
let text = "";

links?.[0].forEach(myFunction);

document.getElementById("badges").innerHTML = text;

function myFunction(item, index) {
 text += `<a title="${item.title}" href="${item.url}" target="blank" ><img src="/misc/media/badges/${item.source}"></a>`;

}
}

async function stamps() {
const links = await getlinks();
let text = "";

links?.[1].forEach(myFunction);

document.getElementById("stamps").innerHTML = text;

function myFunction(item, index) {
 text += `<a title="${item.title}" href="${item.url}" target="blank" ><img src="/misc/media/stamps/${item.source}"></a>`;

}
}

async function links() {
const links = await getlinks();
let text = "";

links?.[2].forEach(myFunction);

document.getElementById("links").innerHTML = text;

function myFunction(item, index) {
 text += `<div class='link'><a href='${item.url}'><i title='${item.title}' class='${item.source}'></i></a></div>`;

}
}

await badges();
await stamps();
await links();
});
