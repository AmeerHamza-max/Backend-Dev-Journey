const express=require('express');
const {getAllBooks,getSingleBookById,updateSingleBook,deleteBook,addNewBook}=require('../controllers/book-controller')

//create express router

const router=express.Router();


//create all the routes that are related to books only

router.get('/get',getAllBooks);
router.get('/get/:id',getSingleBookById);
router.post('/add',addNewBook)
router.put('/update/:id',updateSingleBook);
router.delete('/delete/:id',deleteBook);
module.exports=router;