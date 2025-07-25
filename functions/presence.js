import 'dotenv/config';
import colors from 'colors';

import { client } from '../discordBot.js';

let cache = {};

// if you want this thing for yourself use lanyard.
// i selfhost this because i prefer the control.
// https://lanyard.eggsy.xyz/

export default async function presenceHandler(req, res) {
    const CACHE_DURATION = 15000;
    const userId = process.env.PRESENCE_USERID;
    const guild = client.guilds.cache.get(process.env.PRESENCE_GUILDID);

    // Check for valid cache
    if (cache.timestamp && (Date.now() - cache.timestamp < CACHE_DURATION)) {
        const remaining = CACHE_DURATION - (Date.now() - cache.timestamp);
        return res.status(200).json({
            ...cache.data,
            cache_remaining: Math.floor(remaining / 1000),
        });
    }

    try {
        const member = await guild.members.fetch(userId);
        if (!member || !member.presence) {
            return res.status(404).json({ error: 'Presence not found for user' });
        }

        const fullUser = await member.user.fetch(); // litterally just for grabbing the accent color.

        const data = {
            id: member.user.id,
            bot: member.user.bot,
            username: member.user.username,
            nickname: member.user.globalName,
            status: member.presence.status,
            clientstatus: member.presence.clientStatus,
            avatar: member.user.avatar,
            banner: member.user.banner,
            accentColor: fullUser.accentColor,
            creationtime: member.user.createdTimestamp,
            discriminator: member.user.discriminator,
            tag: member.user.tag,
            activities: member.presence.activities,
        };

        cache = {
            data,
            timestamp: Date.now(),
        };

        res.status(200).json({
            ...data,
            cache_remaining: Math.floor(CACHE_DURATION / 1000),
        });
    } catch (error) {
        console.error('Error fetching presence:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
console.log(`${colors.green("[Site]")} grabbed discord presence`);
}
