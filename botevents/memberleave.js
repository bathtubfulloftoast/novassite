import {EmbedBuilder, AttachmentBuilder} from 'discord.js';
import colors from 'colors';

const JCHANNEL = process.env.JOINCHANNEL;
const GUILDID = process.env.PRESENCE_GUILDID;
// wait how the fuck does this work if i dont import the thing????
// i just realized i forgot to do that.
// okay..?

export async function MemberLeave(client) {
client.on("guildMemberRemove",async member => {
if(member.guild.id == GUILDID) {

const jointime = new Date(member.joinedTimestamp);

let image = await fetch(`https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.webp?size=256`);
var pfpbuffer = await image.arrayBuffer();
pfpbuffer = Buffer.from(pfpbuffer);

const pfp = await new AttachmentBuilder(pfpbuffer);
pfp.setName("pfp.webp");

const MessageEmbed = {
    "color": 16711680,
    "author": {
        "name": `${member.user.globalName} has left the server.`,
          "icon_url": "attachment://pfp.webp"
    },
    "footer": {
        "text": `join date`
    },
    "timestamp": jointime.toISOString()
};

console.log(`${colors.cyan("[Discord]")} ${member.user.username} left the server.`);
client.channels.cache.get(JCHANNEL).send({files: [pfp], embeds: [MessageEmbed]});



}
});
}
