import http from './http';

/**
 * Child Management API endpoints
 */
const childAPI = {
  /**
   * Add a new child
   */
  addChild: async (childData) => {
    try {
      const response = await http.post('/caregiver/children', childData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to add child' };
    }
  },

  /**
   * Get all children for the logged-in caregiver
   */
  getChildren: async () => {
    try {
      const response = await http.get('/caregiver/children');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch children' };
    }
  },

  /**
   * Get all children (for experts and admins)
   */
  getAllChildren: async () => {
    try {
      const response = await http.get('/caregiver/all-children');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch all children' };
    }
  },

  /**
   * Get a specific child
   */
  getChild: async (childId) => {
    try {
      const response = await http.get(`/caregiver/children/${childId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch child' };
    }
  },

  /**
   * Update child information
   */
  updateChild: async (childId, childData) => {
    try {
      const response = await http.put(`/caregiver/children/${childId}`, childData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update child' };
    }
  },

  /**
   * Delete a child
   */
  deleteChild: async (childId) => {
    try {
      const response = await http.delete(`/caregiver/children/${childId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete child' };
    }
  },

  /**
   * Get child statistics
   */
  getChildStats: async (childId) => {
    try {
      const response = await http.get(`/caregiver/children/${childId}/stats`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch child stats' };
    }
  },

  /**
   * Get activities for a child
   */
  getChildActivities: async (childId, params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await http.get(`/caregiver/children/${childId}/activities${queryString ? `?${queryString}` : ''}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch activities' };
    }
  },

  /**
   * Record an activity for a child
   */
  recordActivity: async (childId, activityData) => {
    try {
      const response = await http.post(`/caregiver/children/${childId}/activities`, activityData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to record activity' };
    }
  },

  /**
   * Get child report with statistics
   */
  getChildReport: async (childId) => {
    try {
      const response = await http.get(`/caregiver/children/${childId}/report`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch report' };
    }
  },

  /**
   * Download child report as PDF
   */
  downloadChildReportPDF: async (childId) => {
    try {
      const response = await http.get(`/caregiver/children/${childId}/report`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to download report' };
    }
  },
};

export default childAPI;
