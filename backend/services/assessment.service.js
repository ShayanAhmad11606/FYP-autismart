/**
 * Assessment Service
 * Handles business logic for assessment operations
 */
import assessmentDataAccess from '../dataAccess/assessment.dataAccess.js';

class AssessmentService {
  /**
   * Get all assessments
   */
  async getAllAssessments(filters = {}) {
    const assessments = await assessmentDataAccess.findAll(filters);
    return assessments;
  }

  /**
   * Get assessment by ID
   */
  async getAssessmentById(assessmentId) {
    const assessment = await assessmentDataAccess.findById(assessmentId);
    
    if (!assessment) {
      throw new Error('Assessment not found');
    }

    return assessment;
  }

  /**
   * Get assessments by category
   */
  async getAssessmentsByCategory(category) {
    const assessments = await assessmentDataAccess.findByCategory(category);
    return assessments;
  }

  /**
   * Get active assessments
   */
  async getActiveAssessments() {
    const assessments = await assessmentDataAccess.findActive();
    return assessments;
  }

  /**
   * Create assessment
   */
  async createAssessment(assessmentData) {
    const { title, description, category, questions } = assessmentData;

    if (!title || !category || !questions || questions.length === 0) {
      throw new Error('Title, category, and at least one question are required');
    }

    const assessment = await assessmentDataAccess.create(assessmentData);
    return assessment;
  }

  /**
   * Update assessment
   */
  async updateAssessment(assessmentId, updateData) {
    const assessment = await assessmentDataAccess.updateById(assessmentId, updateData);
    
    if (!assessment) {
      throw new Error('Assessment not found');
    }

    return assessment;
  }

  /**
   * Delete assessment
   */
  async deleteAssessment(assessmentId) {
    const assessment = await assessmentDataAccess.deleteById(assessmentId);
    
    if (!assessment) {
      throw new Error('Assessment not found');
    }

    return { message: 'Assessment deleted successfully' };
  }

  /**
   * Toggle assessment active status
   */
  async toggleAssessmentStatus(assessmentId) {
    const assessment = await assessmentDataAccess.findById(assessmentId);
    
    if (!assessment) {
      throw new Error('Assessment not found');
    }

    const updatedAssessment = await assessmentDataAccess.updateById(assessmentId, {
      isActive: !assessment.isActive
    });

    return updatedAssessment;
  }

  /**
   * Reorder assessments
   */
  async reorderAssessments(orderUpdates) {
    const promises = orderUpdates.map(({ id, order }) => 
      assessmentDataAccess.updateOrder(id, order)
    );

    await Promise.all(promises);

    return { message: 'Assessments reordered successfully' };
  }

  /**
   * Get assessment statistics
   */
  async getAssessmentStatistics() {
    const total = await assessmentDataAccess.count();
    const active = await assessmentDataAccess.count({ isActive: true });
    const inactive = total - active;

    return {
      total,
      active,
      inactive
    };
  }
}

export default new AssessmentService();
