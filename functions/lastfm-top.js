import 'dotenv/config';
import colors from 'colors';

let cache = {};

export default async function lastfmHandler(req, res) {
    const API_KEY = process.env.LASTFM_API_KEY;
    const USER = "bathtuboftoast";
    const MAXFM = "5";
    const CACHE_DURATION = 172800000; // 48 hours

    res.set('Cache-Control', "max-age="+(CACHE_DURATION/1000));

    if (cache.timestamp && (Date.now() - cache.timestamp < CACHE_DURATION)) {
        const remaining = CACHE_DURATION - (Date.now() - cache.timestamp);
        return res.status(200).json({
            ...cache.data,
            cache_remaining: Math.floor(remaining/1000),
        });
    }

const url = `http://ws.audioscrobbler.com/2.0/?method=user.getTopTracks&user=${USER}&api_key=${API_KEY}&format=json&limit=${MAXFM}&period=1month`;

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
        console.log(`${colors.green("[Site]")} grabbed top songs from last.fm`);

    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
        console.log(`${colors.red("[ERROR]")} faield to grab top songs from last.fm`);

    }
}
