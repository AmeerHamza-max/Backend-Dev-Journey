//Middlewere functions that helps the access of 
// the req of the response the only it has next 
// middlewere function which will call the next 
// middlewere function

const express=require('express');
const app=express();
const myfirstMiddlewere=(req,res,next)=>{
    console.log('This first middleware run on every request');
    next();//you need to call that function to invoke the function
}
app.use(myfirstMiddlewere);
app.get('/',(req,res)=>{
    res.send('Home Page');
})
app.get('/about',(req,res)=>{
    res.send('About Page');
})
app.listen(3001,()=>{
    console.log(`Server is now running on port 3001`);
    
})