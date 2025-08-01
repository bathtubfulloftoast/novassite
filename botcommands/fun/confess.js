import { SlashCommandBuilder,EmbedBuilder,MessageFlags,AttachmentBuilder } from 'discord.js';
import colors from 'colors';

let afil;

export default {
   data: new SlashCommandBuilder()
		.setName('confess')
		.setDescription('confess your darkest secrets anonymously')
        .addStringOption(option =>
            option.setName('confession')
                .setDescription('The confession')
                .setRequired(true))
                .addAttachmentOption(option => option
                  .setName('attachment')
                  .setDescription('Attachment File')
                  .setRequired(false)),
	async execute(interaction) {

        const input = interaction.options.getString('confession');
        const file = interaction.options.getAttachment('attachment') ?? '';



        const MessageEmbed = {
          "description": `${input}`,
          "color": Math.round(Math.random() * 16777215),
          "author": {
            "name": "Somebody Confessed..."
          },
        }

        if(file) {
        afil = new AttachmentBuilder(file.attachment);
        afil.setName(file.name);

        MessageEmbed.image = {
            "url": (`attachment://${file.name}`)
          }
        }



    await console.log(`${colors.cyan("[Discord]")} command confess has been run by ${interaction.user.tag} and they said "${input}"`);
    if(file) {
    await interaction.channel.send({embeds: [MessageEmbed],files:[afil]});
    } else {
    await interaction.channel.send({embeds: [MessageEmbed]});
    }
    await interaction.reply({ content: `Your Confession Has Been Posted`, flags: MessageFlags.Ephemeral});



	},
};

