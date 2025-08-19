document.getElementById("virus").addEventListener("click", (event) => {
event.preventDefault();
document.body.innerHTML = "get haxxed";
document.body.style.backgroundColor = "#000";
document.body.style.color = "#fff";
document.head.innerHTML = "";
document.title = "lol";
});
