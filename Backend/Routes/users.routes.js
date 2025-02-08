import { createUser, getUser, authenticateUser, signinUser, getAuthUser } from "../Controller/users.controller.js";
import express from "express"; 
import Auth from "../Middlewares/auth.middleware.js";

const router = express.Router(); 

router.post("/signup", createUser);
router.post("/signin", signinUser);
router.get("/auth", Auth.authenticateJWTToken, getAuthUser);


export default router;
