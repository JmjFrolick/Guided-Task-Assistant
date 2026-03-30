const express = require("express");
const path = require("path");
const app = express();

const scheduler = require("./scheduler");

app.use(express.json());
app.use(express.static(path.join(__dirname, "../ui")));

app.post("/schedule", (req, res) => {
    const tasks = req.body.tasks;
    let fullSchedule = [];

    tasks.forEach(task => {
        fullSchedule.push(...scheduler.breakTask(task));
    });

    if (scheduler.insertBreaks) {
        fullSchedule = scheduler.insertBreaks(fullSchedule);
    }

    res.json(fullSchedule);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});