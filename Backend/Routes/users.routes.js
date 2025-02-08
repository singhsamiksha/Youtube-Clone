import { createUser, getUser, authenticateUser, signinUser } from "../Controller/users.controller.js";
import express from "express"; 

const router = express.Router(); 

router.post("/signup", createUser);
router.post("/signin", signinUser);

export default router;
