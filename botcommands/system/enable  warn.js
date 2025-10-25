import { SlashCommandBuilder, MessageFlags } from 'discord.js';
import colors from 'colors';
import fs from 'fs/promises';

const file = './cache/dmdeny.txt';

export default {
    data: new SlashCommandBuilder()
    .setName('warn-enable')
    .setDescription('Enable warnings if they’re not annoying'),

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

            // Check if user is in the list
            if (!users.includes(interaction.user.id)) {
                return interaction.reply({
                    content: 'You are not in the deny list.',
                    flags: MessageFlags.Ephemeral,
                });
            }

            // Remove user ID
            const updatedUsers = users.filter(id => id !== interaction.user.id);
            await fs.writeFile(file, updatedUsers.join('\n')+"\n");

            return interaction.reply({
                content: 'Successfully removed you from the deny list.',
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
