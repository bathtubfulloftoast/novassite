import express from 'express';
import expressip from 'express-ip';
import http from 'http';
import https from 'https';
import bodyParser from 'body-parser'
import colors from 'colors';
import { handler as ssrHandler } from './dist/server/entry.mjs';
import registerAPIRoutes from './api.js';
import './discordBot.js';
import 'dotenv/config';
import fs from 'fs';
import {marked} from 'marked';

let port = process.env.PORT;
let protocol = process.env.PROTOCOL.toLowerCase();

var key = fs.readFileSync('fakecert.key');
var cert = fs.readFileSync('fakecert.crt');
var options = {
    key: key,
    cert: cert
};

const app = express();
const base = '/';

function startServer() {
if(!port || isNaN(port)) {
port = 8080;
console.log(`${colors.red("[ERROR]")} config invalid please check site.`);

fs.readFile('./README.md', 'utf8', (err, data) => {
if (err) {
console.error(err);
return;
}
app.get('/', (req, res) => {
res.send(`<head><title>ERROR</title><style>table{font-family:arial,sans-serif;border-collapse:collapse;}td,th{border:1px solid #dddddd;text-align:left;padding:8px;}tr:nth-child(even){background-color:#dddddd;}code{background-color:#dddddd;}</style></head> no port or invalid port set in .env file<br>you can look at the README below<br><hr>${marked.parse(data)}<hr><br><b>server has been stopped</b>`);
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
app.post('/ping', (req, res) => {res.send('☃')})
app.get('/ping', (req, res) => {res.send('<head><title>&#9731;</title><link rel="icon" href="null"> </head><div style="display:flex;width:100vw;height:100vh;align-items:center;text-align:center;justify-content:center;"><h1 style="font-size:70vh">&#9731;</h1></div>')})


app.use(base, express.static('dist/client/'));
app.use(ssrHandler);

app.use((req, res) => {
    res.status(404).sendFile('dist/client/404.html', { root: '.' });
});

if (protocol == "https") {
var server = https.createServer(options, app);
protocol = "https";
} else {
var server = http.createServer(app);
protocol = "http";
}

server.listen(port, () => {
    console.log(`${colors.green("[Site]")} Server running at ${protocol}://localhost:${port}`);
});
}

startServer();
