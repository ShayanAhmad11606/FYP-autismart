import User from '../models/User.js';
import Assessment from '../models/Assessment.js';
import bcrypt from 'bcryptjs';

// @desc    Create new user
// @route   POST /api/admin/users
// @access  Private/Admin
export const createUser = async (req, res) => {
  try {
    const { name, email, phone, password, role, isVerified } = req.body;

    // Validation
    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, phone, and password',
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists',
      });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      phone,
      password, // Will be hashed by pre-save middleware
      role: role || 'caregiver',
      isVerified: isVerified !== undefined ? isVerified : true, // Admin-created users are verified by default
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating user',
      error: error.message,
    });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password -otp -otpExpires');
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching users',
      error: error.message,
    });
  }
};

// @desc    Get single user
// @route   GET /api/admin/users/:id
// @access  Private/Admin
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -otp -otpExpires');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching user',
      error: error.message,
    });
  }
};

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
export const updateUser = async (req, res) => {
  try {
    const { name, email, phone, password, role, isVerified } = req.body;

    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Update fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (password && password.trim() !== '') {
      user.password = password; // Will be hashed by pre-save middleware
    }
    if (role) user.role = role;
    if (typeof isVerified !== 'undefined') user.isVerified = isVerified;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error('Update user error:', error);
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `${field === 'email' ? 'Email' : 'Phone'} already exists`,
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while updating user',
      error: error.message,
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own account',
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting user',
      error: error.message,
    });
  }
};

// @desc    Get user statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const verifiedUsers = await User.countDocuments({ isVerified: true });
    const unverifiedUsers = await User.countDocuments({ isVerified: false });
    const adminCount = await User.countDocuments({ role: 'admin' });
    const expertCount = await User.countDocuments({ role: 'expert' });
    const caregiverCount = await User.countDocuments({ role: 'caregiver' });

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        verifiedUsers,
        unverifiedUsers,
        byRole: {
          admin: adminCount,
          expert: expertCount,
          caregiver: caregiverCount,
        },
      },
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics',
      error: error.message,
    });
  }
};

// ==================== ASSESSMENT CRUD OPERATIONS ====================

// @desc    Create new assessment
// @route   POST /api/admin/assessments
// @access  Private/Admin
export const createAssessment = async (req, res) => {
  try {
    const { level, title, description, questions } = req.body;

    // Validation
    if (!level || !title || !description || !questions || questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide level, title, description, and at least one question',
      });
    }

    // Validate level
    const validLevels = ['easy', 'intermediate', 'advanced', 'sensory'];
    if (!validLevels.includes(level)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid level. Must be one of: easy, intermediate, advanced, sensory',
      });
    }

    // Check if an active assessment already exists for this level
    const existingAssessment = await Assessment.findOne({ level, isActive: true });
    if (existingAssessment) {
      return res.status(400).json({
        success: false,
        message: `An active assessment already exists for level "${level}". Please deactivate it first or update the existing one.`,
      });
    }

    // Create new assessment
    const assessment = await Assessment.create({
      level,
      title,
      description,
      questions,
      createdBy: req.user._id,
      isActive: true,
    });

    res.status(201).json({
      success: true,
      message: 'Assessment created successfully',
      data: assessment,
    });
  } catch (error) {
    console.error('Create assessment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating assessment',
      error: error.message,
    });
  }
};

// @desc    Get all assessments
// @route   GET /api/admin/assessments
// @access  Private/Admin
export const getAllAssessments = async (req, res) => {
  try {
    const { level, isActive } = req.query;
    const filter = {};

    if (level) filter.level = level;
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    const assessments = await Assessment.find(filter)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: assessments.length,
      data: assessments,
    });
  } catch (error) {
    console.error('Get assessments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching assessments',
      error: error.message,
    });
  }
};

// @desc    Get single assessment
// @route   GET /api/admin/assessments/:id
// @access  Private/Admin
export const getAssessmentById = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: 'Assessment not found',
      });
    }

    res.status(200).json({
      success: true,
      data: assessment,
    });
  } catch (error) {
    console.error('Get assessment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching assessment',
      error: error.message,
    });
  }
};

// @desc    Update assessment
// @route   PUT /api/admin/assessments/:id
// @access  Private/Admin
export const updateAssessment = async (req, res) => {
  try {
    const { level, title, description, questions, isActive } = req.body;

    const assessment = await Assessment.findById(req.params.id);

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: 'Assessment not found',
      });
    }

    // If changing level or activating, check for conflicts
    if ((level && level !== assessment.level) || (isActive && !assessment.isActive)) {
      const targetLevel = level || assessment.level;
      const existingAssessment = await Assessment.findOne({
        level: targetLevel,
        isActive: true,
        _id: { $ne: req.params.id },
      });

      if (existingAssessment) {
        return res.status(400).json({
          success: false,
          message: `An active assessment already exists for level "${targetLevel}". Please deactivate it first.`,
        });
      }
    }

    // Update fields
    if (level) assessment.level = level;
    if (title) assessment.title = title;
    if (description) assessment.description = description;
    if (questions) assessment.questions = questions;
    if (typeof isActive !== 'undefined') assessment.isActive = isActive;
    assessment.updatedBy = req.user._id;

    await assessment.save();

    res.status(200).json({
      success: true,
      message: 'Assessment updated successfully',
      data: assessment,
    });
  } catch (error) {
    console.error('Update assessment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating assessment',
      error: error.message,
    });
  }
};

// @desc    Delete assessment
// @route   DELETE /api/admin/assessments/:id
// @access  Private/Admin
export const deleteAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: 'Assessment not found',
      });
    }

    await Assessment.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Assessment deleted successfully',
    });
  } catch (error) {
    console.error('Delete assessment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting assessment',
      error: error.message,
    });
  }
};

// @desc    Get active assessments by level (for public use)
// @route   GET /api/admin/assessments/active/:level
// @access  Private/Admin
export const getActiveAssessmentByLevel = async (req, res) => {
  try {
    const { level } = req.params;

    const assessment = await Assessment.findOne({ level, isActive: true });

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: `No active assessment found for level "${level}"`,
      });
    }

    res.status(200).json({
      success: true,
      data: assessment,
    });
  } catch (error) {
    console.error('Get active assessment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching active assessment',
      error: error.message,
    });
  }
};
