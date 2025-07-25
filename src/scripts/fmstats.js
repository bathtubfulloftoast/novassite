document.addEventListener("DOMContentLoaded", async function() {

    async function weather() {
        const response = await fetch('/api/fm-recent');
        // const response = await fetch('/weather.json');

        let data = await response.json();

        const totalscrobbs = data.recenttracks?.['@attr'].total;

        let numlen = totalscrobbs.length;
        let target = Math.pow(10, numlen - 1);
        target = Math.ceil(totalscrobbs / target) * target;
        let away = target - totalscrobbs;

        if (away === 0) {
            target = Math.pow(10, numlen - 1);
            target = Math.ceil(totalscrobbs / target + 1) * target;
            away = target - totalscrobbs;
        }

        let final = away*3.5;

        if (final >= 1440) {
            final = final / 1440;
            final = Math.round(final);

            final = final + ' whole day' + (final > 1 ? 's' : '');
        } else if (final >= 60) {
            final = final / 60;
            final = Math.round(final);

            final = final + ' hour' + (final > 1 ? 's' : '');
        } else {
            final = Math.round(final);
            final = final + ' minutes';
        }

        const lfmJoinDate = 1720828800;
        const dateDiff = Math.round((Date.now() / 1000 - lfmJoinDate) / (60 * 60 * 24));
        const songsPerDay = Math.round(totalscrobbs / dateDiff);

        let daysNeeded = away / songsPerDay;
        daysNeeded = Math.ceil(daysNeeded);

        const daysNeededText = daysNeeded + ' day' + (daysNeeded > 1 ? 's' : '');

        document.getElementById("fmstats").innerHTML = `${totalscrobbs} total scrobbles<br>
        im only ${away} away from ${target}!<br>
        thats about ${final} worth of music...<br>
        itl take me about ${daysNeededText} to reach my goal<br>
        (with an average of ${songsPerDay} songs per day)`;

    }


    await weather();
});
