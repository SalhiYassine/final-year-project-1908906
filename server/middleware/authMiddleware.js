import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import Organisation from '../models/Organisation.js';
import Participant from '../models/ParticipantModel.js';



export const protectOrg = asyncHandler(async (req, res, next) => {
  if (req.cookies.token) {
    try {
      let token = req.cookies.token;

      const decoded = jwt.verify(token, process.env.JWT_TOKEN);

      req.organisation = await Organisation.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized token failed');
    }
  } else {
    res.status(401);
    throw new Error('No token found');
  }
});

export const protectParticipant = asyncHandler(async (req, res, next) => {
  if (req.cookies.token) {
    try {
      let token = req.cookies.token;

      const decoded = jwt.verify(token, process.env.JWT_TOKEN);

      req.participant = await Participant.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized token failed');
    }
  } else {
    res.status(401);
    throw new Error('No token found');
  }
});

export const protectAny = asyncHandler(async (req, res, next) => {
  if (req.cookies.token) {
    try {
      let token = req.cookies.token;

      const decoded = jwt.verify(token, process.env.JWT_TOKEN);


      const participant = await Participant.findById(decoded.id).select('-password');
      const organisation = await Organisation.findById(decoded.id).select('-password');
      if (participant) {
        req.participant = participant;
        req.origin = "participant"

      } else if (organisation) {
        req.origin = "organisation"
        req.organisation = organisation
      } else {
        throw new Error('Details do not correspond to a valid entity.');

      }


      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized token failed');
    }
  } else {
    res.status(401);
    throw new Error('No token found');
  }
});
