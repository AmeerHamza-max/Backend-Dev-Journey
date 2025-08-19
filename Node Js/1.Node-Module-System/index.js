//module.exports 
//require

const firstModule=require('./first-module');

console.log(firstModule.add)(10,20);
try {
    console.log('Trying to divide by zero');
    let result=firstModule.divide(0,90);
    console.log(result);
    
} catch (error) {
    console.log('Caught up an error',error.message);
    
}


//Module wrapper

// {
//     function(exports,require,module,__filename,__dirname){
//         //your moduel code goes here
//     }
// }