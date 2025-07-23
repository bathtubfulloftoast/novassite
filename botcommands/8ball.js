import { SlashCommandBuilder } from 'discord.js';
import colors from 'colors';
let result = "";

export default {
    data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('get the magical answer to your woes')

    .addStringOption(option =>
    option.setName('question')
    .setDescription('what do you wish to ask?')
    .setRequired(true)),
    async execute(interaction) {

const input = interaction.options.getString('question');

const loot = [
"it is certain",
"it is decidedly so",
"without a doubt",
"yes definitely" ,
"you may rely on it",
"as i see it, yes",
"most likely" ,
"outlook good",
"yes",
"signs point to yes",
"reply hazy, try again",
"ask again later",
"better not tell you now" ,
"cannot predict now",
"concentrate and ask again",
"don't count on it" ,
"my reply is no" ,
"my sources say no" ,
"outlook not so good",
"very doubtful"
]

const max = loot.length;
const id = Math.floor(Math.random() * max);
result = loot[id];

await interaction.reply({ content: `<@${interaction.user.id}> asks the 8 ball\n\`\`${input}\`\`\nthe ball answers \`\`${result}\`\``});
await console.log(`${colors.cyan("[Discord]")} command getloot has been run by ${interaction.user.tag}`);
},
};

