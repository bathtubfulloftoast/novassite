import { SlashCommandBuilder,MessageFlags } from 'discord.js';
import colors from 'colors';
import 'dotenv/config';

const port = process.env.PORT;

export default {
    data: new SlashCommandBuilder()
    .setName('ytp')
    .setDescription('because YouTube is where the poop is!'),
    async execute(interaction) {
        await console.log(`${colors.cyan("[Discord]")} command ytp has been run by ${interaction.user.tag}`);

        const response = await fetch(`http://127.0.0.1:${port}/ytps.txt`);
        const text = await response.text();
        const sauce = text.split("\n").map(name => name.trim()).filter(name => name);

        const max = sauce.length;
        const id = Math.floor(Math.random() * max);
        let url = 'https://www.youtube.com/watch?v='+sauce[id]; // regular player (slower cause youtube hates everyone)



        await interaction.reply({ content: url});

    },
};

