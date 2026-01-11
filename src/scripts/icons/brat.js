import {createicon} from "/src/scripts/icon.js";

const now = new Date();
const month = now.getMonth();
const charli = createicon({src:"bort.png",title:"brat.summer"});

if (month == 5 || month == 6) {
charli.addEventListener("click", function(event) {
event.preventDefault();
const eminem = document.createElement('div'); // get it like the rapper.. its the wrapper.... yehhhh... yeahh you get it :)
eminem.style.zIndex = 150;
eminem.style.width = "100vw";
eminem.style.height = "100vh";
eminem.style.position = "absolute";
eminem.style.left = 0;
eminem.style.top = 0;
eminem.style.display = "flex";
eminem.style.justifyContent = "center";
eminem.style.alignItems = "center";
eminem.style.background = "#8bcf00";

const imageElement = document.createElement('img');
imageElement.src = "/media/brat.png";
imageElement.style.zIndex = 151;

eminem.appendChild(imageElement);
document.body.appendChild(eminem);

const bump = new Audio("/media/sfx/bumpnthat.ogg");
bump.play();

bump.addEventListener('ended', (event) => {
eminem.remove()
});

})
} else {
charli.remove();
}
