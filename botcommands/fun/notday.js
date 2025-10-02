import { SlashCommandBuilder,MessageFlags } from 'discord.js';
import colors from 'colors';

export default {
    data: new SlashCommandBuilder()
    .setName('whatday')
    .setDescription('what day is it not'),
    async execute(interaction) {
        await console.log(`${colors.cyan("[Discord]")} command notday has been run by ${interaction.user.tag}`);
        const now = new Date();
        let day = now.getDay()

        const days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]

        const removed = days.filter(num => num !== days[day]);
        const max = removed.length;
        const random = Math.round(Math.random()*max);

        await interaction.reply({ content:removed[random]});

    },
};

