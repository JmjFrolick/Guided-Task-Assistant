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
                duration: 5,
                priority
            },
            {
                name: `Focus on key concepts for ${task.name}`,
                duration: Math.round(total * 0.30),
                priority
            },
            {
                name: `Practice examples for ${task.name}`,
                duration: Math.round(total * 0.35),
                priority
            },
            {
                name: `Recap what you learned from ${task.name}`,
                duration:
                    total -
                    5 -
                    Math.round(total * 0.30) -
                    Math.round(total * 0.35),
                priority
            }
        ];
    }

    if (intent === "coding") {
        return [
            {
                name: `Understand requirements for ${task.name}`,
                duration: Math.round(total * 0.20),
                priority
            },
            {
                name: `Plan approach for ${task.name}`,
                duration: Math.round(total * 0.20),
                priority
            },
            {
                name: `Implement ${task.name}`,
                duration: Math.round(total * 0.40),
                priority
            },
            {
                name: `Test and debug ${task.name}`,
                duration:
                    total -
                    Math.round(total * 0.20) -
                    Math.round(total * 0.20) -
                    Math.round(total * 0.40),
                priority
            }
        ];
    }

    if (intent === "writing") {
        return [
            {
                name: `Brainstorm ideas for ${task.name}`,
                duration: Math.round(total * 0.20),
                priority
            },
            {
                name: `Create an outline for ${task.name}`,
                duration: Math.round(total * 0.20),
                priority
            },
            {
                name: `Write the main draft for ${task.name}`,
                duration: Math.round(total * 0.40),
                priority
            },
            {
                name: `Revise and improve ${task.name}`,
                duration:
                    total -
                    Math.round(total * 0.20) -
                    Math.round(total * 0.20) -
                    Math.round(total * 0.40),
                priority
            }
        ];
    }

    if (intent === "cleaning") {
        return [
            {
                name: `Prepare supplies for ${task.name}`,
                duration: Math.round(total * 0.15),
                priority
            },
            {
                name: `Clear clutter for ${task.name}`,
                duration: Math.round(total * 0.30),
                priority
            },
            {
                name: `Do the main cleaning for ${task.name}`,
                duration: Math.round(total * 0.35),
                priority
            },
            {
                name: `Final tidy-up for ${task.name}`,
                duration:
                    total -
                    Math.round(total * 0.15) -
                    Math.round(total * 0.30) -
                    Math.round(total * 0.35),
                priority
            }
        ];
    }

    return [
        {
            name: `Understand what is needed for ${task.name}`,
            duration: Math.round(total * 0.20),
            priority
        },
        {
            name: `Start the first part of ${task.name}`,
            duration: Math.round(total * 0.30),
            priority
        },
        {
            name: `Continue working on ${task.name}`,
            duration: Math.round(total * 0.30),
            priority
        },
        {
            name: `Finish and review ${task.name}`,
            duration:
                total -
                Math.round(total * 0.20) -
                Math.round(total * 0.30) -
                Math.round(total * 0.30),
            priority
        }
    ];
}

function scheduleTasks(tasks) {
    return tasks.slice().sort((a, b) => {
        return b.priority - a.priority;
    });
}

module.exports = { detectIntent, breakTask, scheduleTasks };