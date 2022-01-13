import express from 'express';
import Organisation from '../models/Organisation.js';
import asyncHandler from 'express-async-handler';
import {
  authOrganisation, getOrganisationProfile, logout, registerOrganisation
} from '../controllers/organisationController.js';

const router = express.Router();

router.route('/').post(registerOrganisation);
router.post('/login', authOrganisation);
router.route('/logout').get(logout);
router.route('/profile').get(getOrganisationProfile);

export default router;
