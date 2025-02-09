import express from 'express';
import { channelCreate } from '../Controller/channel.controller.js';
import Auth from '../Middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', Auth.authenticateJWTToken, channelCreate);

export default router;
