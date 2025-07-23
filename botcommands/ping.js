import { SlashCommandBuilder,MessageFlags } from 'discord.js';
import colors from 'colors';

export default {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('pong'),
    async execute(interaction) {
        await console.log(`${colors.cyan("[Discord]")} command ping has been run by ${interaction.user.tag}`);

        await interaction.reply({ content: `pong`, flags: MessageFlags.Ephemeral});

    },
};

