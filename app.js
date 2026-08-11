// Import the third-party Express module
const express = require('express');

// Create an Express application
const app = express();

// Define the port
const PORT = 3000;

// Create a route for the home page
app.get('/', (req, res) => {
    res.send('Hello! Welcome to my Express server.');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});  