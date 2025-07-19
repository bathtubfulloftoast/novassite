import { Events } from 'discord.js';

export function MessageCreate(client) {
  client.on(Events.MessageCreate, message => {
    if (message.author.bot) return;



    function sendmessage(content) {
      client.channels.cache.get(message.channelId).send(content);
    }

    if (message.mentions.has(client.user)) {
    message.react("🦌");
    console.log(`[Discord] deer reacted ${message.author.username}`);
    }

    const responses = [
      { keywords: ["crazy"], response: "crazy?" },
      { keywords: ["massive"], response: "you know what else is massive?" },
      { keywords: ["doing it"], response: "im doing it are you?" },
      { keywords: ["nova"], response: "you rang?" },
      { keywords: ["invincible"], response: "https://tenor.com/view/invulnerable-gif-22484955" },
      { keywords: ["buck bumble"], response: "https://www.ebay.com/sch/i.html?_nkw=buck+bumble+n64" },
      { keywords: ["kys", "kill y"], response: msg => `<@${msg.author.id}> youre so nice :D` },
      { keywords: ["kms", "kill m"], response: "<https://988lifeline.org/>" },
      { keywords: ["chrome", "brave br", "degoo", "chromium", "vivaldi","opera", "ungoog", "edge", "samsung br", "samsung in"], response: "https://youtu.be/TuK5mlW9svQ?t=6"}, // chrome hate lol
      { keywords: ["skibidi","sigma","alpha","beta","goon","sus","amongus","among us"], response: "what was that?" },
      { keywords: ["starwalker"], response: "this reference is                                                pissing me off" },
      { keywords: ["deltarune"], response: "tomorrow?" },
      { keywords: ["gentoo","ubuntu","arch","linux","debian","raspbian","steamos", "redha", "red ha","freebsd","free bsd"], response: "neeeeerd" },
      { keywords: ["yip"], response: "YIPPPIEEEEE" },
      { keywords: ["based"], response: "BASED ON WHAT" },



    ];

    const content = message.content.toLowerCase();

    for (const entry of responses) {
      if (entry.keywords.some(kw => content.includes(kw))) {
        const output = typeof entry.response === "function"
          ? entry.response(message)
          : entry.response;
        sendmessage(output);
        console.log(`[Discord] Replied to ${message.author.username} saying "${message.content}"`);
        break;
      }
    }
  });
}
