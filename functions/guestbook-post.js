import colors from 'colors';
import sqlite3 from 'sqlite3';


export default async function lastfmHandler(req, res) {
const now = new Date();

const username = "Alice";
const message = "Hello World";
const ipaddr = "127.0.0.1";

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
        ipaddr TEXT NOT NULL
    )
    `, (err) => {
        if (err) console.error('Table creation error:', err.message);
    });

        const stmt = db.prepare(`INSERT INTO messages (username, message,date,ipaddr) VALUES (?,?,?,?)`);
        stmt.run(username, message,now.toISOString(),ipaddr, function(err) {
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



console.log(`${colors.green("[Site]")} someone posted to the guestbook`);
}
