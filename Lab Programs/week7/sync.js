const fs = require('fs');

console.log('Start');

fs.writeFileSync('hello.txt', 'Hello Node.js');

const data = fs.readFileSync('hello.txt', 'utf8');

console.log('File content:', data);

console.log('End');