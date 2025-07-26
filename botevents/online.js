import {WebhookClient } from 'discord.js';

async function grabWebhooks(chnl) {
    try {
        const webhooks = await chnl.fetchWebhooks();
        return webhooks;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function createWebhook(chnl) {
    try {
        const webhook = await chnl.createWebhook({name: 'NovaBot Webhook'});
        return webhook;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const LCHANNEL = process.env.LOGCHANNEL;

export async function ServerOnline(client) {
client.once('ready', async () => {
const now = new Date();
const clientid = client.user.id;

let targetWebhook = null;
let webhook = await grabWebhooks(client.channels.cache.get(LCHANNEL));

for (const item of webhook) {
if (item[1].owner.id == clientid) {
targetWebhook = item[1];
break;
}
}

if(!targetWebhook) {
targetWebhook = await createWebhook(interaction.channel);
}

const webhookClient = new WebhookClient({ id: targetWebhook.id, token: targetWebhook.token });

webhookClient.send({
content: 'server online!',
username: `${client.user.username} - Hook`,
avatarURL: `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.webp?size=2048`,
});

});
}
