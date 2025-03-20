import 'dotenv/config';

let cache = {}; // Simple in-memory cache

export async function handler(event, context) {
    const API_KEY = process.env.LASTFM_API_KEY;
    const USER = "bathtuboftoast";
    const MAXFM = "10";
    const CACHE_DURATION = 29000; // 1 minute in milliseconds

    // Check if we have cached data for this user and it's still valid
    if (cache && (Date.now() - cache.timestamp < CACHE_DURATION)) {
        const remainingTime = CACHE_DURATION - (Date.now() - cache.timestamp);
        return {
            statusCode: 200,
            body: JSON.stringify({
                ...cache.data,
                cache_remaining_ms: remainingTime, // Include remaining cache time
            }),
        };
    }

    const url = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USER}&api_key=${API_KEY}&format=json&limit=${MAXFM}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
        });

        const data = await response.json();

        // Store response in cache with a timestamp
        cache = {
            data,
            timestamp: Date.now(),
        };

        return {
            statusCode: 200,
            body: JSON.stringify({
                ...data,
                cache_remaining_ms: CACHE_DURATION, // Since it's a fresh fetch, full duration remains
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch data" }),
        };
    }
}
