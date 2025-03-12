document.addEventListener("DOMContentLoaded", async function() {

    async function weather() {
        const response = await fetch('https://cdn.novassite.net/apis/openweather.php');
        data = await response.json();

        const location = data.name;
        const cityid = data.id;

        const desc = data.weather?.[0].description;
        const wicon = data.weather?.[0].icon;

        const temp = data.main.temp;
        const tempf = Math.round(temp);
        const tempc = Math.round((temp - 32) * (5/9));

        document.getElementById("location").innerHTML = `Weather for ${location}`;
        document.getElementById("location").href=`https://openweathermap.org/city/${cityid}`;

        document.getElementById("wdes").innerHTML = desc;
        document.getElementById("temps").innerHTML = `${tempf}&deg;F|${tempc}&deg;C<br>`;

        var coverimage = document.getElementById("wico");
        coverimage.src = `/misc/media/weather/256/${wicon}.png`;
    }


    await weather();
});
