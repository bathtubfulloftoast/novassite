document.addEventListener("DOMContentLoaded", async function() {

    async function weather() {
        const response = await fetch('/api/openweather');
        // const response = await fetch('/weather.json');

        let data = await response.json();

        const location = data.name;
        const cityid = data.id;

        const desc = data.weather?.[0].description;
        const wicon = data.weather?.[0].icon;

        const temp = data.main.temp;
        const tempf = Math.round(temp);
        const tempc = Math.round((temp - 32) * (5/9));

        const activitylist = document.getElementById("weather");
        activitylist.innerHTML = "";

        const blurbwrap = document.createElement("div");
        blurbwrap.className = "blurb";

        const infowrap = document.createElement("div");
        infowrap.className = "infowrap";

        const weathericon = document.createElement("img");
        weathericon.className = "activityimg";
        weathericon.src = `/media/weather/128/${wicon}.png`;

        const activitytype = document.createElement("b");
        activitytype.innerHTML = `Local Weather:<br>`;

        const activityinfo = document.createElement("span");
        activityinfo.innerHTML = `<b>${desc}</b><br>${tempf}&deg;F | ${tempc}&deg;C`;

        blurbwrap.appendChild(activitytype);

        activitylist.appendChild(blurbwrap);
        blurbwrap.appendChild(infowrap);

        infowrap.appendChild(weathericon);
        infowrap.appendChild(activityinfo);

    }


    await weather();
});
