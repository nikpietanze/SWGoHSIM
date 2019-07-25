const express = require('express');
const router = express.Router();

// Assigns the Sim route
router.get('/planner', (req, res) => {
  res.render('planner');
});

module.exports = router;