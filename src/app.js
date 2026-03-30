const readline = require("readline");
const taskManager = require("./taskManager");
const scheduler = require("./scheduler");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function buildSchedule() {
    const response = await fetch("/schedule", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ tasks })
    });

    return await response.json();
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