import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserStats,
  createAssessment,
  getAllAssessments,
  getAssessmentById,
  updateAssessment,
  deleteAssessment,
  getActiveAssessmentByLevel,
} from '../controllers/adminController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = express.Router();

// All routes require authentication and admin role
router.use(authMiddleware);
router.use(roleMiddleware('admin'));

// @route   GET /api/admin/stats
// @desc    Get user statistics
// @access  Private/Admin
router.get('/stats', getUserStats);

// ==================== USER ROUTES ====================

// @route   POST /api/admin/users
// @desc    Create new user
// @access  Private/Admin
router.post('/users', createUser);

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get('/users', getAllUsers);

// @route   GET /api/admin/users/:id
// @desc    Get single user
// @access  Private/Admin
router.get('/users/:id', getUserById);

// @route   PUT /api/admin/users/:id
// @desc    Update user
// @access  Private/Admin
router.put('/users/:id', updateUser);

// @route   DELETE /api/admin/users/:id
// @desc    Delete user
// @access  Private/Admin
router.delete('/users/:id', deleteUser);

// ==================== ASSESSMENT ROUTES ====================

// @route   POST /api/admin/assessments
// @desc    Create new assessment
// @access  Private/Admin
router.post('/assessments', createAssessment);

// @route   GET /api/admin/assessments
// @desc    Get all assessments (supports query params: level, isActive)
// @access  Private/Admin
router.get('/assessments', getAllAssessments);

// @route   GET /api/admin/assessments/active/:level
// @desc    Get active assessment by level
// @access  Private/Admin
router.get('/assessments/active/:level', getActiveAssessmentByLevel);

// @route   GET /api/admin/assessments/:id
// @desc    Get single assessment
// @access  Private/Admin
router.get('/assessments/:id', getAssessmentById);

// @route   PUT /api/admin/assessments/:id
// @desc    Update assessment
// @access  Private/Admin
router.put('/assessments/:id', updateAssessment);

// @route   DELETE /api/admin/assessments/:id
// @desc    Delete assessment
// @access  Private/Admin
router.delete('/assessments/:id', deleteAssessment);

export default router;
