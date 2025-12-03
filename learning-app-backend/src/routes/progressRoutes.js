const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { submitQuiz, getMyProgress } = require('../controllers/progressController');

router.use(auth);

router.post('/submit', submitQuiz);
router.get('/me', getMyProgress);

module.exports = router;
