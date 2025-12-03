const mongoose = require('mongoose');
const { Schema } = mongoose;

const progressSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    lesson: { type: Schema.Types.ObjectId, ref: 'Lesson', required: true },
    completed: { type: Boolean, default: false },
    lastScore: { type: Number, default: 0 },  // percentage
    attempts: { type: Number, default: 0 }
  },
  { timestamps: true }
);

progressSchema.index({ user: 1, lesson: 1 }, { unique: true });

module.exports = mongoose.model('Progress', progressSchema);
