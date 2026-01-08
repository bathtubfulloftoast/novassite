export async function splash() {
  var now = new Date();
  var day = String(now.getDate());
  var month = String(now.getMonth() + 1); // JANUARY AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
  var year = now.getFullYear();
  let time = "0 seconds";

  function thanksgiving(theyear) {
    const lastOfNov = new Date(theyear, 10, 30).getDay();
    const turkyDay = (lastOfNov >= 4 ? 34 : 27) - lastOfNov;
    return `11/${turkyDay}`;
  }
// stolen from https://forum.freecodecamp.org/t/how-to-calculate-when-is-thanks-giving-day-in-javascript/247187/3

const currentdate = `${month}/${day}`;
const counttime = new Date(`${year+1}-01-01 00:00`);

// console.log(counttime);
if(currentdate == "12/31") {

    const nowsequal = new Date();
    const uptime = counttime-nowsequal;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;


     if (uptime >= hour) {
      time = Math.floor(uptime/hour);
      time = time+1;
      time = time + ' hour' + (time > 1 ? 's' : '');
    } else if (uptime >= minute) {
      time = Math.floor(uptime/minute);
      time = time+1;
      time = time + ' minute' + (time > 1 ? 's' : '');
    } else {
      time = Math.floor(uptime/second);
      time = time+1;
      time = time + ' second' + (time > 1 ? 's' : '');
    }

    if (uptime < 0) {
    time="HAPPY NEW YEAR!!!";
    } else {
    time = `${time} till ${year+1}..`;
    }

    return time;
};

  const holidays = {
    "6/9":"HAPPY BIRTHDAY!!", // im the first one cus im so great ;3
    "1/1": "HAPPY NEW YEAR!!!",
    "7/4": "the british",
    [thanksgiving(year)]: "happy turkey day :D", // no idea if this one works i just kind of smashed my head against a table here
    "3/17":"its saint patrick's day! :D", // we really dont gaf its not a major holiday
    "12/24":"i can hear the sleigh bells ringing...",
    "12/25":"MERRRYYY CHRIMAAAA",
    "10/31":"HAPPY HALLOWEEN!!",
    "9/11":"i forgor",// never forgor
    "4/1":"i am a fool...",
    "11/01":"shes defrosting...",// iiiiiiiiiiiiiiii dont want aaalott for christmasss....
    "2/14":"i love you"

}

      const response = await fetch('/splashes.txt');
      const text = await response.text();
      const splashes = text.split("\n").map(name => name.trim()).filter(name => name);
      const maxsplash = splashes.length;
      const splashid = Math.floor(Math.random() * maxsplash);


      const splashText = holidays[currentdate]||splashes[splashid];
      return splashText;
};
