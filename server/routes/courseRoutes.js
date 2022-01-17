import express from 'express';

import {
    createCourse, addParticipantCourse, findParticipantCourse, findOrganisationCourse, getCourseOrganisation
} from '../controllers/courseController.js';
import { protectAny, protectOrg, protectParticipant } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protectOrg, createCourse);
router.route('/:course_id/:participant_id').post(protectOrg, addParticipantCourse);
router.route('/:course_id').get(protectAny, getCourseOrganisation);
router.route('/participant').get(protectParticipant, findParticipantCourse);
router.route('/organisation').get(protectOrg, findOrganisationCourse);
router.route('/:course_id').get(protectOrg, addParticipantCourse);


export default router;
