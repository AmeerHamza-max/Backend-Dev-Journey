const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const checkExistingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (checkExistingUser) {
      return res.status(400).json({
        success: false,
        message:
          "User already exists with same username or email. Please try a different one.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newlyCreatedUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await newlyCreatedUser.save();

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Some error occurred! Please try again",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const accessToken = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15m" }
    );

    return res.status(200).json({
      success: true,
      message: "Logged in Successfully",
      accessToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Some error occurred! Please try again",
    });
  }
};
const changePassword=async(req,res)=>{
  try {
    const userId=req.userInfo.userId;
    //extract old and new Password
    const {olPassword,newPassword}=req.body;
    //////find the current logedin user
    const user=await User.findById(userId);
    if(!user){
      res.status(400).json({
        success:false,
        message:'User not found',
      })
    }
    //check if the old password is correct
    const isPasswordMatch=await bcrypt.compare(olPassword,user.password);
    if(!isPasswordMatch){
      return res.json(400).json({
        success:false,
        message:'Old password is not correct!Please try again',
      })
    }
    ///Hash the new Password here
    const salt=await bcrypt.genSalt(10);
    const newHashedPassword=await bcrypt.hash(newPassword,salt);
    ////update the user passwrod
    user.password=newHashedPassword;
    await user.save();
    res.status(200).json({
      success:true,
      message:'Password changed successfully',
    })
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Some error occurred! Please try again",
    });
  }
}
module.exports = { loginUser, registerUser ,changePassword};
