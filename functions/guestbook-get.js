import colors from 'colors';
import sqlite3 from 'sqlite3';

const perp = 30;
let pagination = 0;

export default async function lastfmHandler(req, res) {
let cpage = 1;
const page = Number(req.query.page);

const db = new sqlite3.Database('cache/guestbook.db', sqlite3.OPEN_READ, (err) => {
if (err) return console.error('DB open error:', err.message);
});

db.all('SELECT username, message, date, scam,id FROM messages', (err, rows) => {
if (err) {
console.error('DB query error:', err.message);
return;
}

const messages = rows.filter(row => !row.scam).map(row => ({
name: row.username,
message: row.message,
date: row.date,
id: row.id,
}));

const ptot = messages.length;
const tpag = Math.ceil(ptot/perp);

if(page) {
cpage = page;
}

if (page < 1) {
cpage = 1;
}

if (page > tpag) {
cpage = tpag;
}

const min = cpage * perp - perp;
const max = cpage * perp;


const result = {
messages:messages.reverse().slice(min,max),
info:{
total_posts: ptot,
posts_per_page: perp,
total_pages: tpag,
current_page: cpage,
}
}

res.status(200).json(result)

db.close((err) => {
if (err) console.error('Error closing DB:', err.message);
});
});

console.log(`${colors.green("[Site]")} grabbed from the guestbook`);
}
