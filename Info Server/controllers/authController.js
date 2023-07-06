const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');

// Sign up
exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Create the user
    const user = await User.create({
      name,
      email,
      password,
    });

    // Generate JWT token
    const token = user.generateAuthToken();

    res.status(201).json({ success: true, token });
  } catch (error) {
    next(error);
  }
};

// Log in
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return next(new ErrorResponse('Please provide email and password', 400));
    }

    // Find the user by email
    const user = await User.findOne({ email }).select('+password');

    // Check if user exists and password is correct
    if (!user || !(await user.matchPassword(password))) {
      return next(new ErrorResponse('Invalid email or password', 401));
    }

    // Generate JWT token
    const token = user.generateAuthToken();

    res.status(200).json({ success: true, token });
  } catch (error) {
    next(error);
  }
};

// Log out
exports.logout = async (req, res, next) => {
  try {
    // Clear the token from the user's tokens array
    req.user.tokens = [];
    await req.user.save();

    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};
