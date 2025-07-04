import { toast } from 'sonner';
import AuthService from './auth-service';

// Types for users
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department?: string;
  position?: string;
  phone?: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  updatedAt?: string;
  lastLogin?: string;
}

export interface UserFormData {
  name: string;
  email: string;
  password?: string;
  role: string;
  department?: string;
  position?: string;
  phone?: string;
  avatar?: File;
}

export interface UserFilters {
  role?: string;
  department?: string;
  status?: string;
  searchTerm?: string;
}

export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Service for handling user-related API calls
 */
export const UserService = {
  /**
   * Get all users with optional filtering
   */
  getUsers: async (filters?: UserFilters): Promise<User[]> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      // Build query string from filters
      let queryString = '';
      if (filters) {
        const params = new URLSearchParams();
        if (filters.role) params.append('role', filters.role);
        if (filters.department) params.append('department', filters.department);
        if (filters.status) params.append('status', filters.status);
        if (filters.searchTerm) params.append('search', filters.searchTerm);
        queryString = `?${params.toString()}`;
      }

      const response = await fetch(`${API_URL}/admin/users${queryString}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch users');
      }

      const data = await response.json();
      return data.users;
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to fetch users');
      throw error;
    }
  },

  /**
   * Get a single user by ID
   */
  getUser: async (id: string): Promise<User> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/admin/users/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch user');
      }

      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      toast.error(error instanceof Error ? error.message : 'Failed to fetch user');
      throw error;
    }
  },

  /**
   * Create a new user
   */
  createUser: async (userData: UserFormData): Promise<User> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      // Handle file upload if present
      const formData = new FormData();
      
      // Add all non-file fields
      Object.entries(userData).forEach(([key, value]) => {
        if (key !== 'avatar' && value !== undefined) {
          formData.append(key, value.toString());
        }
      });
      
      // Add avatar if present
      if (userData.avatar) {
        formData.append('avatar', userData.avatar);
      }

      const response = await fetch(`${API_URL}/admin/users`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          // Don't set Content-Type when using FormData, browser will set it with boundary
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create user');
      }

      const data = await response.json();
      toast.success('User created successfully');
      return data.user;
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create user');
      throw error;
    }
  },

  /**
   * Update an existing user
   */
  updateUser: async (id: string, userData: Partial<UserFormData>): Promise<User> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      // Handle file upload if present
      const formData = new FormData();
      
      // Add all non-file fields
      Object.entries(userData).forEach(([key, value]) => {
        if (key !== 'avatar' && value !== undefined) {
          formData.append(key, value.toString());
        }
      });
      
      // Add avatar if present
      if (userData.avatar) {
        formData.append('avatar', userData.avatar);
      }

      const response = await fetch(`${API_URL}/admin/users/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          // Don't set Content-Type when using FormData, browser will set it with boundary
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update user');
      }

      const data = await response.json();
      toast.success('User updated successfully');
      return data.user;
    } catch (error) {
      console.error(`Error updating user ${id}:`, error);
      toast.error(error instanceof Error ? error.message : 'Failed to update user');
      throw error;
    }
  },

  /**
   * Delete a user
   */
  deleteUser: async (id: string): Promise<void> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/admin/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete user');
      }

      toast.success('User deleted successfully');
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error);
      toast.error(error instanceof Error ? error.message : 'Failed to delete user');
      throw error;
    }
  },

  /**
   * Change user status (activate/deactivate)
   */
  changeUserStatus: async (id: string, status: 'active' | 'inactive'): Promise<User> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/admin/users/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update user status');
      }

      const data = await response.json();
      toast.success(`User ${status === 'active' ? 'activated' : 'deactivated'} successfully`);
      return data.user;
    } catch (error) {
      console.error(`Error updating user status ${id}:`, error);
      toast.error(error instanceof Error ? error.message : 'Failed to update user status');
      throw error;
    }
  },

  /**
   * Update current user's profile
   */
  updateProfile: async (profileData: Partial<UserFormData>): Promise<User> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      // Handle file upload if present
      const formData = new FormData();
      
      // Add all non-file fields
      Object.entries(profileData).forEach(([key, value]) => {
        if (key !== 'avatar' && value !== undefined) {
          formData.append(key, value.toString());
        }
      });
      
      // Add avatar if present
      if (profileData.avatar) {
        formData.append('avatar', profileData.avatar);
      }

      const response = await fetch(`${API_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          // Don't set Content-Type when using FormData, browser will set it with boundary
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      const data = await response.json();
      toast.success('Profile updated successfully');
      return data.user;
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update profile');
      throw error;
    }
  },

  /**
   * Change current user's password
   */
  changePassword: async (passwordData: PasswordChangeData): Promise<void> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to change password');
      }

      toast.success('Password changed successfully');
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to change password');
      throw error;
    }
  },

  /**
   * Get user activity logs
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getUserActivityLogs: async (userId: string): Promise<any[]> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/admin/users/${userId}/activity`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch user activity logs');
      }

      const data = await response.json();
      return data.logs;
    } catch (error) {
      console.error(`Error fetching activity logs for user ${userId}:`, error);
      toast.error(error instanceof Error ? error.message : 'Failed to fetch user activity logs');
      throw error;
    }
  },

  /**
   * Get user statistics
   */
  getUserStats: async (): Promise<{ 
    total: number; 
    byRole: Record<string, number>;
    byDepartment: Record<string, number>;
    byStatus: Record<string, number>;
    activeUsers: number;
    inactiveUsers: number;
  }> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/admin/users/stats`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch user statistics');
      }

      const data = await response.json();
      return data.stats;
    } catch (error) {
      console.error('Error fetching user statistics:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to fetch user statistics');
      throw error;
    }
  },
};

export default UserService;