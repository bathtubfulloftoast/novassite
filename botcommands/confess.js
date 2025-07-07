import { SlashCommandBuilder } from 'discord.js';
import { EmbedBuilder } from 'discord.js';
import { MessageFlags } from 'discord.js';
import wait from 'node:timers/promises';

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
          "color": 0,
          "author": {
            "name": "Somebody Confessed..."
          },
          "image": {
            "url": (file.url)
          }
        }



    await console.log(`command confess has been run by ${interaction.user.tag} and they said "${input}"`);
    await interaction.channel.send({embeds: [MessageEmbed]});
    await interaction.reply({ content: `Your Confession Has Been Posted`, flags: MessageFlags.Ephemeral});
    // no logging the confess command



	},
};

