// import lastfmAPI from './functions/lastfm.js';
// import openweatherAPI from './functions/openweather.js';
// import qrAPI from './functions/qr.js';
// import discorduserAPI from './functions/discord.js';
// import discordinviteAPI from './functions/invite.js';
// import uptime from './functions/uptime.js';
import dspresence from './functions/presence.js';

export default function registerAPIRoutes(app) {
// app.get('/api/lastfm', lastfmAPI);
// app.get('/api/openweather', openweatherAPI);
// app.get('/api/qr', qrAPI);
// app.get('/api/discord', discorduserAPI);
// app.get('/api/invite', discordinviteAPI);
// app.get('/api/uptime', uptime);
app.get('/api/presence', dspresence);
}
