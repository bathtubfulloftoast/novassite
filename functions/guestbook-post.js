import colors from 'colors';
import sqlite3 from 'sqlite3';

let rcache;
const CACHE_DURATION = 30000;

const censored = ["nigg","fag","trann","account","elon","trump","sell","buy","crypto","coin"];
var site = new RegExp("(https|http):\/\/.*\.\S+");

export default async function lastfmHandler(req, res) {
const UserAgent = req.get('User-Agent');
const CF = req.headers['cf-connecting-ip'];
const XF = req.headers['x-forwarded-for'];
var LOC = req.connection.remoteAddress;
LOC = LOC.split(":").pop(); // not preferred but if it has to work it will

let IPADDR = "couldnt grab ip address";

if(CF) {
IPADDR = CF;
} else if (XF) {
IPADDR = XF;
} else {
IPADDR = LOC;
}

const now = new Date();

if(!req.body) {
return res.status(400).json({
error:"no data"
});
}

var username = req.body.name;
var message = req.body.message;
var scammer = false;

if(!username) {
return res.status(400).json({
error:"no username set"
});
};

if(!message) {
return res.status(400).json({
error:"no message set"
});
};

username = username.substring(0, 20);
message = message.substring(0, 512);
username = username.replace(/  +/g, ' ');
message = message.replace(/  +/g, ' ');
// its done in this order on purpose cause fuck you :3

if(username.length < 2) {
return res.status(400).json({
error:"name too short"
});
};

if(message.length < 5) {
return res.status(400).json({
error:"message too short"
});
};

if (rcache && (Date.now() - rcache < CACHE_DURATION)) {
const remaining = CACHE_DURATION - (Date.now() - rcache);
return res.status(429).json({
error:`not so fast, the rate limit is active for another ${Math.ceil(remaining/1000)}. seconds`
});
} else {
rcache = Date.now();
}

if(site.test(message.toLowerCase())) {
scammer = true;
}

if(site.test(username.toLowerCase())) {
scammer = true;
}

for (const item of censored) {
if(message.toLowerCase().includes(item)) {
scammer = true;
break;
}
}

for (const item of censored) {
if(username.toLowerCase().includes(item)) {
scammer = true;
break;
}
}

const db = new sqlite3.Database('cache/guestbook.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
if (err) return console.error('DB open error:', err.message);
// console.log('Connected to guestbook.db');
});

db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        message TEXT NOT NULL,
        date TEXT NOT NULL,
        ipaddr TEXT NOT NULL,
        useragent TEXT,
        scam BOOLEAN
    )
    `, (err) => {
        if (err) console.error('Table creation error:', err.message);
    });

const stmt = db.prepare(`INSERT INTO messages (username, message,date,ipaddr,useragent,scam) VALUES (?,?,?,?,?,?)`);
stmt.run(username, message, now.toISOString(), IPADDR, UserAgent, scammer, function(err) {
    if (err) {
        console.error('Insert error:', err.message);
    } else {
        // console.log(`Row inserted with id ${this.lastID}`);
    }
});
stmt.finalize();
});

db.close((err) => {
if (err) console.error('Error closing DB:', err.message);
// else console.log('Database connection closed');
});

if(scammer) {
res.status(400).json({
error:"your post has been held for review please wait for it to be checked manually.",
});
}

res.status(200).json({
name:username,
message:message,
date:now.toISOString(),
});

console.log(`${colors.green("[Site]")} someone posted to the guestbook`);
}
