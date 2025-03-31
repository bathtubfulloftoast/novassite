let cachedSites = null;

async function getSites() {
    if (!cachedSites) {
        const response = await fetch('/sites.txt');
        const encodedtext = await response.text();
        const text = atob(encodedtext);
        cachedSites = text.split("\n").map(name => name.trim()).filter(name => name);
    }
    return cachedSites;
}

async function randomsite() {
    const sites = await getSites();
    const maxsites = sites.length;
    if (maxsites === 0) return;
    const siteid = Math.floor(Math.random() * maxsites);
    let url = sites[siteid];
    window.open(`//${url}`, '_blank').focus();
}

document.getElementById("randomsite").addEventListener("click", function(event) {
    event.preventDefault();
    randomsite();
});
