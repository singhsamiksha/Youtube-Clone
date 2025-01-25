import userModel from "../Model/users.model.js";
import jwt from "jsonwebtoken";


const SECRET_KEY = process.env.JWT_SECRET || "my_secret_key";


//Authentication the User 
export function authenticateUser(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }
    const token = authHeader;
    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid JWT Token" });
        }
        req.user = user;
        next();
    });
}

//fetch the user data
export async function getUser(req, res) {
    try {
        const { username } = req.body;
        const user = await userModel.findOne({ username });

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: "An error occurred", error: error.message });
    }
}

//Create user in database
export function createUser(req, res) {
    const { username, email, password, avatar, channel } = req.body;

    const newUser = new userModel({
        username,
        email,
        password,
        avatar,
        channel,
    });

    newUser.save().then((data) => {
        if (!data) {
            return res.status(400).json({ message: "Something went wrong" });
        }

        //Generate the access token
        const accessToken = jwt.sign({ username: data.username, email: data.email }, SECRET_KEY);
        res.send({ accessToken });
    }).catch((error) => {
        res.status(500).json({ message: "Internal server error", error: error.message });
    });
}

