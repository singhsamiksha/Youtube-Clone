import { createUser, getUser, authenticateUser, getAllUser } from "../Controller/users.controller.js";
import express from "express"; 

const router = express.Router(); 

router.post("/signup", createUser);
router.get("/signin", getAllUser);

export default router;
