import 'dotenv/config';
import colors from 'colors';

let cache = {};

export default async function lastfmHandler(req, res) {
    const API_KEY = process.env.DISCORD_API_KEY;
    const userid = req.query.userid;
    const CACHE_DURATION = 86400000;

    res.set('Cache-Control', "max-age="+(CACHE_DURATION/1000));

    if (!userid) {
        return res.status(400).json({ error: 'no userid set' });
    } else if (/[^0-9]/.test(userid)) {
        return res.status(400).json({ error: 'not a valid userid please remove letters' });
    } else if (userid.length < 17) {
        return res.status(400).json({ error: 'userid too short' });
    } else if (userid.length > 20) {
        return res.status(400).json({ error: 'userid too long' });
    }
    // from what ive seen human userids are 18 characters long and bot userids are 19 characters long
    // i dont think theres anything properly saying this but uh yeah


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
        console.log(`${colors.green("[Site]")} grabbed info for discord userid ${userid}`);

    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
        console.log(`${colors.red("[ERROR]")} unable to grab info for userid ${userid}`);

    }
}
