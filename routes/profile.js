const express = require('express');
const router = express.Router();

// Assigns the Profile route
router.get('/profile', ensureAuthenticated, (req, res) => {
  res.render('profile');
});

// Makes sure a user is logged in to see a profile
function ensureAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
    req.flash('danger', 'Please login to view your profile')
    res.redirect('./profile/login');
}

module.exports = router;