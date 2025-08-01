import { SlashCommandBuilder,AttachmentBuilder,MessageFlags} from 'discord.js';
import colors from 'colors';
import sharp from 'sharp';
import color from 'color';

let image = "";
let unfortunate = "";

export default {
    data: new SlashCommandBuilder()
    .setName('piss')
    .setDescription('piss on someone.')
    .addUserOption(option =>
    option.setName('user')
    .setDescription('Attachment User')
    .setRequired(false)),

async execute(interaction) {
await console.log(`${colors.cyan("[Discord]")} command piss has been run by ${interaction.user.tag}`);
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
    const overlayImage = sharp("public/bot/shine.png").resize({width:800, height:800,fit:"fill"});
    const baseImage = sharp(imagebuffer).resize({width:800,height:800,fit:"fill"}).gamma(2,1).tint({ r: 158, g: 158, b: 36 });

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
    file.setName("piss.jpg");
    file.setDescription("peepee lol");

    await interaction.reply({content: `<@${unfortunate}> has been pissed on.`,files:[file]});

} catch (err) {
await interaction.reply({content:"command failed to run", flags: MessageFlags.Ephemeral});
console.error("Error:", err);
}



},
};

