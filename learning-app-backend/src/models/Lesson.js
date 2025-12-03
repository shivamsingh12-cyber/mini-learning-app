const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
  prompt: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctIndex: { type: Number, required: true }
});

const lessonSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    questions: [questionSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lesson', lessonSchema);
