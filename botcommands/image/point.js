import { SlashCommandBuilder,MessageFlags,AttachmentBuilder } from 'discord.js';
import { createCanvas, registerFont } from 'canvas';
import colors from 'colors';
import sharp from 'sharp';

let image = "";
let input = "";
let unfortunate = "";

export default {
    data: new SlashCommandBuilder()
    .setName('point')
    .setDescription('HAHA LAUGH')
    .addUserOption(option =>
    option.setName('user')
    .setDescription('Attachment User')
    .setRequired(false)),

    async execute(interaction) {
        await console.log(`${colors.cyan("[Discord]")} command point has been run by ${interaction.user.tag}`);

    const attacheduser =  interaction.options.getUser('user');


if (attacheduser) {
image = await fetch(`https://cdn.discordapp.com/avatars/${attacheduser.id}/${attacheduser.avatar}.webp?size=512`);
input = attacheduser.username;
unfortunate = attacheduser.id;
}

else {
image = await fetch(`https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.webp?size=512`);
input = interaction.user.username;
unfortunate = interaction.user.id;
}

input = `${input}\n|\nV`;

const buffer = await image.arrayBuffer();
const imagebuffer = Buffer.from(buffer);

const canvas = createCanvas(512, 250);
const ctx = canvas.getContext('2d');
registerFont('public/fonts/Anton-Regular.ttf', { family: 'Anton' });

const maxWidth = canvas.width - 40;
let fontSize = 60;

ctx.font = `${fontSize}px Anton`;

// If lines are too tall to fit, reduce font size
let lines = input.split('\n');
while ((lines.length * fontSize * 1.2) > canvas.height - 40 && fontSize > 10) {
    fontSize--;
    ctx.font = `${fontSize}px Anton`;
}

ctx.fillStyle = '#000000';
ctx.textAlign = 'center';
ctx.textBaseline = 'top';

const startY = 20; // Padding from the top

for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], canvas.width / 2, startY + i * fontSize * 1.2);
}



        const textbuffer = canvas.toBuffer('image/png');

        // Load base and overlay images
        const overlayImage = sharp(textbuffer);
        const baseImage = sharp(imagebuffer).resize({width:512,height:200,fit:"fill"}).extend({
            top: 400,
            background: "#ffffff" // transparent background
        });

        const overlayBuffer = await overlayImage.toBuffer();

        const left = 0;
        const top = 0;

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
        file.setName("point.jpg");
        file.setDescription("haha IDIOT");

        await interaction.reply({content:`<@${unfortunate}> has been declared as <@${unfortunate}>`, files:[file]});

    },
};

