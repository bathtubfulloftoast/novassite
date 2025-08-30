import colors from 'colors';
import sqlite3 from 'sqlite3';

export default async function lastfmHandler(req, res) {
const db = new sqlite3.Database('cache/guestbook.db', sqlite3.OPEN_READ, (err) => {
if (err) return console.error('DB open error:', err.message);
});

db.all('SELECT username, message, date, scam FROM messages', (err, rows) => {
if (err) {
console.error('DB query error:', err.message);
return;
}

const messages = rows.filter(row => !row.scam).map(row => ({
name: row.username,
message: row.message,
date: row.date
}));

res.status(200).json(messages.reverse().slice(0,25))

db.close((err) => {
if (err) console.error('Error closing DB:', err.message);
});
});

console.log(`${colors.green("[Site]")} function guestbook ran`);
}
