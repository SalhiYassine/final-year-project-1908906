import Organisation from '../models/Organisation.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';


// @desc    auth Organisation and get a token
// @route   POST /api/Organisations/login
// @access  Public
export const authOrganisation = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email);

  const exists = await Organisation.findOne({ email });
  console.log(exists);

  if (exists && (await exists.matchPassword(password))) {
    res.cookie('token', generateToken(exists._id), {
      expires: new Date(Date.now() + 1 * 24 * 3600000), // 1 Day
      httpOnly: true, // Stops the client accessing the cookie
      secure: process.env.NODE_ENV !== 'development', // secure if in production mode
    });
    res.json({
      _id: exists._id,
      name: exists.organisationName,
      email: exists.email,
      admin: true
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
        admin: true

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
  const exists = await Organisation.findById(req.organisation._id);
  if (exists) {
    res.json({
      _id: exists._id,
      name: exists.organisationName,
      email: exists.email,
    });
  } else {
    res.status(401);
    throw new Error('Organisation not found');
  }
});
