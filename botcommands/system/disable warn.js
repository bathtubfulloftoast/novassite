import { SlashCommandBuilder, MessageFlags } from 'discord.js';
import colors from 'colors';
import fs from 'fs/promises';

const file = './cache/dmdeny.txt';

export default {
    data: new SlashCommandBuilder()
    .setName('warn-disable')
    .setDescription('Disable warnings if they’re getting annoying'),

    async execute(interaction) {
        console.log(`${colors.cyan('[Discord]')} command disable warn has been run by ${interaction.user.tag}`);

        try {
            try {
                await fs.access(file);
            } catch {
                await fs.writeFile(file, '');
            }

            // Read file contents
            const text = await fs.readFile(file, 'utf-8');
            const users = text.split('\n').filter(Boolean);

            // Check if user is already listed
            if (users.includes(interaction.user.id)) {
                return interaction.reply({
                    content: 'You are already in the deny list.',
                    flags: MessageFlags.Ephemeral,
                });
            }

            // Append user ID
            await fs.appendFile(file, `${interaction.user.id}\n`);
            return interaction.reply({
                content: 'Successfully added you to the deny list.',
                flags: MessageFlags.Ephemeral,
            });
        } catch (error) {
            console.error(error);
            return interaction.reply({
                content: 'An error occurred while updating the deny list. Please try again later.',
                flags: MessageFlags.Ephemeral,
            });
        }
    },
};
