const router = require('express').Router();
const verifyToken = require('../token-validation');

router.get('/', verifyToken, (req, res) => {
  res.json({
    posts: [
      {
        title: 'Brand new post',
        description: `Stuff you shouldn't see`
      }
    ]
  });
});

module.exports = router;
