import {EmbedBuilder,Events} from 'discord.js';
import { WebHook } from './webhook.js';
import colors from 'colors';

const LCHANNEL = process.env.LOGCHANNEL;
const GUILDID = process.env.PRESENCE_GUILDID;

export function MessageLogger(client) {
client.on(Events.MessageDelete, async message => {
const now = new Date();

const hookname = `${client.user.username} Logs`;
const hookavi = `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.webp?size=1024`;

if(message.author.bot) {
return;
}

if(message.guildId == GUILDID) {
const MessageEmbed = {
    "title": `Message deleted in <#${message.channelId}>`,
    "author": {
        "name": message.author.username,
        "icon_url": `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp`
    },
    "color": 16711680,
    "description": message.content,
    "fields": [
        {
            "name": "Delete Time",
            "value": `<t:${Math.floor(now/1000)}:f>`
        },
        {
            "name": "Create Time",
            "value": `<t:${Math.floor(message.createdTimestamp/1000)}:f>`
        },
        {
            "name": "Message ID",
            "value": message.id,
            "inline": false
        },
        {
            "name": "User ID",
            "value": message.author.id
        }
    ]
};

WebHook(client,LCHANNEL,`${message.author.username}'s message was deleted`,[MessageEmbed],hookname,hookavi);
console.log(`${colors.cyan("[Discord]")} ${message.author.username} deleted a message.`);
}
});

client.on(Events.MessageUpdate, message => {
const hookname = `${client.user.username} Logs`;
const hookavi = `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.webp?size=1024`;
// too tired fuck you future alice.
// seperate this yourself when you burn in hell.

const MessageEmbed = {
    "title": `Message edited in <#${message.channelId}>`,
    "author": {
        "name": message.author.username,
        "icon_url": `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp`
    },
    "color": 3447003,
    "fields": [
        {
            "name": "Original Message",
            "value": message.content
        },
        {
            "name": "New Message",
            "value": message.reactions.message.content
        }
    ]
};

WebHook(client,LCHANNEL,`${message.author.username} edited their message https://discord.com/channels/${message.guildId}/${message.channelId}/${message.id}`,[MessageEmbed],hookname,hookavi);
console.log(`${colors.cyan("[Discord]")} ${message.author.username} edited a message.`);
});
}
