import express from 'express';
import VideoController from '../controllers/videos.controller.js';
import Auth from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/newvideo', VideoController.createVideo);
router.get('/dashboard', VideoController.getVideosForUserDashboard);
router.get('/:videoId', VideoController.getVideoDetails);

router.post('/:videoId/comment', Auth.authenticateJWTToken, VideoController.addVideoComment);

export default router;
