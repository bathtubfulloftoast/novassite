import {EmbedBuilder,Events} from 'discord.js';
import { WebHook } from './webhook.js';
import colors from 'colors';

const LCHANNEL = process.env.LOGCHANNEL;
const GUILDID = process.env.PRESENCE_GUILDID;

export function UserLogger(client) {

client.on("userUpdate", async (oldMember, newMember) => {
const now = new Date();

const hookname = `${client.user.username} Logs`;
const hookavi = `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.webp?size=1024`;

if(newMember.bot) {
return;
}

if(oldMember.globalName !== newMember.globalName) {
const MessageEmbed = {
  "title": "Global Nickname Changed",
  "author": {
    "name": newMember.username,
    "icon_url": `https://cdn.discordapp.com/avatars/${newMember.id}/${newMember.avatar}.webp`
  },
  "color": 3447003,
  "description": `Before: ${oldMember.globalName??oldMember.username}\nAfter: ${newMember.globalName??newMember.username}`,
  "footer": {
    "text": newMember.id
  },
  "timestamp": now.toISOString()
}

WebHook(client,LCHANNEL,`${newMember.username} changed their global nickname`,[MessageEmbed],hookname,hookavi);
console.log(`${colors.cyan("[Discord]")} ${oldMember.username} changed their global nickname`);
}

if(oldMember.username !== newMember.username) {
const MessageEmbed = {
  "title": "Username Changed",
  "author": {
    "name": newMember.username,
    "icon_url": `https://cdn.discordapp.com/avatars/${newMember.id}/${newMember.avatar}.webp`
  },
  "color": 3447003,
  "description": `Before: ${oldMember.username}\nAfter: ${newMember.username}`,
  "footer": {
    "text": newMember.id
  },
  "timestamp": now.toISOString()
}

WebHook(client,LCHANNEL,`${newMember.username} changed their username`,[MessageEmbed],hookname,hookavi);
console.log(`${colors.cyan("[Discord]")} ${oldMember.username} changed their username to ${newMember.username}`);
}

if(oldMember.avatar !== newMember.avatar) {
const MessageEmbed = {
  "title": "User Avatar Changed",
  "author": {
    "name": newMember.username,
    "icon_url": `https://cdn.discordapp.com/avatars/${newMember.id}/${newMember.avatar}.webp`
  },
  "color": 3447003,
  "thumbnail": {
    "url": `https://cdn.discordapp.com/avatars/${newMember.id}/${newMember.avatar}.webp?size=1024`
  },
  "footer": {
    "text": newMember.id
  },
  "timestamp": now.toISOString()
}

WebHook(client,LCHANNEL,`${newMember.username} changed their personal avatar`,[MessageEmbed],hookname,hookavi);
console.log(`${colors.cyan("[Discord]")} ${oldMember.username} changed their avatar`);
}

if(oldMember.banner !== newMember.banner) {
const MessageEmbed = {
  "title": "User Avatar Changed",
  "author": {
    "name": newMember.username,
    "icon_url": `https://cdn.discordapp.com/avatars/${newMember.id}/${newMember.avatar}.webp`
  },
  "color": 3447003,
  "fields": [],
  "image": {
    "url": `https://cdn.discordapp.com/banners/${newMember.id}/${newMember.banner}.webp?size=1024`
  },
  "footer": {
    "text": newMember.id
  },
  "timestamp": now.toISOString()
};

WebHook(client,LCHANNEL,`${newMember.username} changed their personal banner`,[MessageEmbed],hookname,hookavi);
console.log(`${colors.cyan("[Discord]")} ${oldMember.username} changed their banner`);
}

});

}
