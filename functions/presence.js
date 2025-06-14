import { client } from '../discordBot.js';

export default async function presenceHandler(req, res) {
    const userId = '471806482648924174';
    const guild = client.guilds.cache.get('1264262104043618336');

    try {
        const member = await guild.members.fetch(userId);
        if (!member || !member.presence) {
            return res.status(404).json({ error: 'Presence not found for user' });
        }

        res.status(200).json(
            {
                id: member.user.id,
                bot: member.user.bot,
                username: member.user.username,
                nickname: member.user.globalName,
                status: member.presence.status,
                clientstatus: member.presence.clientStatus,

                avatar: member.user.avatar,
                creationtime: member.user.createdTimestamp,
                discriminator: member.user.discriminator, //for bots.
                tag: member.user.tag, //for bots.

                activities: member.presence.activities,

            }
        );
    } catch (error) {
        console.error('Error fetching presence:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
