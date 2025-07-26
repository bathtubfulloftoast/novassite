import {WebhookClient} from 'discord.js';

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


export async function WebHook(client,CHANNEL,MESSAGE,EMBED,NAME,AVATAR) {
const now = new Date();
const clientid = client.user.id;

let targetWebhook = null;
let webhook = await grabWebhooks(client.channels.cache.get(CHANNEL));

for (const item of webhook) {
if (item[1].owner.id == clientid) {
targetWebhook = item[1];
break;
}
}

if(!targetWebhook) {
targetWebhook = await createWebhook(client.channels.cache.get(CHANNEL));
}

const webhookClient = new WebhookClient({ id: targetWebhook.id, token: targetWebhook.token });

webhookClient.send({
content: MESSAGE,
username: NAME,
avatarURL: AVATAR,
embeds: EMBED,
});

}
