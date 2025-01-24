import userModel from "../Model/users.model.js";
import jwt from "jsonwebtoken";

export async function getUser(req, res) {
    try {
        const { username } = req.body;
        const user = await userModel.findOne({ username: username });

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        res.send(user);
    } catch (error) {
        res.status(500).send({ message: "An error occurred", error: error.message });
    }
}

export function createUser(req,res){
    const{username,email,password,avatar,channel} = req.body;
    const newUser = new userModel({
        username: username,
        email: email,
        password: password,
        avatar: avatar,  
        channel: channel 
    });

    newUser.save().then((data)=> {
        if(!data){
            return res.status(400).json({message: "Something went wrong"});
        }
        const acessToken = jwt.sign({username : data.username, email : data.email, password : data.password}, `${password}+"12345@#$&*"+ ${username}`);
        res.send(acessToken);
    });
}

