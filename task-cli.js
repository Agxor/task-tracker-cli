const fs =require('fs');

const FILE = './tasks.json';

function loadTasks() {
    const data = fs.readFileSync(FILE, 'utf8');
    return JSON.parse(data);
}

function saveTasks(tasks) {
    const data = JSON.stringify(tasks, null, 2);
    fs.writeFileSync(FILE, data, 'utf8');
}

function addTask(description) {

    if (!description) {
        console.log("Please provide a task description.");
        return;
    }

    const tasks = loadTasks();

    let id;

    if (tasks.length === 0) {
        id = 1;
    } else {
        id = tasks[tasks.length - 1].id + 1;
    }

    const task = {
        id: id,
        description: description,
        status: "todo",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    tasks.push(task);

    saveTasks(tasks);

    console.log(`Task added successfully (ID: ${task.id})`);
}

function clearTasks() {
    saveTasks([]);
    console.log("All tasks cleared.");
}

function deleteTask(id) {
    const tasks = loadTasks();
    const index = tasks.findIndex(task => task.id === id);

    if (index === -1) {
        console.log(`Task with ID ${id} not found.`);
        return;
    }

    tasks.splice(index, 1);
    saveTasks(tasks);
    console.log(`Task with ID ${id} deleted successfully.`);
}

function formatDate(dateString) {
    const date = new Date(dateString);

    return date.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });
}

function listTasks(status) {
    let tasks = loadTasks();

    if (status) {
        tasks = tasks.filter(task => task.status === status);
    }

    if (tasks.length === 0) {
        console.log("No tasks found.");
        return;
    }

    const table = tasks.map(task => ({
        ID: task.id,
        Description: task.description,
        Status: task.status,
        Created: formatDate(task.createdAt),
        Updated: formatDate(task.updatedAt)
    }));

    console.table(table);
}

function markAsDone(id) {
    const tasks = loadTasks();
    const task = tasks.find(task => task.id === id);

    if (!task) {
        console.log(`Task with ID ${id} not found.`);
        return;
    }

    task.status = "done";
    task.updatedAt = new Date().toISOString();

    saveTasks(tasks);
    console.log(`Task with ID ${id} marked as done.`);
}

const command = process.argv[2];

const argument = process.argv[3];

if(command ==='add'){
    addTask(argument);
}

if(command ==='clear'){
    clearTasks();
}

if(command ==='delete'){
    const id = parseInt(argument);
    if (isNaN(id)) {
        console.log("Please provide a valid task ID to delete.");
    } else {
        deleteTask(id);
    }
}

if(command ==='list'){
    listTasks();
}

if(command ==='done'){
    const id = parseInt(argument);
    if (isNaN(id)) {
        console.log("Please provide a valid task ID to mark as done.");
    } else {
        markAsDone(id);
    }
}