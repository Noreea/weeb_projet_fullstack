import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  (config) => {
    // Get access token from memory (via AuthContext)
    const accessToken = window.__ACCESS_TOKEN__;
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }
      
      originalRequest._retry = true;
      isRefreshing = true;
      
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (!refreshToken) {
        isRefreshing = false;
        // Trigger logout
        window.dispatchEvent(new Event('auth:logout'));
        return Promise.reject(error);
      }
      
      try {
        const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
          refresh: refreshToken
        });
        
        const { access } = response.data;
        
        // Update access token in memory
        window.__ACCESS_TOKEN__ = access;
        
        // Update authorization header
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${access}`;
        originalRequest.headers.Authorization = `Bearer ${access}`;
        
        // Process queued requests
        processQueue(null, access);
        
        isRefreshing = false;
        
        // Retry original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;
        
        // Refresh failed, logout user
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('auth:logout'));
        
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: async (userData) => {
    const response = await axiosInstance.post('/auth/register/', userData);
    return response.data;
  },
  
  login: async (email, password) => {
    const response = await axiosInstance.post('/auth/login/', { email, password });
    // Store access token in memory
    window.__ACCESS_TOKEN__ = response.data.access;
    return response.data;
  },
  
  logout: async (refreshToken, accessToken) => {
    const response = await axiosInstance.post('/auth/logout/', {
      refresh_token: refreshToken
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    // Clear access token from memory
    delete window.__ACCESS_TOKEN__;
    return response.data;
  },
  
  refreshToken: async (refreshToken) => {
    const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
      refresh: refreshToken
    });
    // Store new access token in memory
    window.__ACCESS_TOKEN__ = response.data.access;
    return response.data;
  },
  
  getMe: async () => {
    const response = await axiosInstance.get('/auth/me/');
    return response.data;
  }
};

// Articles API
export const articlesAPI = {
  getAllArticles: async () => {
    const response = await axiosInstance.get('/articles/');
    return response.data.results;
  },
  
  getArticleById: async (id) => {
    const response = await axiosInstance.get(`/articles/${id}/`);
    return response.data.results;
  },
  
  createArticle: async (articleData) => {
    const response = await axiosInstance.post('/articles/', articleData);
    return response.data;
  },
  
  updateArticle: async (id, articleData) => {
    const response = await axiosInstance.put(`/articles/${id}/`, articleData);
    return response.data;
  },
  
  deleteArticle: async (id) => {
    const response = await axiosInstance.delete(`/articles/${id}/`);
    return response.data;
  }
};

// Categories API
export const categoriesAPI = {
  getAllCategories: async () => {
    const response = await axiosInstance.get('/categories/');
    return response.data.results || response.data;
  }
};

// Reviews API
export const reviewsAPI = {
  createReview: async (reviewData) => {
    const response = await axiosInstance.post('/review/', reviewData);
    return response.data.results;
  },
  
  getAllReviews: async () => {
    const response = await axiosInstance.get('/review/');
    return response.data.results || response.data;
  }
};

// Prediction API
export const predictionAPI = {
  predict: async (message) => {
    const response = await axiosInstance.post('/predict/', { features: message });
    return response.data;
  }
};

export default axiosInstance;
