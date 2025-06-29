import 'dotenv/config';

let cache = {};

export default async function lastfmHandler(req, res) {
    const API_KEY = process.env.STEAM_API_KEY;
    const STEAMID = "76561198853505045";
    const CACHE_DURATION = 60000;

    if (cache.timestamp && (Date.now() - cache.timestamp < CACHE_DURATION)) {
        const remaining = CACHE_DURATION - (Date.now() - cache.timestamp);
        return res.status(200).json({
            ...cache.data,
            cache_remaining: Math.floor(remaining/1000),
        });
    }

    const url = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${API_KEY}&steamid=${STEAMID}&format=json&count=5`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        cache = {
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
