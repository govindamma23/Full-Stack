// ---- os module: system/OS-level information ----
const os = require('os');

console.log('Platform:', os.platform());       // e.g. 'linux', 'win32'
console.log('CPU Architecture:', os.arch());    // e.g. 'x64'
console.log('Total Memory (MB):', os.totalmem() / (1024 * 1024));
console.log('Free Memory (MB):', os.freemem() / (1024 * 1024));
console.log('Home Directory:', os.homedir());


// ---- path module: working with file/directory paths ----
const path = require('path');

const filePath = '/home/user/documents/report.txt';
console.log('File name:', path.basename(filePath));   // report.txt
console.log('Directory:', path.dirname(filePath));     // /home/user/documents
console.log('Extension:', path.extname(filePath));     // .txt
console.log('Joined path:', path.join('folder', 'subfolder', 'file.js'));


// ---- fs module: file handling ----
const fs = require('fs');

fs.writeFile('note.txt', 'Hello from fs module!', (err) => {
    if (err) throw err;
    console.log('File written successfully.');
});