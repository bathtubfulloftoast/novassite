document.addEventListener("DOMContentLoaded", async function() {

    async function weather() {
        const response = await fetch('/api/stats');
        // const response = await fetch('/stats.json');
        let data = await response.json();

        const average = array => array.reduce((a, b) => a + b) / array.length;
        // https://stackoverflow.com/a/41452260/20960756

const uptime = data.uptime.server_ms;

let time = "0ms";

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const month = day * 4;

if (uptime >= month) {
time = Math.floor(uptime/month);
time = time + ' month' + (time > 1 ? 's' : '');
} else if (uptime >= week) {
time = Math.floor(uptime/week);
time = time + ' week' + (time > 1 ? 's' : '');
} else if (uptime >= day) {
time = Math.floor(uptime/day);
time = time + ' day' + (time > 1 ? 's' : '');
} else if (uptime >= hour) {
time = Math.floor(uptime/hour);
time = time + ' hour' + (time > 1 ? 's' : '');
} else if (uptime >= minute) {
time = Math.floor(uptime/minute);
time = time + ' minute' + (time > 1 ? 's' : '');
} else if (uptime >= second) {
time = Math.floor(uptime/second);
time = time + ' second' + (time > 1 ? 's' : '');
} else {
time = uptime + ' millisecond' + (uptime > 1 ? 's' : '');

}

        document.getElementById("serverstats").innerHTML = `<b>Server Stats:</b><br>
        server up for: ${time}<br>
        cpu temp: ${data.cputemp}&deg;C<br>
        loadavg: ${average(data.loadavg).toFixed(2)}`;


    }
    await weather();
});
