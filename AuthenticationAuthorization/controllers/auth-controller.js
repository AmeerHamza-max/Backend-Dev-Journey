//register controller
const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const registerUser=async(req,res)=>{
    try {
        //extract user information from our request body
        const {username,email,password,role}=req.body;
        //check if the user is already exists in our database
        const checkExistingUser=await User.findOne({$or:[{username},{email}]});
        if(checkExistingUser){
            return res.status(400).json({
                success:false,
                message:'User is alreday exists either with same username or same email,Please try with different username or email'
            })
        }
        ///Hash User Password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        
        //create a new user and save in your database
        const newlyCreatedUser=new User({
            username,
            email,
            password:hashedPassword,
            role:role||'user',
        })
        await newlyCreatedUser.save();
        if(newlyCreatedUser){
            res.status(201).json({
                success:true,
                message:'User Registered Successfully'
            })
        }
        else{
            
            res.status(400).json({
                success:false,
                message:'Unable to register user please try again',
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:'Some error occured!Please try again'
        })
    }
}



// login controller

const loginUser=async(req,res)=>{
    try {
        const {username,password}=req.body;
        //find if the current user is exists in databasae or not
        const user=await User.findOne({username});
        if(!user){
            return res.status(400).json({
                success:false,
                message:'Invalid Credentials'
            })
        }

        //if the password is correct or not
        const isPasswordMatch=await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                success:false,
                message:'Invalid Credentials'
            })

        }
        const accessToken=jwt.sign({
    userId:user._id,
    username:user.username,
    role:user.role
},process.env.JWT_SECRET_KEY,{
    expiresIn:'15m'
})
res.status(200).json({
    success:true,
    message:'Logged in Successful',
    accessToken

})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:'Some error occured!Please try again'
        })
    }
}


module.exports={loginUser,registerUser};
