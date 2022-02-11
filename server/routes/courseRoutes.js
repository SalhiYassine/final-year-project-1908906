import express from 'express';
import {
    deleteCourseOrganisation, createCourse, addParticipantCourse, findParticipantCourse, findOrganisationCourse, getCourseOrganisation, updateCourseOrganisation, getAllCourses
} from '../controllers/courseController.js';
import { protectAny, protectOrg, protectParticipant } from '../middleware/authMiddleware.js';


const router = express.Router();


router.route('/').post(protectOrg, createCourse);
router.route('/').get(protectOrg, getAllCourses);
router.route('/organisation').get(protectOrg, findOrganisationCourse);
router.route('/participant').get(protectParticipant, findParticipantCourse);
router.route('/:course_id').get(protectAny, getCourseOrganisation);
router.route('/:course_id').put(protectOrg, updateCourseOrganisation);
router.route('/:course_id').delete(protectOrg, deleteCourseOrganisation);
router.route('/:course_id/participant').post(protectOrg, addParticipantCourse);
router.route('/:course_id/:participant_id').delete(protectOrg, addParticipantCourse);


export default router;
