require('dotenv').config();
const express=require('express');
const MongoDBConnected=require('./database/db1');
const bookRoutes=require('./routes/book-routes1')
MongoDBConnected();
const PORT=process.env.PORT || 3001;
const app=express();
app.use(express.json());
app.use('/api/books',bookRoutes);


app.listen(PORT,()=>{
    console.log(`App is listening on the PORT ${PORT}`);
})