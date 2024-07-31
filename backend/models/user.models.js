import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'


const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,

    },
    password:{
     type:String,
     required:true
    },
    refreshToken:{
        type:String
    }
},{timestamps:true}
)

userSchema.pre("save" ,async function(next){
    if(!this.isModified("password")) return next();
    console.log("Hashing password:", this.password);
    this.password = await bcrypt.hash(this.password , 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password , this.password)
}


userSchema.methods.generateAccessToken = function() {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
};

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign({
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });
};


export const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
  
    if (!token) {
      throw new ApiError(401, 'No token provided');
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // assuming the token contains user info, including userId
      next();
    } catch (err) {
      throw new ApiError(401, 'Invalid token');
    }
  };
  

export const User= mongoose.model("User",userSchema)
