const Lesson = require('../models/Lesson');
const Progress = require('../models/Progress');
const User = require('../models/User');

// body: { lessonId, answers: number[] }
exports.submitQuiz = async (req, res) => {
  const userId = req.user.id;
  const { lessonId, answers } = req.body;

  if (!lessonId || !Array.isArray(answers)) {
    return res.status(400).json({ error: 'lessonId and answers required' });
  }

  const lesson = await Lesson.findById(lessonId).lean();
  if (!lesson) return res.status(404).json({ error: 'Lesson not found' });

  if (answers.length !== lesson.questions.length) {
    return res.status(400).json({ error: 'Answers length mismatch' });
  }

  let correctCount = 0;
  lesson.questions.forEach((q, idx) => {
    if (answers[idx] === q.correctIndex) correctCount++;
  });

  const scorePercent = Math.round((correctCount / lesson.questions.length) * 100);

  // XP logic: 10 XP per correct answer
  const xpGained = correctCount * 10;

  let progress = await Progress.findOne({ user: userId, lesson: lessonId });
  if (!progress) {
    progress = await Progress.create({
      user: userId,
      lesson: lessonId,
      completed: scorePercent >= 60,
      lastScore: scorePercent,
      attempts: 1
    });
  } else {
    progress.lastScore = scorePercent;
    progress.attempts += 1;
    if (scorePercent >= 60) progress.completed = true;
    await progress.save();
  }

  const user = await User.findById(userId);
  user.xp += xpGained;
  await user.save();

  res.json({
    correctCount,
    total: lesson.questions.length,
    scorePercent,
    xpGained,
    totalXp: user.xp,
    progress
  });
};

exports.getMyProgress = async (req, res) => {
  const userId = req.user.id;
  const progresses = await Progress.find({ user: userId })
    .populate('lesson', 'title level')
    .lean();

  res.json(progresses);
};
