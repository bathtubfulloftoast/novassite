document.addEventListener("DOMContentLoaded", async function() {
const response = await fetch('/api/openweather');
// const response = await fetch('/openweather.json');

let data = await response.json();

const location = data.name;
const cityid = data.id;

const desc = data.weather?.[0].description;
const wicon = data.weather?.[0].icon;

const temp = data.main.temp;
const tempf = Math.round(temp);
const tempc = Math.round((temp - 32) * (5/9));

var weatherimage = document.getElementById("wimg");
var weatherlink = document.getElementById("wlnk");

document.getElementById("wtmp").innerHTML = `${tempf}&deg;F`;
weatherlink.title = tempc+"°C"; // stupid

weatherimage.src = `/media/weather/16/${wicon}.png`;
weatherlink.href = `https://openweathermap.org/city/${cityid}`;

});
