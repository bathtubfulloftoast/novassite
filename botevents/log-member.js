import {EmbedBuilder,Events} from 'discord.js';
import colors from 'colors';

const LCHANNEL = process.env.LOGCHANNEL;
const GUILDID = process.env.PRESENCE_GUILDID;

export function MemberLogger(client) {
client.on("guildMemberUpdate", async (oldMember, newMember) => {
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
  "description": `Before: ${oldMember.nickname}\nAfter: ${newMember.nickname}`,
  "fields": [
    {
      "name": "Time",
      "value": `<t:${Math.floor(now/1000)}:f>`
    },
    {
      "name": "User ID",
      "value": newMember.user.id
    }
  ]
}

client.channels.cache.get(LCHANNEL).send({embeds: [MessageEmbed],content: `<@${newMember.user.id}> changed their server nickname`});
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
  "fields": [
    {
      "name": "Time",
      "value": `<t:${Math.floor(now/1000)}:f>`
    },
    {
      "name": "User ID",
      "value": newMember.user.id
    }
  ],
  "thumbnail": {
    "url": `https://cdn.discordapp.com/guilds/${newMember.guild.id}/users/${newMember.user.id}/avatars/${newMember.avatar}.webp?size=1024`
  }
}
client.channels.cache.get(LCHANNEL).send({embeds: [MessageEmbed],content: `<@${message.author.id}> changed their server avatar`});
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
  "fields": [
    {
      "name": "Time",
      "value": `<t:${Math.floor(now/1000)}:f>`
    },
    {
      "name": "User ID",
      "value": newMember.user.id
    }
  ],
  "image": {
    "url": `https://cdn.discordapp.com/guilds/${newMember.guild.id}/users/${newMember.user.id}/banners/${newMember.banner}.webp?size=4096`
  }
}
client.channels.cache.get(LCHANNEL).send({embeds: [MessageEmbed],content: `<@${message.author.id}> changed their server banner`});
console.log(`${colors.cyan("[Discord]")} ${oldMember.user.username} changed their server banner`);
}
}

});
}
