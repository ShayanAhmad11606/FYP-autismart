import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  childId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Child',
    required: true
  },
  caregiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  activityType: {
    type: String,
    required: true,
    enum: ['game', 'assessment', 'therapy']
  },
  activityName: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    default: 0
  },
  maxScore: {
    type: Number,
    default: 0
  },
  percentage: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    default: 0
  },
  attempts: {
    type: Number,
    default: 1
  },
  difficulty: {
    type: String,
    default: 'medium'
  },
  correctAnswers: {
    type: Number,
    default: 0
  },
  incorrectAnswers: {
    type: Number,
    default: 0
  },
  details: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  completedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
activitySchema.index({ childId: 1, completedAt: -1 });
activitySchema.index({ caregiverId: 1, completedAt: -1 });

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;
