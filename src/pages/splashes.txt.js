import { promises as fs } from "fs";
import path from "path";

// this is no longer just for me to test making text files with astro
// i really like adding splashes...

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
const now = new Date();
const month = now.getMonth()+1;
// const month = 12;

const dir = "src/assets/";
    const splash = path.resolve(dir+"splashes.txt"); // Adjust based on your project structure
    const splash_hal = path.resolve(dir+"splashes-hal.txt"); // sppooooky >:)
    const splash_chr = path.resolve(dir+"splashes-chrim.txt"); // sppooooky >:)

    try {
        const text = await fs.readFile(splash, "utf-8");
        const splashes = text.split("\n").map(name => name.trim());

        const text_hal = await fs.readFile(splash_hal, "utf-8");
        const splashes_hal = text_hal.split("\n").map(name => name.trim());

        const text_chr = await fs.readFile(splash_chr, "utf-8");
        const splashes_chr = text_chr.split("\n").map(name => name.trim());

let maxsplash = 150;
if(month == 10 || month == 12) {
maxsplash = 100;
}


        const hcut = splashes_hal.filter((word) => word.length < 85).filter((word) => word.length > 2);
        const hshuffle = shuffle(hcut);
        const hslice = hshuffle.slice(0,maxsplash);

        const ccut = splashes_chr.filter((word) => word.length < 85).filter((word) => word.length > 2);
        const cshuffle = shuffle(ccut);
        const cslice = cshuffle.slice(0,maxsplash);

        const cut = splashes.filter((word) => word.length < 85).filter((word) => word.length > 2);
        const shuffled = shuffle(cut);
        const sliced = shuffled.slice(0,maxsplash);


        if (month == 10) {
        sliced.push.apply(sliced, hslice);
        } else if (month == 12) {
        sliced.push.apply(sliced, cslice);
        }

        const textContent = sliced.join("\n")

        return new Response(textContent);
    } catch (error) {
        return new Response(error);
    }
}
