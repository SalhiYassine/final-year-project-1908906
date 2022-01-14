import express from 'express';

import {
    createSession
} from '../controllers/sessionController.js';
import { protectOrg } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/:course_id').post(protectOrg, createSession);


export default router;
