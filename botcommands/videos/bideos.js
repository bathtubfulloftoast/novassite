import { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder } from 'discord.js';
import colors from 'colors';
import fs from 'fs';

export default {
    data: new SlashCommandBuilder()
    .setName('coolvideo')
    .setDescription('get a cool ass video'),
    async execute(interaction) {

const dir = 'public/bot/bideos';
const fileList = fs.readdirSync(dir);

const max = fileList.length;
const id = Math.floor(Math.random() * max);

const image = fileList[id];

let filematch = image.match(/(?:\/|\\)?([^\/\\]+)\.(\w+)$/);
let filext = filematch?.[2];

let coolimagefile = dir+"/"+image;

const file = new AttachmentBuilder(coolimagefile);
file.setDescription("a cool video");

await interaction.reply({files: [file]});
// await interaction.reply({content:file});

await console.log(`${colors.cyan("[Discord]")} command coolimage has been run by ${interaction.user.tag}`);
},
};

