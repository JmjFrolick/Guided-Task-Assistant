const express = require("express");
const path = require("path");
const app = express();
const scheduler = require("./scheduler");
const taskManager = require("./taskManager");

app.use(express.json());
app.use(express.static(path.join(__dirname, "../ui")));

app.post("/tasks", (req, res) => {
    const task = req.body;
    taskManager.addTask(task);
    res.json({ message: "Task saved successfully" });
});

app.get("/tasks", (req, res) => {
    res.json(taskManager.getTasks());
});

app.delete("/tasks/:index", (req, res) => {
    const index = parseInt(req.params.index, 10);
    taskManager.removeTask(index);
    res.json({ message: "Task removed successfully" });
});

app.post("/schedule", (req, res) => {
    const tasks = req.body.tasks;
    let fullSchedule = [];

    tasks.forEach(task => {
        fullSchedule.push(...scheduler.breakTask(task));
    });

    fullSchedule = scheduler.insertBreaks(fullSchedule);
    res.json(fullSchedule);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});