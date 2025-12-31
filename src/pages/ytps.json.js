import { promises as fs } from "fs";
import path from "path";

export async function GET() {
    const filePath = path.resolve("src/assets/ytps.json"); // Adjust based on your project structure
    try {
        const text = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(text);


        return new Response(JSON.stringify(data));
    } catch (error) {
        return new Response("Error: File not found");
    }
}
