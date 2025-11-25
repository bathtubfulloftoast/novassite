import colors from 'colors';

import { client } from '../discordBot.js';

let cache = {};

export default async function presenceHandler(req, res) {
    const CACHE_DURATION = 60000;

    res.set('Cache-Control', "max-age="+(CACHE_DURATION/1000));

    // Check for valid cache
    if (cache.timestamp && (Date.now() - cache.timestamp < CACHE_DURATION)) {
        const remaining = CACHE_DURATION - (Date.now() - cache.timestamp);
        return res.status(200).json({
            ...cache.data,
            // cache_remaining: Math.floor(remaining / 1000),
        });
    }

    try {


        const data = {
            user: client.user,
            commands: client.commands,
            guildcount:client.guilds.cache.map(guild => guild.id).length,
            activities: client.presence.activities,
        };

        cache = {
            data,
            timestamp: Date.now(),
        };

        res.status(200).json({
            ...data,
            // cache_remaining: Math.floor(CACHE_DURATION / 1000),
        });
        console.log(`${colors.green("[Site]")} grabbed bot info`);

    } catch (error) {
        console.error('Error fetching presence:', error);
        res.status(500).json({ error: 'Internal server error' });
        console.log(`${colors.red("[ERROR]")} unable to grab bot info (are you logged in yet?)`);

    }
}
