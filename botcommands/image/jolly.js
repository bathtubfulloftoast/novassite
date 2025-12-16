import { SlashCommandBuilder,AttachmentBuilder,MessageFlags} from 'discord.js';
import colors from 'colors';
import sharp from 'sharp';
import color from 'color';

let image = "";
let unfortunate = "";
let cooler;

export default {
    data: new SlashCommandBuilder()
    .setName('jolly')
    .setDescription('be jolly')
    .addUserOption(option =>
    option.setName('user')
    .setDescription('Jolly User')
    .setRequired(false))
    .addStringOption((option) =>
    option
    .setName('hollu')
    .setDescription('feeling jolly?')
    .setRequired(false)
    .addChoices(
        { name: 'holly', value: "red" },
        { name: 'jolly', value: "green" },
    )),

async execute(interaction) {
await console.log(`${colors.cyan("[Discord]")} command jolly has been run by ${interaction.user.tag}`);
const attacheduser =  interaction.options.getUser('user');
const jolly = interaction.options.getString('hollu');
const now = new Date();
const month = now.getMonth();

if (month !== 11) {
await interaction.reply({content:"cant be jolly", flags: MessageFlags.Ephemeral});
return;
}


if (jolly == "red") {
cooler = {r:255,g:0,b:0};
} else if (jolly == "green") {
cooler = {r:0,g:255,b:0};
}

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
    const overlayImage = sharp("public/bot/jolly.png").resize({width:800, height:800,fit:"fill"});
    var baseImage = sharp(imagebuffer).resize({width:800,height:800,fit:"fill"});
    if (jolly) {
    baseImage = sharp(imagebuffer).resize({width:800,height:800,fit:"fill"}).gamma(2,1).tint(cooler);
    }

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
    file.setName("jolly.jpg");
    file.setDescription("christmas is in a week");

    await interaction.reply({content: `<@${unfortunate}> has been jollied.`,files:[file]});

} catch (err) {
await interaction.reply({content:"command failed to run", flags: MessageFlags.Ephemeral});
console.error("Error:", err);
}



},
};

