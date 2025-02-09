import express from 'express';
import Auth from '../middlewares/auth.middleware.js';
import UserController from '../controllers/users.controller.js';

const router = express.Router();

router.post('/signup', UserController.createUser);
router.post('/signin', UserController.signinUser);
router.get('/auth', Auth.authenticateJWTToken, UserController.getAuthUser);

export default router;
