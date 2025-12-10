import childAPI from '../api/child.api';

/**
 * Child Service
 * Business logic for child management operations
 */
class ChildService {
  /**
   * Add a new child
   */
  async addChild(childData) {
    // Validate required fields
    if (!childData.name || !childData.age || !childData.gender) {
      throw new Error('Name, age, and gender are required');
    }

    return await childAPI.addChild(childData);
  }

  /**
   * Get all children for current user
   */
  async getChildren() {
    return await childAPI.getChildren();
  }

  /**
   * Get all children (for experts and admins)
   */
  async getAllChildren() {
    return await childAPI.getAllChildren();
  }

  /**
   * Get a specific child
   */
  async getChild(childId) {
    return await childAPI.getChild(childId);
  }

  /**
   * Update child information
   */
  async updateChild(childId, childData) {
    return await childAPI.updateChild(childId, childData);
  }

  /**
   * Delete a child
   */
  async deleteChild(childId) {
    return await childAPI.deleteChild(childId);
  }

  /**
   * Get child statistics
   */
  async getChildStats(childId) {
    return await childAPI.getChildStats(childId);
  }

  /**
   * Get child activities
   */
  async getChildActivities(childId, options = {}) {
    const params = {
      limit: options.limit || 50,
      type: options.type || undefined,
    };
    return await childAPI.getChildActivities(childId, params);
  }

  /**
   * Record an activity for a child
   */
  async recordActivity(childId, activityData) {
    // Validate activity data
    if (!activityData.activityName || !activityData.activityType) {
      throw new Error('Activity name and type are required');
    }

    return await childAPI.recordActivity(childId, activityData);
  }

  /**
   * Get child report
   */
  async getChildReport(childId) {
    return await childAPI.getChildReport(childId);
  }

  /**
   * Download child report as PDF
   */
  async downloadChildReportPDF(childId, childName) {
    const blob = await childAPI.downloadChildReportPDF(childId);
    
    // Create download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${childName}-report-${Date.now()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  /**
   * Calculate age from date of birth
   */
  calculateAge(dateOfBirth) {
    if (!dateOfBirth) return null;
    
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  /**
   * Format child data for display
   */
  formatChildForDisplay(child) {
    return {
      ...child,
      ageDisplay: child.dateOfBirth 
        ? `${this.calculateAge(child.dateOfBirth)} years` 
        : `${child.age} years`,
      genderDisplay: child.gender.charAt(0).toUpperCase() + child.gender.slice(1),
    };
  }
}

export default new ChildService();
