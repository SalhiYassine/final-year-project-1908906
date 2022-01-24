import express from 'express';

import {
    createCourse, addParticipantCourse, findParticipantCourse, findOrganisationCourse, getCourseOrganisation, updateCourseOrganisation
} from '../controllers/courseController.js';
import { protectAny, protectOrg, protectParticipant } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protectOrg, createCourse);
router.route('/organisation').get(protectOrg, findOrganisationCourse);
router.route('/participant').get(protectParticipant, findParticipantCourse);
router.route('/:course_id').get(protectAny, getCourseOrganisation);
router.route('/:course_id').put(protectOrg, updateCourseOrganisation);
router.route('/:course_id').delete(protectOrg, updateCourseOrganisation);
// router.route('/:course_id').get(protectOrg, addParticipantCourse);
router.route('/:course_id/:participant_id').post(protectOrg, addParticipantCourse);


export default router;
