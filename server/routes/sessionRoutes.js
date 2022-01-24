import express from 'express';

import {
    createSession, getAllSessions, getOneSession, updateOneSession
} from '../controllers/sessionController.js';
import { protectAny, protectOrg } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/course/:course_id').get(protectAny, getAllSessions);
router.route('/:course_id').post(protectOrg, createSession);
router.route('/:session_id').get(protectAny, getOneSession);
router.route('/:session_id').put(protectOrg, updateOneSession);



export default router;
