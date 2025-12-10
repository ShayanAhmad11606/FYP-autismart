/**
 * Assessment Data Access Layer
 * Handles all database operations for Assessment model
 */
import Assessment from '../models/Assessment.js';

class AssessmentDataAccess {
  /**
   * Create new assessment
   */
  async create(assessmentData) {
    return await Assessment.create(assessmentData);
  }

  /**
   * Find assessment by ID
   */
  async findById(id) {
    return await Assessment.findById(id);
  }

  /**
   * Find all assessments
   */
  async findAll(filters = {}) {
    return await Assessment.find(filters).sort({ createdAt: -1 });
  }

  /**
   * Find assessments by category
   */
  async findByCategory(category) {
    return await Assessment.find({ category }).sort({ order: 1 });
  }

  /**
   * Update assessment by ID
   */
  async updateById(id, updateData) {
    return await Assessment.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
  }

  /**
   * Delete assessment by ID
   */
  async deleteById(id) {
    return await Assessment.findByIdAndDelete(id);
  }

  /**
   * Count assessments
   */
  async count(filters = {}) {
    return await Assessment.countDocuments(filters);
  }

  /**
   * Find active assessments
   */
  async findActive() {
    return await Assessment.find({ isActive: true }).sort({ order: 1 });
  }

  /**
   * Update assessment order
   */
  async updateOrder(id, order) {
    return await Assessment.findByIdAndUpdate(
      id,
      { order },
      { new: true }
    );
  }
}

export default new AssessmentDataAccess();
