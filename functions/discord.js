import 'dotenv/config';

let cache = {};

export default async function lastfmHandler(req, res) {
    const API_KEY = process.env.DISCORD_API_KEY;
    const userid = req.query.userid;
    const CACHE_DURATION = 86400000;

    if (cache[userid]?.timestamp && (Date.now() - cache[userid].timestamp < CACHE_DURATION)) {
        const remaining = CACHE_DURATION - (Date.now() - cache[userid].timestamp);
        return res.status(200).json({
            ...cache[userid].data,
            cache_remaining: Math.floor(remaining/1000),
        });
    }

    const url = `https://discord.com/api/v10/users/${userid}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bot ${API_KEY}`,
                'Content-Type': 'application/json; charset=utf-8',
            },
        });
        const data = await response.json();


        cache[userid] = {
            data,
            timestamp: Date.now(),
        };

        res.status(200).json({
            ...data,
            cache_remaining: Math.floor(CACHE_DURATION/1000),
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}
