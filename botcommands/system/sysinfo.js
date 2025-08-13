import { SlashCommandBuilder, MessageFlags, EmbedBuilder} from 'discord.js';
import colors from 'colors';
import 'dotenv/config';
import os from 'os';
import si from 'systeminformation';

let PUT; // Process UpTime
let OUT; // OS UpTime
let OStamp;
let PStamp;


export default {
    data: new SlashCommandBuilder()
    .setName('sysinfo')
    .setDescription('System Info'),
    async execute(interaction) {
const now = new Date();

PUT = process.uptime();
OUT = os.uptime();

PUT = PUT*1000;
OUT = OUT*1000;

PUT = Math.floor(PUT);
OUT = Math.floor(OUT);

OStamp = now-OUT;
PStamp = now-PUT;

OStamp = Math.floor(OStamp/1000); // convert these to seconds because this way is jank asf
PStamp = Math.floor(PStamp/1000);

async function getOS() {
    try {
        const data = await si.osInfo();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getSYS() {
    try {
        const data = await si.system();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getBB() {
    try {
        const data = await si.baseboard();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getCPU() {
    try {
        const data = await si.cpu();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getCPUTEMP() {
    try {
        const data = await si.cpuTemperature();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const osinfo = await getOS();
const sysinfo = await getSYS(); // OH MY GOD SHE SAID THE THING
const bboard = await getBB();
const cpudata = await getCPU();
const cputemp = await getCPUTEMP();


const MessageEmbed = [
{
    "title": "operating system",
    "color": 15105570,
    "description": "info about the systems os",
    "fields": [
        {
            "name": "hostname",
            "value": osinfo.hostname
        },
        {
            "name": "platform",
            "value": osinfo.platform
        },
        {
            "name": "distro",
            "value": osinfo.distro
        },
        {
            "name": "release",
            "value": osinfo.release
        },
        {
            "name": "build",
            "value": osinfo.build
        }
    ]
},

{
    "title": "device manufacturer",
    "color": 15277667,
    "description": "information about the physical device (if its prebuilt)",
    "fields": [
        {
            "name": "manufacturer",
            "value": sysinfo.manufacturer
        },
        {
            "name": "model",
            "value": sysinfo.model
        }
    ]
},

{
    "title": "motherboard",
    "color": 3066993,
    "description": "info about the motherboard",
    "fields": [
        {
            "name": "manufacturer",
            "value": bboard.manufacturer
        },
        {
            "name": "model",
            "value": bboard.model
        }
    ]
},

{
    "title": "cpu info",
    "description": "current information about the cpu",
    "color": 3447003,
    "fields": [
        {
            "name": "manufacturer",
            "value": cpudata.manufacturer
        },
        {
            "name": "vendor",
            "value": cpudata.vendor
        },
        {
            "name": "brand",
            "value": cpudata.brand
        },
        {
            "name": "speed",
            "value": `${cpudata.speed} GHZ`
        },
        {
            "name": "cores",
            "value": cpudata.cores
        },
        {
            "name": "temps",
            "value": `${Math.round(cputemp.main)} °C` // it says it grabs in c but i have no idea
        }
    ]
},

{
    "title": "uptime",
    "color": 15158332,
    "description": "how long the system has been powered on.",
    "fields": [
        {
            "name": "system",
            "value": `<t:${OStamp}:R>`
        },
        {
            "name": "process",
            "value": `<t:${PStamp}:R>`
        }
    ]
}
];


        await interaction.reply({content:"you wanna know about little ol me?", embeds: MessageEmbed, flags: MessageFlags.Ephemeral});
        await console.log(`${colors.cyan("[Discord]")} command sysinfo has been run by ${interaction.user.tag}`);


    },
};

