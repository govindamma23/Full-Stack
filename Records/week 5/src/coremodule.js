// Import the built-in http module
const http = require('http');

// Create the server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    res.write('Hello! Welcome to my Node.js server.');
    res.end();
});

// Start the server
server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});