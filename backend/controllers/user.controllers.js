import mongoose from 'mongoose';
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import nodemailer from 'nodemailer';
import { OTPVerification } from "../models/UserOTPVerification.js";
import bcrypt from "bcrypt"
import { saveOTP } from "../models/UserOTPVerification.js";
import { v4 as uuidv4 } from 'uuid';

import { config } from 'dotenv';

config();

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Error verifying transporter:", error);
  } else {
    console.log("Transporter ready for sending messages",success);
  }
});

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating access and refresh token");
  }
};


const checkToken = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    throw new ApiError(401, "No token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password -refreshToken');
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    res.status(200).json(new ApiResponse(200, { loggedIn: true, username: user.username }));
  } catch (error) {
    throw new ApiError(401, "Invalid token");
  }
});


// const sendOTPVerificationEmail = async (email, userId) => {
//   try {
//     const otp = `${Math.floor(100000 + Math.random() * 900000)}`;
//     const saltRounds = 10;
//     const hashedOTP = await bcrypt.hash(otp, saltRounds);

//     const newOTPVerification = new OTPVerification({
//       userId,
//       otp: hashedOTP,
//       createdAt: Date.now(),
//       expiresAt: Date.now() + 3600000, // 1 hour
//     });

//     await newOTPVerification.save();

//     let mailOptions = {
//       from: process.env.AUTH_EMAIL,
//       to: email,
//       subject: 'OTP Verification',
//       html: `<p>Enter <b>${otp}</b> in the app to verify your email address </p><p>This code <b>expires in 1 hour</b>.</p>`,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log(`OTP sent to ${email}`);
//   } catch (error) {
//     console.error("Error sending OTP verification email:", error);
//     throw new ApiError(500, "Failed to send OTP verification email");
//   }
// };


const sendOTPVerificationEmail = async (email, userId) => {
  try {
    // Generate 6-digit OTP
    const otp = `${Math.floor(100000 + Math.random() * 900000)}`;
    console.log(`Generated OTP: ${otp}`); // Log the generated OTP

    // const saltRounds = 10;
    // const hashedOTP = await bcrypt.hash(otp, saltRounds);

    const newOTPVerification = new OTPVerification({
      userId,
      // otp: hashedOTP,
      otp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000, // 1 hour
    });

    await newOTPVerification.save();

    let mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: 'OTP Verification',
      html: `<p>Enter <b>${otp}</b> in the app to verify your email address </p><p>This code <b>expires in 1 min</b>.</p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);
  } catch (error) {
    console.error("Error sending OTP verification email:", error);
    throw new ApiError(500, "Failed to send OTP verification email");
  }
};


// signUser controller

const signUser = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;

 
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

  if ([username, password, email].some((field) => field?.trim() === "")) {
    return res.status(400).json({ message: "All fields are required" });
  }

  
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format. Only Gmail addresses are allowed." });
  }


  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message: "Password must be at least 6 characters long, contain one uppercase letter, one special character, and one number.",
    });
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    return res.status(409).json({ message: "User with email or username already exists" });
  }

  const user = await User.create({
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    return res.status(500).json({ message: "Something went wrong while registering the user" });
  }

  try {
    await sendOTPVerificationEmail(email, user._id);
  } catch (error) {
    return res.status(500).json({ message: "User registered but failed to send OTP" });
  }

  return res.status(201).json({
    data: createdUser,
    message: "User registered successfully. Verification OTP sent to email.",
  });
});



const loginUser = asyncHandler(async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Log the request body

    const { email, password, username } = req.body;

    if ((!username && !email) || !password) {
      return res.status(400).json({
        success: false,
        message: "Username or email and password are required"
      });
    }

    const user = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found!"
      });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Wrong password"
      });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        message: "User logged in successfully",
        data: {
          user: loggedInUser,
          accessToken,
          refreshToken
        }
      });
  } catch (error) {
    console.error('Error:', error); // Log any errors
    res.status(500).json({
      success: false,
      message: 'An unexpected error occurred'
    });
  }
});


// controllers/otpController.js



// const verifyOTP = async (req, res) => {
//   try {
//     const { otp } = req.body;

//     if (!otp) {
//       return res.status(400).json({ message: "OTP is required" });
//     }

//     const otpRecord = await OTPVerification.findOne({ otp });
//     if (!otpRecord) {
//       return res.status(400).json({ message: "Incorrect OTP. Please check your code and try again" });
//     }

//     const isValidOTP = otp === otpRecord.otp;
//     if (!isValidOTP) {
//       return res.status(400).json({ message: "Incorrect OTP. Please check your code and try again" });
//     }

//     const { userId } = otpRecord;

//     await User.updateOne({ _id: userId }, { verified: true });
//     await OTPVerification.deleteOne({ userId });

//     console.log("OTP verified successfully for userId:", userId);
//     return res.status(200).json({ message: "OTP verified successfully" });
//   } catch (error) {
//     console.error("Error verifying OTP:", error);
//     return res.status(500).json({ message: "Failed to verify OTP" });
//   }
// };

const verifyOTP = async (req, res) => {
  try {
    const { otp } = req.body;

    if (!otp) {
      return res.status(400).json({ message: "OTP is required" });
    }

    const otpRecord = await OTPVerification.findOne({ otp });
    if (!otpRecord) {
      return res.status(400).json({ message: "Incorrect OTP. Please check your code and try again" });
    }

    const isValidOTP = otp === otpRecord.otp;
    if (!isValidOTP) {
      return res.status(400).json({ message: "Incorrect OTP. Please check your code and try again" });
    }

    const { userId } = otpRecord;

    await User.updateOne({ _id: userId }, { verified: true });
    await OTPVerification.deleteOne({ userId });

    console.log("OTP verified successfully for userId:", userId);
    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ message: "Failed to verify OTP" });
  }
};



const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const existedUser = await User.findOne({
      email 
    });
  
    if(!existedUser){
      throw new ApiError(404,"User not found")
    }
   
     
    // Validate user._id
    // if (!mongoose.Types.ObjectId.isValid(userId)) {
    //   return res.status(400).json({ message: "Invalid user ID" });
    // }

    // Generate a new OTP
    const newOTP = `${Math.floor(100000 + Math.random() * 900000)}`;
    
    console.log(`newotp: ${newOTP}`);

    const expiresAt = new Date(Date.now() + 1 * 60 * 1000);

    // Update or create OTP record
    await OTPVerification.updateOne(
      { _id:  existedUser._id},
      { otp: newOTP, createdAt: new Date(), expiresAt },
      { upsert: true } // Create a new record if it doesn't exist
    );

    // Send OTP verification email
    await sendOTPVerificationEmail(email, existedUser._id);

    return res.status(200).json({ message: "OTP has been resent successfully" });
  } catch (error) {
    console.error("Error resending OTP:", error);
    return res.status(500).json({ message: "Failed to resend OTP" });
  }
};


const resetPassword = asyncHandler(async(req,res) =>{
  const {email} = req.body;

  if( !email ){
    throw new ApiError(400,"Email is required");
  }

  const existedUser = await User.findOne({
    email 
  });

  if(!existedUser){
    throw new ApiError(404,"User not found")
  }

  try {
    await sendOTPVerificationEmail(email, existedUser._id);
  } catch (error) {
    throw new ApiError(500, "Failed to send OTP");
  }

  return res.status(201).json(new ApiResponse(201,"Verification OTP sent to email."));
})
// const changePassword = asyncHandler(async (req, res) => {
//   const { userId, password, confirmPassword } = req.body;

//   if (!password || !confirmPassword) {
//     throw new ApiError(400, "All fields are required");
//   }

//   if (password !== confirmPassword) {
//     throw new ApiError(400, "Passwords do not match");
//   }

//   const saltRounds = 10;
//   const hashedPassword = await bcrypt.hash(password, saltRounds);

//   const user = await User.findById(userId);
//   if (!user) {
//     throw new ApiError(404, "User not found");
//   }

//   user.password = hashedPassword;
//   await user.save();

//   // Optionally, delete the OTP record after successful password reset
//   await OTPVerification.deleteMany({ userId });

//   res.status(200).json(new ApiResponse(200, null, "Password reset successfully"));
// });

// const changePassword = asyncHandler(async (req, res) => {
//   const { userId, password, confirmPassword } = req.body;

//   if (!password || !confirmPassword) {
//     throw new ApiError(400, "All fields are required");
//   }

//   if (password !== confirmPassword) {
//     throw new ApiError(400, "Passwords do not match");
//   }

//   const user = await User.findById(userId);
//   if (!user) {
//     throw new ApiError(404, "User not found");
//   }

//   const otpRecord = await OTPVerification.findOne({ userId });
//   if (!otpRecord) {
//     throw new ApiError(400, "OTP verification required to change password");
//   }

//   user.password = password;
//   await user.save();

//   await OTPVerification.deleteMany({ userId });

//   res.status(200).json(new ApiResponse(200, null, "Password reset successfully"));
// });


const changePassword = asyncHandler(async (req, res) => {
  const { password, confirmPassword } = req.body;
  const userId = req.user.id; // get userId from req.user, set by authMiddleware

  if (!password || !confirmPassword) {
    throw new ApiError(400, "All fields are required");
  }

  if (password !== confirmPassword) {
    throw new ApiError(400, "Passwords do not match");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const otpRecord = await OTPVerification.findOne({ userId });
  if (!otpRecord) {
    throw new ApiError(400, "OTP verification required to change password");
  }

  user.password = password;
  await user.save();

  await OTPVerification.deleteMany({ userId });

  res.status(200).json(new ApiResponse(200, null, "Password reset successfully"));
});


export { signUser, loginUser, sendOTPVerificationEmail, verifyOTP, resendOTP , resetPassword,changePassword,checkToken };
