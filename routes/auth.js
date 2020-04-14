const router = require('express').Router();
const bcrypt = require('bcryptjs');
const {
  validateRegistrationData,
  validateLoginData,
} = require('../validation');

// Import User Model
const User = require('../models/User');

router.post('/register', async (req, res) => {
  // Registration Data Validation
  const { error } = validateRegistrationData(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if the User already exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).send('Email already exists!');
  }

  // Encrypt password
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send({ user: savedUser._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  // Login Data Validation
  const { error } = validateLoginData(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send('Email not found!');
  }

  // Decrypt and compare with the entered password
  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordValid) {
    return res.status(400).send('Email or password is incorrect!');
  }

  res.send('You are logged in successfully!');
});

module.exports = router;
