const taskManager = require("./taskManager");
const scheduler = require("./scheduler");

taskManager.addTask({ name: "Study algorithms", priority: 3, duration: 60 });
taskManager.addTask({ name: "Gym", priority: 1, duration: 45 });
taskManager.addTask({ name: "Assignment", priority: 5, duration: 120 });

const tasks = taskManager.getTasks();

console.log("Raw tasks:");
console.log(tasks);

const scheduled = scheduler.scheduleTasks(tasks);

console.log("\nScheduled tasks:");
console.log(scheduled);