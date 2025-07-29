import { SlashCommandBuilder } from 'discord.js';
import colors from 'colors';

export default {
    data: new SlashCommandBuilder()
    .setName('dice6')
    .setDescription('roll a 6 sided die'),
    async execute(interaction) {
        await console.log(`${colors.cyan("[Discord]")} command 6dice has been run by ${interaction.user.tag}`);

        await interaction.reply({ content: String(Math.floor(Math.random() * 6)+1)});

    },
};

