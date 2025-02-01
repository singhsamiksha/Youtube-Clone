import { GetVideos } from "../Controller/videos.controller.js";
import express from "express"; 

const router = express.Router(); 
router.get('/api/videos', GetVideos);

export default router;