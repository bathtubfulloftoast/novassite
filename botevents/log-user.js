import {EmbedBuilder,Events} from 'discord.js';
import colors from 'colors';

const LCHANNEL = process.env.LOGCHANNEL;
const GUILDID = process.env.PRESENCE_GUILDID;

export function UserLogger(client) {

client.on("userUpdate", async (oldMember, newMember) => {
const now = new Date();

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
  "description": `Before: ${oldMember.globalName}\nAfter: ${newMember.globalName}`,
  "fields": [
    {
      "name": "Time",
      "value": `<t:${Math.floor(now/1000)}:f>`
    },
    {
      "name": "User ID",
      "value": newMember.id
    }
  ]
}

client.channels.cache.get(LCHANNEL).send({embeds: [MessageEmbed],content: `<@${newMember.id}> changed their global nickname`});
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
  "fields": [
    {
      "name": "Time",
      "value": `<t:${Math.floor(now/1000)}:f>`
    },
    {
      "name": "User ID",
      "value": newMember.id
    }
  ]
}

client.channels.cache.get(LCHANNEL).send({embeds: [MessageEmbed],content: `<@${newMember.id}> changed their username`});
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
  "fields": [
    {
      "name": "Time",
      "value": `<t:${Math.floor(now/1000)}:f>`
    },
    {
      "name": "User ID",
      "value": newMember.id
    }
  ],
  "thumbnail": {
    "url": `https://cdn.discordapp.com/avatars/${newMember.id}/${newMember.avatar}.webp?size=1024`
  }
}

client.channels.cache.get(LCHANNEL).send({embeds: [MessageEmbed],content: `<@${newMember.id}> changed their personal avatar`});
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
  "fields": [
    {
      "name": "Time",
      "value": `<t:${Math.floor(now/1000)}:f>`
    },
    {
      "name": "User ID",
      "value": newMember.id
    }
  ],
  "image": {
    "url": `https://cdn.discordapp.com/banners/${newMember.id}/${newMember.banner}.webp?size=1024`
  }
}

client.channels.cache.get(LCHANNEL).send({embeds: [MessageEmbed],content: `<@${newMember.id}> changed their personal banner`});
console.log(`${colors.cyan("[Discord]")} ${oldMember.username} changed their banner`);
}

});

}
