import { promises as fs } from "fs";
import path from "path";


function shuffle(array) {
    let currentIndex = array.length;

    while (currentIndex !== 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }
    return array; // Add this line to return the shuffled array
}

// Source - https://stackoverflow.com/a
// Posted by Wesley Smith, modified by community. See post 'Timeline' for change history
// Retrieved 2026-01-07, License - CC BY-SA 4.0

//var csv is the CSV file with headers
function csvJSON(csv){

    var lines=csv.split("\n");

    var result = [];

    var headers=lines[0].split(",");

    for(var i=1;i<lines.length;i++){

        var obj = {};
        var currentline=lines[i].split(",");

        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);

    }

    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
}

// hello and welcome to defining this so i hopefully dont forget what this is about like i did last night
// okay to get on this list you must be one of these things
// 1. a litterally YTP/YTPMV
// 2. funnier old video that was for sure a shitpost or just "fits the theme" (ex: Rainbow Road, machine gun grandma)
// 3. a mashup shitpost (ex: [BIG SHOT]'s World, OPPA SPAMTON STYLE)
// 4. rarely allowed: an old video that should inflict pain due to "ow im old" (ex: Nyan Cat - Genre Hopping)
// none of this actually matters its just kind of how my internal thought process is.

// also this is done this way instead of just a regular txt file because i would like to know what to look for in case a video is deleted.
// also cause the users gonna find out what video theyre watching pretty fast tbh

export async function GET() {
    const filePath = path.resolve("src/assets/ytps.csv"); // Adjust based on your project structure
    try {
        const text = await fs.readFile(filePath, "utf-8");
        const json = csvJSON(text.trim());
        const data = JSON.parse(json);
        const splashes = data.map((item) => (item.id)).toString();

        const split = splashes.split(",").map(name => name.trim()).filter(name => name);

        const shuffled = shuffle(split);
        const textContent = shuffled.join("\n");

        return new Response(textContent);

    } catch (error) {
        return new Response(error);
    }
}
