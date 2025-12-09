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

// Get all children (for experts and admins)
export const getAllChildren = async (req, res) => {
  try {
    // Only experts and admins can access all children
    if (req.user.role !== 'expert' && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Only experts and admins can view all patients.'
      });
    }

    const children = await Child.find()
      .populate('caregiverId', 'name email phone')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: children,
      count: children.length
    });
  } catch (error) {
    console.error('Error fetching all children:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch all children',
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
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Header with decorative line
  doc.fontSize(32).fillColor('#61C3B4').font('Helvetica-Bold').text('AutiSmart', { align: 'center' });
  doc.fontSize(22).fillColor('#333').font('Helvetica').text('Child Progress Report', { align: 'center' });
  doc.moveDown(0.4);
  doc.fontSize(11).fillColor('#888').text(`Generated on ${currentDate}`, { align: 'center' });
  doc.moveDown(0.8);
  
  // Decorative line
  doc.moveTo(50, doc.y).lineTo(doc.page.width - 50, doc.y).strokeColor('#61C3B4').lineWidth(3).stroke();
  doc.moveDown(2.5);

  // Child Information with improved layout
  doc.fontSize(18).fillColor('#333').font('Helvetica-Bold').text('Child Information');
  doc.moveDown(0.5);
  
  // Draw a subtle background box
  const infoBoxY = doc.y;
  doc.fontSize(12).fillColor('#666').font('Helvetica');
  
  // Use a table-like format
  const leftColumn = 80;
  let y = doc.y;
  
  doc.fillColor('#666').text('Name: ', leftColumn, y, { continued: true });
  doc.fillColor('#333').text(child.name);
  
  doc.fillColor('#666').text('Age: ', leftColumn, undefined, { continued: true });
  doc.fillColor('#333').text(`${child.age} years`);
  
  doc.fillColor('#666').text('Gender: ', leftColumn, undefined, { continued: true });
  doc.fillColor('#333').text(child.gender);
  
  if (child.dateOfBirth) {
    const formattedDOB = new Date(child.dateOfBirth).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    doc.fillColor('#666').text('Date of Birth: ', leftColumn, undefined, { continued: true });
    doc.fillColor('#333').text(formattedDOB);
  }
  
  if (child.diagnosis) {
    doc.fillColor('#666').text('Diagnosis: ', leftColumn, undefined, { continued: true });
    doc.fillColor('#333').text(child.diagnosis);
  }
  
  if (child.specialNeeds) {
    doc.fillColor('#666').text('Special Needs: ', leftColumn, undefined, { continued: true });
    doc.fillColor('#333').text(child.specialNeeds);
  }
  
  doc.moveDown(0.5);
  // Light separator line
  doc.moveTo(70, doc.y).lineTo(doc.page.width - 70, doc.y).strokeColor('#ddd').lineWidth(1).stroke();
  doc.moveDown(2);

  // Activity Summary with visual boxes
  doc.fontSize(18).fillColor('#333').font('Helvetica-Bold').text('Activity Summary');
  doc.moveDown(1);
  doc.font('Helvetica');
  
  if (stats.totalActivities > 0) {
    doc.fontSize(12).fillColor('#666');
    const boxWidth = 120;
    const boxHeight = 60;
    const spacing = 15;
    const startX = 80;
    let currentX = startX;
    const currentY = doc.y;
    
    // Helper function to draw stat box
    const drawStatBox = (x, y, label, value, color) => {
      doc.rect(x, y, boxWidth, boxHeight).fillAndStroke(color, '#ddd');
      doc.fontSize(24).fillColor('#333').text(value.toString(), x, y + 8, { width: boxWidth, align: 'center' });
      doc.fontSize(10).fillColor('#666').text(label, x, y + 38, { width: boxWidth, align: 'center' });
    };
    
    // Draw boxes (simplified for linear layout)
    doc.fontSize(12).fillColor('#666');
    doc.text('Total Activities Completed: ', 80, currentY, { continued: true });
    doc.fillColor('#333').font('Helvetica-Bold').text(`${stats.totalActivities}`);
    
    doc.font('Helvetica').fillColor('#666').text('Games Played: ', 80, undefined, { continued: true });
    doc.fillColor('#333').font('Helvetica-Bold').text(`${stats.totalGames}`);
    
    doc.font('Helvetica').fillColor('#666').text('Assessments Completed: ', 80, undefined, { continued: true });
    doc.fillColor('#333').font('Helvetica-Bold').text(`${stats.totalAssessments}`);
    
    doc.font('Helvetica').fillColor('#666').text('Therapy Sessions: ', 80, undefined, { continued: true });
    doc.fillColor('#333').font('Helvetica-Bold').text(`${stats.totalTherapySessions}`);
    
    doc.moveDown(0.8);
    doc.fontSize(15).fillColor('#61C3B4').font('Helvetica-Bold').text(`Average Performance Score: ${stats.averageScore.toFixed(1)}%`, 80);
    doc.font('Helvetica');
  } else {
    doc.fontSize(12).fillColor('#999').text('No activities recorded yet.');
    doc.moveDown(0.5);
    doc.fontSize(11).fillColor('#888');
    doc.text('Have the child complete assessments or play therapy games to see performance data here.');
  }
  doc.moveDown(0.5);
  doc.moveTo(70, doc.y).lineTo(doc.page.width - 70, doc.y).strokeColor('#ddd').lineWidth(1).stroke();
  doc.moveDown(2);

  // Performance by Activity
  if (Object.keys(stats.byActivityType).length > 0) {
    doc.fontSize(18).fillColor('#333').font('Helvetica-Bold').text('Performance by Activity Type');
    doc.moveDown(0.6);
    doc.fontSize(11).fillColor('#888').font('Helvetica').text(`Breakdown of ${Object.keys(stats.byActivityType).length} different ${Object.keys(stats.byActivityType).length === 1 ? 'activity' : 'activities'}`);
    doc.moveDown(1);
    
    Object.keys(stats.byActivityType).forEach((activityName, index) => {
      const activityData = stats.byActivityType[activityName];
      
      // Activity name in bold
      doc.fontSize(13).fillColor('#333').font('Helvetica-Bold').text(`${index + 1}. ${activityName}`);
      doc.fontSize(11).fillColor('#666').font('Helvetica');
      doc.text('   Attempts: ', { continued: true });
      doc.fillColor('#333').text(`${activityData.count}`);
      
      // Color code the average score
      const avgScore = activityData.averageScore.toFixed(1);
      let scoreColor = '#666';
      let performanceLabel = '';
      if (activityData.averageScore >= 80) {
        scoreColor = '#52b788';
        performanceLabel = ' (Excellent)';
      } else if (activityData.averageScore >= 60) {
        scoreColor = '#61C3B4';
        performanceLabel = ' (Good)';
      } else if (activityData.averageScore >= 40) {
        scoreColor = '#f4a261';
        performanceLabel = ' (Fair)';
      } else {
        scoreColor = '#e63946';
        performanceLabel = ' (Needs Improvement)';
      }
      
      doc.fillColor('#666').text('   Average Score: ', { continued: true });
      doc.fillColor(scoreColor).font('Helvetica-Bold').text(`${avgScore}%`, { continued: true });
      doc.fillColor('#888').fontSize(11).font('Helvetica').text(performanceLabel);
      doc.moveDown(0.6);
    });
    doc.moveDown(0.5);
    doc.moveTo(70, doc.y).lineTo(doc.page.width - 70, doc.y).strokeColor('#ddd').lineWidth(1).stroke();
    doc.moveDown(1);
  }

  // Cognitive Assessment - ensure it starts on a new page for better readability
  if (stats.totalActivities > 0) {
    doc.addPage();
  } else if (doc.y > 650) {
    doc.addPage();
  }
  
  doc.fontSize(18).fillColor('#333').font('Helvetica-Bold').text('Cognitive Assessment');
  doc.moveDown(1);
  doc.font('Helvetica');
  
  if (stats.totalActivities > 0) {
    // Overall level with colored badge
    doc.fontSize(13).fillColor('#666').text('Overall Level: ', { continued: true });
    let levelColor = '#666';
    if (cognitiveAssessment.overallLevel === 'Excellent') levelColor = '#52b788';
    else if (cognitiveAssessment.overallLevel === 'Good') levelColor = '#61C3B4';
    else if (cognitiveAssessment.overallLevel === 'Fair') levelColor = '#f4a261';
    else if (cognitiveAssessment.overallLevel === 'Needs Support') levelColor = '#e63946';
    doc.fillColor(levelColor).font('Helvetica-Bold').text(cognitiveAssessment.overallLevel);
    doc.font('Helvetica');
    
    // Progress trend
    doc.fillColor('#666').text('Progress Trend: ', { continued: true });
    let trendColor = '#666';
    if (cognitiveAssessment.progressTrend === 'Improving') trendColor = '#52b788';
    else if (cognitiveAssessment.progressTrend === 'Declining') trendColor = '#e63946';
    else trendColor = '#61C3B4';
    doc.fillColor(trendColor).font('Helvetica-Bold').text(cognitiveAssessment.progressTrend);
    doc.font('Helvetica');
  } else {
    doc.fontSize(11).fillColor('#888').text('Assessment data will appear here once activities are completed.');
  }
  doc.moveDown(1.8);

  if (cognitiveAssessment.strengths.length > 0) {
    doc.fontSize(15).fillColor('#52b788').font('Helvetica-Bold').text('Strengths');
    doc.fontSize(12).fillColor('#666').font('Helvetica');
    doc.moveDown(0.3);
    cognitiveAssessment.strengths.forEach(strength => {
      doc.text(`  • ${strength}`, { lineGap: 2 });
    });
    doc.moveDown(1.2);
  }

  if (cognitiveAssessment.areasForImprovement.length > 0) {
    doc.fontSize(15).fillColor('#f4a261').font('Helvetica-Bold').text('Areas for Improvement');
    doc.fontSize(12).fillColor('#666').font('Helvetica');
    doc.moveDown(0.3);
    cognitiveAssessment.areasForImprovement.forEach(area => {
      doc.text(`  • ${area}`, { lineGap: 2 });
    });
    doc.moveDown(1.2);
  }

  if (cognitiveAssessment.recommendations.length > 0) {
    doc.fontSize(15).fillColor('#61C3B4').font('Helvetica-Bold').text('Recommendations');
    doc.fontSize(12).fillColor('#666').font('Helvetica');
    doc.moveDown(0.3);
    cognitiveAssessment.recommendations.forEach(rec => {
      doc.text(`  • ${rec}`, { lineGap: 2 });
    });
    doc.moveDown(1.2);
  }

  // Recent Activities
  if (stats.recentActivities && stats.recentActivities.length > 0) {
    doc.addPage();
    doc.fontSize(18).fillColor('#333').font('Helvetica-Bold').text('Recent Activities');
    doc.moveDown(0.4);
    doc.fontSize(11).fillColor('#888').font('Helvetica').text(`Showing last ${Math.min(stats.recentActivities.length, 10)} activities`);
    doc.moveDown(0.3);
    doc.moveTo(50, doc.y).lineTo(doc.page.width - 50, doc.y).strokeColor('#ddd').lineWidth(1).stroke();
    doc.moveDown(1);
    
    stats.recentActivities.slice(0, 10).forEach((activity, index) => {
      // Check if we need a new page
      if (doc.y > 700) {
        doc.addPage();
      }
      
      const date = activity.completedAt ? 
        new Date(activity.completedAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }) : 
        'N/A';
      
      // Activity number and name
      doc.fontSize(13).fillColor('#333').font('Helvetica-Bold').text(`${index + 1}. ${activity.activityName}`);
      doc.fontSize(11).fillColor('#666').font('Helvetica');
      
      // Date
      doc.text('   Date: ', { continued: true });
      doc.fillColor('#333').text(date);
      
      // Type
      doc.fillColor('#666').text('   Type: ', { continued: true });
      doc.fillColor('#333').text(activity.activityType.charAt(0).toUpperCase() + activity.activityType.slice(1));
      
      // Score with color coding
      let scoreColor = '#666';
      if (activity.percentage >= 80) scoreColor = '#52b788';
      else if (activity.percentage >= 60) scoreColor = '#61C3B4';
      else if (activity.percentage >= 40) scoreColor = '#f4a261';
      else scoreColor = '#e63946';
      
      doc.fillColor('#666').text('   Score: ', { continued: true });
      doc.fillColor(scoreColor).font('Helvetica-Bold').text(`${activity.score}/${activity.maxScore} (${activity.percentage.toFixed(1)}%)`);
      
      // Duration
      doc.fillColor('#666').font('Helvetica').text('   Duration: ', { continued: true });
      doc.fillColor('#333').text(`${Math.floor(activity.duration / 60)}m ${activity.duration % 60}s`);
      
      // Difficulty if available
      if (activity.difficulty) {
        doc.fillColor('#666').text('   Difficulty: ', { continued: true });
        doc.fillColor('#333').text(activity.difficulty.charAt(0).toUpperCase() + activity.difficulty.slice(1));
      }
      
      doc.moveDown(0.4);
      // Light separator between activities
      if (index < Math.min(stats.recentActivities.length, 10) - 1) {
        doc.moveTo(70, doc.y).lineTo(doc.page.width - 70, doc.y).strokeColor('#eee').lineWidth(0.5).stroke();
        doc.moveDown(0.4);
      }
    });
  }

  // Footer
  doc.fontSize(10).fillColor('#999').text('Generated by AutiSmart - Supporting Autism Care', 50, doc.page.height - 50, { align: 'center' });
}
