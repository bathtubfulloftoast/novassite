import 'dotenv/config';

let cache = {};

export default async function lastfmHandler(req, res) {
    const API_KEY = process.env.OPENWEATHER_API_KEY;
    const CITYID = "5476913";
    const CACHE_DURATION = 120000;

    if (cache.timestamp && (Date.now() - cache.timestamp < CACHE_DURATION)) {
        const remaining = CACHE_DURATION - (Date.now() - cache.timestamp);
        return res.status(200).json({
            ...cache.data,
            cache_remaining_ms: remaining,
        });
    }

    const url = `https://discord.com/api/v9/channels/${channelid}/messages?limit=${MLIMIT}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        cache = {
            data,
            timestamp: Date.now(),
        };

        res.status(200).json({
            ...data,
            cache_remaining_ms: CACHE_DURATION,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}
