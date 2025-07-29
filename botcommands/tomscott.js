import { SlashCommandBuilder,AttachmentBuilder,MessageFlags} from 'discord.js';
import colors from 'colors';
import sharp from 'sharp';
import color from 'color';

let image = "";

export default {
    data: new SlashCommandBuilder()
    .setName('tomscott')
    .setDescription('where is that pesky brit?')
    .addAttachmentOption(option => option
    .setName('attachment')
    .setDescription('Attachment File')
    .setRequired(false))
    .addUserOption(option =>
    option.setName('user')
    .setDescription('Attachment User')
    .setRequired(false)),

async execute(interaction) {
await console.log(`${colors.cyan("[Discord]")} command tomscott has been run by ${interaction.user.tag}`);
const attachedfile =  interaction.options.getAttachment('attachment');
const attacheduser =  interaction.options.getUser('user');

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
    const baseImage = sharp(imagebuffer).resize({width:800, height:600,fit:"fill"}).flatten({background:"#ffffff"});
    const overlayImage = sharp('./public/tom.png');

    // Get metadata of overlay image
    const overlayMetadata = await overlayImage.metadata();
    const overlayBuffer = await overlayImage.toBuffer();

    const left = 0; // Bottom-left means x = 0
    const top = 600 - overlayMetadata.height; // y = total height - overlay height

    const final = await baseImage
    .composite([
        {
            input: overlayBuffer,
            top: top,
            left: left,
        },
    ])
    .toFormat("jpg")
    .toBuffer();

    const file = await new AttachmentBuilder(final);
    file.setName("tom.jpg");
    file.setDescription("tom in a place");

    await interaction.reply({files:[file]});

} catch (err) {
await interaction.reply({content:"toms scott is dead.\n(command failed to run)", flags: MessageFlags.Ephemeral});
console.error("Error:", err);
}



},
};

