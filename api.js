import openweatherAPI from './functions/openweather.js';
import qrAPI from './functions/qr.js';
// import discordinviteAPI from './functions/invite.js';
import uptime from './functions/uptime.js';
import dspresence from './functions/presence.js';
import lastfmTop from './functions/lastfm-top.js';
import lastfmRecent from './functions/lastfm-recent.js';
import discorduser from './functions/discorduser.js';
import steam from './functions/steamrecent.js';
import webcam from './functions/webcam.js';
import botinfo from './functions/botinfo.js';
import error from './functions/badroute.js';
import ipaddr from './functions/ipgrabber.js';

export default function registerAPIRoutes(app) {
app.post('/ping', (req, res) => {res.send('☃\n')})
app.get('/ping', (req, res) => {res.redirect('/snow')})

app.get('/api/openweather', openweatherAPI);
app.get('/api/qr', qrAPI);
// app.get('/api/discord-invite', discordinviteAPI);
app.get('/api/uptime', uptime);
app.get('/api/discord', dspresence);
app.get('/api/fm-top', lastfmTop);
app.get('/api/fm-recent', lastfmRecent);
app.get('/api/discord-user', discorduser);
app.get('/api/steam-recent', steam);
app.get('/api/webcam', webcam);
app.get('/api/bot', botinfo);
app.get('/api/IP', ipaddr);

app.get('/api/:route', error);
app.get('/api/', error);
app.get('/api', error);
}
