import { SlashCommandBuilder } from 'discord.js';
import { MessageFlags } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('pong'),
    async execute(interaction) {
        await console.log(`command ping has been run by ${interaction.user.tag}`);

        await interaction.reply({ content: `pong`, flags: MessageFlags.Ephemeral});

    },
};

