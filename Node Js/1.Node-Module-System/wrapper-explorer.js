console.log('Node module wrapper demo');

console.log('fileName',__filename);
console.log('dirname',__dirname);


module.exports.greet=function (name){
    console.log(`Hello ${name}`)
}