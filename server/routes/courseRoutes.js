import express from 'express';

import {
    createCourse, addParticipantCourse, findParticipantCourse
} from '../controllers/courseController.js';
import { protectOrg } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protectOrg, createCourse);
router.route('/participant/:participant_id').get(protectOrg, findParticipantCourse);
router.route('/:course_id/:participant_id').post(protectOrg, addParticipantCourse);
router.route('/:course_id').get(protectOrg, addParticipantCourse);


export default router;
