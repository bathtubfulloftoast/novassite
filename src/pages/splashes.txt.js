import { promises as fs } from "fs";
import path from "path";

// this is litterally just for me to test making text files with astro, theres no real reason im doing this.

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


export async function GET() {
    const filePath = path.resolve("src/assets/splashes.txt"); // Adjust based on your project structure
    try {
        const text = await fs.readFile(filePath, "utf-8");
        const splashes = text.split("\n").map(name => name.trim()).filter(name => name);
        const textContent = shuffle(splashes).join("\n");
        return new Response(textContent);
    } catch (error) {
        return new Response("Error: File not found");
    }
}
