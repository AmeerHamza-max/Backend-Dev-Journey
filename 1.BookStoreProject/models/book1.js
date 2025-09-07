const mongoose=require('mongoose');
const NewBookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minLength:[3,'Minimum length of the title is 3 character'],
        maxLength:[20,'Maximum length of the title is 20 character'],
        trim:true,
        
    },
    author:{
        type:String,
        required:true,
        trim:true, 
    },
    year: {
    type:Number,
    required:true,
    minLength:[1945,'Books in and after the 1945'],
    maxLength:[2025,'Books written till 2025'],
},

    createdAt:{
        type:Date,
        default:Date.now,
    }

});
module.exports=mongoose.model('NewBook',NewBookSchema);
