import express from 'express';
import { GetVideos, createVideo } from '../Controller/videos.controller.js';

const router = express.Router();
router.get('/', GetVideos);
router.get('/newvideo', createVideo);
export default router;
