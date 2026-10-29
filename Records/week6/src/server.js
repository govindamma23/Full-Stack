

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

let tasks = [
    { id: 1, title: 'Complete assignment', completed: false },
    { id: 2, title: 'Study Node.js', completed: false }
];

// Home route
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

// Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Add a task
app.post('/tasks', (req, res) => {
    const { title } = req.body;

    if (!title || !title.trim()) {
        return res.status(400).json({
            message: 'Task title is required'
        });
    }

    const task = {
        id: tasks.length
            ? Math.max(...tasks.map(t => t.id)) + 1
            : 1,
        title: title.trim(),
        completed: false
    };

    tasks.push(task);
    res.status(201).json(task);
});

// Mark task as completed or incomplete
app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(
        t => t.id === Number(req.params.id)
    );

    if (!task) {
        return res.status(404).json({
            message: 'Task not found'
        });
    }

    task.completed = !task.completed;
    res.json(task);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const exists = tasks.some(t => t.id === id);

    if (!exists) {
        return res.status(404).json({
            message: 'Task not found'
        });
    }

    tasks = tasks.filter(t => t.id !== id);
    res.json({ message: 'Task deleted successfully' });
});

// Start server
app.listen(3000, () => {
    console.log('Task tracker running at http://localhost:3000');
});
