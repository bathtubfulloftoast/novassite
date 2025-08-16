import { SlashCommandBuilder, AttachmentBuilder } from 'discord.js';
import colors from 'colors';
import NodeWebcam from 'node-webcam';

export default {
    data: new SlashCommandBuilder()
    .setName('spy')
    .setDescription('spy on the server'),
    async execute(interaction) {
const now = new Date();

var opts = {
    width: 800,
    height: 600,
    quality: 70,
    frames: 5,
    delay: 0,
    saveShots: false,
    output: "jpeg",
    callbackReturn: "buffer",
    verbose: false
};

await NodeWebcam.capture( "webcam_d", opts, function( err, data ) {
const file = new AttachmentBuilder(data);
file.setName("webcam.jpg");
file.setDescription(now);

interaction.reply({files: [file]});
});
await console.log(`${colors.cyan("[Discord]")} command spy has been run by ${interaction.user.tag}`);


    },
};

