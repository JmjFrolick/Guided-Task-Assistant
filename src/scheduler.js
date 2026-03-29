function detectIntent(taskName) {
    const name = taskName.toLowerCase();

    if (
        name.includes("study") ||
        name.includes("read") ||
        name.includes("learn") ||
        name.includes("review") ||
        name.includes("exam")
    ) {
        return "learning";
    }

    if (
        name.includes("code") ||
        name.includes("program") ||
        name.includes("build") ||
        name.includes("debug") ||
        name.includes("develop")
    ) {
        return "coding";
    }

    if (
        name.includes("write") ||
        name.includes("essay") ||
        name.includes("report") ||
        name.includes("paper") ||
        name.includes("draft")
    ) {
        return "writing";
    }

    if (
        name.includes("clean") ||
        name.includes("organize") ||
        name.includes("laundry") ||
        name.includes("room") ||
        name.includes("desk")
    ) {
        return "cleaning";
    }

    return "general";
}

function breakTask(task) {
    const intent = detectIntent(task.name);
    const total = task.duration;
    const priority = task.priority;

    if (intent === "learning") {
        return [
            {
                name: `Gather materials and prepare for ${task.name}`,
                duration: 5
            },
            {
                name: `Focus on key concepts for ${task.name}`,
                duration: Math.round(total * 0.30)
            },
            {
                name: `Practice examples for ${task.name}`,
                duration: Math.round(total * 0.35)
            },
            {
                name: `Recap what you learned from ${task.name}`,
                duration:
                    total -
                    5 -
                    Math.round(total * 0.30) -
                    Math.round(total * 0.35)
            }
        ];
    }

    if (intent === "coding") {
        return [
            {
                name: `Understand requirements for ${task.name}`,
                duration: Math.round(total * 0.20)
            },
            {
                name: `Plan approach for ${task.name}`,
                duration: Math.round(total * 0.20)
            },
            {
                name: `Implement ${task.name}`,
                duration: Math.round(total * 0.40)
            },
            {
                name: `Test and debug ${task.name}`,
                duration:
                    total -
                    Math.round(total * 0.20) -
                    Math.round(total * 0.20) -
                    Math.round(total * 0.40),
            }
        ];
    }

    if (intent === "writing") {
        return [
            {
                name: `Brainstorm ideas for ${task.name}`,
                duration: Math.round(total * 0.20),
            },
            {
                name: `Create an outline for ${task.name}`,
                duration: Math.round(total * 0.20),
            },
            {
                name: `Write the main draft for ${task.name}`,
                duration: Math.round(total * 0.40),
            },
            {
                name: `Revise and improve ${task.name}`,
                duration:
                    total -
                    Math.round(total * 0.20) -
                    Math.round(total * 0.20) -
                    Math.round(total * 0.40),
            }
        ];
    }

    if (intent === "cleaning") {
        return [
            {
                name: `Prepare supplies for ${task.name}`,
                duration: Math.round(total * 0.15)
            },
            {
                name: `Clear clutter for ${task.name}`,
                duration: Math.round(total * 0.30)
            },
            {
                name: `Do the main cleaning for ${task.name}`,
                duration: Math.round(total * 0.35)
            },
            {
                name: `Final tidy-up for ${task.name}`,
                duration:
                    total -
                    Math.round(total * 0.15) -
                    Math.round(total * 0.30) -
                    Math.round(total * 0.35)
            }
        ];
    }

    return [
        {
            name: `Understand what is needed for ${task.name}`,
            duration: Math.round(total * 0.20)
        },
        {
            name: `Start the first part of ${task.name}`,
            duration: Math.round(total * 0.30)
        },
        {
            name: `Continue working on ${task.name}`,
            duration: Math.round(total * 0.30)
        },
        {
            name: `Finish and review ${task.name}`,
            duration:
                total -
                Math.round(total * 0.20) -
                Math.round(total * 0.30) -
                Math.round(total * 0.30)
        }
    ];
}

function insertBreaks(tasks) {
    const result = [];
    let workTime = 0;
    const breakInterval = 90; 

    const breakMessages = [
        "Remember to take a short break",
        "Consider taking a short break to reset",
        "A short break could help you recharge"
    ];

    let breakIndex = 0;

    tasks.forEach(task => {
        result.push(task);

        if (task.duration) {
            workTime += task.duration;
        }

        if (workTime >= breakInterval) {
            result.push({
                name: breakMessages[breakIndex % breakMessages.length],
                isBreak: true
            });

            breakIndex++;
            workTime = 0;
        }
    });

    return result;
}

function scheduleTasks(tasks) {
    return tasks.slice();
}

module.exports = { detectIntent, breakTask, scheduleTasks, insertBreaks };