import mongoose from "mongoose";

const userSchema = new mongoose.Schema({    
    username : {
        type : String,
        required : true,
        unique : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    avatar : {
        type:String,
        default : "data:image/jpeg;base64,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"
    }
}, {timestamps:true})
const User = mongoose.model('User', userSchema);
export default User;