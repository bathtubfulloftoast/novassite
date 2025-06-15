// import openweatherAPI from './functions/openweather.js';
// import qrAPI from './functions/qr.js';
// import discordinviteAPI from './functions/invite.js';
// import uptime from './functions/uptime.js';
import dspresence from './functions/presence.js';
import lastfmTop from './functions/lastfm-top.js';
import lastfmRecent from './functions/lastfm-recent.js';

export default function registerAPIRoutes(app) {
// app.get('/api/lastfm', lastfmAPI);
// app.get('/api/openweather', openweatherAPI);
// app.get('/api/qr', qrAPI);
// app.get('/api/invite', discordinviteAPI);
// app.get('/api/uptime', uptime);
app.get('/api/discord', dspresence);
app.get('/api/fmtop', lastfmTop);
app.get('/api/fmrecent', lastfmRecent);

}
