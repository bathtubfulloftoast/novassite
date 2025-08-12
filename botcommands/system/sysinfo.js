import { SlashCommandBuilder, MessageFlags, EmbedBuilder} from 'discord.js';
import colors from 'colors';
import 'dotenv/config';
import os from 'os';
const port = process.env.PORT;
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

        const response = await fetch(`http://localhost:${port}/deviceinfo.json`);
        let data = await response.json();

        const MessageEmbed = {
            "description": `info about the server hosting \`\`${interaction.client.user.tag}\`\``,
            "title": interaction.client.user.username,
            "image": {
                "url": ""
            },
            "thumbnail": {
                "url": `https://cdn.discordapp.com/avatars/${interaction.client.user.id}/${interaction.client.user.avatar}.webp?size=512`
            },
            "color": 5184100,
            "fields": [
                {"name": "Server Powered On", "value": `<t:${OStamp}:R>`},
                {"name": "Process Started", "value": `<t:${PStamp}:R>`},
                {"name": "Device", "value": data.system.model},
                {"name": "Hostname", "value": data.os.hostname},
                {"name": "OS", "value": data.os.distro+" "+data.os.release},
                {"name": "CPU", "value": data.cpu.brand+" @"+data.cpu.speed+"GHZ"}
            ],
            "timestamp": now.toISOString(),
            "footer": {
                "text": "Command Ran"
            }
        }


        await interaction.reply({ embeds: [MessageEmbed], flags: MessageFlags.Ephemeral});
        await console.log(`${colors.cyan("[Discord]")} command sysinfo has been run by ${interaction.user.tag}`);


    },
};

