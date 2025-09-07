const express=require('express');
const router=express.Router();
const authMiddleware=require('../middleware/auth-middleware')

// all routes are related to authentication and authorization

const {registerUser,loginUser,changePassword}=require('../controllers/auth-controller');
router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/change-password',authMiddleware,changePassword);
module.exports=router;