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


export async function GET() {
    const filePath = path.resolve("src/assets/ytps.csv"); // Adjust based on your project structure
    try {
        const text = await fs.readFile(filePath, "utf-8");
        const json = csvJSON(text.trim());
        const data = JSON.parse(json);
        const shuffled = shuffle(data);
        return new Response(JSON.stringify(data));

    } catch (error) {
        return new Response(error);
    }
}
