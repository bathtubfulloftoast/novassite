import { SlashCommandBuilder } from 'discord.js';
import colors from 'colors';

export default {
    data: new SlashCommandBuilder()
    .setName('dice20')
    .setDescription('roll a 20 sided die'),
    async execute(interaction) {
        await console.log(`${colors.cyan("[Discord]")} command 20dice has been run by ${interaction.user.tag}`);

        await interaction.reply({ content: String(Math.floor(Math.random() * 20)+1)});

    },
};

