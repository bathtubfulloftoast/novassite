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
    return array;
}


export async function GET() {
    const filePath = path.resolve("src/assets/sites.txt");
    try {
        const text = await fs.readFile(filePath, "utf-8");
        const splashes = text.split("\n").map(name => name.trim()).filter(name => name);
        const shuffled = shuffle(splashes);
        const string = shuffled.join("\n");
        const textContent = btoa(string);

        return new Response(textContent);
    } catch (error) {
        return new Response("Error: File not found");
    }
}
