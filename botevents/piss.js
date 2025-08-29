import colors from 'colors';
import cron from 'node-cron';

const PISSCHANNEL = process.env.PISSCHANNEL;

export function PISS(client) {

async function sendpiss() {
client.channels.cache.get(PISSCHANNEL).send("piss");
}

cron.schedule("0 0 * * 1", sendpiss);

}
