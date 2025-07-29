import { SlashCommandBuilder,AttachmentBuilder,MessageFlags} from 'discord.js';
import colors from 'colors';
import sharp from 'sharp';
import color from 'color';

let image = "";
let unfortunate = "";

export default {
    data: new SlashCommandBuilder()
    .setName('skibidi')
    .setDescription('be the skibidi...')
    .addUserOption(option =>
    option.setName('user')
    .setDescription('Attachment User')
    .setRequired(false)),

async execute(interaction) {
await console.log(`${colors.cyan("[Discord]")} command tomscott has been run by ${interaction.user.tag}`);
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
    const overlayImage = sharp(imagebuffer).resize({width:350, height:350,fit:"contain"});
    const baseImage = sharp('public/bot/toilet.webp');

    // Get metadata of overlay image
    const overlayMetadata = await overlayImage.metadata();
    const overlayBuffer = await overlayImage.toBuffer();

    const left = 395; // Bottom-left means x = 0
    const top = 179; // y = total height - overlay height

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
    file.setName("skibidi.jpg");
    file.setDescription("a fate worse than death");

    await interaction.reply({content: `<@${unfortunate}> has been skibidi'd`,files:[file]});

} catch (err) {
await interaction.reply({content:"command failed to run", flags: MessageFlags.Ephemeral});
console.error("Error:", err);
}



},
};

