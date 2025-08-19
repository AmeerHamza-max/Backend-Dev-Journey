const fs = require('fs');
const path = require('path');

const data = path.join(__dirname, 'data');

// Only create if not exists
if (!fs.existsSync(data)) {
    fs.mkdirSync(data);
    console.log('data folder is created');
} else {
    console.log('data folder already exists');
}

const filePath = path.join(data, 'async.txt');

// Write asynchronously
fs.writeFile(filePath, 'Hello this is async method', (err) => {
    if (err) throw err;
    console.log('Async file is created successfully');

    // Now read the file
    fs.readFile(filePath, 'utf-8', (err, content) => {
        if (err) throw err;
        console.log('Async file content:', content);
    });
});
fs.appendFile(filePath, '\nNew line added to the async file', (err) => {
    if (err) throw err;
    console.log('New line added successfully');
});
