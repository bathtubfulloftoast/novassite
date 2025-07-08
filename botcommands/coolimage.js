import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
    .setName('coolimage')
    .setDescription('get a cool ass image'),
    async execute(interaction) {


const response = await fetch('http://192.168.0.30:5000/cool?json');
let data = await response.json();

const loot = data.paths;

const max = loot.length;
const id = Math.floor(Math.random() * max);
const result = loot[id];
const filename = result.name;
const fileurl = `https://cdn.novassite.net/cool/${filename}`;

await interaction.reply({ content: fileurl});
await console.log(`command coolimage has been run by ${interaction.user.tag}`);
},
};

