// callback logic concepts
// setTimeout(() => {
//     setTimeout(() => {
        
//     }, timeout);
//     setTimeout(() => {
        
//     }, timeout);
// }, timeout); //This is called
// call back hell

const fs = require('fs');
const path = require('path');

function person(name, callbakcfun) {
    console.log(`hello ${name}`);
    callbakcfun();
}
function address() {
    console.log('Pakistan');
}

person('Hamza', address);

// this is an example of callback function

const indexFile = path.join(__dirname, 'index.txt');

// Check if index.txt exists, if not create it
if (!fs.existsSync(indexFile)) {
    fs.writeFileSync(indexFile, 'This is the default content of index.txt');
}

const reading = fs.readFile(indexFile, 'utf-8', (err, data) => {
    if (err) {
        console.error('Error reading file', err);
        return;
    }
    console.log(data);
});
console.log(reading);


///callback-hell

const inputFile = path.join(__dirname, 'input.txt');
const outputFile = path.join(__dirname, 'output.txt');

// Check if input.txt exists, if not create it
if (!fs.existsSync(inputFile)) {
    fs.writeFileSync(inputFile, 'hello world');
}

fs.readFile(inputFile, 'utf-8', (err, data) => {
    if (err) {
        console.error('Error reading file', err);
        return;
    }
    const modifyData = data.toUpperCase();
    fs.writeFile(outputFile, modifyData, (err) => {
        if (err) {
            console.log('Error writing file', err);
            return;
        }
        console.log('Data written to the new file');
        fs.readFile(outputFile, 'utf-8', (err, data) => {
            if (err) {
                console.log('Error reading file', err);
                return;
            }
            console.log('File content:', data);
        });
        console.log('render the data');
    });
});
