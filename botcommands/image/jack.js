import { SlashCommandBuilder,AttachmentBuilder,MessageFlags} from 'discord.js';
import colors from 'colors';
import sharp from 'sharp';
import color from 'color';

let image = "";
let unfortunate = "";

export default {
    data: new SlashCommandBuilder()
    .setName('jacksepticeye')
    .setDescription('get slapped lol')
    .addAttachmentOption(option => option
    .setName('attachment')
    .setDescription('Attachment File')
    .setRequired(false))
    .addUserOption(option =>
    option.setName('user')
    .setDescription('Attachment User')
    .setRequired(false)),

async execute(interaction) {
await console.log(`${colors.cyan("[Discord]")} command short has been run by ${interaction.user.tag}`);
const attacheduser =  interaction.options.getUser('user');
const attachedfile =  interaction.options.getAttachment('attachment');

try {
if(attachedfile) {
if(attachedfile.contentType.startsWith("image/")) {
image = await fetch(attachedfile.url);
} else {
return await interaction.reply({content:"toms scott is dead.\n(invalid filetype please send an image)", flags: MessageFlags.Ephemeral});
}
}

else if (attacheduser) {
image = await fetch(`https://cdn.discordapp.com/avatars/${attacheduser.id}/${attacheduser.avatar}.webp?size=1024`);
}

else {
image = await fetch(`https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.webp?size=1024`);
}

    const buffer = await image.arrayBuffer();
    const imagebuffer = Buffer.from(buffer);

    // Load base and overlay images
    const overlayImage = sharp("public/bot/LAUGH.png");
    const baseImage = sharp(imagebuffer).resize({width:604, height:452,fit:"fill"}).extend({top: 106,bottom:92,left:321,right:231}).flatten({background:"#b6a2aa"});

    // Get metadata of overlay image
    const overlayMetadata = await overlayImage.metadata();
    const overlayBuffer = await overlayImage.toBuffer();

    const final = await baseImage
    .composite([
        {
            input: overlayBuffer,

        },
    ])
    .toFormat("jpg")
    .toBuffer();

    const file = await new AttachmentBuilder(final);
    file.setName("LAUGH.jpg");
    file.setDescription("outdated reference");

    await interaction.reply({content: `LAUGH.`,files:[file]});

} catch (err) {
await interaction.reply({content:"command failed to run", flags: MessageFlags.Ephemeral});
console.error("Error:", err);
}



},
};

