const mongoose=require('mongoose');
const NewBook=require('../models/book1');
const getAllBooksNew=async(req,res)=>{
    try {
        const allBooks=await User.find({});
        if(allBooks.length>0){
            res.status(200).json({
                success:true,
                message:'All Books are displayed successfully',
            })
        }
        else{
            res.status(401).json({
                success:false,
                message:'Books not found',
            })
        }
        
    } catch (error) {
        res.status(500).json({
                success:false,
                message:'Books not found',
            })
    }
}
const addNewBookNew=async(req,res)=>{
    
    try{
    const newBookbody=req.body;
    const addBook=await User.create(newBookbody);
    if(addBook){
        res.status(200).json({
                success:true,
                message:'Book updated  successfully',
        })


    }
     else{
            res.status(401).json({
                success:false,
                message:'Books not found',
            })
        }

     }   
    catch (error) {
        res.status(500).json({
                success:false,
                message:'Books not found',
            })
    }
   

    
}

const updateBookNew=async(req,res)=>{
    try{
        const newBookbody=req.body;
    const id=req.params.id;
    const updateBook=await User.findByIdAndUpdate(id,newBookbody,{new:true});
    if(updateBook){
        res.status(200).json({
                success:true,
                message:'Book Updates Successfully',
        })


    }
     else{
            res.status(401).json({
                success:false,
                message:'Books not found',
            })
        }

     }   
    catch (error) {
        res.status(500).json({
                success:false,
                message:'Books not found',
            })
    }
   

}

const getBookById=async (req,res)=>{
     try{
    const id=req.params.id;
    const updateBook=await User.findById(id);
    if(updateBook){
        res.status(200).json({
                success:true,
                message:'Book Found',
        })


    }
     else{
            res.status(401).json({
                success:false,
                message:'Books not found',
            })
        }

     }   
    catch (error) {
        res.status(500).json({
                success:false,
                message:'Books not found',
            })
    }
}
const deleteBookById=async (req,res)=>{
     try{
    const id=req.params.id;
    const deleteBook=await User.findByIdAndDelete(id);
    if(deleteBook){
        res.status(200).json({
                success:true,
                message:'Book Deleted Successfully',
        })


    }
     else{
            res.status(401).json({
                success:false,
                message:'Books not found',
            })
        }

     }   
    catch (error) {
        res.status(500).json({
                success:false,
                message:'Books not found',
            })
    }
}

module.exports={getAllBooksNew,addNewBookNew,getBookById,updateBookNew,deleteBookById};