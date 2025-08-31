const express=require('express');
const router=express.Router();
const adminMiddleWare=require('../middleware/adminMiddleWare');
const authMiddleware=require('../middleware/auth-middleware');
router.get('/welcome',authMiddleware,adminMiddleWare,(req,res)=>{
    res.json({
        message:'Welcome to the admin page'
    })
})

module.exports=router;
