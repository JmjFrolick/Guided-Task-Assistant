const tasks = [];

const taskNameInput = document.getElementById("taskName");
const taskDurationInput = document.getElementById("taskDuration");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const scheduleList = document.getElementById("scheduleList");
const completeStepBtn = document.getElementById("completeStepBtn");

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

    if (intent === "learning") {
        return [
            { name: `Gather materials and prepare for ${task.name}`, duration: 5 },
            { name: `Review key concepts for ${task.name}`, duration: Math.round(total * 0.35) },
            { name: `Practice examples for ${task.name}`, duration: Math.round(total * 0.4) },
            { name: `Recap what you learned from ${task.name}`, duration: Math.max(5, total - 5 - Math.round(total * 0.35) - Math.round(total * 0.4)) }
        ];
    }

    if (intent === "coding") {
        return [
            { name: `Understand requirements for ${task.name}`, duration: Math.round(total * 0.2) },
            { name: `Plan approach for ${task.name}`, duration: Math.round(total * 0.2) },
            { name: `Implement ${task.name}`, duration: Math.round(total * 0.4) },
            { name: `Test and debug ${task.name}`, duration: Math.max(5, total - Math.round(total * 0.2) - Math.round(total * 0.2) - Math.round(total * 0.4)) }
        ];
    }

    if (intent === "writing") {
        return [
            { name: `Brainstorm ideas for ${task.name}`, duration: Math.round(total * 0.2) },
            { name: `Create an outline for ${task.name}`, duration: Math.round(total * 0.2) },
            { name: `Write the main draft for ${task.name}`, duration: Math.round(total * 0.4) },
            { name: `Revise and improve ${task.name}`, duration: Math.max(5, total - Math.round(total * 0.2) - Math.round(total * 0.2) - Math.round(total * 0.4)) }
        ];
    }

    if (intent === "cleaning") {
        return [
            { name: `Prepare supplies for ${task.name}`, duration: Math.round(total * 0.15) },
            { name: `Clear clutter for ${task.name}`, duration: Math.round(total * 0.3) },
            { name: `Do the main cleaning for ${task.name}`, duration: Math.round(total * 0.35) },
            { name: `Final tidy-up for ${task.name}`, duration: Math.max(5, total - Math.round(total * 0.15) - Math.round(total * 0.3) - Math.round(total * 0.35)) }
        ];
    }

    return [
        { name: `Understand what is needed for ${task.name}`, duration: Math.round(total * 0.2) },
        { name: `Start the first part of ${task.name}`, duration: Math.round(total * 0.3) },
        { name: `Continue working on ${task.name}`, duration: Math.round(total * 0.3) },
        { name: `Finish and review ${task.name}`, duration: Math.max(5, total - Math.round(total * 0.2) - Math.round(total * 0.3) - Math.round(total * 0.3)) }
    ];
}

function insertBreaks(schedule) {
    const result = [];
    let workTime = 0;
    const breakInterval = 90;

    const breakMessages = [
        "Remember to take a short break.",
        "Consider taking a short break to reset.",
        "You may want to pause for a few minutes.",
        "A short break could help you recharge."
    ];

    let breakIndex = 0;

    schedule.forEach(step => {
        result.push(step);
        workTime += step.duration;

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

function getRemainingSteps(task) {
    const allSteps = breakTask(task);
    return allSteps.slice(task.currentStep || 0);
}

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

let currentSchedule = [];

function renderTasks() {
    taskList.innerHTML = "";

    const currentTask = tasks.find(task => {
        const remainingSteps = getRemainingSteps(task);
        return remainingSteps.length > 0;
    });

    const li = document.createElement("li");

    if (!currentTask) {
        li.textContent = "No current task.";
        taskList.appendChild(li);
        return;
    }

    const remainingSteps = getRemainingSteps(currentTask);
    li.textContent = remainingSteps[0].name;
    taskList.appendChild(li);
}

async function renderSchedule() {
    scheduleList.innerHTML = "";
    currentSchedule = await buildSchedule();

    let stepNumber = 1;

    currentSchedule.forEach(item => {
        const li = document.createElement("li");

        if (item.isBreak) {
            li.textContent = `→ ${item.name}`;
            li.classList.add("break-message");
        } else {
            li.textContent = `${stepNumber}. ${item.name} - ${item.duration} min`;
            stepNumber++;
        }

        scheduleList.appendChild(li);
    });
}

addTaskBtn.addEventListener("click", () => {
    const name = taskNameInput.value.trim();
    const duration = Number(taskDurationInput.value);

    if (!name || !duration || duration <= 0) {
        alert("Please enter a valid task name and duration.");
        return;
    }

    tasks.push({
    name,
    duration,
    currentStep: 0
});

    taskNameInput.value = "";
    taskDurationInput.value = "";

    renderTasks();
    renderSchedule();
});

completeStepBtn.addEventListener("click", () => {
    for (let i = 0; i < tasks.length; i++) {
        const remaining = getRemainingSteps(tasks[i]);

        if (remaining.length > 0) {
            tasks[i].currentStep = (tasks[i].currentStep || 0) + 1;

            // Remove task completely if all steps are done
            if (tasks[i].currentStep >= breakTask(tasks[i]).length) {
                tasks.splice(i, 1);
            }

            break;
        }
    }

    renderTasks();
    renderSchedule();
});