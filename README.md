# Task Tracker CLI

A simple **CLI task tracker built with Node.js**. Tasks are stored locally in a JSON file.

## Features

* Add, update, and delete tasks
* Mark tasks as `todo`, `in-progress`, or `done`
* List all tasks
* Filter tasks by status
* Automatic task IDs
* Creation and update timestamps
* Persistent JSON storage

## Requirements

* Node.js 18+

## Usage

### Add a task

```bash
node task-cli.js add "Learn Node.js"
```

### List tasks

```bash
node task-cli.js list
```

### Filter tasks

```bash
node task-cli.js list todo
node task-cli.js list in-progress
node task-cli.js list done
```

### Update a task

```bash
node task-cli.js update 1 "Learn Node.js properly"
```

### Delete a task

```bash
node task-cli.js delete 1
```

### Change task status

```bash
node task-cli.js mark-in-progress 1
node task-cli.js mark-done 1
```

## Project Structure

```text
taskTracker/
├── task-cli.js
├── tasks.json
├── package.json
└── README.md
```

## Tech Stack

* JavaScript
* Node.js
* File System (`fs`)
* JSON

No external dependencies are required.

## Reference

Based on the [roadmap.sh Task Tracker](https://roadmap.sh/projects/task-tracker).
