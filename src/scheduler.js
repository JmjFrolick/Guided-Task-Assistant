function detectIntent(taskName) {
    const name = taskName.toLowerCase();

    if (
        name.includes("study") ||
        name.includes("read") ||
        name.includes("learn") ||
        name.includes("review") ||
        name.includes("exam") ||
        name.includes("test")
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
        name.includes("room") ||
        name.includes("desk")
    ) {
        return "cleaning";
    }

        if (
        name.includes("laundry") ||
        name.includes("wash clothes") ||
        name.includes("fold clothes")
    ) {
        return "laundry";
    }

    if (
        name.includes("dishes") ||
        name.includes("wash dishes") ||
        name.includes("do dishes") ||
        name.includes("dishwashing")
    ) {
        return "dishes";
    }

    if (
        name.includes("workout") ||
        name.includes("exercise") ||
        name.includes("gym") ||
        name.includes("home gym") ||
        name.includes("training")
    ) {
        return "exercise";
    }

    if (
        name.includes("plan") ||
        name.includes("planning") ||
        name.includes("schedule") ||
        name.includes("organize day") ||
        name.includes("organize week") ||
        name.includes("to-do list")
    ) {
        return "planning";
    }

    if (
        name.includes("practice") ||
        name.includes("guitar") ||
        name.includes("piano") ||
        name.includes("sing") ||
        name.includes("music") ||
        name.includes("draw") ||
        name.includes("painting") ||
        name.includes("art") ||
        name.includes("sketch")
    ) {
        return "practice";
    }

    return "general";
}

function breakTask(task) {
    const intent = detectIntent(task.name);
    const total = task.duration;

    if (intent === "learning") {
        return [
            {
                name: `Gather materials and prepare for ${task.name}`,
                duration: Math.round(total * 0.10),
                parentTask: task.name
            },
            {
                name: `Focus on key concepts for ${task.name}`,
                duration: Math.round(total * 0.30),
                parentTask: task.name
            },
            {
                name: `Practice examples for ${task.name}`,
                duration: Math.round(total * 0.35),
                parentTask: task.name
            },
            {
                name: `Recap what you learned from ${task.name}`,
                duration:
                    total -
                    Math.round(total * 0.10) - 
                    Math.round(total * 0.30) -
                    Math.round(total * 0.35),
                    parentTask: task.name
            }
        ];
    }

    if (intent === "coding") {
        return [
            {
                name: `Understand requirements for ${task.name}`,
                duration: Math.round(total * 0.20),
                parentTask: task.name
            },
            {
                name: `Plan approach for ${task.name}`,
                duration: Math.round(total * 0.20),
                parentTask: task.name
            },
            {
                name: `Implement ${task.name}`,
                duration: Math.round(total * 0.40),
                parentTask: task.name
            },
            {
                name: `Test and debug ${task.name}`,
                duration:
                    total -
                    Math.round(total * 0.20) -
                    Math.round(total * 0.20) -
                    Math.round(total * 0.40),
                    parentTask: task.name
            }
        ];
    }

    if (intent === "writing") {
        return [
            {
                name: `Brainstorm ideas for ${task.name}`,
                duration: Math.round(total * 0.20),
                parentTask: task.name
            },
            {
                name: `Create an outline for ${task.name}`,
                duration: Math.round(total * 0.20),
                parentTask: task.name
            },
            {
                name: `Write the main draft for ${task.name}`,
                duration: Math.round(total * 0.40),
                parentTask: task.name
            },
            {
                name: `Revise and improve ${task.name}`,
                duration:
                    total -
                    Math.round(total * 0.20) -
                    Math.round(total * 0.20) -
                    Math.round(total * 0.40),
                    parentTask: task.name
            }
        ];
    }

    if (intent === "cleaning") {
        return [
            {
                name: `Prepare supplies for ${task.name}`,
                duration: Math.round(total * 0.15),
                parentTask: task.name
            },
            {
                name: `Clear clutter for ${task.name}`,
                duration: Math.round(total * 0.30),
                parentTask: task.name
            },
            {
                name: `Do the main cleaning for ${task.name}`,
                duration: Math.round(total * 0.35),
                parentTask: task.name
            },
            {
                name: `Put away supplies and final tidy-up ${task.name}`,
                duration:
                    total -
                    Math.round(total * 0.15) -
                    Math.round(total * 0.30) -
                    Math.round(total * 0.35),
                    parentTask: task.name
                    
            }
        ];
    }

        if (intent === "laundry") {
        return [
            {
                name: `Gather clothes and supplies for ${task.name}`,
                duration: Math.round(total * 0.20),
                parentTask: task.name
            },
            {
                name: `Sort and start the main laundry for ${task.name}`,
                duration: Math.round(total * 0.30),
                parentTask: task.name
            },
            {
                name: `Move through the main laundry steps for ${task.name}`,
                duration: Math.round(total * 0.30),
                parentTask: task.name
            },
            {
                name: `Fold, put away, and finish ${task.name}`,
                duration:
                    total -
                    Math.round(total * 0.20) -
                    Math.round(total * 0.30) -
                    Math.round(total * 0.30),
                parentTask: task.name
            }
        ];
    }

    if (intent === "dishes") {
        return [
            {
                name: `Gather dishes and prepare the sink or space for ${task.name}`,
                duration: Math.round(total * 0.20),
                parentTask: task.name
            },
            {
                name: `Sort and wash the main dishes for ${task.name}`,
                duration: Math.round(total * 0.35),
                parentTask: task.name
            },
            {
                name: `Rinse, dry, or load the remaining dishes for ${task.name}`,
                duration: Math.round(total * 0.25),
                parentTask: task.name
            },
            {
                name: `Put everything away and tidy up after ${task.name}`,
                duration:
                    total -
                    Math.round(total * 0.20) -
                    Math.round(total * 0.35) -
                    Math.round(total * 0.25),
                parentTask: task.name
            }
        ];
    }

    if (intent === "exercise") {
        return [
            {
                name: `Get set up and warm up for ${task.name}`,
                duration: Math.round(total * 0.20),
                parentTask: task.name
            },
            {
                name: `Begin the main exercises for ${task.name}`,
                duration: Math.round(total * 0.30),
                parentTask: task.name
            },
            {
                name: `Continue the main workout for ${task.name}`,
                duration: Math.round(total * 0.35),
                parentTask: task.name
            },
            {
                name: `Cool down and wrap up ${task.name}`,
                duration:
                    total -
                    Math.round(total * 0.20) -
                    Math.round(total * 0.30) -
                    Math.round(total * 0.35),
                parentTask: task.name
            }
        ];
    }

    if (intent === "planning") {
        return [
            {
                name: `Gather what needs attention for ${task.name}`,
                duration: Math.round(total * 0.20),
                parentTask: task.name
            },
            {
                name: `Sort priorities for ${task.name}`,
                duration: Math.round(total * 0.25),
                parentTask: task.name
            },
            {
                name: `Make a clear plan for ${task.name}`,
                duration: Math.round(total * 0.35),
                parentTask: task.name
            },
            {
                name: `Review and adjust the plan for ${task.name}`,
                duration:
                    total -
                    Math.round(total * 0.20) -
                    Math.round(total * 0.25) -
                    Math.round(total * 0.35),
                parentTask: task.name
            }
        ];
    }

    if (intent === "practice") {
        return [
            {
                name: `Get set up and warm up for ${task.name}`,
                duration: Math.round(total * 0.20),
                parentTask: task.name
            },
            {
                name: `Focus on one main skill or idea for ${task.name}`,
                duration: Math.round(total * 0.25),
                parentTask: task.name
            },
            {
                name: `Spend focused time practicing ${task.name}`,
                duration: Math.round(total * 0.35),
                parentTask: task.name
            },
            {
                name: `Reflect on progress and wrap up ${task.name}`,
                duration:
                    total -
                    Math.round(total * 0.20) -
                    Math.round(total * 0.25) -
                    Math.round(total * 0.35),
                parentTask: task.name
            }
        ];
    }

    return [
        {
            name: `Gather materials needed for ${task.name}`,
            duration: Math.round(total * 0.20),
            parentTask: task.name
            
        },
        {
            name: `Devise a plan for ${task.name}`,
            duration: Math.round(total * 0.30),
            parentTask: task.name
        },
        {
            name: `Begin working on ${task.name}`,
            duration: Math.round(total * 0.30),
            parentTask: task.name
        },
        {
            name: `Finish and review ${task.name}`,
            duration:
                total -
                Math.round(total * 0.20) -
                Math.round(total * 0.30) -
                Math.round(total * 0.30),
                parentTask: task.name
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