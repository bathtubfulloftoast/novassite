import { promises as fs } from "fs";
import path from "path";

// simple code to kind of prevent very basic web scraping
// also cus i wanan

export async function GET() {
    const filePath = path.resolve("src/assets/sites.txt"); // Adjust based on your project structure
    try {
        const text = await fs.readFile(filePath, "utf-8");
        const encodedStr = btoa(text);
        return new Response(encodedStr);
    } catch (error) {
        return new Response("Error: File not found");
    }
}
