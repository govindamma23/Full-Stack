const express = require('express');
const app = express();
const PORT = 3000;
 

app.use(express.json());
 
// Sample in-memory student data
const students = [
    { id: 1, name: 'Aarav Sharma', course: 'B.Tech CSE', year: 2 },
    { id: 2, name: 'Priya Reddy', course: 'B.Tech IT', year: 3 },
    { id: 3, name: 'Rahul Verma', course: 'BCA', year: 1 },
    { id: 4, name: 'Sneha Iyer', course: 'B.Tech ECE', year: 4 },
    { id: 5, name: 'Karthik Nair', course: 'B.Sc CS', year: 2 }
];
 

 
// Home route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Student Server</h1><p>Try /students or /about</p>');
});
 
// GET /students - returns list of students as JSON
app.get('/students', (req, res) => {
    res.status(200).json({
        success: true,
        count: students.length,
        data: students
    });
});
 
// GET /students/:id - bonus route showing route parameters + HTTP status handling
app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) {
        return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.status(200).json({ success: true, data: student });
});
 
// GET /about - information about the application
app.get('/about', (req, res) => {
    res.status(200).json({
        appName: 'Student Server API',
        description: 'A basic Express.js application demonstrating routing, HTTP methods, and response handling.',
        version: '1.0.0',
        author: 'Govi'
    });
});
 
// Catch-all 404 handler for undefined routes
app.use((req, res) => {
    res.status(404).send('404 - Route Not Found');
});
 
// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Available routes: /, /students, /students/:id, /about');
});