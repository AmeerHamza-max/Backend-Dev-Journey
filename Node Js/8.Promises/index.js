const { resolve } = require("path");

function delay(time){
    return new Promise((resolve)=>setTimeout(() => {
        resolve();
    }, time))

}
console.log('Promise lecture starts');

delay(2000).then(()=>console.log('After 2 seconds promise resolves'));
console.log('end');


function divide(num1,num2){
    return new Promise((resolve,reject)=>{
        if(num2==0){
            reject('We cannot perform division by zero')
        }
        else{
            resolve(num1/num2);
        }
    })
}

divide(10,4).then((result)=>console.log(result)).catch((err)=>console.log(err));