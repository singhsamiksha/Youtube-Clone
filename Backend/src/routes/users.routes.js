import express from 'express';
import Auth from '../middlewares/auth.middleware.js';
import UserController from '../controllers/users.controller.js';

const router = express.Router();

router.post('/register/validate1', UserController.validateSignupForm1);
router.post('/signup', UserController.registerUser);
router.post('/signin', UserController.signinUser);
router.get('/auth', Auth.authenticateJWTToken, UserController.getAuthUser);

export default router;
