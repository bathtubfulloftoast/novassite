import { SlashCommandBuilder,MessageFlags,AttachmentBuilder } from 'discord.js';
import { createCanvas, registerFont } from 'canvas';
import colors from 'colors';
import sharp from 'sharp';

export default {
    data: new SlashCommandBuilder()
    .setName('interview')
    .setDescription('interview the deer')
    .addStringOption(option =>
    option.setName('question')
    .setDescription('what shall be asked')
    .setMaxLength(512)
    .setRequired(true)),
    async execute(interaction) {
        await console.log(`${colors.cyan("[Discord]")} command interview has been run by ${interaction.user.tag}`);

        const input = interaction.options.getString('question').slice(0, 512);

        const canvas = createCanvas(400, 100);
        const ctx = canvas.getContext('2d');
        registerFont('public/fonts/Anton-Regular.ttf', { family: 'Anton' });


        const maxWidth = canvas.width - 40; // padding 20px each side
        let fontSize = 60;

        // Dynamically adjust font size to fit multiple lines vertically
        ctx.font = `${fontSize}px Anton`;

        // Function to wrap text into lines fitting maxWidth
        function wrapText(ctx, input, maxWidth) {
            const words = input.split(' ');
            const lines = [];
            let line = '';

            for (let n = 0; n < words.length; n++) {
                const testLine = line + words[n] + ' ';
                const metrics = ctx.measureText(testLine);
                if (metrics.width > maxWidth && n > 0) {
                    lines.push(line.trim());
                    line = words[n] + ' ';
                } else {
                    line = testLine;
                }
            }
            lines.push(line.trim());
            return lines;
        }

        let lines = wrapText(ctx, input, maxWidth);

        // If too many lines to fit height, reduce font size until fits
        while ((lines.length * fontSize * 1.2) > canvas.height - 40 && fontSize > 10) {
            fontSize--;
            ctx.font = `${fontSize}px Anton`;
            lines = wrapText(ctx, input, maxWidth);
        }

        // Draw lines vertically centered
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const totalHeight = lines.length * fontSize * 1.2;
        let startY = (canvas.height - totalHeight) / 2 + fontSize / 2;

        for (let i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i], canvas.width / 2, startY + i * fontSize * 1.2);
        }


        const textbuffer = canvas.toBuffer('image/png');

        // Load base and overlay images
        const overlayImage = sharp(textbuffer);
        const baseImage = sharp('public/bot/interview.jpg').extend({
            top: 100,
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
        file.setName("interview.jpg");
        file.setDescription("a deer being asked some pressing questions.");

        await interaction.reply({content:`<@${interaction.user.id}> asks the deer \`\`${input}\`\`\nthe deer answers with \`\`bweh.\`\``, files:[file]});

    },
};

