import { SlashCommandBuilder,AttachmentBuilder,MessageFlags} from 'discord.js';
import colors from 'colors';
import sharp from 'sharp';
import color from 'color';

let image = "";
let unfortunate = "";

export default {
    data: new SlashCommandBuilder()
    .setName('shower')
    .setDescription('force someone to take a shower')
    .addUserOption(option =>
    option.setName('user')
    .setDescription('SMELLY User')
    .setRequired(false)),

async execute(interaction) {
await console.log(`${colors.cyan("[Discord]")} command short has been run by ${interaction.user.tag}`);
const attacheduser =  interaction.options.getUser('user');

try {
if (attacheduser) {
image = await fetch(`https://cdn.discordapp.com/avatars/${attacheduser.id}/${attacheduser.avatar}.webp?size=1024`);
unfortunate = attacheduser.id;
}

else {
image = await fetch(`https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.webp?size=1024`);
unfortunate = interaction.user.id;
}

    const buffer = await image.arrayBuffer();
    const imagebuffer = Buffer.from(buffer);

    // Load base and overlay images
    const overlayImage = sharp(imagebuffer).resize({width:300, height:300,fit:"fill"}).rotate(-20, {background: { r: 0, g: 0, b: 0, alpha: 0 }});
    const baseImage = sharp('public/bot/showerman.jpg');//dont bully this dude for the love of god i will kill you

    // Get metadata of overlay image
    const overlayMetadata = await overlayImage.metadata();
    const overlayBuffer = await overlayImage.toBuffer();

    const left = 127;
    const top = 70;

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
    file.setName("Stinky.jpg");
    file.setDescription("youre fucking SMELLY.");

    await interaction.reply({content: `<@${unfortunate}> is taking a shower (good for them!)`,files:[file]});

} catch (err) {
await interaction.reply({content:"command failed to run", flags: MessageFlags.Ephemeral});
console.error("Error:", err);
}



},
};

