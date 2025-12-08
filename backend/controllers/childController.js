import Child from '../models/Child.js';
import Activity from '../models/Activity.js';
import PDFDocument from 'pdfkit';

// Helper function to get statistics
async function getStatsByChildId(childId) {
  const activities = await Activity.find({ childId }).sort({ completedAt: -1 }).limit(1000);

  if (activities.length === 0) {
    return {
      totalActivities: 0,
      averageScore: 0,
      totalGames: 0,
      totalAssessments: 0,
      totalTherapySessions: 0,
      byActivityType: {},
      progressOverTime: [],
      recentActivities: []
    };
  }

  const stats = {
    totalActivities: activities.length,
    averageScore: 0,
    totalGames: 0,
    totalAssessments: 0,
    totalTherapySessions: 0,
    byActivityType: {},
    progressOverTime: [],
    recentActivities: activities.slice(0, 10)
  };

  let totalScore = 0;

  activities.forEach(activity => {
    totalScore += activity.percentage || 0;

    if (activity.activityType === 'game') stats.totalGames++;
    if (activity.activityType === 'assessment') stats.totalAssessments++;
    if (activity.activityType === 'therapy') stats.totalTherapySessions++;

    if (!stats.byActivityType[activity.activityName]) {
      stats.byActivityType[activity.activityName] = {
        count: 0,
        totalScore: 0,
        averageScore: 0
      };
    }
    stats.byActivityType[activity.activityName].count++;
    stats.byActivityType[activity.activityName].totalScore += activity.percentage || 0;
  });

  stats.averageScore = totalScore / activities.length;

  Object.keys(stats.byActivityType).forEach(key => {
    const data = stats.byActivityType[key];
    data.averageScore = data.totalScore / data.count;
  });

  const progressMap = {};
  activities.forEach(activity => {
    const date = activity.completedAt.toISOString().split('T')[0];
    
    if (!progressMap[date]) {
      progressMap[date] = { date, count: 0, totalScore: 0 };
    }
    progressMap[date].count++;
    progressMap[date].totalScore += activity.percentage || 0;
  });

  stats.progressOverTime = Object.values(progressMap)
    .map(item => ({
      ...item,
      averageScore: item.totalScore / item.count
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return stats;
}

// Add a new child
export const addChild = async (req, res) => {
  try {
    const { name, age, gender, dateOfBirth, diagnosis, specialNeeds, notes, profileImage } = req.body;
    const caregiverId = req.user._id;

    if (!name || !age || !gender) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, age, and gender are required' 
      });
    }

    const childData = {
      caregiverId,
      name,
      age: parseInt(age),
      gender,
      dateOfBirth: dateOfBirth || null,
      diagnosis: diagnosis || '',
      specialNeeds: specialNeeds || '',
      notes: notes || '',
      profileImage: profileImage || ''
    };

    const child = await Child.create(childData);

    res.status(201).json({
      success: true,
      message: 'Child added successfully',
      data: child
    });
  } catch (error) {
    console.error('Error adding child:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add child',
      error: error.message
    });
  }
};

// Get all children for a caregiver
export const getChildren = async (req, res) => {
  try {
    const caregiverId = req.user._id;
    const children = await Child.find({ caregiverId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: children,
      count: children.length
    });
  } catch (error) {
    console.error('Error fetching children:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch children',
      error: error.message
    });
  }
};

// Get a specific child
export const getChild = async (req, res) => {
  try {
    const { childId } = req.params;
    const caregiverId = req.user._id;

    const child = await Child.findById(childId);

    if (!child) {
      return res.status(404).json({
        success: false,
        message: 'Child not found'
      });
    }

    // Verify the child belongs to this caregiver
    if (child.caregiverId.toString() !== caregiverId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.status(200).json({
      success: true,
      data: child
    });
  } catch (error) {
    console.error('Error fetching child:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch child',
      error: error.message
    });
  }
};

// Update child information
export const updateChild = async (req, res) => {
  try {
    const { childId } = req.params;
    const caregiverId = req.user._id;
    const updateData = req.body;

    const child = await Child.findById(childId);

    if (!child) {
      return res.status(404).json({
        success: false,
        message: 'Child not found'
      });
    }

    // Verify the child belongs to this caregiver
    if (child.caregiverId.toString() !== caregiverId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Don't allow changing caregiverId
    delete updateData.caregiverId;
    delete updateData._id;

    Object.assign(child, updateData);
    await child.save();
    const updatedChild = child;

    res.status(200).json({
      success: true,
      message: 'Child updated successfully',
      data: updatedChild
    });
  } catch (error) {
    console.error('Error updating child:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update child',
      error: error.message
    });
  }
};

// Delete a child
export const deleteChild = async (req, res) => {
  try {
    const { childId } = req.params;
    const caregiverId = req.user._id;

    const child = await Child.findById(childId);

    if (!child) {
      return res.status(404).json({
        success: false,
        message: 'Child not found'
      });
    }

    // Verify the child belongs to this caregiver
    if (child.caregiverId.toString() !== caregiverId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Delete all activities associated with this child
    await Activity.deleteMany({ childId });
    
    // Delete the child
    await Child.findByIdAndDelete(childId);

    res.status(200).json({
      success: true,
      message: 'Child deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting child:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete child',
      error: error.message
    });
  }
};

// Record activity for a child
export const recordActivity = async (req, res) => {
  try {
    const { childId } = req.params;
    const caregiverId = req.user._id;
    const activityData = req.body;

    const child = await Child.findById(childId);

    if (!child) {
      return res.status(404).json({
        success: false,
        message: 'Child not found'
      });
    }

    // Verify the child belongs to this caregiver
    if (child.caregiverId.toString() !== caregiverId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const activity = await Activity.create({
      childId,
      caregiverId,
      ...activityData
    });

    res.status(201).json({
      success: true,
      message: 'Activity recorded successfully',
      data: activity
    });
  } catch (error) {
    console.error('Error recording activity:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to record activity',
      error: error.message
    });
  }
};

// Get activities for a child
export const getChildActivities = async (req, res) => {
  try {
    const { childId } = req.params;
    const caregiverId = req.user._id;
    const limit = parseInt(req.query.limit) || 50;

    const child = await Child.findById(childId);

    if (!child) {
      return res.status(404).json({
        success: false,
        message: 'Child not found'
      });
    }

    // Verify the child belongs to this caregiver
    if (child.caregiverId.toString() !== caregiverId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const activities = await Activity.find({ childId }).sort({ completedAt: -1 }).limit(limit);

    res.status(200).json({
      success: true,
      data: activities,
      count: activities.length
    });
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch activities',
      error: error.message
    });
  }
};

// Get child statistics and report
export const getChildReport = async (req, res) => {
  try {
    const { childId } = req.params;
    const caregiverId = req.user._id;

    const child = await Child.findById(childId);

    if (!child) {
      return res.status(404).json({
        success: false,
        message: 'Child not found'
      });
    }

    // Verify the child belongs to this caregiver
    if (child.caregiverId.toString() !== caregiverId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const stats = await getStatsByChildId(childId);

    // Generate cognitive assessment
    const cognitiveAssessment = generateCognitiveAssessment(stats);

    res.status(200).json({
      success: true,
      data: {
        child,
        statistics: stats,
        cognitiveAssessment
      }
    });
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate report',
      error: error.message
    });
  }
};

// Download child report as PDF
export const downloadChildReportPDF = async (req, res) => {
  try {
    const { childId } = req.params;
    const caregiverId = req.user._id;

    const child = await Child.findById(childId);

    if (!child) {
      return res.status(404).json({
        success: false,
        message: 'Child not found'
      });
    }

    // Verify the child belongs to this caregiver
    if (child.caregiverId.toString() !== caregiverId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const stats = await getStatsByChildId(childId);
    const cognitiveAssessment = generateCognitiveAssessment(stats);

    // Create PDF
    const doc = new PDFDocument({ margin: 50 });

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=report-${child.name.replace(/\s+/g, '-')}-${Date.now()}.pdf`);

    // Pipe PDF to response
    doc.pipe(res);

    // Generate PDF content
    generatePDFContent(doc, child, stats, cognitiveAssessment);

    // Finalize PDF
    doc.end();
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate PDF',
      error: error.message
    });
  }
};

// Helper function to generate cognitive assessment
function generateCognitiveAssessment(stats) {
  const assessment = {
    overallLevel: 'Not Assessed',
    strengths: [],
    areasForImprovement: [],
    recommendations: [],
    progressTrend: 'Stable'
  };

  if (stats.totalActivities === 0) {
    assessment.recommendations.push('Begin with initial assessment activities to establish baseline');
    return assessment;
  }

  const avgScore = stats.averageScore;

  // Determine overall level
  if (avgScore >= 85) {
    assessment.overallLevel = 'Excellent';
  } else if (avgScore >= 70) {
    assessment.overallLevel = 'Good';
  } else if (avgScore >= 55) {
    assessment.overallLevel = 'Fair';
  } else {
    assessment.overallLevel = 'Needs Support';
  }

  // Analyze by activity type
  Object.keys(stats.byActivityType).forEach(activityName => {
    const activityStats = stats.byActivityType[activityName];
    if (activityStats.averageScore >= 75) {
      assessment.strengths.push(`Strong performance in ${activityName} (${activityStats.averageScore.toFixed(1)}%)`);
    } else if (activityStats.averageScore < 60) {
      assessment.areasForImprovement.push(`Needs practice in ${activityName} (${activityStats.averageScore.toFixed(1)}%)`);
    }
  });

  // Progress trend
  if (stats.progressOverTime.length >= 3) {
    const recentScores = stats.progressOverTime.slice(-3).map(p => p.averageScore);
    const earlierScores = stats.progressOverTime.slice(0, 3).map(p => p.averageScore);
    
    const recentAvg = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;
    const earlierAvg = earlierScores.reduce((a, b) => a + b, 0) / earlierScores.length;

    if (recentAvg > earlierAvg + 5) {
      assessment.progressTrend = 'Improving';
    } else if (recentAvg < earlierAvg - 5) {
      assessment.progressTrend = 'Declining';
    }
  }

  // Generate recommendations
  if (assessment.progressTrend === 'Improving') {
    assessment.recommendations.push('Continue current activities - showing positive progress');
  } else if (assessment.progressTrend === 'Declining') {
    assessment.recommendations.push('Consider adjusting difficulty levels or trying different activity types');
  }

  if (stats.totalGames < 5) {
    assessment.recommendations.push('Increase engagement with interactive games for cognitive development');
  }

  if (stats.totalAssessments < 2) {
    assessment.recommendations.push('Complete regular assessments to track cognitive development');
  }

  if (avgScore < 60) {
    assessment.recommendations.push('Focus on foundational skills with easier difficulty levels');
    assessment.recommendations.push('Consider consulting with a specialist for personalized support');
  }

  return assessment;
}

// Helper function to generate PDF content
function generatePDFContent(doc, child, stats, cognitiveAssessment) {
  const currentDate = new Date().toLocaleDateString();

  // Header
  doc.fontSize(24).fillColor('#61C3B4').text('AutiSmart Progress Report', { align: 'center' });
  doc.moveDown(0.5);
  doc.fontSize(12).fillColor('#666').text(`Generated on ${currentDate}`, { align: 'center' });
  doc.moveDown(2);

  // Child Information
  doc.fontSize(18).fillColor('#333').text('Child Information');
  doc.moveDown(0.5);
  doc.fontSize(12).fillColor('#666');
  doc.text(`Name: ${child.name}`);
  doc.text(`Age: ${child.age} years`);
  doc.text(`Gender: ${child.gender}`);
  if (child.dateOfBirth) doc.text(`Date of Birth: ${child.dateOfBirth}`);
  if (child.diagnosis) doc.text(`Diagnosis: ${child.diagnosis}`);
  if (child.specialNeeds) doc.text(`Special Needs: ${child.specialNeeds}`);
  doc.moveDown(2);

  // Activity Summary
  doc.fontSize(18).fillColor('#333').text('Activity Summary');
  doc.moveDown(0.5);
  doc.fontSize(12).fillColor('#666');
  
  if (stats.totalActivities > 0) {
    doc.text(`Total Activities: ${stats.totalActivities}`);
    doc.text(`Games Played: ${stats.totalGames}`);
    doc.text(`Assessments Completed: ${stats.totalAssessments}`);
    doc.text(`Therapy Sessions: ${stats.totalTherapySessions}`);
    doc.text(`Average Score: ${stats.averageScore.toFixed(1)}%`);
  } else {
    doc.text('No activities recorded yet.');
    doc.moveDown(0.5);
    doc.fontSize(11).fillColor('#888');
    doc.text('Have the child complete assessments or play therapy games to see performance data here.');
  }
  doc.moveDown(2);

  // Performance by Activity
  if (Object.keys(stats.byActivityType).length > 0) {
    doc.fontSize(18).fillColor('#333').text('Performance by Activity');
    doc.moveDown(0.5);
    doc.fontSize(12).fillColor('#666');
    
    Object.keys(stats.byActivityType).forEach(activityName => {
      const activityData = stats.byActivityType[activityName];
      doc.text(`${activityName}:`);
      doc.text(`  • Attempts: ${activityData.count}`);
      doc.text(`  • Average Score: ${activityData.averageScore.toFixed(1)}%`);
      doc.moveDown(0.3);
    });
    doc.moveDown(1);
  }

  // Cognitive Assessment
  if (stats.totalActivities > 0) {
    doc.addPage();
  }
  doc.fontSize(18).fillColor('#333').text('Cognitive Assessment');
  doc.moveDown(0.5);
  doc.fontSize(12).fillColor('#666');
  
  if (stats.totalActivities > 0) {
    doc.text(`Overall Level: ${cognitiveAssessment.overallLevel}`);
    doc.text(`Progress Trend: ${cognitiveAssessment.progressTrend}`);
  } else {
    doc.text('Assessment data will appear here once activities are completed.');
  }
  doc.moveDown(1);

  if (cognitiveAssessment.strengths.length > 0) {
    doc.fontSize(14).fillColor('#52b788').text('Strengths:');
    doc.fontSize(12).fillColor('#666');
    cognitiveAssessment.strengths.forEach(strength => {
      doc.text(`  • ${strength}`);
    });
    doc.moveDown(1);
  }

  if (cognitiveAssessment.areasForImprovement.length > 0) {
    doc.fontSize(14).fillColor('#f4a261').text('Areas for Improvement:');
    doc.fontSize(12).fillColor('#666');
    cognitiveAssessment.areasForImprovement.forEach(area => {
      doc.text(`  • ${area}`);
    });
    doc.moveDown(1);
  }

  if (cognitiveAssessment.recommendations.length > 0) {
    doc.fontSize(14).fillColor('#61C3B4').text('Recommendations:');
    doc.fontSize(12).fillColor('#666');
    cognitiveAssessment.recommendations.forEach(rec => {
      doc.text(`  • ${rec}`);
    });
    doc.moveDown(1);
  }

  // Recent Activities
  if (stats.recentActivities && stats.recentActivities.length > 0) {
    doc.addPage();
    doc.fontSize(18).fillColor('#333').text('Recent Activities');
    doc.moveDown(0.5);
    
    stats.recentActivities.slice(0, 10).forEach((activity, index) => {
      const date = activity.completedAt?.toDate ? 
        activity.completedAt.toDate().toLocaleDateString() : 
        'N/A';
      
      doc.fontSize(12).fillColor('#333').text(`${index + 1}. ${activity.activityName}`);
      doc.fontSize(10).fillColor('#666');
      doc.text(`   Date: ${date}`);
      doc.text(`   Type: ${activity.activityType}`);
      doc.text(`   Score: ${activity.score}/${activity.maxScore} (${activity.percentage.toFixed(1)}%)`);
      doc.text(`   Duration: ${Math.floor(activity.duration / 60)}m ${activity.duration % 60}s`);
      doc.moveDown(0.5);
    });
  }

  // Footer
  doc.fontSize(10).fillColor('#999').text('Generated by AutiSmart - Supporting Autism Care', 50, doc.page.height - 50, { align: 'center' });
}
