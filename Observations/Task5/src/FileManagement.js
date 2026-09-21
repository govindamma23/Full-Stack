const fs = require('fs');
const path = require('path');
 
// Accept filename & initial content from command-line args, or use defaults
const fileName = process.argv[2] || 'sample.txt';
const initialContent = process.argv[3] || 'Hello, this is the initial content of the file.';
const appendContent = '\nThis line was appended later using fs.appendFile().';
 
const filePath = path.join(__dirname, fileName);
 
/**
 * Step 1: Create / write the file
 */
function createFile() {
    console.log(`\nStep 1: Writing to "${fileName}"...`);
    fs.writeFile(filePath, initialContent, (err) => {
        if (err) {
            console.error('Error writing file:', err.message);
            return;
        }
        console.log('File created/written successfully.');
        readFile(); // proceed to next step
    });
}
 
/**
 * Step 2: Read the file's contents
 */
function readFile() {
    console.log(`\nStep 2: Reading "${fileName}"...`);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err.message);
            return;
        }
        console.log('Current contents:\n---');
        console.log(data);
        console.log('---');
        appendToFile(); // proceed to next step
    });
}
 
/**
 * Step 3: Append additional content
 */
function appendToFile() {
    console.log(`\nStep 3: Appending content to "${fileName}"...`);
    fs.appendFile(filePath, appendContent, (err) => {
        if (err) {
            console.error('Error appending to file:', err.message);
            return;
        }
        console.log('Content appended successfully.');
        displayFinalContent(); // proceed to final step
    });
}
 
/**
 * Step 4: Display the final contents after append
 */
function displayFinalContent() {
    console.log(`\nStep 4: Final contents of "${fileName}"...`);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err.message);
            return;
        }
        console.log('Final contents:\n---');
        console.log(data);
        console.log('---\nDone.');
    });
}
createFile();