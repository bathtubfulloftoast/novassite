import express from 'express';
import bodyParser from 'body-parser'
import colors from 'colors';
import { handler as ssrHandler } from './dist/server/entry.mjs';
import registerAPIRoutes from './api.js';
import './discordBot.js';
import 'dotenv/config';
import fs from 'fs';
import {marked} from 'marked';

let port = process.env.PORT;

const app = express();
const base = '/';

function startServer() {
if(!port) {
port = 8080;
console.log(`${colors.red("[ERROR]")} config invalid please check site.`);

fs.readFile('./README.md', 'utf8', (err, data) => {
if (err) {
console.error(err);
return;
}
app.get('/', (req, res) => {
res.send(`<head><title>ERROR</title><style>table{font-family:arial,sans-serif;border-collapse:collapse;}td,th{border:1px solid #dddddd;text-align:left;padding:8px;}tr:nth-child(even){background-color:#dddddd;}code{background-color:#dddddd;}</style></head> no port set in .env file<br>you can look at the README below<br><hr>${marked.parse(data)}<hr><br><b>server has been stopped</b>`);
console.log(`${colors.green("[Site]")} error page loaded, stopping server.`);
process.exit(0);
})
});


app.listen(port, () => {
console.log(`${colors.red("[ERROR]")} Server running invalid config please check http://localhost:${port}`);
});
return;
}

registerAPIRoutes(app);
app.post('/ping', (req, res) => {res.send('☃\n')})
app.get('/ping', (req, res) => {res.redirect('/snow')})

app.use(base, express.static('dist/client/'));
app.use(ssrHandler);

app.use((req, res) => {
    res.status(404).sendFile('dist/client/404.html', { root: '.' });
});

app.listen(port, () => {
    console.log(`${colors.green("[Site]")} Server running at http://localhost:${port}`);
});
}

startServer();
