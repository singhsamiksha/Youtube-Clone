import express from 'express';
import VideoController from '../controllers/videos.controller.js';
import Auth from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/dashboard', VideoController.getVideosForUserDashboard);
router.get('/:videoId', VideoController.getVideoDetails);
router.put('/:videoId/like', Auth.authenticateJWTToken, VideoController.toggleVideoLike);
router.put('/:videoId/view', VideoController.handleVideoView);

router.post('/:videoId/comment', Auth.authenticateJWTToken, VideoController.addVideoComment);
router.put('/:videoId/comment/:commentId/like', Auth.authenticateJWTToken, VideoController.toggleCommentLike);
router.delete('/:videoId/comment/:commentId', Auth.authenticateJWTToken, VideoController.deleteComment);
router.put('/:videoId/comment/:commentId', Auth.authenticateJWTToken, VideoController.editComment);

export default router;
