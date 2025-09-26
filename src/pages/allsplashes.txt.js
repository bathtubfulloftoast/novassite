import { promises as fs } from "fs";
import path from "path";

export async function GET() {
    const filePath = path.resolve("src/assets/splashes.txt"); // Adjust based on your project structure
    try {
        const text = await fs.readFile(filePath, "utf-8");
        const splashes = text.split("\n")
        .map(name => name.trim())
        .filter(name => name)
        .map((name, index) => (index+1).toString().padStart(4, " ") + " | " + name);

        // all of this is to make sure people arent downloading thousands of splashes
        const sorted = splashes.sort();
        const textContent = sorted.join("\n");

        const headerstring = `all ${splashes.length} of Novas Splashes!`;
        const headerlen = headerstring.length;

        return new Response(
        `┌${"─".repeat(headerlen+2)}┐\n`+
        `│ ${headerstring} │`+
        `\n└${"─".repeat(headerlen+2)}┘\n\n`+

        textContent
        );
    } catch (error) {
        return new Response("Error: File not found");
    }
}
