const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const requireAdmin = require('../middleware/adminMiddleware');
const {
  createLesson,
  getLessons,
  getLessonById,
  updateLesson,
  deleteLesson
} = require('../controllers/lessonController');

router.use(auth);

router.get('/', getLessons);
router.get('/:id', getLessonById);

// admin-only
router.post('/', requireAdmin, createLesson);
router.put('/:id', requireAdmin, updateLesson);
router.delete('/:id', requireAdmin, deleteLesson);

module.exports = router;
