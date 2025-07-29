import { SlashCommandBuilder } from 'discord.js';
import colors from 'colors';

export default {
    data: new SlashCommandBuilder()
    .setName('dice8')
    .setDescription('roll a 8 sided die'),
    async execute(interaction) {
        await console.log(`${colors.cyan("[Discord]")} command 8dice has been run by ${interaction.user.tag}`);

        await interaction.reply({ content: String(Math.floor(Math.random() * 8)+1)});

    },
};

