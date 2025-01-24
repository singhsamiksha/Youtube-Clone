import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        avatar: String,  
        channel: Array   
});

const userModel = mongoose.model("users",userSchema);

export default userModel;