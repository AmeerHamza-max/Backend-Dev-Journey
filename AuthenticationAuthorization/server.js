// Autheniticated user only access the pages that are allowed
// to access by the authenticated by the user
require('dotenv').config();
const express=require('express');
const connectToDB=require('./database/db');
const authRoutes=require('./routes/auth-routes');
const homeRoutes=require('./routes/home-routes');
const adminRoutes=require('./routes/admin-routes');
const uploadImageRoutes=require('./routes/image-routes')
//middleware


connectToDB();
const app=express();
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/home',homeRoutes);
app.use('/api/admin',adminRoutes);
app.use("/api/image", uploadImageRoutes);

const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is listening on the Port ${PORT}`)
})