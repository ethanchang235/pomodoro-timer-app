// backend/server.js
const express = require("express");
const cors = require("cors");
const db = require("./database.js");

const app = express();
const PORT = 5001; // Use a different port than the React default (3000)

app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // To parse JSON bodies

// --- API Endpoints ---

// GET: Fetch the current count of completed pomodoros
app.get("/api/stats", (req, res) => {
    const sql = "SELECT value FROM stats WHERE key = ?";
    db.get(sql, ["completedPomodoros"], (err, row) => {
        if (err) {
            res.status(500).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": row ? row.value : 0
        });
    });
});

// POST: Increment the count of completed pomodoros
app.post("/api/complete", (req, res) => {
    const sql = "UPDATE stats SET value = value + 1 WHERE key = ?";
    db.run(sql, ["completedPomodoros"], function(err) { // Use function() to access this.changes
        if (err) {
            res.status(500).json({ "error": err.message });
            return;
        }
        if (this.changes === 0) {
             res.status(404).json({ "error": "Record not found or not updated" });
             return;
        }
         // Fetch the new count to return it
        const fetchSql = "SELECT value FROM stats WHERE key = ?";
        db.get(fetchSql, ["completedPomodoros"], (fetchErr, row) => {
             if (fetchErr) {
                res.status(500).json({ "error": fetchErr.message });
                return;
            }
            res.json({
                "message": "success",
                "newCount": row ? row.value : 'N/A' // Should always exist now
            });
        });
    });
});


// Default response for any other request
app.use(function(req, res){
    res.status(404).send("Not Found");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
