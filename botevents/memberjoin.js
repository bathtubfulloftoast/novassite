import {EmbedBuilder} from 'discord.js';

const JCHANNEL = process.env.JOINCHANNEL;
const GUILDID = process.env.PRESENCE_GUILDID;

export function MemberJoin(client) {
client.on("guildMemberAdd", member => {
const jointime = new Date(member.joinedTimestamp);


const MessageEmbed = {
"description": `Welcome to **${member.guild.name}**!`,
"color": Math.round(Math.random() * 16777215),
"title": member.user.globalName,
"thumbnail": {
"url": `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.webp?size=512`
},
"footer": {
"text": member.guild.name,
"icon_url": `https://cdn.discordapp.com/icons/${member.guild.id}/${member.guild.icon}.webp?size=512`
},
"timestamp": jointime.toISOString()
}

if(member.guild.id == GUILDID) {
console.log(`${member.user.username} joined the server.`);
client.channels.cache.get(JCHANNEL).send({embeds: [MessageEmbed],content: `Welcome to **${member.guild.name}** <@${member.user.id}>!`});
}
});
}
