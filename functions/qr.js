import 'dotenv/config';

let cache = {};

export default async function lastfmHandler(req, res) {
    const API_KEY = process.env.DISCORD_API_KEY;
    const channelid = process.env.DISCORD_CHANNELID;
    const CACHE_DURATION = 60000;
    // const CACHE_DURATION = 1;
    const MLIMIT = 30;

    if (cache.timestamp && (Date.now() - cache.timestamp < CACHE_DURATION)) {
        const remaining = CACHE_DURATION - (Date.now() - cache.timestamp);
        return res.status(200).json({
            ...cache.data,
            cache_remaining_ms: remaining,
        });
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

            // If no content, check the attachment URL
            if (!contentstring && item.attachments?.[0]?.url) {
                contentstring = item.attachments[0].url;
            }

            // Ensure content is a valid string and starts with 'http'
            return typeof contentstring === 'string' && contentstring.startsWith('http');
        });

        const data = {
            "content": contentItem?.content, // content from the found item
            "attachment": contentItem?.attachments?.[0]?.url, // attachment URL from the found item
            "content_type": contentItem?.attachments?.[0]?.content_type
        };


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
