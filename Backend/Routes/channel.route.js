import { channelCreate } from '../Controller/channel.controller.js';
import express from 'express';
import Auth from '../Middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', Auth.authenticateJWTToken, channelCreate);

export default router;
