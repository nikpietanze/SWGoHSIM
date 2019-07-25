const express = require('express');
const router = express.Router();

// Assigns the Sim route
router.get('/sim', (req, res) => {
  res.render('sim');
});

module.exports = router;