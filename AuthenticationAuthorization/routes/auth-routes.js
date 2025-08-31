const express=require('express');
const router=express.Router();

// all routes are related to authentication and authorization

const {registerUser,loginUser}=require('../controllers/auth-controller');
router.post('/register',registerUser);
router.post('/login',loginUser);

module.exports=router;