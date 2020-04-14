const router = require('express').Router();
const { validateRegistration } = require('../validation');

// Import User Model
const User = require('../models/User');

router.post('/register', async (req, res) => {
  // Registration Data Validation
  const { error } = validateRegistration(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if the User already exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).send('Email already exists!');
  }

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
