import 'dotenv/config';
import colors from 'colors';

import { Client, GatewayIntentBits, Collection, ActivityType, Events } from 'discord.js';
import { readdir } from 'fs/promises';
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';

import { MemberJoin } from './botevents/memberjoin.js';
import { MemberLeave } from './botevents/memberleave.js';
import { MessageReply } from './botevents/reply.js';
import { PISS } from './botevents/piss.js';

import { MessageLogger } from './botevents/log-message.js';
import { MemberLogger } from './botevents/log-member.js';
import { UserLogger } from './botevents/log-user.js';

const API_KEY = process.env.DISCORD_API_KEY;

let loggedin = false;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();

async function loadCommands() {
    const commandsPath = path.join(__dirname, 'botcommands');

    async function getAllCommandFiles(dir) {
        const entries = await readdir(dir, { withFileTypes: true });
        const files = await Promise.all(entries.map(async entry => {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                return getAllCommandFiles(fullPath);
            } else if (entry.isFile() && fullPath.endsWith('.js')) {
                return fullPath;
            }
            return null;
        }));
        return files.flat().filter(Boolean);
    }

    const files = await getAllCommandFiles(commandsPath);

    for (const filePath of files) {
        const fileUrl = pathToFileURL(filePath).href;
        const command = (await import(fileUrl)).default;

        if (command?.data?.name && typeof command.execute === 'function') {
            client.commands.set(command.data.name, command);
        } else {
            console.warn(`Invalid command file: ${filePath}`);
        }
    }
}


const brows = [">",""]
const eyes = [":",";"]
const mouths = [")","(","<","3","]","[","O","/","|"]

const randomface = (brows[Math.floor(Math.random() * brows.length)]+eyes[Math.floor(Math.random() * eyes.length)]+mouths[Math.floor(Math.random() * mouths.length)]);

client.once('clientReady', () => {
    const now = new Date();

    console.log(`${colors.blue("[Discord]")} Logged in as ${client.user.tag}`);
    client.user.setPresence({
        activities: [{ name: randomface??":3", type: ActivityType.Custom }],
        status: 'online'
    });
    loggedin = true;
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (err) {
        console.error(err);
        await interaction.reply({ content: 'There was an error running that command.', ephemeral: true });
    }
});

await loadCommands();

async function botLogin() {
if(!API_KEY) {
return console.log(`${colors.red("[ERROR]")} no bot token set for discord bot`);
};

if (process.argv.includes('--nobot')) {
return console.log(`${colors.gray("[Discord]")} not logging into bot`);
}


if (process.argv.includes('--nowait')) {
client.login(API_KEY);
} else {
while (!loggedin) {
await new Promise(r => setTimeout(r, 5000));
client.login(API_KEY);
}
}
}
botLogin();

MemberJoin(client);
MemberLeave(client);
MessageReply(client);
PISS(client);

MessageLogger(client);
MemberLogger(client);
UserLogger(client);

export { client };
