import 'dotenv/config';
import colors from 'colors';

let cache = {};

export default async function lastfmHandler(req, res) {
    const API_KEY = process.env.DISCORD_API_KEY;
    const CHANNELID = process.env.INVITE_CHANNELID;
    const TIMELIMIT = 30; // time limit in minutes

    const CACHE_DURATION = (TIMELIMIT * 60000);

    if (cache.timestamp && (Date.now() - cache.timestamp < CACHE_DURATION)) {
        const remaining = CACHE_DURATION - (Date.now() - cache.timestamp);
        return res.status(200).json({
            ...cache.data,
            cache_remaining: Math.round(remaining / 1000),
        });
    }

    const url = `https://discord.com/api/v10/channels/${CHANNELID}/invites`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bot ${API_KEY}`,
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({
                "max_age": (TIMELIMIT * 60),
                "max_uses": 1,
                "temporary": false,
                "unique": true
            }),
        });

        const data = await response.json();


        cache = {
            data,
            timestamp: Date.now(),
        };

        res.status(200).json({
            ...data,
            cache_remaining: Math.round(CACHE_DURATION / 1000),
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
console.log(`${colors.green("[Site]")} generated discord invite`);
}
