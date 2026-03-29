function scheduleTasks(tasks) {
    // simple rule: higher priority first
    return tasks
        .slice()
        .sort((a, b) => {
            if (b.priority !== a.priority) {
                return b.priority - a.priority;
            }
            return a.duration - b.duration; // shorter tasks first if same priority
        });
}

module.exports = { scheduleTasks };