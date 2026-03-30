const tasks = []; // array for storing current tasks

// connects to elements in index.html
const taskNameInput = document.getElementById("taskName");
const taskDurationInput = document.getElementById("taskDuration");
const addTaskBtn = document.getElementById("addTaskBtn");
const completeStepBtn = document.getElementById("completeStepBtn");
const taskList = document.getElementById("taskList");
const scheduleList = document.getElementById("scheduleList");

// receives previously saved tasks, adds them to frontend tasks array,
// and rebuilds schedule display
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

// sends current task list to the backend to break down tasks and insert break messages
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

// updates the current task display to show the correct task
function renderTasks() {
    taskList.innerHTML = "";

    const li = document.createElement("li");

    // displays "No current task." if no current task is found
    if (tasks.length === 0) {
        li.textContent = "No current task.";
        taskList.appendChild(li);
        return;
    }

    // displays current subtask of the current task
    const currentTask = tasks[0];
    li.textContent = currentTask.currentStepName || currentTask.name;
    taskList.appendChild(li);
}

// rebuilds schedule list 
async function renderSchedule() {
    scheduleList.innerHTML = ""; // wipe the screen
    const schedule = await buildSchedule(); // gets current schedule from backend
    let stepNumber = 1;

    // loops through all tasks
    tasks.forEach(task => {
        // gets all subtasks for a specific task
        const allStepsForTask = schedule.filter(
            item => !item.isBreak && item.parentTask === task.name
        );

        const completed = task.completedSteps || 0; // gets number of current completed steps
        const remainingSteps = allStepsForTask.slice(completed); // removes completed steps

        // if there are remaining subtasks, set current subtask to next subtask
        // if not, mark task as fully completed
        if (remainingSteps.length > 0) {
            task.currentStepName = remainingSteps[0].name;
            task.totalSteps = allStepsForTask.length;
        } else {
            task.currentStepName = null;
            task.totalSteps = allStepsForTask.length;
        }
    });
    
    // loops through all tasks and renders the uncompleted ones
    tasks.forEach(task => {
        // gets all subtasks for a specific task
        const allStepsForTask = schedule.filter(
            item => !item.isBreak && item.parentTask === task.name
        );

        const completed = task.completedSteps || 0; // gets number of completed steps
        const remainingSteps = allStepsForTask.slice(completed); // removes completed steps

        // loop through each remaining subtask and renders each one along with updating step numbers
        remainingSteps.forEach(step => {
            const li = document.createElement("li");
            li.textContent = `${stepNumber}. ${step.name} - ${step.duration} min`;
            scheduleList.appendChild(li);
            stepNumber++;
        });
    });

    renderTasks(); // updates current task display
}

// runs when the user clicks add task button
addTaskBtn.addEventListener("click", async () => {
    const name = taskNameInput.value.trim(); // gets task name from textox
    const duration = Number(taskDurationInput.value); // gets task duration from textbox

    // ensures input is valid
    if (!name || !duration || duration <= 0) {
        alert("Please enter a valid task name and duration.");
        return;
    }

    // creates the new task 
    const newTask = {
        name,
        duration,
        completedSteps: 0
    };

    // sends new task to the server so it can be stored in tasks.json
    await fetch("/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask)
    });

    tasks.push(newTask); // adds task to the frontend array

    // clears textboxes
    taskNameInput.value = "";
    taskDurationInput.value = "";

    await renderSchedule(); // rebuilds schedule with new task
});

// runs when the user clicks the complete step button
completeStepBtn.addEventListener("click", async () => {
    // if there are no current tasks, do nothing
    if (tasks.length === 0) {
        return;
    }

    // increase number of completed subtasks by one
    const firstTask = tasks[0];
    firstTask.completedSteps = (firstTask.completedSteps || 0) + 1;

    const schedule = await buildSchedule(); // gets latest schedule
    // removes completed subtasks for the current task
    const allStepsForFirstTask = schedule.filter(
        item => !item.isBreak && item.parentTask === firstTask.name
    );

    // finds uncompleted subtasks
    const remainingForFirstTask = allStepsForFirstTask.slice(firstTask.completedSteps);

    // deletes tasks that are fully completed
    if (remainingForFirstTask.length === 0) {
        await fetch("/tasks/0", {
            method: "DELETE"
        });

        tasks.shift();
        await renderSchedule();
        return;
    }

    firstTask.currentStepName = remainingForFirstTask[0].name; // update current step's name
    await renderSchedule(); // rebuild schedule
});