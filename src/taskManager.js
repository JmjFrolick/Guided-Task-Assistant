
const fs = require("fs"); // allows reading and writing to files

const path = require("path"); 
const filePath = path.join(__dirname, "tasks.json"); // builds path to tasks.json

let tasks = []; // array that stores tasks

// loads tasks from tasks.json
function loadTasks() {
    if (fs.existsSync(filePath)) { // checks if file exists
        const data = fs.readFileSync(filePath, "utf8");
        if (data.trim()) {
            tasks = JSON.parse(data);
        }
    }
}

// writes tasks to tasks.json
function saveTasks() {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2)); // formats file
}

// adds task to array and writes to tasks.json
function addTask(task) {
    tasks.push(task);
    saveTasks();
}

// return current list of tasks
function getTasks() {
    return tasks;
}

// removes a task from array and file
function removeTask(index) {
    tasks.splice(index, 1);
    saveTasks();
}

loadTasks(); // loads takes when the server starts

module.exports = { addTask, getTasks, removeTask };