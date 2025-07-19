import { SlashCommandBuilder } from 'discord.js';
let result = "";

export default {
    data: new SlashCommandBuilder()
    .setName('getloot')
    .setDescription('get loot'),
    async execute(interaction) {

const username = interaction.client.user.username;
const interacter = interaction.user.username;// im keeping this typo i dont care

const loot = [
`${username} grabs whatever you were holding right from your hand`,
`${username} gives you a baby found off the street`,
`${username} gives you a piece of moon rock (cardboard painted gray)`,
`${username} shows you alice stealing loot from Rayna Bot\nshe shoos both of you away`,
`${username} gives you a little version of itself`,
`${username} takes a soul from an innocent bystander in order to give it to you`,
"you get nothing.",
"you get a single shoe on your fishing line",
"https://cdn.novassite.net/tom.png",
`${username} gives you some fiber supplements`,
"random cat (random cat)",
"bluey dvd box set (full series)",
"embed fail",
"double yoshi exploshi",
"skillet CD (common)",
`${username} gives you a bluesky invite code (its trying its best)`,
`${username} hands you a controller to its 2000 in 1 console`,
`${username} kidnaps jack black for you`,
`${username} says you're alike, ${username} says you have the same hair.`,
"skrillex appears and signs your forehead without being asked to",
`${username} awaits your downfall`,
"loot llama fortnite wiki page",
`${username} stabs your evil clone named ${interacter}`,
`${username} takes a wallet and hands you 20 dollars (it doesnt have a job)`,
`${username} hands you ***THE*** silent hill`,
"crush. kill. destroy. swag.",
`${username} pulls your ear close to its mouth\nit says nothing.`,
`${username} eats an entire hotdog in one bite`,
"when you at the when you you when you when wheeeen when you youre your when",
`you ask ${username} what the weather is\nit doesnt know and is offended you asked.`,
`${username} shows you a funny video on its phone`,
"*you're",
"37.15951770237133, -93.29615485610407",
`${username} tells you (${interacter}-san) that your drinking problem is getting worse`,
`${username} makes a reference to the infamous ${interacter}`,
`${username} doesnt care what you think.`,
`${username} shows you a billboard with your face on it`,
"gay people tomorrow morning 10 am",
"HATSUNE MIKU???",
`july 27th 1972`,
`${username} hands you a torrent file for the truman show blu ray 1080p`,
`${username} asks your opinion on the ${interacter} show\nits shortly dragged away by two men.`,
"uhhhhhhhhhhhhhhhhh",
"harrison ford",
`${username} shows you an old waterpark wristband as if its in an exclusive club.`,
`${username} spills its glass of milk...\nit cries.`,
`${username} tells you it was on an episode of destroy build destroy`,
`${username} gives you a cupcake`, // :3
`you get an exclusive golden ${username} (only available at gamestop)`,
btoa(interacter),
`${username} makes a very funny topical reference`,
"an orange slowly rolls toward you",
`${username} orders "another medium"\nit looks at you with a smile hoping you get the reference`,
`${username} grounds you for `+Math.round(Math.random() * 999999999)+" years",
`${username} touches a gross puddle on the floor`,
"old glass of milk",
"new glass of milk",
"potion\n(plastic water bottle with dirt in it)"
]


const max = loot.length;
const id = Math.floor(Math.random() * max);
result = loot[id];

await interaction.reply({ content: result});
await console.log(`[Discord] command getloot has been run by ${interaction.user.tag}`);
},
};

