import 'dotenv/config';
import { Client, GatewayIntentBits, Collection, ActivityType, Events } from 'discord.js';
import { readdir } from 'fs/promises';
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';
const API_KEY = process.env.DISCORD_API_KEY;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers
    ]
});

client.commands = new Collection();

async function loadCommands() {
    const commandsPath = path.join(__dirname, 'botcommands');
    const files = await readdir(commandsPath);

    for (const file of files) {
        if (!file.endsWith('.js')) continue;

        const filePath = path.join(commandsPath, file);
        const fileUrl = pathToFileURL(filePath).href;
        const command = (await import(fileUrl)).default;

        if (command?.data?.name && typeof command.execute === 'function') {
            client.commands.set(command.data.name, command);
        } else {
            console.warn(`Invalid command file: ${file}`);
        }
    }
}

client.once('ready', () => {
    const now = new Date();

    console.log(`Logged in as ${client.user.tag}`);
    client.user.setPresence({
        activities: [{ name: `:3`, type: ActivityType.Custom }],
        status: 'online'
    });
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

// setTimeout(() => {
//     client.login(API_KEY);
// }, 5000);
client.login(API_KEY);

export { client };
