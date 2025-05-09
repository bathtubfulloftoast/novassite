import sqlite3 from 'sqlite3';
let messages = [];

export default async function lastfmHandler(req, res) {
    const db = new sqlite3.Database('nova.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
        if (err) {
            console.error("Database open error:", err.message);
            return res.status(500).json({ error: "Failed to open database" });
        }
    });

    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS guestbook (
            id INTEGER PRIMARY KEY,
            message TEXT,
            name TEXT,
            timestamp TEXT,
            spam TEXT
        )`, (err) => {
            if (err) {
                console.error("Table creation error:", err.message);
                db.close();
                return res.status(500).json({ error: "Failed to create table" });
            }

            db.all(`SELECT * FROM guestbook`, (err, rows) => {
                db.close();
                if (err) {
                    console.error("Read error:", err.message);
                    return res.status(500).json({ error: "Failed to read data" });
                }
const data = rows;

data.forEach(item => {
    if (item.spam === 0) {
        messages.push({
            message: item.message,
            name: item.name,
            timestamp:item.timestamp
        });
    }
});

messages = messages.slice(-25);



                return res.status(200).json(messages);
            });
        });
    });
}
