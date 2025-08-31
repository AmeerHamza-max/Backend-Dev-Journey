const Book=require('../models/books');
const getAllBooks=async(req,res)=>{
   try{ const allBooks=await Book.find({});
  
   if(allBooks?.length>0){
        res.status(200).json({
            success:true,
            message:'List of Books fetched successfully',
            data:allBooks,

    }) 
}
else {

    res.status(404).json({
        success:false,
        message:'No Books found in the collection'
    })

}
}catch(err){
    console.log(err);
    res.status(500).json({
        success:false,
        message:'Something Went Wrongplease try again'
    })
}
}

const getSingleBookById=async(req,res)=>{
    try {
        const getCurrentBookid=req.params.id;
        const bookDetailsById=await Book.findById(getCurrentBookid);
        if(!bookDetailsById){
            return res.status(404).json({
                success:false,
                message:'Book with the current ID is not found! Please try with different id'
            })
        }
        else{
            res.status(200).json({
                success:true,
                data:bookDetailsById,
            })
        }
    } catch (err) {
        console.log(err);
    res.status(500).json({
        success:false,
        message:'Something Went Wrongplease try again'
    })  
    }
}
const addNewBook=async(req,res)=>{
    try {
        const newBookFormData=req.body;
        const newlyCreatedBook=await Book.create(newBookFormData);
        if(newlyCreatedBook){
            res.status(201).json(
                {
                    success:true,
                    message:'Book Added SuccessFully',
                    data:newlyCreatedBook,

                }
            )
        }

    } catch (err) {
        console.log(err);
    res.status(500).json({
        success:false,
        message:'Something Went Wrongplease try again'
    })        
    }

}

const updateSingleBook=async(req,res)=>{
    try {
        const updatedBookFormData=req.body;
        const getCurrentBookId=req.params.id;
        const updatedBook=await Book.findByIdAndUpdate(getCurrentBookId,updatedBookFormData,{
            new:true,
        });
        if(!updatedBook){
            res.status(404).json({
                success:false,
                message:'Book is not found with this ID'
            })
        }
        res.status(200).json({
            success:true,
            message:'Book Updated SuccessFully',
            data:updatedBook,
        })
 


        
    } catch (error) {
        
        res.status(500).json({
        success:false,
        message:'Something Went Wrongplease try again'
    })
    }
    }


const deleteBook=async(req,res)=>{
    try {
        const getCurrentBookid=req.params.id;
        const deletedBook=await Book.findByIdAndDelete(getCurrentBookid);
        if(!deletedBook){
            res.status(404).json({
                success:false,
                message:'Book is not found with this ID'
            })
        }
        res.status(200).json({
            success:true,
            data:deleteBook
        })
    } catch (error) {
        res.status(500).json({
        success:false,
        message:'Something Went Wrongplease try again'
    })
    }
}

module.exports={getAllBooks,getSingleBookById,addNewBook,updateSingleBook,deleteBook};