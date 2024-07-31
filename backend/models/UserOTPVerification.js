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
      },
      createdAt: {
        type: Date,
        required: true,
        default: Date.now,
      },
      expiresAt: {
        type: Date,
        required: true,
      },
},{timestamps:true});

export const OTPVerification= mongoose.model("UserOTPVerificationSchema",UserOTPVerificationSchema)



export const saveOTP = async (otp, userId) => {
  const hashedOTP = await bcrypt.hash(otp, 10);
  const newOTPRecord = new OTPVerification({
    userId: userId,
    otp: hashedOTP,
    expiresAt: new Date(Date.now() + 10 * 60000) // OTP expires in 10 minutes
  });
  await newOTPRecord.save();
};