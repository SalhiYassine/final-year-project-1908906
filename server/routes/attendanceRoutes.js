import express from 'express';

import {
    attendSessionOnlineParticipant
} from '../controllers/attendanceController.js';
import { protectOrg, protectParticipant } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/online/:session_id').post(protectParticipant, attendSessionOnlineParticipant);


export default router;
