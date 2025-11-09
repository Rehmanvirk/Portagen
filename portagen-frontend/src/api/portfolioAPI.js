import api from './axiosConfig';

export const portfolioAPI = {
  createPortfolio: (portfolioData) => {
    return api.post('/portfolios', portfolioData)
      .catch(error => {
        console.error('Create portfolio error:', error.response?.data || error.message);
        throw error;
      });
  },
  getPortfolios: () => {
    return api.get('/portfolios')
      .catch(error => {
        console.error('Get portfolios error:', error.response?.data || error.message);
        throw error;
      });
  },
  getPortfolioById: (id) => {
    return api.get(`/portfolios/${id}`)
      .catch(error => {
        console.error('Get portfolio error:', error.response?.data || error.message);
        throw error;
      });
  },
  updatePortfolio: (id, portfolioData) => {
    return api.put(`/portfolios/${id}`, portfolioData)
      .catch(error => {
        console.error('Update portfolio error:', error.response?.data || error.message);
        throw error;
      });
  },
  deletePortfolio: (id) => {
    return api.delete(`/portfolios/${id}`)
      .catch(error => {
        console.error('Delete portfolio error:', error.response?.data || error.message);
        throw error;
      });
  },
  downloadAsZip: (id) => {
    return api.get(`/portfolios/${id}/download/zip`, { responseType: 'blob' })
      .catch(error => {
        console.error('Download ZIP error:', error.response?.data || error.message);
        throw error;
      });
  },
  downloadAsPdf: (id) => {
    return api.get(`/portfolios/${id}/debug/pdf`, { responseType: 'blob' })
      .catch(error => {
        console.error('Download PDF error:', error.response?.data || error.message);
        throw error;
      });
  },
};