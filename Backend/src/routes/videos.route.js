import express from 'express';
import VideoController from '../controllers/videos.controller.js';

const router = express.Router();

router.get('/dashboard', VideoController.getVideosForUserDashboard);
router.get('/:videoId', VideoController.getVideoDetails);
router.get('/newvideo', VideoController.createVideo);

export default router;
