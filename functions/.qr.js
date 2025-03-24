import 'dotenv/config';

let cache = {};
//this is gonna take a bit to finish
export async function handler(event, context) {
    const API_KEY = process.env.DISCORD_API_KEY;
    const channelid = process.env.DISCORD_CHANNELID;
    const CACHE_DURATION = 99999999999999999;
    const MLIMIT = 5;

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

    const url = `https://discord.com/api/v9/channels/${channelid}/messages?limit=${MLIMIT}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bot ${API_KEY}`,
                'Content-Type': 'application/json; charset=utf-8',
            },
        });

        const dataa = await response.json();

        // Find the first item where content is a link
        const contentItem = dataa?.find(item => {
            let contentstring = item.content;

            if (!contentstring) {
                contentstring = item.attachments?.[0].url;
            }

            return typeof contentstring === 'string' && contentstring.startsWith('http');
        });

        const data = {
            "content": contentItem?.content, // content from the found item
            "attachment": contentItem?.attachments?.[0].url // attachment URL from the found item
        };


        //const data = dataa;

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
