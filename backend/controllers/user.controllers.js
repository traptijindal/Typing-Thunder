import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import nodemailer from 'nodemailer';
import { OTPVerification } from "../models/UserOTPVerification.js";
import bcrypt from 'bcrypt';  // Don't forget to install bcryptjs: npm install bcryptjs
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
    console.log("Transporter ready for sending messages");
  }
});

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken(); // Ensure the correct method name

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating access and refresh token");
  }
};


const sendOTPVerificationEmail = async (email, userId) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const saltRounds = 10;
    const hashedOTP = await bcrypt.hash(otp, saltRounds);

    const newOTPVerification = new OTPVerification({
      userId,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000, // 1 hour
    });

    await newOTPVerification.save();

    let mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: 'OTP Verification',
      html: `<p>Enter <b>${otp}</b> in the app to verify your email address </p><p>This code <b>expires in 1 hour</b>.</p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);
  } catch (error) {
    console.error("Error sending OTP verification email:", error);
    throw new ApiError(500, "Failed to send OTP verification email");
  }
};

// signUser Controller
const signUser = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;

  if ([username, password, email].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const user = await User.create({
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  try {
    await sendOTPVerificationEmail(email, user._id);
  } catch (error) {
    throw new ApiError(500, "User registered but failed to send OTP");
  }

  return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully. Verification OTP sent to email."));
});

// loginUser Controller
const loginUser = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "Username or email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(400, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged in successfully"));
});

const verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    const otpRecord = await OTPVerification.findOne({ userId });

    if (!otpRecord) {
      throw new ApiError(400, "Invalid OTP or userId");
    }

    const isValidOTP = await bcrypt.compare(otp, otpRecord.otp);
    if (!isValidOTP) {
      throw new ApiError(400, "Invalid OTP");
    }

    // OTP is valid, perform necessary actions (e.g., mark user as verified)
    // Optionally, delete the OTP record after successful verification
    await OTPVerification.deleteOne({ userId });

    res.status(200).json(new ApiResponse(200, null, "OTP verified successfully"));
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json(new ApiResponse(500, null, "Failed to verify OTP"));
  }
}

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

const changePassword = asyncHandler(async (req, res) => {
  const { userId, password, confirmPassword } = req.body;

  if (!password || !confirmPassword) {
    throw new ApiError(400, "All fields are required");
  }

  if (password !== confirmPassword) {
    throw new ApiError(400, "Passwords do not match");
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.password = hashedPassword;
  await user.save();

  // Optionally, delete the OTP record after successful password reset
  await OTPVerification.deleteMany({ userId });

  res.status(200).json(new ApiResponse(200, null, "Password reset successfully"));
});


export { signUser, loginUser, sendOTPVerificationEmail, verifyOTP, resetPassword,changePassword };
