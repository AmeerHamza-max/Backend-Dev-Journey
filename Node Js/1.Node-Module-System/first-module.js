function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function divide(a,b){
    if(a==b){
        throw new Error('Divide by zero is not allowed')
    }
    return a/b;
}


module.exports={

    add,subtract,divide
}