// How can we create our main package.json manage dependencies 
// and dev dependencies also it contains the meta data about 
// your project


// To create a package.json run this command npm init 

// To install any pakag using npm command is given below

// npm install one two three

// The command npm install lodash

// now went to package.json and write "start":"node index.js"

const lodash=require('lodash');
const names=['sangham','jhon','terry','alex','mia'];
const capitalize=lodash.map(names,lodash.capitalize);
console.log(capitalize);
