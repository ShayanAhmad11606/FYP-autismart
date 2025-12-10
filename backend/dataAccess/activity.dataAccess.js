/**
 * Activity Data Access Layer
 * Handles all database operations for Activity model
 */
import Activity from '../models/Activity.js';

class ActivityDataAccess {
  /**
   * Create new activity
   */
  async create(activityData) {
    return await Activity.create(activityData);
  }

  /**
   * Find activity by ID
   */
  async findById(id) {
    return await Activity.findById(id);
  }

  /**
   * Find activities by child ID
   */
  async findByChildId(childId, limit = null) {
    const query = Activity.find({ childId }).sort({ completedAt: -1 });
    return limit ? await query.limit(limit) : await query;
  }

  /**
   * Find activities by child ID and type
   */
  async findByChildIdAndType(childId, activityType, limit = null) {
    const query = Activity.find({ childId, activityType }).sort({ completedAt: -1 });
    return limit ? await query.limit(limit) : await query;
  }

  /**
   * Find recent activities
   */
  async findRecent(childId, limit = 10) {
    return await Activity.find({ childId })
      .sort({ completedAt: -1 })
      .limit(limit);
  }

  /**
   * Count activities by child ID
   */
  async countByChildId(childId) {
    return await Activity.countDocuments({ childId });
  }

  /**
   * Get activities with date range
   */
  async findByDateRange(childId, startDate, endDate) {
    return await Activity.find({
      childId,
      completedAt: {
        $gte: startDate,
        $lte: endDate
      }
    }).sort({ completedAt: -1 });
  }

  /**
   * Delete activity by ID
   */
  async deleteById(id) {
    return await Activity.findByIdAndDelete(id);
  }

  /**
   * Delete all activities for a child
   */
  async deleteByChildId(childId) {
    return await Activity.deleteMany({ childId });
  }

  /**
   * Get aggregate statistics
   */
  async getStatsByChildId(childId) {
    return await Activity.aggregate([
      { $match: { childId } },
      {
        $group: {
          _id: '$activityType',
          count: { $sum: 1 },
          avgScore: { $avg: '$percentage' },
          totalScore: { $sum: '$percentage' }
        }
      }
    ]);
  }
}

export default new ActivityDataAccess();
