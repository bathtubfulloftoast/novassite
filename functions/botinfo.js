import colors from 'colors';

import { client } from '../discordBot.js';

let cache = {};

export default async function presenceHandler(req, res) {

    res.set('Cache-Control', "max-age="+(60));

    // Check for valid cache
    if (cache.cached) {
        return res.status(200).json({
            ...cache.data,
        });
    }

    try {


        const data = {
            user: client.user,
            commands: client.commands,
            guildcount:client.guilds.cache.map(guild => guild.id).length,
            activities: client.presence.activities,
        };

        if (data.user.id) {
        cache = {
        data,
        cached:true,
        timestamp: Date.now(),
        };
        } else {
        return res.status(500).json({
        error:"couldnt grab all the bots info (its probably not online yet.)"
        });
        }


        res.status(200).json({
        ...data,
        });

        console.log(`${colors.green("[Site]")} grabbed bot info`);

    } catch (error) {
        console.error('Error fetching presence:', error);
        res.status(500).json({ error: 'couldnt grab the bots info (its probably not online yet.)' });
        console.log(`${colors.red("[ERROR]")} unable to grab bot info (are you logged in yet?)`);

    }
}
