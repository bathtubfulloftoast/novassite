import { SlashCommandBuilder,AttachmentBuilder,MessageFlags} from 'discord.js';
import colors from 'colors';
import sharp from 'sharp';
import color from 'color';

let image = "";
let unfortunate = "";

export default {
    data: new SlashCommandBuilder()
    .setName('burn')
    .setDescription('set someone alight.')
    .addUserOption(option =>
    option.setName('user')
    .setDescription('BURN THEM BURN THEM BURN THEM')
    .setRequired(false)),

async execute(interaction) {
await console.log(`${colors.cyan("[Discord]")} command fire has been run by ${interaction.user.tag}`);
const attacheduser =  interaction.options.getUser('user');

try {
if (attacheduser) {
image = await fetch(`https://cdn.discordapp.com/avatars/${attacheduser.id}/${attacheduser.avatar}.webp?size=512`);
unfortunate = attacheduser.id;
}

else {
image = await fetch(`https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.webp?size=512`);
unfortunate = interaction.user.id;
}

    const buffer = await image.arrayBuffer();
    const imagebuffer = Buffer.from(buffer);

    // Load base and overlay images
    const overlayImage = sharp(imagebuffer).resize({width:300, height:300,fit:"contain"}).ensureAlpha(0.5);
    const baseImage = sharp('public/bot/BURN.jpg').resize({width:800,height:500,fit:"fill"});

    // Get metadata of overlay image
    const overlayMetadata = await overlayImage.metadata();
    const overlayBuffer = await overlayImage.toBuffer();

    const left = 258; // Bottom-left means x = 0
    const top = 93; // y = total height - overlay height

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
    file.setName("BURN DOT JPEG.JPEG");
    file.setDescription("BURN BURN BURN BURN BURN BURN BURN BURN BURN BURN BURN BURN BURN BURN BURN BURN BURN BURN BURN BURN BURN BURN BURN BURN BURN BURN BURN BURN BURN");

    await interaction.reply({content: `<@${unfortunate}> has been set alight.`,files:[file]});

} catch (err) {
await interaction.reply({content:"command failed to run", flags: MessageFlags.Ephemeral});
console.error("Error:", err);
}



},
};

