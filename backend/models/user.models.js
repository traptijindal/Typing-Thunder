import mongoose from "mongoose"


const userSchema = new Schema({
    username:{
            type:String,
            required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:[true,'Password is required']
    }
})

export const User = mongoose.model("User",userSchema)