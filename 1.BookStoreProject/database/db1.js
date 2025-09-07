const mongoose=require('mongoose');
const connectedDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDb Connected Successfully');
        
    } catch (error) {
        console.log(`${error} mongodb failed to connect`);
        process.exit(1);
    }
}

module.exports=connectedDB;