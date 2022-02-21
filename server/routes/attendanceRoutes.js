import express from 'express';

import {
    attendSessionOnlineParticipant, attendenceGetAllParticipant, attendSessionOrganisation, attendenceUpdate, attendenceDelete
} from '../controllers/attendanceController.js';
import { protectOrg, protectParticipant } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/participant').post(protectParticipant, attendenceGetAllParticipant);
router.route('/:session_id').post(protectParticipant, attendSessionOnlineParticipant);
router.route('/:session_id/:participant_id/org').post(protectOrg, attendSessionOrganisation);
router.route('/:session_id').put(protectOrg, attendenceUpdate);
router.route('/:session_id').patch(protectOrg, attendenceDelete);




export default router;
