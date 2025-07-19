import { Events } from 'discord.js';

export function MessageDelete(client) {
client.on(Events.MessageDelete, message => {
console.log(message.content);
});
}
