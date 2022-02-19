import express from 'express';

import {
    attendSessionOnlineParticipant, attendenceGetAllParticipant
} from '../controllers/attendanceController.js';
import { protectOrg, protectParticipant } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/participant').post(protectParticipant, attendenceGetAllParticipant);
router.route('/:session_id').post(protectParticipant, attendSessionOnlineParticipant);


export default router;
