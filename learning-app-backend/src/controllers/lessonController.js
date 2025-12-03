const Lesson = require('../models/Lesson');
const Progress = require('../models/Progress');

exports.createLesson = async (req, res) => {
  const { title, description, level, questions } = req.body;

  if (!title || !questions || !Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ error: 'Title and at least one question required' });
  }

  const lesson = await Lesson.create({
    title,
    description,
    level,
    questions
  });

  res.json(lesson);
};

exports.getLessons = async (req, res) => {
  const lessons = await Lesson.find().sort({ createdAt: -1 }).lean();

  const userId = req.user.id;

  const progresses = await Progress.find({ user: userId }).lean();
  const progressMap = new Map();
  progresses.forEach(p => {
    progressMap.set(p.lesson.toString(), p);
  });

  const result = lessons.map(lesson => {
    const p = progressMap.get(lesson._id.toString());
    return {
      ...lesson,
      progress: p
        ? {
            completed: p.completed,
            lastScore: p.lastScore,
            attempts: p.attempts
          }
        : null
    };
  });

  res.json(result);
};

exports.getLessonById = async (req, res) => {
  const lessonId = req.params.id;
  const lesson = await Lesson.findById(lessonId).lean();
  if (!lesson) return res.status(404).json({ error: 'Lesson not found' });

  // For now, send full lesson including correctIndex – in real world you'd hide answers.
  res.json(lesson);
};

exports.updateLesson = async (req, res) => {
  const lessonId = req.params.id;
  const { title, description, level, questions } = req.body;

  const updated = await Lesson.findByIdAndUpdate(
    lessonId,
    { title, description, level, questions },
    { new: true }
  );

  if (!updated) return res.status(404).json({ error: 'Lesson not found' });

  res.json(updated);
};

exports.deleteLesson = async (req, res) => {
  const lessonId = req.params.id;
  await Lesson.findByIdAndDelete(lessonId);
  await Progress.deleteMany({ lesson: lessonId });
  res.json({ success: true });
};
