const express = require('express');
const router = express.Router();

// Assigns the Arena Leaderboard route
router.get('/arena', (req, res) => {
  res.render('arenaLB');
});

// Assigns the Raid Leaderboard route
router.get('/raid', (req, res) => {
  res.render('raidLB');
});

module.exports = router;