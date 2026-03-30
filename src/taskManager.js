const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "tasks.json");

let tasks = [];

function loadTasks() {
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, "utf8");
        if (data.trim()) {
            tasks = JSON.parse(data);
        }
    }
}

function saveTasks() {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

function addTask(task) {
    tasks.push(task);
    saveTasks();
}

function getTasks() {
    return tasks;
}

function removeTask(index) {
    tasks.splice(index, 1);
    saveTasks();
}

loadTasks();

module.exports = { addTask, getTasks, removeTask };