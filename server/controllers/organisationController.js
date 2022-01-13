import Organisation from '../models/Organisation.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';

// @desc    auth Organisation and get a token
// @route   POST /api/Organisations/login
// @access  Public
export const authOrganisation = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email);

  const Organisation = await Organisation.findOne({ email });
  console.log(Organisation);

  if (Organisation && (await Organisation.matchPassword(password))) {
    res.cookie('token', generateToken(Organisation._id), {
      expires: new Date(Date.now() + 1 * 24 * 3600000), // 1 Day
      httpOnly: true, // Stops the client accessing the cookie
      secure: process.env.NODE_ENV !== 'development', // secure if in production mode
    });
    res.json({
      _id: Organisation._id,
      name: Organisation.organisationName,
      email: Organisation.email,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});
// @desc    logout Organisation
// @route   POST /api/Organisations/logout
// @access  Private
export const logout = asyncHandler(async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
  });
  res.json('Cookie cleared');
});

// @desc   register a new Organisation
// @route   POST /api/Organisations
// @access  Public
export const registerOrganisation = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const exists = await Organisation.findOne({ email });

  if (!exists) {
    const newOrganisation = await Organisation.create({ username, email, password });
    if (newOrganisation) {
      res.status(201);
      res.cookie('token', generateToken(newOrganisation._id), {
        expires: new Date(Date.now() + 1 * 24 * 3600000), // 1 Day
        httpOnly: true, // Stops the client accessing the cookie
        secure: process.env.NODE_ENV !== 'development', // secure if in production mode
      });
      res.json({
        _id: newOrganisation._id,
        name: newOrganisation.organisationName,
        email: newOrganisation.email,
      });
    } else {
      res.status(401);
      throw new Error('Invalid Organisation data');
    }
  } else {
    res.status(401);
    throw new Error('Organisation already exists');
  }
});

// @desc   gets the Organisation profile based on a valid token
// @route   GET /api/Organisations/profile
// @access  Private

export const getOrganisationProfile = asyncHandler(async (req, res) => {
  const Organisation = await Organisation.findById(req.Organisation._id);
  if (Organisation) {
    res.json({
      _id: Organisation._id,
      name: Organisation.organisationName,
      email: Organisation.email,
    });
  } else {
    res.status(401);
    throw new Error('Organisation not found');
  }
});
