import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        avatar: String,  
        channel: Array   
});

const userModel = mongoose.model("users",userSchema);
console.log("sending user schema");

export default userModel;