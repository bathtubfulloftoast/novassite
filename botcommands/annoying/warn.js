import { SlashCommandBuilder,MessageFlags,EmbedBuilder } from 'discord.js';
import colors from 'colors';

export default {
    data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('give someone a warning that they did something bad')
    .addUserOption(option =>
    option.setName('user')
    .setDescription('bad guy')
    .setRequired(true))
    .addStringOption(option =>
    option.setName('reason')
    .setDescription('what happed')
    .setRequired(true)),

    async execute(interaction) {
        await console.log(`${colors.cyan("[Discord]")} command warn has been run by ${interaction.user.tag}`);

        const attacheduser =  interaction.options.getUser('user');
        const input = interaction.options.getString('reason');

        const serverEmbed = {
            "color": 16711680,
            "title": `❌ *${attacheduser.username} has been warned*`,
        }

        const messageEmbed = {
            "color": 16711680,
            "title": `You have been warned in **${interaction.guild.name}**`,
            "description": `\`\`\`${input}\`\`\``,
            "thumbnail": {
                "url": `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp?size=1024`
            }
        }

        console.log();


        await interaction.reply({embeds: [serverEmbed]});
        await attacheduser.send({embeds: [messageEmbed]});

    },
};

