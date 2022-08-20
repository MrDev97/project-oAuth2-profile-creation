const express = require('express');
const router = express.Router();

router.get('/profile', (req, res) => {
  res.render('profile');
});

router.get('/profile/settings', (req, res) => {
  res.render('settings');
});

router.get('/logged', (req, res) => {
  res.render('logged', {
    name: req.user.displayName,
    image: req.user.photos[0].value
  });
  console.log(req.user);
});

module.exports = router;
