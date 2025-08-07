document.addEventListener("DOMContentLoaded", async function() {

    async function weather() {
        const response = await fetch('/api/fm-recent');
        let data = await response.json();


        let text = "";

        data.recenttracks.track.forEach(myFunction);
        document.getElementById("recentsongs").innerHTML = text;

        function myFunction(item, index) {
            const trackname = item.name || "no name";
            const trackurl = item.url || "https://www.last.fm";
            const nowplaying = item?.['@attr']?.nowplaying;

            if(!nowplaying) {
            text += `<a href="${trackurl}" target="_blank">${trackname}</a><br>`;
            }
        }


    }
    await weather();
});
