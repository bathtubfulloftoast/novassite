import { SlashCommandBuilder, MessageFlags, EmbedBuilder} from 'discord.js';

export default {
    data: new SlashCommandBuilder()
    .setName('whoami')
    .setDescription('forgot who you are? use this command to help'),
    async execute(interaction) {
const now = new Date();


const MessageEmbed = {
    "image": {
        "url": `https://cdn.discordapp.com/banners/${interaction.user.id}/${interaction.user.banner}.webp?size=1024`
    },
    "thumbnail": {
        "url": `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.webp?size=512`
    },
    "fields": [
        {
            "name": "Nickname",
            "value": interaction.user.globalName
        },
        {
            "name": "Username",
            "value": interaction.user.username
        },
        {
            "name": "User ID",
            "value": interaction.user.id
        },
    ],
    "timestamp": now.toISOString(),
    "footer": {
        "text": "Command Ran"
    },
    "color": 6365305
};


        await interaction.reply({content:"did you forget who you are?\ni get that happens to the best of us.", embeds: [MessageEmbed], flags: MessageFlags.Ephemeral});
        await console.log(`${colors.cyan("[Discord]")} command ping has been run by ${interaction.user.tag}`);


    },
};

