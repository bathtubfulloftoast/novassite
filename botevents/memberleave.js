import colors from 'colors';

const JCHANNEL = process.env.JOINCHANNEL;
const GUILDID = process.env.PRESENCE_GUILDID;

export function MemberLeave(client) {
client.on("guildMemberRemove", member => {
if(member.guild.id == GUILDID) {
console.log(`${colors.cyan("[Discord]")} ${member.user.username} left the server.`);
client.channels.cache.get(JCHANNEL).send(`<@${member.user.id}> (aka **${member.user.globalName}**) left the server.`);
}
});
}
