import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const expenseAPI = {
  // Upload file
  uploadFile: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/api/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  // Get results
  getResults: () => api.get('/api/results'),

  // Get summary
  getSummary: () => api.get('/api/summary'),

  // Get categories
  getCategories: () => api.get('/api/categories'),

  // Health check
  healthCheck: () => api.get('/api/health'),
}

export default api
