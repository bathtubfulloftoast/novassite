import { SlashCommandBuilder } from 'discord.js';
import colors from 'colors';

export default {
    data: new SlashCommandBuilder()
    .setName('dice')
    .setDescription('roll an dice')
    .addStringOption((option) =>
    option
    .setName('sides')
    .setDescription('how many sides does the dice have?')
    .setRequired(true)
    .addChoices(
        { name: '6', value: '6' },
        { name: '8', value: '8' },
        { name: '10', value: '10' },
        { name: '12', value: '12' },
        { name: '20', value: '20' },
    )),
    async execute(interaction) {
        await console.log(`${colors.cyan("[Discord]")} command dice has been run by ${interaction.user.tag}`);
        const category = interaction.options.getString('sides');
        const roll = Math.floor(Math.random() * category)+1;

        await interaction.reply({ content: `<@${interaction.user.id}> rolls a ${category} sided dice and gets...\n\`\`${roll}\`\`` });

    },
};

