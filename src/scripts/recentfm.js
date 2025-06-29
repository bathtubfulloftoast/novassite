document.addEventListener("DOMContentLoaded", async function() {

    async function weather() {
        const response = await fetch('/api/fm-recent');
        let data = await response.json();


        let text = "";
        const lastfew = data.recenttracks.track.slice(-5);

        lastfew.forEach(myFunction);
        document.getElementById("recentsongs").innerHTML = text;

        function myFunction(item, index) {
            const trackname = item.name || "";
            const trackurl = item.url || "";

            text += `<a href="${trackurl}" target="_blank">${trackname}</a><br>`;
        }


    }
    await weather();
});
