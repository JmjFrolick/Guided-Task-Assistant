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

    return scheduler.insertBreaks(fullSchedule);
}

function printSchedule() {
    const scheduled = buildSchedule();

    console.log("\n=== BROKEN-DOWN SCHEDULE ===");

    if (scheduled.length === 0) {
        console.log("No tasks added yet.\n");
        return;
    }

    scheduled.forEach((task, index) => {
        if (task.isBreak) {
            console.log(`   → ${task.name}`);
        } else {
            console.log(`${index + 1}. ${task.name} - ${task.duration} min`);
        }
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

        rl.question("Duration (minutes): ", (duration) => {
            taskManager.addTask({
                name,
                duration: Number(duration)
            });

            console.log("\nTask added.");
            printSchedule();

            askTask();
        });
    });
}

console.log("Guided Task Assistant");
console.log("Enter your tasks and type 'done' when finished.\n");

askTask();