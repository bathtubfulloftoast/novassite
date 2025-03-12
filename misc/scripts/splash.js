document.addEventListener('DOMContentLoaded', async function() {
  let cachedsplash;

  async function getlinks() {
    if (!cachedsplash) {
      const response = await fetch('/misc/media/splashes.txt');
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
  document.getElementById("splash").innerHTML = cachedsplash;
});
