const express=require('express');
const {getAllBooksNew,addNewBookNew,getBookById,updateBookNew,deleteBookById}=require('../controllers/Book-controllerNew');
const router=express.Router();
router.get('/get', getAllBooksNew);
router.post('/add', addNewBookNew);
router.put('/update/:id', updateBookNew);
router.get('/get/:id', getBookById);
router.delete('/delete/:id', deleteBookById);

module.exports=router;
