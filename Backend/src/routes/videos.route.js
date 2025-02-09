import express from 'express';
import VideoController from '../controllers/videos.controller.js';

const router = express.Router();

router.get('/', VideoController.getVideos);
router.get('/newvideo', VideoController.createVideo);

export default router;
