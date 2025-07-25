import {EmbedBuilder,Events} from 'discord.js';
import { WebHook } from './webhook.js';
import colors from 'colors';

const LCHANNEL = process.env.LOGCHANNEL;
const GUILDID = process.env.PRESENCE_GUILDID;

export function MessageLogger(client) {
client.on(Events.MessageDelete, message => {
const now = new Date();

const hookname = `${client.user.username} Logger`;
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

WebHook(client,LCHANNEL,`<@${message.author.id}>'s message was deleted`,[MessageEmbed],hookname,hookavi);
console.log(`${colors.cyan("[Discord]")} ${message.author.username} deleted a message.`);
}
});
}
