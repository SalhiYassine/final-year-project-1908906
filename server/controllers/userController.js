import User from '../models/ParticipantModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import Organisation from '../models/Organisation.js';

// @desc    auth user and get a token
// @route   POST /api/users/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email);

  const user = await User.findOne({ email });
  console.log(user);

  if (user && (await user.matchPassword(password))) {
    res.cookie('token', generateToken(user._id), {
      expires: new Date(Date.now() + 1 * 24 * 3600000), // 1 Day
      httpOnly: true, // Stops the client accessing the cookie
      secure: process.env.NODE_ENV !== 'development', // secure if in production mode
    });
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});
// @desc    logout user
// @route   POST /api/users/logout
// @access  Private
export const logout = asyncHandler(async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
  });
  res.json('Cookie cleared');
});

// @desc   register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, surname, username, email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    const newUser = await User.create({ username, name, surname, email, password });
    if (newUser) {
      res.status(201);
      res.cookie('token', generateToken(newUser._id), {
        expires: new Date(Date.now() + 1 * 24 * 3600000), // 1 Day
        httpOnly: true, // Stops the client accessing the cookie
        secure: process.env.NODE_ENV !== 'development', // secure if in production mode
      });
      res.json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      });
    } else {
      res.status(401);
      throw new Error('Invalid user data');
    }
  } else {
    res.status(401);
    throw new Error('User already exists');
  }
});

// @desc   gets the user profile based on a valid token
// @route   GET /api/users/profile
// @access  Private

export const getUserProfile = asyncHandler(async (req, res) => {

  if (req.origin === 'participant') {
    let user = await User.findById(req.participant._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: false,
    });
  }
  else if (req.origin === 'organisation') {
    let user = await Organisation.findById(req.organisation._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: true,
    });
  }

  else {
    res.status(401);
    throw new Error('User not found');
  }
});
