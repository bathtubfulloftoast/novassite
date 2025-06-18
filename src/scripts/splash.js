document.addEventListener('DOMContentLoaded', async function() {

  var now = new Date();
  var dd = String(now.getDate());
  var mm = String(now.getMonth() + 1); //January is 0!
  var yyyy = now.getFullYear();

  function thanksgiving(theyear) {
    const lastOfNov = new Date(theyear, 10, 30).getDay();
    const turkyDay = (lastOfNov >= 4 ? 34 : 27) - lastOfNov;
    return `11/${turkyDay}`;
  }
// stolen from https://forum.freecodecamp.org/t/how-to-calculate-when-is-thanks-giving-day-in-javascript/247187/3

const currentdate = `${mm}/${dd}`;

  let cachedsplash;

  const holidays = {
    "6/9":"happy birthday alice!!", // im the first one cus im so great ;3
    "12/31": `${yyyy+1} is upon us...`,
    "1/1": "HAPPY NEW YEAR!!!",
    "7/4": "AMERICA FUCK YEAHHH!",
    [thanksgiving(yyyy)]: "happy turkey day :D", // no idea if this one works i just kind of smashed my head against a table here
    "3/17":"its saint patrick's day! :D", // we really dont gaf its not a major holiday
    "12/24":"santa approaches",
    "12/25":"MERRRYYY CHRIMAAAA",
    "10/31":"AAH",
    "9/11":"i forgor",// never forgor
    "4/1":"i am a fool...",
    "11/01":"shes defrosting...",// iiiiiiiiiiiiiiii dont want aaalott for christmasss....
    "2/14":"i love you"

}

  async function getlinks() {
    if (!cachedsplash) {
      const response = await fetch('/splashes.txt');
      const text = await response.text();
      const splashes = text.split("\n").map(name => name.trim()).filter(name => name);
      const maxsplash = splashes.length;
      const splashid = Math.floor(Math.random() * maxsplash);
      cachedsplash = splashes[splashid];
    }
    return cachedsplash;
  }

  // Ensure you await getlinks() if you're logging the cachedsplash value
  cachedsplash = await getlinks();

  const splashText = holidays[currentdate] || cachedsplash;

  document.getElementById("splash").innerHTML = splashText;
  document.title = splashText;
});
