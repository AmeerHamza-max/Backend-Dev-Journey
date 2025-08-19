//npm i express js
// 1.how can you create a basic express server
// 2.Hoe can you create routes 
// 3.How can you create routes
// 4.How can you create custom routes

// 5.What are the request properties

const express=require('express');
const app=express();

app.get('/',(req,res)=>{
    res.send('Hello World');
})

const port=3000;
app.listen(port,()=>{
    console.log(`Server is running on the port ${port}`);
});


