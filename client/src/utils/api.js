import axios from 'axios';

// Build the API base URL:
// - In production: REACT_APP_API_URL should be the Render backend URL (e.g. https://your-app.onrender.com)
// - Locally: falls back to /api which is proxied to localhost:5000
const API_BASE = process.env.REACT_APP_API_URL;
const baseURL = API_BASE
  ? `${API_BASE.replace(/\/+$/, '').replace(/\/api$/, '')}/api`
  : '/api';

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('tripod_token');
      localStorage.removeItem('tripod_user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;
