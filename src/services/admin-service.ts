import { toast } from 'sonner';
import AuthService from './auth-service';

// Types for admin module
export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  phone?: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Rule {
  id: string;
  name: string;
  description?: string;
  trigger: string;
  conditions: RuleCondition[];
  actions: RuleAction[];
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
}

export interface RuleCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'greater_than' | 'less_than';
  value: string | number | boolean;
}

export interface RuleAction {
  type: 'notification' | 'email' | 'sms' | 'status_update' | 'assignment' | 'webhook';
  config: Record<string, any>;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  department: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  assignee?: string;
  submittedBy: string;
  createdAt: string;
  updatedAt?: string;
  resolvedAt?: string;
}

export interface UserFormData {
  name: string;
  email: string;
  password?: string;
  department: string;
  role: string;
  phone?: string;
  avatar?: File;
}

export interface RuleFormData {
  name: string;
  description?: string;
  trigger: string;
  conditions: RuleCondition[];
  actions: RuleAction[];
  isActive: boolean;
}

export interface TicketFormData {
  title: string;
  description: string;
  department: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  attachments?: File[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Service for handling admin-related API calls
 */
export const AdminService = {
  /**
   * Get all users with optional filtering
   */
  getUsers: async (filters?: { role?: string; active?: boolean }): Promise<User[]> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');
  
      // Build query string from filters
      let queryString = '';
      if (filters) {
        const params = new URLSearchParams();
        if (filters.role) params.append('role', filters.role);
        if (filters.active !== undefined) params.append('active', filters.active.toString());
        queryString = `?${params.toString()}`;
      }
  
      // For development/testing, use the mock API
      const apiUrl = process.env.NODE_ENV === 'development' 
        ? `/api/users${queryString}` 
        : `${API_URL}/admin/users${queryString}`;
  
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: process.env.NODE_ENV === 'development' 
          ? {} 
          : {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch users');
      }
  
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to fetch users');
      return [];
    }
  },

  /**
   * Get a specific user by ID
   */
  getUser: async (id: string): Promise<User | null> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      // For development/testing, use the mock API
      const apiUrl = process.env.NODE_ENV === 'development' 
        ? `/api/users/${id}` 
        : `${API_URL}/admin/users/${id}`;

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: process.env.NODE_ENV === 'development' 
          ? {} 
          : {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch user');
      }

      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to fetch user');
      return null;
    }
  },

  /**
   * Create a new user
   */
  createUser: async (data: UserFormData): Promise<User | null> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        if (key === 'avatar' && value instanceof File) {
          formData.append('avatar', value);
        } else if (value !== undefined) {
          formData.append(key, typeof value === 'string' ? value : JSON.stringify(value));
        }
      }

      // For development/testing, use the mock API
      const apiUrl = process.env.NODE_ENV === 'development' 
        ? `/api/users` 
        : `${API_URL}/admin/users`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: process.env.NODE_ENV === 'development' 
          ? {} 
          : {
              'Authorization': `Bearer ${token}`,
            },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create user');
      }

      toast.success('User created successfully');
      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create user');
      return null;
    }
  },

  /**
   * Update an existing user
   */
  updateUser: async (id: string, data: Partial<UserFormData>): Promise<User | null> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        if (key === 'avatar' && value instanceof File) {
          formData.append('avatar', value);
        } else if (value !== undefined) {
          formData.append(key, typeof value === 'string' ? value : JSON.stringify(value));
        }
      }

      const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update user');
      }

      toast.success('User updated successfully');
      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update user');
      return null;
    }
  },

  /**
   * Get all rules
   */
  /**
   * Delete a user by ID
   */
  deleteUser: async (id: string): Promise<boolean> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      // For development/testing, use the mock API
      const apiUrl = process.env.NODE_ENV === 'development' 
        ? `/api/users/${id}` 
        : `${API_URL}/admin/users/${id}`;

      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: process.env.NODE_ENV === 'development' 
          ? {} 
          : {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete user');
      }

      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to delete user');
      return false;
    }
  },

  /**
   * Update a user
   */
  updateUser: async (id: string, data: Partial<UserFormData>): Promise<User | null> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        if (key === 'avatar' && value instanceof File) {
          formData.append('avatar', value);
        } else if (value !== undefined) {
          formData.append(key, typeof value === 'string' ? value : JSON.stringify(value));
        }
      }

      // For development/testing, use the mock API
      const apiUrl = process.env.NODE_ENV === 'development' 
        ? `/api/users/${id}` 
        : `${API_URL}/admin/users/${id}`;

      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: process.env.NODE_ENV === 'development' 
          ? {} 
          : {
              'Authorization': `Bearer ${token}`,
            },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update user');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update user');
      return null;
    }
  },

  getRules: async (): Promise<Rule[]> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/rules`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch rules');
      }

      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to fetch rules');
      return [];
    }
  },

  /**
   * Create or update a rule
   */
  saveRule: async (data: RuleFormData, id?: string): Promise<Rule | null> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const url = id ? `${API_URL}/rules/${id}` : `${API_URL}/rules`;
      const method = id ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save rule');
      }

      toast.success(`Rule ${id ? 'updated' : 'created'} successfully`);
      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save rule');
      return null;
    }
  },

  /**
   * Toggle rule active status
   */
  toggleRuleStatus: async (id: string, isActive: boolean): Promise<Rule | null> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/rules/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update rule status');
      }

      toast.success(`Rule ${isActive ? 'activated' : 'deactivated'} successfully`);
      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update rule status');
      return null;
    }
  },

  /**
   * Get user notifications
   */
  getNotifications: async (): Promise<Notification[]> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/notifications`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch notifications');
      }

      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to fetch notifications');
      return [];
    }
  },

  /**
   * Mark notification as read
   */
  markNotificationAsRead: async (id: string): Promise<boolean> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/notifications/${id}/read`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to mark notification as read');
      }

      return true;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to mark notification as read');
      return false;
    }
  },

  /**
   * Create a support ticket
   */
  createTicket: async (data: TicketFormData): Promise<Ticket | null> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        if (key === 'attachments' && Array.isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            formData.append('attachments', value[i]);
          }
        } else if (value !== undefined) {
          formData.append(key, typeof value === 'string' ? value : JSON.stringify(value));
        }
      }

      const response = await fetch(`${API_URL}/tickets`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create ticket');
      }

      toast.success('Ticket created successfully');
      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create ticket');
      return null;
    }
  },

  /**
   * Get all tickets
   */
  getTickets: async (status?: string): Promise<Ticket[]> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      let url = `${API_URL}/tickets`;
      if (status) {
        url += `?status=${status}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch tickets');
      }

      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to fetch tickets');
      return [];
    }
  },

  /**
   * Update ticket status
   */
  updateTicketStatus: async (id: string, status: 'open' | 'in_progress' | 'resolved' | 'closed'): Promise<Ticket | null> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/tickets/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update ticket status');
      }

      toast.success(`Ticket status updated to ${status}`);
      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update ticket status');
      return null;
    }
  },

  /**
   * Assign ticket to user
   */
  assignTicket: async (id: string, assigneeId: string): Promise<Ticket | null> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/tickets/${id}/assign`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ assigneeId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to assign ticket');
      }

      toast.success('Ticket assigned successfully');
      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to assign ticket');
      return null;
    }
  },
};

export default AdminService;