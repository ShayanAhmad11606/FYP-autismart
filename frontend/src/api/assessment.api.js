import http from './http';

/**
 * Assessment API endpoints
 */
const assessmentAPI = {
  /**
   * Get all active assessments
   */
  getAssessments: async () => {
    try {
      const response = await http.get('/assessments');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch assessments' };
    }
  },

  /**
   * Get active assessment by level
   */
  getAssessmentByLevel: async (level) => {
    try {
      const response = await http.get(`/assessments/${level}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch assessment' };
    }
  },

  /**
   * Admin: Get all assessments (including inactive)
   */
  getAllAssessments: async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await http.get(`/admin/assessments${params ? `?${params}` : ''}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch assessments' };
    }
  },

  /**
   * Admin: Get single assessment by ID
   */
  getAssessmentById: async (assessmentId) => {
    try {
      const response = await http.get(`/admin/assessments/${assessmentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch assessment' };
    }
  },

  /**
   * Admin: Create new assessment
   */
  createAssessment: async (assessmentData) => {
    try {
      const response = await http.post('/admin/assessments', assessmentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create assessment' };
    }
  },

  /**
   * Admin: Update assessment
   */
  updateAssessment: async (assessmentId, assessmentData) => {
    try {
      const response = await http.put(`/admin/assessments/${assessmentId}`, assessmentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update assessment' };
    }
  },

  /**
   * Admin: Toggle assessment status
   */
  toggleAssessmentStatus: async (assessmentId) => {
    try {
      const response = await http.put(`/admin/assessments/${assessmentId}/toggle-status`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to toggle assessment status' };
    }
  },

  /**
   * Admin: Delete assessment
   */
  deleteAssessment: async (assessmentId) => {
    try {
      const response = await http.delete(`/admin/assessments/${assessmentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete assessment' };
    }
  },
};

export default assessmentAPI;
