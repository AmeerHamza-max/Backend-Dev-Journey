const fs=require('fs');
const path=require('path');
const data=path.join(__dirname,'data');

if(!fs.existsSync(data)){
    fs.mkdirSync(data);
    console.log('data folder created');

}
// const filePath=path.join(datafolder,'example.txt');
const filePath=path.join(data,'example.txt');
//this is sync way of creating the file

fs.writeFileSync(filePath,'Hello from node js ');
console.log('File Created successfullu');


///To read the file

const readContent=fs.readFileSync(filePath,'utf-8');
console.log('File Content',readContent);


// To update the content 

fs.appendFileSync(filePath,'\n This is new line added to the path');
console.log('New File content added to this file');