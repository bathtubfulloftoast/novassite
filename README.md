# novassite.net
the official repo for Novas Site

## DISCLAIMER

though 99% of the website is perfectly fine there are very few sections that should not be seen by any minors.

i am a legal adult and i can and will have some things dedicated to adult topics on my website.

since neither github nor git.gay have any way of age gating repos i will say this upfront

**IF YOU ARE A MINOR AVOID THESE PATHS**
- public/media/NSFW
- src/pages/adult
- public/bot/cool/clitoris.png */hj*

everything else in this repo and on the site is entirely SFW

## How to run

first run ``npm install`` to install required dependencies

next install ``npm run build`` to build the site itself

finally run ``node server.js`` to run the server itself


then run one of these

| Command | What it does |
| -------- | ------- |
| npm run build | builds astro |
| npm run preview | preview built site without server functions |
| npm run dev | astro dev mode |
| node server.js | run the server with node |

## .env

this is where all the api keys and other config goes

the only things with proper error handling is an unset discord bot token and an unset port

everything else will just shit itself.

### example

an easy example config for you to copy and paste

```
PORT=8080
PROTOCOL=HTTP
STEAM_API_KEY=
LASTFM_API_KEY=
OPENWEATHER_API_KEY=
QR_CHANNELID=
PRESENCE_USERID=
PRESENCE_GUILDID=
DISCORD_API_KEY=
DISCORD_BOT_CLIENTID=
JOINCHANNEL=
LOGCHANNEL=
```

### explanation

| Key | What it does | where to get/other info |
| -------- | ------- | ------- |
| PORT | port for the website | inf unset/invalid displays this page. |
| PROTOCOL | sets the protocol to either http or https | if unset/invalid defaults to http |
| STEAM_API_KEY | steam API key | https://steamcommunity.com/dev/apikey |
| LASTFM_API_KEY | Last.FM API Key | https://www.last.fm/api/authentication |
| OPENWEATHER_API_KEY | Open Weather Map API Key | https://home.openweathermap.org/api_keys |
| QR_CHANNELID | Discord Channel ID that will grab qr code content | https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID |
| PRESENCE_USERID | Primary User ID that will be assumed to be websites owner. | https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID |
| PRESENCE_GUILDID | Primary Guild ID that will be used to grab any/all info | https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID |
| DISCORD_API_KEY | Discord Bot Token | no guide avalible officially???? |
| DISCORD_BOT_CLIENTID | Discord Bots Client ID | again no guide ig?? |
| JOINCHANNEL | Discord Channel where joins/leaves will be logged | https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID |
| LOGCHANNEL | Discord Channel where things will be logged | https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID |
