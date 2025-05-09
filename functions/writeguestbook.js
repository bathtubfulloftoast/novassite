import 'dotenv/config';
import sqlite3 from 'sqlite3';

let timestamp;

export default async function lastfmHandler(req, res) {
const webhook = process.env.GUESTBOOK_WEBHOOK; // ha it rhymes

const CACHE_DURATION = 120000;
//const CACHE_DURATION = 1;
const msglen = 256;
const namglen = 20;
const censored = ["buy","sell","account","trann","fag","nigg",'\u200B',"elon","trump","dot"]; // if you're checking this to get past it please get a life. also i get pinged idiot.
let spam = false;
var ipaddr = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

const now = new Date();
const iso = now.toISOString();

if (timestamp) {
    const elapsed = Date.now() - timestamp;
    const remaining = Math.max(0, CACHE_DURATION - elapsed);
    const remainingscs = Math.floor(remaining / 1000);
    if (remaining > 0) {
        return res.status(429).json({
            error:"rate limited",
            errormsg:`Cant process right now try again in ${remainingscs} seconds`,
            time_remaining: remainingscs,
        });
    }
}

if (!req.body) {
return res.status(400).json({ error: "no input", errormsg: "Please give an input" });
}


const { message, name } = req.body;

if (!message) {
return res.status(400).json({ error: "no message", errormsg: "Please enter a message" });
}
if (!name) {
return res.status(400).json({ error: "no name", errormsg: "Please enter a name" });
}
if(message.length > msglen) {
return res.status(400).json({ error: "message too long", errormsg: `Messages can only be ${msglen} characters.` });
}
if(name.length > namglen) {
return res.status(400).json({ error: "name too long", errormsg: `Names can only be ${namglen} characters.` });
}

if ( censored.some(word => message.toLowerCase().includes(word)) ) {
spam = true;
}
else if (censored.some(word => name.toLowerCase().includes(word)) ) {
spam = true;
}
else if ((/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(message))) {
spam = true;
}
else if ((/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(name))) {
spam = true;
}
timestamp = Date.now();

const url = webhook;

const response = await fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
content:null,
      "embeds": [
        {
          "title": name,
          "description": message,
          "footer": {"text": `spam: ${spam}`},
        }
      ]
    }),
});

const db = new sqlite3.Database('nova.db');

db.run(`CREATE TABLE IF NOT EXISTS "guestbook" (
    id INTEGER PRIMARY KEY,
    message TEXT,
    name TEXT,
    timestamp TEXT,
    spam INTEGER,
    ip TEXT
)`, (err) => {
    if (err) {
        console.error("Table creation error:", err.message);
        db.close();
        return;
    }

    db.run(`INSERT INTO "guestbook" (message, name, timestamp, spam, ip) VALUES (?,?,?,?,?)`,
           [message, name, iso, spam, ipaddr],
           function (err) {
               if (err) console.error("Insert error:", err.message);
               else console.log(`Row inserted with ID ${this.lastID} in guestbook`);
               db.close();
           });
});

return res.status(200).json({ message, name });
}
