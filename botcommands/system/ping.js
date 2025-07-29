import { SlashCommandBuilder,MessageFlags } from 'discord.js';
import colors from 'colors';

export default {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('pong'),
    async execute(interaction) {
        await console.log(`${colors.cyan("[Discord]")} command ping has been run by ${interaction.user.tag}`);

        const delay = Date.now() - interaction.createdTimestamp;

        await interaction.reply({ content: `Pong!\n\`\`Latency: ${delay}ms\`\``, flags: MessageFlags.Ephemeral});

    },
};

