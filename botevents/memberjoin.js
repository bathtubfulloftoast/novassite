import {EmbedBuilder, AttachmentBuilder} from 'discord.js';
import colors from 'colors';

const JCHANNEL = process.env.JOINCHANNEL;
const GUILDID = process.env.PRESENCE_GUILDID;

export async function MemberJoin(client) {
client.on("guildMemberAdd",async member => {
const jointime = new Date(member.joinedTimestamp);

const hex = Math.floor((Math.abs(Math.sin(member.user.id) * 16777215)));

let image = await fetch(`https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.webp?size=256`);
var pfpbuffer = await image.arrayBuffer();
pfpbuffer = Buffer.from(pfpbuffer);

let serverimage = await fetch(`https://cdn.discordapp.com/icons/${member.guild.id}/${member.guild.icon}.webp?size=128`);
var sbuff = await serverimage.arrayBuffer();
sbuff = Buffer.from(sbuff);

const pfp = await new AttachmentBuilder(pfpbuffer);
pfp.setName("pfp.webp");

const sicon = await new AttachmentBuilder(sbuff);
sicon.setName("server.webp");

const MessageEmbed = {
"author": {
"name": `Welcome to ${member.guild.name}!`,
"icon_url": `attachment://server.webp`
},
"title": `Welcome ${member.user.globalName}!`,
"thumbnail": {
"url": `attachment://pfp.webp`
},
"color": hex,
"timestamp": jointime.toISOString()
}


if(member.guild.id == GUILDID) {
console.log(`${colors.cyan("[Discord]")} ${member.user.username} joined the server.`);
client.channels.cache.get(JCHANNEL).send({embeds: [MessageEmbed],files:[pfp,sicon],content: `Welcome to **${member.guild.name}** <@${member.user.id}>!`});
}
});
}
