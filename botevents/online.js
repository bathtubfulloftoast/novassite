import colors from 'colors';
import { WebHook } from './webhook.js';

const LCHANNEL = process.env.LOGCHANNEL;

export function ServerOnline(client) {
client.once('ready', () => {
WebHook(client,LCHANNEL,"server online!",null,"test name","https://cdn.novassite.net/tom.png");
});
}
