const express = require('express');
const app = express();

// ---- Custom logging middleware ----
function requestLogger(req, res, next) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} request to ${req.url}`);
    next(); // pass control to the next middleware / route handler
}

// Apply middleware to ALL incoming requests
app.use(requestLogger);

app.get('/', (req, res) => {
    res.send('Home Page');
});

app.get('/students', (req, res) => {
    res.send('Students List');
});

app.listen(3000, () => console.log('Server running on port 3000'));