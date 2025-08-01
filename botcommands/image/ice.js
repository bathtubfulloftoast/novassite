import { SlashCommandBuilder,AttachmentBuilder,MessageFlags} from 'discord.js';
import colors from 'colors';
import sharp from 'sharp';
import color from 'color';

let image = "";
let unfortunate = "";

export default {
    data: new SlashCommandBuilder()
    .setName('freeze')
    .setDescription('freeze someone')
    .addUserOption(option =>
    option.setName('user')
    .setDescription('FREEZE THEM FREEZE THEM FREEZE THEM')
    .setRequired(false)),

async execute(interaction) {
await console.log(`${colors.cyan("[Discord]")} command ice has been run by ${interaction.user.tag}`);
const attacheduser =  interaction.options.getUser('user');

try {
if (attacheduser) {
image = await fetch(`https://cdn.discordapp.com/avatars/${attacheduser.id}/${attacheduser.avatar}.webp?size=128`);
unfortunate = attacheduser.id;
}

else {
image = await fetch(`https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.webp?size=128`);
unfortunate = interaction.user.id;
}

    const buffer = await image.arrayBuffer();
    const imagebuffer = Buffer.from(buffer);

    // Load base and overlay images
    const overlayImage = sharp(imagebuffer).resize({width:100, height:100,fit:"fill"}).ensureAlpha(0.5);
    const baseImage = sharp('public/bot/FREEZE.jpg').resize({width:100,height:100,fit:"fill"});

    // Get metadata of overlay image
    const overlayMetadata = await overlayImage.metadata();
    const overlayBuffer = await overlayImage.toBuffer();


    const almostdone = await baseImage
    .composite([
        {
            input: overlayBuffer,
        },
    ])
    .toBuffer();

    const final = await sharp(almostdone).resize({width:800,height:800}).toBuffer();


    const file = await new AttachmentBuilder(final);
    file.setName("FREEZE DOT.JPEG");
    file.setDescription("FREEZE FREEZE FREEZE FREEZE FREEZE FREEZE FREEZE FREEZE FREEZE FREEZE FREEZE FREEZE FREEZE FREEZE FREEZE FREEZE FREEZE ");

    await interaction.reply({content: `<@${unfortunate}> has been set afroze.`,files:[file]});

} catch (err) {
await interaction.reply({content:"command failed to run", flags: MessageFlags.Ephemeral});
console.error("Error:", err);
}



},
};

