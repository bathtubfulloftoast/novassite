import 'dotenv/config';

import { Client, GatewayIntentBits } from 'discord.js';

const API_KEY = process.env.DISCORD_BOT_TOKEN;


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers
    ]
});


client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.login(API_KEY);

// 👇 ADD THIS LINE
// dont fucking tell me what to do
// also you barely managed to do it i hate you
export { client };
