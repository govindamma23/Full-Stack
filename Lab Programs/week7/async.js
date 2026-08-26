const fs = require('fs');

console.log('Start');

fs.writeFile('hello2.txt', 'Hello Node.js', (err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log('File written successfully');

    fs.readFile('hello2.txt', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log('File content:', data);
    });
});

console.log('End');