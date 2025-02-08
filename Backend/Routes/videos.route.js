import { GetVideos, createVideo } from "../Controller/videos.controller.js";
import express from "express"; 

const router = express.Router(); 
router.get('/', GetVideos);
router.get("/newvideo", createVideo);
export default router;