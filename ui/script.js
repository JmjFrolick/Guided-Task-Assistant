const tasks = [];

const taskNameInput = document.getElementById("taskName");
const taskDurationInput = document.getElementById("taskDuration");
const addTaskBtn = document.getElementById("addTaskBtn");
const completeStepBtn = document.getElementById("completeStepBtn");
const taskList = document.getElementById("taskList");
const scheduleList = document.getElementById("scheduleList");


window.onload = async function () {
    try {
        const response = await fetch("/tasks");
        const savedTasks = await response.json();

        if (savedTasks.length > 0) {
            tasks.push(...savedTasks);
            await renderSchedule();
        }

    } catch (error) {
        console.error("Error loading saved tasks:", error);
    }
};

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

function renderTasks() {
    taskList.innerHTML = "";

    const li = document.createElement("li");

    if (tasks.length === 0) {
        li.textContent = "No current task.";
        taskList.appendChild(li);
        return;
    }

    const currentTask = tasks[0];
    li.textContent = currentTask.currentStepName || currentTask.name;
    taskList.appendChild(li);
}

async function renderSchedule() {
    scheduleList.innerHTML = "";

    const schedule = await buildSchedule();
    let stepNumber = 1;

    tasks.forEach(task => {
        const allStepsForTask = schedule.filter(
            item => !item.isBreak && item.parentTask === task.name
        );

        const completed = task.completedSteps || 0;
        const remainingSteps = allStepsForTask.slice(completed);

        if (remainingSteps.length > 0) {
            task.currentStepName = remainingSteps[0].name;
            task.totalSteps = allStepsForTask.length;
        } else {
            task.currentStepName = null;
            task.totalSteps = allStepsForTask.length;
        }
    });

    tasks.forEach(task => {
        const allStepsForTask = schedule.filter(
            item => !item.isBreak && item.parentTask === task.name
        );

        const completed = task.completedSteps || 0;
        const remainingSteps = allStepsForTask.slice(completed);

        remainingSteps.forEach(step => {
            const li = document.createElement("li");
            li.textContent = `${stepNumber}. ${step.name} - ${step.duration} min`;
            scheduleList.appendChild(li);
            stepNumber++;
        });
    });

    renderTasks();
}

addTaskBtn.addEventListener("click", async () => {
    const name = taskNameInput.value.trim();
    const duration = Number(taskDurationInput.value);

    if (!name || !duration || duration <= 0) {
        alert("Please enter a valid task name and duration.");
        return;
    }

    const newTask = {
        name,
        duration,
        completedSteps: 0
    };

    await fetch("/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask)
    });

    tasks.push(newTask);

    taskNameInput.value = "";
    taskDurationInput.value = "";

    await renderSchedule();
});

completeStepBtn.addEventListener("click", async () => {
    if (tasks.length === 0) {
        return;
    }

    const firstTask = tasks[0];
    firstTask.completedSteps = (firstTask.completedSteps || 0) + 1;

    const schedule = await buildSchedule();
    const allStepsForFirstTask = schedule.filter(
        item => !item.isBreak && item.parentTask === firstTask.name
    );

    const remainingForFirstTask = allStepsForFirstTask.slice(firstTask.completedSteps);

    if (remainingForFirstTask.length === 0) {
        await fetch("/tasks/0", {
            method: "DELETE"
        });

        tasks.shift();
        await renderSchedule();
        return;
    }

    firstTask.currentStepName = remainingForFirstTask[0].name;
    await renderSchedule();
});