import express from 'express';
import Assessment from '../models/Assessment.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// @route   GET /api/assessments
// @desc    Get all active assessments
// @access  Private (Authenticated users)
router.get('/', async (req, res) => {
  try {
    const assessments = await Assessment.find({ isActive: true })
      .select('-createdBy -updatedBy')
      .sort({ level: 1 });

    // Group assessments by level for easy frontend consumption
    const assessmentsByLevel = {
      easy: null,
      intermediate: null,
      advanced: null,
      sensory: null,
    };

    assessments.forEach(assessment => {
      assessmentsByLevel[assessment.level] = {
        id: assessment._id,
        level: assessment.level,
        title: assessment.title,
        description: assessment.description,
        questions: assessment.questions,
      };
    });

    res.status(200).json({
      success: true,
      data: assessmentsByLevel,
    });
  } catch (error) {
    console.error('Get assessments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching assessments',
      error: error.message,
    });
  }
});

// @route   GET /api/assessments/:level
// @desc    Get active assessment by level
// @access  Private (Authenticated users)
router.get('/:level', async (req, res) => {
  try {
    const { level } = req.params;

    const validLevels = ['easy', 'intermediate', 'advanced', 'sensory'];
    if (!validLevels.includes(level)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid level. Must be one of: easy, intermediate, advanced, sensory',
      });
    }

    const assessment = await Assessment.findOne({ level, isActive: true })
      .select('-createdBy -updatedBy');

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: `No active assessment found for level "${level}"`,
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: assessment._id,
        level: assessment.level,
        title: assessment.title,
        description: assessment.description,
        questions: assessment.questions,
      },
    });
  } catch (error) {
    console.error('Get assessment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching assessment',
      error: error.message,
    });
  }
});

export default router;
