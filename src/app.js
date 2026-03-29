const readline = require("readline");
const taskManager = require("./taskManager");
const scheduler = require("./scheduler");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function buildSchedule() {
    const sortedMainTasks = scheduler.scheduleTasks(taskManager.getTasks());
    const fullSchedule = [];

    sortedMainTasks.forEach(task => {
        const brokenDown = scheduler.breakTask(task);
        fullSchedule.push(...brokenDown);
    });

    if (scheduler.insertBreaks) {
        return scheduler.insertBreaks(fullSchedule);
    }

    return fullSchedule;
}

function printSchedule() {
    const scheduled = buildSchedule();

    console.log("\n=== BROKEN-DOWN SCHEDULE ===");

    if (scheduled.length === 0) {
        console.log("No tasks added yet.\n");
        return;
    }

    scheduled.forEach((task, index) => {
        console.log(
            `${index + 1}. ${task.name} - ${task.duration} min (priority ${task.priority})`
        );
    });

    console.log();
}

function askTask() {
    rl.question("Task name (or 'done'): ", (name) => {
        if (name.toLowerCase() === "done") {
            printSchedule();
            rl.close();
            return;
        }

        rl.question("Priority (1-5): ", (priority) => {
            rl.question("Duration (minutes): ", (duration) => {
                taskManager.addTask({
                    name,
                    priority: parseInt(priority),
                    duration: parseInt(duration)
                });

                console.log("\nTask added.");
                printSchedule();

                askTask();
            });
        });
    });
}

console.log("Guided Task Assistant");
console.log("Enter your tasks and type 'done' when finished.\n");

askTask();