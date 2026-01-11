export function createicon({src:Isrc,title:IconTitle}) {
const wrapper = document.getElementById("icons");

const icon = document.createElement('div');
icon.className = "icon";

const image = document.createElement('img');
image.src="/media/icons/"+Isrc;
image.alt=IconTitle;

const title = document.createElement('span');
title.innerHTML="<br>"+IconTitle;

wrapper.prepend(icon);
icon.appendChild(image);
icon.appendChild(title);

return icon;
}
