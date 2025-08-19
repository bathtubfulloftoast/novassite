const amongusvideos = [
"Ns3YxbIhTRM",
"yIHa5cjuTBk",
"PShRULA8sOY",
"6yvfU8xK_VQ",
"GYtBoxGB6Wo",
"KByREO4gB0M",
"oZ-51rj2_WI",
"4kzxy8eIjLI",
"SB0jgNzKMSo"
];

const max = amongusvideos.length;

document.getElementById("amongus").addEventListener("click", function(event) {
event.preventDefault();
const id = Math.floor(Math.random() * max);
let url = 'https://youtu.be/'+amongusvideos[id];

window.open(url, '_blank');// sus sus...
})
