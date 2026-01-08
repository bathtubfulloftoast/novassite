import { promises as fs } from "fs";
import path from "path";
import Papa from 'papaparse';

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
    const filePath = path.resolve("src/assets/ytps.csv"); // Adjust based on your project structure
    try {
        const text = await fs.readFile(filePath, "utf-8");
        const data = Papa.parse(text.trim(), {header:true}).data;
        const shuffled = shuffle(data);
        return new Response(JSON.stringify(shuffled));

    } catch (error) {
        return new Response(error);
    }
}
