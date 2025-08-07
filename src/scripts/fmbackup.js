document.addEventListener("DOMContentLoaded", async function() {

    async function weather() {
        const discordResponse = await fetch('/api/discord');
        // const fmResponse = await fetch('/fm-recent.json');
        const discordData = await discordResponse.json();


        const status = discordData.status;

        const activitylist = document.getElementById("activities");
        activitylist.innerHTML = "";

        const blurbwrap = document.createElement("div");
        blurbwrap.className = "blurb";

        const infowrap = document.createElement("div");
        infowrap.className = "infowrap";

        const activitytype = document.createElement("b");
        activitytype.innerHTML = `last.fm:<br>`;

        const activityinfo = document.createElement("span");
        const activityimg = document.createElement('img');


        if(status !== "online") {
        const fmResponse = await fetch('/api/fm-recent');
        // const fmResponse = await fetch('/fm-recent.json');
        const fmData = await fmResponse.json();

        for (var item of fmData.recenttracks.track) {
        if (item?.['@attr']?.nowplaying) {

        activityinfo.innerHTML = `<a href="${item.url}" target="_top">${item.name || ""}<br>${item.artist?.["#text"] || ""}</a><br>`;
        activityimg.src = item.image?.[3]?.["#text"];
        activityimg.className = "activityimg";

        infowrap.appendChild(activityimg);

        activityimg.onerror = function () {
        activityimg.src = '/media/missing_activity.webp';
        };
        blurbwrap.appendChild(activitytype);
        infowrap.appendChild(activityinfo);

        activitylist.appendChild(blurbwrap);
        blurbwrap.appendChild(infowrap);
        break;

        updateActivityTime();
        setInterval(updateActivityTime, 1000);

        // Initial call
        updateActivityTime();

        // Update every second
        setInterval(updateActivityTime, 1000);
        }
        }

        }


    }
    await weather();
});
