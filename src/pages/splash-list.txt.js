import { promises as fs } from "fs";
import path from "path";

export async function GET() {
    const dir = "src/assets/";
    const splashfile = path.resolve(dir+"splashes.txt"); // Adjust based on your project structure
    const splashfile_hal = path.resolve(dir+"splashes-hal.txt");
    const splashfile_chr = path.resolve(dir+"splashes-chrim.txt");

    try {
        const text = await fs.readFile(splashfile, "utf-8");
        const text_h = await fs.readFile(splashfile_hal, "utf-8");
        const text_c = await fs.readFile(splashfile_chr, "utf-8");

        const splashes = text.split("\n")
        .map(name => name.trim())
        .filter(name => name)
        .map((name, index) => (index+1).toString().padStart(4, " ") + " | " + name);

        const splashes_hal = text_h.split("\n")
        .map(name => name.trim())
        .filter(name => name)
        .map((name, index) => (index+1).toString().padStart(4, " ") + " | " + name);

        const splashes_chr = text_c.split("\n")
        .map(name => name.trim())
        .filter(name => name)
        .map((name, index) => (index+1).toString().padStart(4, " ") + " | " + name);

        // all of this is to make sure people arent downloading thousands of splashes
        const Content = splashes.join("\n");
        const Content_h = splashes_hal.join("\n");
        const Content_c = splashes_chr.join("\n");

        const headerstring = `all ${splashes.length+splashes_hal.length+splashes_chr.length} of Novas Splashes!`;
        const headerlen = headerstring.length;

        return new Response(
        `┌${"─".repeat(headerlen+2)}┐\n`+
        `│ ${headerstring} │`+
        `\n└${"─".repeat(headerlen+2)}┘`+

        '\n\n== Regular Splashes ==\n'+
        Content+

        '\n\n== Halloween Splashes ==\n'+
        Content_h+

        '\n\n== Christmas Splashes ==\n'+
        Content_c
        );
    } catch (error) {
        return new Response(error);
    }
}
