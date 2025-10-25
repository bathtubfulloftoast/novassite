import { SlashCommandBuilder,MessageFlags,EmbedBuilder } from 'discord.js';
import colors from 'colors';
import fs from 'fs/promises';

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


try {
    // Read file contents
    const text = await fs.readFile('./cache/dmdeny.txt', 'utf-8');
    const users = text.split('\n').filter(Boolean);

    // Check if user is already listed
    if (users.includes(attacheduser.id)) {
        return interaction.reply({
            content: `<@${attacheduser.id}> has warns disabled.`,
            flags: MessageFlags.Ephemeral,
        });
    }
} catch (error) {
console.error(error);
}

        const serverEmbed = {
            "color": 16711680,
            "title": `❌ *${attacheduser.username} has been warned*`,
        }

        const messageEmbed = {
            "color": 16711680,
            "title": `You have been warned in ***${interaction.guild.name}***`,
            "description": `\`\`\`${input}\`\`\`\nnote: there are no consequences to you seeing this message you are just getting annoyed by **${interaction.user.username}**\n\nto disable run \`\`/warn-disable\`\``,
            "thumbnail": {
                "url": `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp?size=1024`
            }
        }

        console.log();


        await interaction.reply({embeds: [serverEmbed]});
        await attacheduser.send({embeds: [messageEmbed]});

    },
};

