import express from 'express';
import http from 'http';
import bodyParser from 'body-parser'
import colors from 'colors';
import { handler as ssrHandler } from './dist/server/entry.mjs';
import registerAPIRoutes from './api.js';
import './discordBot.js';
import 'dotenv/config';

let port = process.env.PORT;

const app = express();
const base = '/';

app.use(express.urlencoded());

registerAPIRoutes(app);

app.use(base, express.static('dist/client/'));
app.use(ssrHandler);

app.use((req, res) => {
    res.status(404).sendFile('dist/client/404.html', { root: '.' });
});

var server = http.createServer(app);


server.listen(port, () => {
    console.log(`${colors.green("[Site]")} Server running at http://localhost:${port}`);
});
