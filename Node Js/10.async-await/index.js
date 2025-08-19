function delayfn(time){
    return new Promise ((resolve)=>setTimeout(() => {
        resolve();
    }, time))
}

async function delayedGreet(name) {
   await delayfn(2000);
    console.log(name);
}

delayedGreet('Ameer Hamza');

async function division(num1,num2) {
    try {
        if(num2==0) return new Error('Can not divide by 0');
        return num1/num2;
        
    } catch (error) {
        console.error('Error',error);
        return;
    }

   
    
}
 async function mainFn() {
        console.log(await division(10,2));
        
    }

await mainFn();
