const router = require('express').Router();

router.get('/', (req, res) => {
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
