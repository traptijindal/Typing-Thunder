import mongoose ,{Schema} from "mongoose";


const UserOTPVerificationSchema= new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
        
      },
      otp: {
        type: String,
        required: true
      }
},{timestamps:true});

export const OTPVerification= mongoose.model("UserOTPVerificationSchema",UserOTPVerificationSchema)