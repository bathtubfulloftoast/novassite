import 'dotenv/config';

let cache = {};

export async function handler(event, context) {
    const API_KEY = process.env.DISCORD_API_KEY;
    const userid = event.queryStringParameters.userid;
    const CACHE_DURATION = 86400000;

    // Check if we have cached data for this user and it's still valid
    if (cache[userid] && (Date.now() - cache[userid].timestamp < CACHE_DURATION)) {
        const remainingTime = CACHE_DURATION - (Date.now() - cache[userid].timestamp);
        return {
            statusCode: 200,
            body: JSON.stringify({
                ...cache[userid].data,
                cache_remaining_ms: remainingTime, // Include remaining cache time
            }),
        };
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

        // Store response in cache with a timestamp
        cache[userid] = {
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
