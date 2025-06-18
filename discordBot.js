import 'dotenv/config';

import { Client, GatewayIntentBits,ActivityType } from 'discord.js';

const API_KEY = process.env.DISCORD_API_KEY;

var now = new Date();
var day = String(now.getDate());
var month = String(now.getMonth() + 1); //January is 0!
var year = now.getFullYear();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers
    ]
});


client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setPresence({
        activities: [
            { name: `site running since ${month}/${day}/${year}`, type: ActivityType.Custom },
        ],
        status: 'dnd'
    });

});

client.login(API_KEY);

// 👇 ADD THIS LINE
// dont fucking tell me what to do
// also you barely managed to do it i hate you
export { client };
