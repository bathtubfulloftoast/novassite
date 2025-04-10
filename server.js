import express from 'express';
import { handler as ssrHandler } from './dist/server/entry.mjs';

import lastfmAPI from './functions/lastfm.js';
import openweatherAPI from './functions/openweather.js';
import qrAPI from './functions/qr.js';
import discorduserAPI from './functions/discord.js';

const port = 4321;

const app = express();
const base = '/';

app.get('/api/lastfm', lastfmAPI);
app.get('/api/openweather', openweatherAPI);
app.get('/api/qr', qrAPI);
app.get('/api/discord', discorduserAPI);

app.use(base, express.static('dist/client/'));
app.use(ssrHandler);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
