const fs = require('fs/promises');

async function fileHandling() {
    try {
        await fs.writeFile('hello3.txt', 'Hello Node.js');

        console.log('File written successfully');

        const data = await fs.readFile('hello3.txt', 'utf8');

        console.log('File content:', data);

        await fs.appendFile('hello3.txt', '\nWelcome to file handling.');

        console.log('Data appended successfully');
    } 
    catch (err) {
        console.log(err);
    }
}

fileHandling();