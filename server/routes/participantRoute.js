import express from 'express';

import {
    authUser, getUserProfile, logout, registerUser
} from '../controllers/userController.js';
import { protectParticipant, protectAny } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser);
router.post('/login', authUser);
router.route('/logout').get(logout);
router.route('/profile').get(protectAny, getUserProfile);

export default router;
