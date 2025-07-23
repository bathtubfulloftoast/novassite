import { SlashCommandBuilder, AttachmentBuilder } from 'discord.js';
import colors from 'colors';
import fs from 'fs';

export default {
    data: new SlashCommandBuilder()
    .setName('coolimage')
    .setDescription('get a cool ass image'),
    async execute(interaction) {

const dir = 'public/cool';
const fileList = fs.readdirSync(dir);

const max = fileList.length;
const id = Math.floor(Math.random() * max);

const image = fileList[id];

let filematch = image.match(/(?:\/|\\)?([^\/\\]+)\.(\w+)$/);
let filext = filematch?.[2];

const file = new AttachmentBuilder(dir+"/"+image);
file.setName("image."+filext);
file.setDescription("a cool image");

await interaction.reply({content: image,files: [file]});
// await interaction.reply({content:file});

await console.log(`${colors.cyan("[Discord]")} command coolimage has been run by ${interaction.user.tag}`);
},
};

