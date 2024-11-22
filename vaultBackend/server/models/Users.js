import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    userAddress:{
        type:String,
        required:true
    },
    encryptionKey:{
        type:Buffer,
        default:null
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

const UserModel=mongoose.model("users",UserSchema)
export default UserModel;