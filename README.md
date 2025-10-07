# novassite.net
## The silliest site on the web*

novassite is my main project previously developed in PHP and basic terrible manually written html,
this current revision is written in astrojs and uses expressjs as the backend

this site is designed to be hosted myself and also acts as a discord bot in order to grab my [discord presence](https://discord.com/developers/docs/rich-presence/overview)

this project does not work off of releases, the current commit is the current version that should be expected to be public.

this is also a personal passion project so do not expect the code to be nice and commented.


## Official Mirrors
- [git.gay](https://git.gay/bathtubfulloftoast/novassite) `MASTER`
- [github](https://github.com/bathtubfulloftoast/novassite)
- [gitlab](https://gitlab.com/bathtubfulloftoast/novassite)

## How to run

first run ``pnpm install`` to install required dependencies

next install ``pnpm run build`` to build the site itself

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

| Key | What it does | where to get |
| -------- | ------- | ------- |
| PORT | port for the website | right above this |
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
