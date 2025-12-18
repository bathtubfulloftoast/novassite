import 'dotenv/config';
import colors from 'colors';

let cache = {};

export default async function lastfmHandler(req, res) {
    const CACHE_DURATION = 7200000;

    res.set('Cache-Control', "max-age="+(CACHE_DURATION/1000));

    if (cache.timestamp && (Date.now() - cache.timestamp < CACHE_DURATION)) {
        const remaining = CACHE_DURATION - (Date.now() - cache.timestamp);
        return res.status(200).json({
            ...cache.data,
            ...( process.env.DEVMODE === "true" && {
            cache_remaining: Math.floor(remaining/1000),
            })
        });
    }

    const url = `https://git.gay/api/v1/repos/bathtubfulloftoast/novassite/commits`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        cache = {
            data,
            timestamp: Date.now(),
        };

        res.status(200).json({
            ...data,
            ...( process.env.DEVMODE === "true" && {
            cache_remaining: Math.floor(CACHE_DURATION/1000),
            })
        });
        console.log(`${colors.green("[Site]")} grabbed commits from the internet`);

    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
        console.log(`${colors.red("[ERROR]")} failed to grab commits`);

    }
}
