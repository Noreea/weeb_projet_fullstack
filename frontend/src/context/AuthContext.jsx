import { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      const storedRefreshToken = localStorage.getItem('refresh_token');
      const storedUser = localStorage.getItem('user');

      if (storedRefreshToken && storedUser) {
        try {
          // Try to refresh the access token
          const { access } = await authAPI.refreshToken(storedRefreshToken);
          setAccessToken(access);
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Failed to refresh token on init:', error);
          // Clear invalid tokens
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const data = await authAPI.login(email, password);
      
      // Store tokens and user data
      setAccessToken(data.access);
      setUser(data.user);
      
      // Store refresh token in localStorage (or use httpOnly cookie in production)
      localStorage.setItem('refresh_token', data.refresh);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      return { success: true, user: data.user };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Login failed. Please check your credentials.' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const data = await authAPI.register(userData);
      return { success: true, data };
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.email?.[0] 
        || error.response?.data?.password?.[0]
        || error.response?.data?.detail
        || 'Registration failed. Please try again.';
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        await authAPI.logout(refreshToken, accessToken);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear state and storage regardless of API call success
      setUser(null);
      setAccessToken(null);
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
    }
  };

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const { access } = await authAPI.refreshToken(refreshToken);
      setAccessToken(access);
      return access;
    } catch (error) {
      console.error('Token refresh failed:', error);
      // If refresh fails, logout user
      await logout();
      throw error;
    }
  };

  const isAuthenticated = !!user && !!accessToken;
  const isActive = user?.is_active || false;
  const isAdmin = user?.is_staff || false;
  const isModerator = user?.groups?.includes('Moderators') || false;

  const value = {
    user,
    accessToken,
    loading,
    isAuthenticated,
    isActive,
    isAdmin,
    isModerator,
    login,
    register,
    logout,
    refreshAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
