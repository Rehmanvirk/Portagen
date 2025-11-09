import api from './axiosConfig';

export const userAPI = {
  login: (email, password) => api.post('/api/users/login', { email, password }), // Add /api prefix
  register: (name, email, password) => api.post('/api/users/register', { name, email, password }), // Add /api prefix
  getProfile: () => api.get('/api/users/profile'), // Add /api prefix
  updateProfile: (userData) => api.put('/api/users/profile', userData), // Add /api prefix
};