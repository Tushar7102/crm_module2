import { toast } from 'sonner';
import { API_URL, API_ENDPOINTS, getAuthHeaders } from '@/lib/api-config';

// Types for authentication
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department?: string;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: string;
  department: string;
  phone: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// API URL is now imported from api-config.ts

/**
 * Service for handling authentication related API calls
 */
export const AuthService = {
  /**
   * Login a user with email and password
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || errorData.message || 'Login failed');
      }

      const data = await response.json();
      
      // Store token in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Also set token in cookie for middleware authentication
      document.cookie = `auth-token=${data.token}; path=/; max-age=86400; SameSite=Strict`;
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error instanceof Error ? error.message : 'Login failed');
      throw error;
    }
  },

  /**
   * Register a new user
   */
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    try {
      console.log('Sending registration data:', userData);
      const response = await fetch(API_ENDPOINTS.AUTH.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server response error:', errorData);
        throw new Error(errorData.msg || errorData.message || 'Registration failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error instanceof Error ? error.message : 'Registration failed');
      throw error;
    }
  },

  /**
   * Logout the current user
   */
  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Remove the auth token cookie
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict';
    // Optionally call the backend to invalidate the token
  },

  /**
   * Get the current authenticated user
   */
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr) as User;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  },

  /**
   * Check if a user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },

  /**
   * Get the authentication token
   */
  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  /**
   * Update user profile
   */
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(API_ENDPOINTS.AUTH.PROFILE, {
        method: 'PUT',
        headers: getAuthHeaders(token),
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Profile update failed');
      }

      const data = await response.json();
      
      // Update stored user data
      const currentUser = AuthService.getCurrentUser();
      if (currentUser) {
        const updatedUser = { ...currentUser, ...data.user };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      return data.user;
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error(error instanceof Error ? error.message : 'Profile update failed');
      throw error;
    }
  },

  /**
   * Change user password
   */
  changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Password change failed');
      }

      toast.success('Password changed successfully');
    } catch (error) {
      console.error('Password change error:', error);
      toast.error(error instanceof Error ? error.message : 'Password change failed');
      throw error;
    }
  },
};

export default AuthService;