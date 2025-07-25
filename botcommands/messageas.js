import { SlashCommandBuilder,MessageFlags } from 'discord.js';
import colors from 'colors';

const owner = process.env.PRESENCE_USERID;

export default {
data: new SlashCommandBuilder()
.setName('message')
.setDescription('send a message as the bot :D')
.addStringOption(option =>
option.setName('message')
.setDescription('The message')
.setRequired(true)),
async execute(interaction) {

const input = interaction.options.getString('message');

await console.log(`${colors.cyan("[Discord]")} command messageas has been run by ${interaction.user.tag}`);

if (interaction.user.id == owner) {

if (interaction.channel) {
await interaction.reply({ content: "sending...", flags: MessageFlags.Ephemeral});
await interaction.channel.send(input);
} else {
await interaction.reply({ content: input});
}

} else {
await interaction.reply({ content: input, flags: MessageFlags.Ephemeral});
}

},
};

