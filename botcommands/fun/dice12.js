import { SlashCommandBuilder } from 'discord.js';
import colors from 'colors';

export default {
    data: new SlashCommandBuilder()
    .setName('dice12')
    .setDescription('roll a 12 sided die'),
    async execute(interaction) {
        await console.log(`${colors.cyan("[Discord]")} command 12dice has been run by ${interaction.user.tag}`);

        await interaction.reply({ content: String(Math.floor(Math.random() * 12)+1)});

    },
};

