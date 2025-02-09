import express from 'express';
import Auth from '../middlewares/auth.middleware.js';
import ChannelController from '../controllers/channel.controller.js';

const router = express.Router();

router.post('/', Auth.authenticateJWTToken, ChannelController.channelCreate);
router.get('/:channelId', Auth.authenticateJWTToken, ChannelController.getChannel);
router.post('/:channelId/video', Auth.authenticateJWTToken, ChannelController.addVideoToChannel);

export default router;
