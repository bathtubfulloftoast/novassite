import {EmbedBuilder,Events} from 'discord.js';
import { WebHook } from './webhook.js';
import colors from 'colors';

const LCHANNEL = process.env.LOGCHANNEL;
const GUILDID = process.env.PRESENCE_GUILDID;

export function MemberLogger(client) {
client.on("guildMemberUpdate", async (oldMember, newMember) => {
const hookname = `${client.user.username} Logs`;
const hookavi = `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.webp?size=1024`;

const now = new Date();

if(newMember.guild.id == GUILDID) {
if(oldMember.nickname !== newMember.nickname) {
const MessageEmbed = {
  "title": "Server Nickname Changed",
  "author": {
    "name": newMember.user.username,
    "icon_url": `https://cdn.discordapp.com/avatars/${newMember.user.id}/${newMember.user.avatar}.webp`
  },
  "color": 3447003,
  "description": `Before: ${oldMember.nickname??oldMember.user.globalName}\nAfter: ${newMember.nickname??newMember.user.globalName}`,
  "footer": {
    "text": newMember.id
  },
  "timestamp": now.toISOString()
}

WebHook(client,LCHANNEL,`${newMember.user.username} changed their server nickname`,[MessageEmbed],hookname,hookavi);
console.log(`${colors.cyan("[Discord]")} ${oldMember.user.username} changed their nickname`);
}

if(oldMember.avatar !== newMember.avatar) {
// i wont know if this one works for awhile #nonitrobaddie
const MessageEmbed = {
  "title": "Server Avatar Changed",
  "author": {
    "name": newMember.user.username,
    "icon_url": `https://cdn.discordapp.com/avatars/${newMember.user.id}/${newMember.user.avatar}.webp`
  },
  "color": 3447003,
  "footer": {
    "text": newMember.id
  },
  "timestamp": now.toISOString(),
  "thumbnail": {
    "url": `https://cdn.discordapp.com/guilds/${newMember.guild.id}/users/${newMember.user.id}/avatars/${newMember.avatar}.webp?size=1024`
  }
}

WebHook(client,LCHANNEL,`<@${oldMember.user.id}> changed their server avatar`,[MessageEmbed],hookname,hookavi);
console.log(`$${colors.cyan("[Discord]")} {oldMember.user.username} changed their server avatar`);
}

if(oldMember.banner !== newMember.banner) {
const MessageEmbed = {
  "title": "Server Banner Changed",
  "author": {
    "name": newMember.user.username,
    "icon_url": `https://cdn.discordapp.com/avatars/${newMember.user.id}/${newMember.user.avatar}.webp`
  },
  "color": 3447003,
  "footer": {
    "text": newMember.id
  },
  "timestamp": now.toISOString(),
  "image": {
    "url": `https://cdn.discordapp.com/guilds/${newMember.guild.id}/users/${newMember.user.id}/banners/${newMember.banner}.webp?size=4096`
  }
}

WebHook(client,LCHANNEL,`${newMember.user.username} changed their server banner`,[MessageEmbed],hookname,hookavi);
console.log(`${colors.cyan("[Discord]")} ${oldMember.user.username} changed their server banner`);
}
}

});
}
