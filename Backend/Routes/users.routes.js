import { createUser, getUser, authenticateUser } from "../Controller/users.controller.js";
import express from "express"; 

const router = express.Router(); 

router.post("/signup", createUser);
router.get("/signin", authenticateUser, getUser);

export default router;
