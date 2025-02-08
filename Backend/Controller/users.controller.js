import Globals from "../constants.js";
import DataHelper from "../Helpers/data.js";
import TokenHelper from "../Helpers/token.js";
import UserModel from "../Model/users.model.js";
import jwt from "jsonwebtoken";

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

//fetch all users
export async function signinUser(req, res) {
    try {
        let { email, password } = req.body;
        email = DataHelper.atob(email);
        password = DataHelper.atob(password);

        if (!email) {
            return res.status(401).json({ message: 'Email is required.', })
        }

        if (!password) {
            return res.status(401).json({ message: 'Password is required.', })
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                errorCode: 404,
                message: 'Email does not exists.',
            });
        }

        const isPasswordValid = await DataHelper.compareHash(password, user.password);

        if (isPasswordValid) {
            return res.json({
                data: {
                    user: {
                        _id: user._id,
                        email: user.email,
                        name: user.username,
                    },
                    token: TokenHelper.generateUserToken(user),
                }
            })
        }

        return res.status(401).json({
            errorCode: Globals.ERROR_CODE.INVALID_USER_PASSWORD,
            message: 'Password is incorrect',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "An error occurred", error: error.message });
    }
}

export async function getAuthUser(req, res) {
    try {
        if(req.user) {
            return res.json({
                data: {
                    user: {
                        email: req.user.email,
                        name: req.user.username,
                        userId: req.user._id,
                        channels: req.user.channels,
                    }
                }
            })
        }
        res.send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "An error occurred", error: error.message });
    }
}

//fetch the user data
export async function getUser(req, res) {
    try {
        const { username } = req.body;
        const user = await UserModel.findOne({ username });

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
    const { username, email, password, image, channel } = req.body;

    const user = new UserModel({
        username,
        email,
        password,
        image,
        channel
    });

    user.save().then((data) => {
        if (!data) {
            return res.status(400).json({ message: "Something went wrong" });
        }

        //Generate the access token
        const accessToken = jwt.sign({ username: data.username, email: data.email }, SECRET_KEY);
        res.send({ accessToken, data });
    }).catch((error) => {
        res.status(500).json({ message: "Internal server error", error: error.message });
    });
}

