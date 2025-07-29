import { SlashCommandBuilder,AttachmentBuilder,MessageFlags} from 'discord.js';
import colors from 'colors';
import sharp from 'sharp';
import color from 'color';

let image = "";

export default {
    data: new SlashCommandBuilder()
    .setName('pixelate')
    .setDescription('so retro')
    .addUserOption(option =>
    option.setName('user')
    .setDescription('Attachment User')
    .setRequired(false)),

async execute(interaction) {
await console.log(`${colors.cyan("[Discord]")} command pixelate has been run by ${interaction.user.tag}`);
const attacheduser =  interaction.options.getUser('user');

try {
if (attacheduser) {
image = await fetch(`https://cdn.discordapp.com/avatars/${attacheduser.id}/${attacheduser.avatar}.webp?size=128`);
}

else {
image = await fetch(`https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.webp?size=128`);
}

    const buffer = await image.arrayBuffer();
    const imagebuffer = Buffer.from(buffer);

    const baseimage = await sharp(imagebuffer);

    const scaleBuffer = await baseimage
    .resize({ width: 100, height: 100, fit: "fill",kernel: sharp.kernel.nearest  })
    .toBuffer();

    const censored = sharp(scaleBuffer);
    const output = censored.resize({ width: 512, height: 512, fit: "fill",kernel: sharp.kernel.nearest });


    const file = await new AttachmentBuilder(output);
    file.setName("retro.png");
    file.setDescription("forgive sharp.js for being shit at this.");

    await interaction.reply({files:[file]});

} catch (err) {
await interaction.reply({content:"command failed to run", flags: MessageFlags.Ephemeral});
console.error("Error:", err);
}



},
};

