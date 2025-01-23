import userModel from "../Model/users.model.js";

export function createUser(req,res){
    console.log(req.body);
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
        console.log("new user data is recevied...........");
        res.send(data);
        console.log("sending new user data............");

    });
}