// backend/database.js
const sqlite3 = require('sqlite3').verbose();
const DBSOURCE = "pomodoro.db";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');
        // Create table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS stats (
            key TEXT PRIMARY KEY,
            value INTEGER
        )`, (err) => {
            if (err) {
                console.error("Error creating table", err);
            } else {
                // Initialize count if not present
                const initSql = "INSERT OR IGNORE INTO stats(key, value) VALUES(?,?)";
                db.run(initSql, ["completedPomodoros", 0]);
                console.log("Stats table ready.");
            }
        });
    }
});

module.exports = db;
