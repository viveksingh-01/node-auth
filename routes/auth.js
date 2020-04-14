const router = require('express').Router();
const { validateRegistration } = require('../validation');

// Import User Model
const User = require('../models/User');

router.post('/register', async (req, res) => {
  const { error } = validateRegistration(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
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
  }
});

module.exports = router;
