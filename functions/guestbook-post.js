import colors from 'colors';
import sqlite3 from 'sqlite3';

let rcache;
const CACHE_DURATION = 30000;

const censored = ["nigg","fag","trann","account","elon","trump","sell","buy","crypto","coin"];
var site = new RegExp("(http|ftp|https):\\/\\/([\\w_-]+(?:(?:\\.[\\w_-]+)+))([\\w.,@?^=%&:\\/~+#-]*[\\w@?^=%&\\/~+#-])");

export default async function lastfmHandler(req, res) {
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

if (rcache && (Date.now() - rcache < CACHE_DURATION)) {
const remaining = CACHE_DURATION - (Date.now() - rcache);
return res.status(400).json({
error:"not so fast, the rate limit is active."
});
} else {
rcache = Date.now();
}

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
        scam BOOLEAN
    )
    `, (err) => {
        if (err) console.error('Table creation error:', err.message);
    });

const stmt = db.prepare(`INSERT INTO messages (username, message,date,ipaddr,scam) VALUES (?,?,?,?,?)`);
stmt.run(username, message,now.toISOString(),IPADDR,scammer, function(err) {
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

res.status(200).json({
name:username,
message:message,
date:now.toISOString(),
});

console.log(`${colors.green("[Site]")} someone posted to the guestbook`);
}
