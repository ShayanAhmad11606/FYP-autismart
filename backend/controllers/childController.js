/**
 * Child Controller (Refactored)
 * Handles HTTP requests and delegates business logic to services
 */
import childService from '../services/child.service.js';
import { asyncHandler } from '../middleware/error.middleware.js';
import PDFDocument from 'pdfkit';

// @desc    Add a new child
// @route   POST /api/children
// @access  Private (Caregiver)
export const addChild = asyncHandler(async (req, res) => {
  const child = await childService.addChild(req.user._id, req.body);

  res.status(201).json({
    success: true,
    message: 'Child added successfully',
    data: child
  });
});

// @desc    Get all children for a caregiver
// @route   GET /api/children
// @access  Private (Caregiver)
export const getChildren = asyncHandler(async (req, res) => {
  const children = await childService.getChildrenByCaregiver(req.user._id);

  res.status(200).json({
    success: true,
    data: children,
    count: children.length
  });
});

// @desc    Get all children (for experts and admins)
// @route   GET /api/children/all
// @access  Private (Expert, Admin)
export const getAllChildren = asyncHandler(async (req, res) => {
  // Check authorization
  if (req.user.role !== 'expert' && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Only experts and admins can access all children.'
    });
  }

  const children = await childService.getAllChildren();

  res.status(200).json({
    success: true,
    data: children,
    count: children.length
  });
});

// @desc    Get a single child by ID
// @route   GET /api/children/:id
// @access  Private
export const getChild = asyncHandler(async (req, res) => {
  const isExpertOrAdmin = req.user.role === 'expert' || req.user.role === 'admin';
  const caregiverId = isExpertOrAdmin ? null : req.user._id;

  const child = await childService.getChildById(req.params.id, caregiverId);

  res.status(200).json({
    success: true,
    data: child
  });
});

// @desc    Update a child
// @route   PUT /api/children/:id
// @access  Private (Caregiver)
export const updateChild = asyncHandler(async (req, res) => {
  const child = await childService.updateChild(req.params.id, req.user._id, req.body);

  res.status(200).json({
    success: true,
    message: 'Child updated successfully',
    data: child
  });
});

// @desc    Delete a child
// @route   DELETE /api/children/:id
// @access  Private (Caregiver)
export const deleteChild = asyncHandler(async (req, res) => {
  const result = await childService.deleteChild(req.params.id, req.user._id);

  res.status(200).json({
    success: true,
    message: result.message
  });
});

// @desc    Get child statistics
// @route   GET /api/children/:id/stats
// @access  Private
export const getChildStats = asyncHandler(async (req, res) => {
  const isExpertOrAdmin = req.user.role === 'expert' || req.user.role === 'admin';
  const caregiverId = isExpertOrAdmin ? null : req.user._id;

  // Get child data and verify access
  const child = await childService.getChildById(req.params.id, caregiverId);
  const stats = await childService.getChildStatistics(req.params.id);

  res.status(200).json({
    success: true,
    data: {
      child,
      ...stats
    }
  });
});

// @desc    Get child activities
// @route   GET /api/children/:id/activities
// @access  Private
export const getChildActivities = asyncHandler(async (req, res) => {
  const { type, limit } = req.query;
  const isExpertOrAdmin = req.user.role === 'expert' || req.user.role === 'admin';
  const caregiverId = isExpertOrAdmin ? null : req.user._id;

  // Verify access to child
  await childService.getChildById(req.params.id, caregiverId);

  const activities = await childService.getChildActivities(
    req.params.id,
    type || null,
    limit ? parseInt(limit) : null
  );

  res.status(200).json({
    success: true,
    data: activities,
    count: activities.length
  });
});

// @desc    Add activity for a child
// @route   POST /api/children/:id/activities
// @access  Private
export const addActivity = asyncHandler(async (req, res) => {
  const isExpertOrAdmin = req.user.role === 'expert' || req.user.role === 'admin';
  const caregiverId = isExpertOrAdmin ? null : req.user._id;

  // Verify access to child
  const child = await childService.getChildById(req.params.id, caregiverId);

  // Add caregiverId to activity data
  const activityData = {
    ...req.body,
    caregiverId: child.caregiverId || req.user._id
  };

  const activity = await childService.addActivity(req.params.id, activityData);

  res.status(201).json({
    success: true,
    message: 'Activity recorded successfully',
    data: activity
  });
});

// @desc    Generate child report PDF
// @route   GET /api/children/:id/report
// @access  Private
export const generateChildReport = asyncHandler(async (req, res) => {
  const isExpertOrAdmin = req.user.role === 'expert' || req.user.role === 'admin';
  const caregiverId = isExpertOrAdmin ? null : req.user._id;

  // Verify access and get data
  const child = await childService.getChildById(req.params.id, caregiverId);
  const stats = await childService.getChildStatistics(req.params.id);

  // Create PDF document
  const doc = new PDFDocument({ margin: 50 });

  // Set response headers with proper CORS
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename=child-report-${child.name.replace(/\s+/g, '-')}-${Date.now()}.pdf`
  );

  // Pipe PDF to response
  doc.pipe(res);

  // Add content to PDF
  doc.fontSize(20).text('Child Progress Report', { align: 'center' });
  doc.moveDown();

  doc.fontSize(14).text(`Child Name: ${child.name}`);
  doc.text(`Age: ${child.age}`);
  doc.text(`Gender: ${child.gender}`);
  if (child.diagnosis) doc.text(`Diagnosis: ${child.diagnosis}`);
  doc.moveDown();

  doc.fontSize(16).text('Activity Statistics', { underline: true });
  doc.moveDown();
  doc.fontSize(12);
  doc.text(`Total Activities: ${stats.totalActivities}`);
  doc.text(`Average Score: ${stats.averageScore.toFixed(2)}%`);
  doc.text(`Total Games: ${stats.totalGames}`);
  doc.text(`Total Assessments: ${stats.totalAssessments}`);
  doc.text(`Total Therapy Sessions: ${stats.totalTherapySessions}`);
  doc.moveDown();

  if (Object.keys(stats.byActivityType).length > 0) {
    doc.fontSize(14).text('Performance by Activity', { underline: true });
    doc.moveDown();
    doc.fontSize(12);
    
    Object.entries(stats.byActivityType).forEach(([activityName, data]) => {
      doc.text(`${activityName}:`);
      doc.text(`  Count: ${data.count}`);
      doc.text(`  Average Score: ${data.averageScore.toFixed(2)}%`);
      doc.moveDown(0.5);
    });
  }

  // Finalize PDF
  doc.end();
});
