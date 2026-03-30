const express = require("express");
const path = require("path");
const app = express();
const scheduler = require("./scheduler");
const taskManager = require("./taskManager");

app.use(express.json()); // allows server to read json data
app.use(express.static(path.join(__dirname, "../ui"))); // loads ui files

// receives task from frontend and saves using taskManager
app.post("/tasks", (req, res) => {
    const task = req.body;
    taskManager.addTask(task);
    res.json({ message: "Task saved successfully" });
});

// returns all saved tasks to restore previous tasks
app.get("/tasks", (req, res) => {
    res.json(taskManager.getTasks());
});

// gets index of removed task and removes it from storage
app.delete("/tasks/:index", (req, res) => {
    const index = parseInt(req.params.index, 10);
    taskManager.removeTask(index);
    res.json({ message: "Task removed successfully" });
});

// retrieves all tasks, breaks them into subtasks, adds breaks, and returns final schedule
app.post("/schedule", (req, res) => {
    const tasks = req.body.tasks;
    let fullSchedule = [];

    // break each task into subtasks
    tasks.forEach(task => {
        fullSchedule.push(...scheduler.breakTask(task));
    });

    fullSchedule = scheduler.insertBreaks(fullSchedule); // insert breaks where necessary
    res.json(fullSchedule);
});

// starts server on port 3000
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});