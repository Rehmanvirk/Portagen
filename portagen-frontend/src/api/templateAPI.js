import api from './axiosConfig';

export const templateAPI = {
  getTemplates: () => api.get('/templates'), // Add /api prefix
  getTemplateById: (id) => api.get(`/templates/${id}`), // Add /api prefix
};