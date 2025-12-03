const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getLeaderboard } = require('../controllers/leaderboardController');

router.use(auth);

router.get('/', getLeaderboard);

module.exports = router;
