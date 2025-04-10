import express from 'express';
import { handler as ssrHandler } from './dist/server/entry.mjs';

import lastfmAPI from './api/lastfm.js';
import openweatherAPI from './api/openweather.js';

const app = express();
const base = '/';

app.get('/api/lastfm', lastfmAPI);
app.get('/api/openweather', openweatherAPI);

app.use(base, express.static('dist/client/'));
app.use(ssrHandler);

app.listen(8080, () => {
    console.log('Server running at http://localhost:8080');
});
