import { toast } from 'sonner';
import AuthService from './auth-service';

// Types for service tickets
export interface ServiceTicket {
  id: string;
  title: string;
  description: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  status: string;
  priority: string;
  category: string;
  assignedTo?: string;
  dueDate?: string;
  attachments?: string[];
  notes?: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface ServiceTicketFormData {
  title: string;
  description: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  priority: string;
  category: string;
  dueDate?: string;
  attachments?: File[];
}

export interface ServiceTicketFilters {
  status?: string;
  priority?: string;
  category?: string;
  assignedTo?: string;
  dateRange?: {
    from: string;
    to: string;
  };
  searchTerm?: string;
}

export interface TicketNote {
  id: string;
  content: string;
  createdBy: string;
  createdAt: string;
  attachments?: string[];
}

// Types for installation jobs
export interface Job {
  id: string;
  accountId: string;
  accountName: string;
  type: 'installation' | 'maintenance' | 'repair' | 'inspection';
  description: string;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  scheduledAt: string;
  estimatedDuration: number; // in minutes
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'rescheduled';
  assignedTo?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  notes?: string;
  createdAt: string;
  updatedAt?: string;
  completedAt?: string;
}

export interface ChecklistItem {
  id: string;
  jobId: string;
  step: string;
  description?: string;
  required: boolean;
  order: number;
  status: 'pending' | 'completed' | 'skipped' | 'failed';
  completedAt?: string;
  completedBy?: string;
  photoUrl?: string;
  notes?: string;
}

export interface JobFormData {
  accountId: string;
  type: 'installation' | 'maintenance' | 'repair' | 'inspection';
  description: string;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  scheduledAt: string;
  estimatedDuration: number;
  assignedTo?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  notes?: string;
}

export interface JobFilters {
  type?: string;
  status?: string;
  assignedTo?: string;
  priority?: string;
  dateRange?: {
    from: string;
    to: string;
  };
  searchTerm?: string;
}
  createdAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Service for handling service ticket-related API calls
 */
export const ServiceTicketService = {
  /**
   * Get all service tickets with optional filtering
   */
  getServiceTickets: async (filters?: ServiceTicketFilters): Promise<ServiceTicket[]> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      // Build query string from filters
      let queryString = '';
      if (filters) {
        const params = new URLSearchParams();
        if (filters.status) params.append('status', filters.status);
        if (filters.priority) params.append('priority', filters.priority);
        if (filters.category) params.append('category', filters.category);
        if (filters.assignedTo) params.append('assignedTo', filters.assignedTo);
        if (filters.searchTerm) params.append('search', filters.searchTerm);
        if (filters.dateRange) {
          params.append('fromDate', filters.dateRange.from);
          params.append('toDate', filters.dateRange.to);
        }
        queryString = `?${params.toString()}`;
      }

      const response = await fetch(`${API_URL}/service/tickets${queryString}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch service tickets');
      }

      const data = await response.json();
      return data.tickets;
    } catch (error) {
      console.error('Error fetching service tickets:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to fetch service tickets');
      throw error;
    }
  },

  /**
   * Get a single service ticket by ID
   */
  getServiceTicket: async (id: string): Promise<ServiceTicket> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/service/tickets/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch service ticket');
      }

      const data = await response.json();
      return data.ticket;
    } catch (error) {
      console.error(`Error fetching service ticket ${id}:`, error);
      toast.error(error instanceof Error ? error.message : 'Failed to fetch service ticket');
      throw error;
    }
  },

  /**
   * Create a new service ticket
   */
  createServiceTicket: async (ticketData: ServiceTicketFormData): Promise<ServiceTicket> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      // Handle file uploads if present
      const formData = new FormData();
      
      // Add all non-file fields
      Object.entries(ticketData).forEach(([key, value]) => {
        if (key !== 'attachments' && value !== undefined) {
          formData.append(key, value.toString());
        }
      });
      
      // Add attachments if present
      if (ticketData.attachments && ticketData.attachments.length > 0) {
        ticketData.attachments.forEach((file, index) => {
          formData.append(`attachments`, file);
        });
      }

      const response = await fetch(`${API_URL}/service/tickets`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          // Don't set Content-Type when using FormData, browser will set it with boundary
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create service ticket');
      }

      const data = await response.json();
      toast.success('Service ticket created successfully');
      return data.ticket;
    } catch (error) {
      console.error('Error creating service ticket:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create service ticket');
      throw error;
    }
  },

  /**
   * Update an existing service ticket
   */
  updateServiceTicket: async (id: string, ticketData: Partial<ServiceTicket>): Promise<ServiceTicket> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/service/tickets/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(ticketData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update service ticket');
      }

      const data = await response.json();
      toast.success('Service ticket updated successfully');
      return data.ticket;
    } catch (error) {
      console.error(`Error updating service ticket ${id}:`, error);
      toast.error(error instanceof Error ? error.message : 'Failed to update service ticket');
      throw error;
    }
  },

  /**
   * Delete a service ticket
   */
  deleteServiceTicket: async (id: string): Promise<void> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/service/tickets/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete service ticket');
      }

      toast.success('Service ticket deleted successfully');
    } catch (error) {
      console.error(`Error deleting service ticket ${id}:`, error);
      toast.error(error instanceof Error ? error.message : 'Failed to delete service ticket');
      throw error;
    }
  },

  /**
   * Change the status of a service ticket
   */
  changeTicketStatus: async (id: string, status: string): Promise<ServiceTicket> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/service/tickets/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update ticket status');
      }

      const data = await response.json();
      toast.success(`Ticket status updated to ${status}`);
      return data.ticket;
    } catch (error) {
      console.error(`Error updating ticket status ${id}:`, error);
      toast.error(error instanceof Error ? error.message : 'Failed to update ticket status');
      throw error;
    }
  },

  /**
   * Assign a service ticket to a user
   */
  assignTicket: async (id: string, userId: string): Promise<ServiceTicket> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/service/tickets/${id}/assign`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ assignedTo: userId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to assign ticket');
      }

      const data = await response.json();
      toast.success('Ticket assigned successfully');
      return data.ticket;
    } catch (error) {
      console.error(`Error assigning ticket ${id}:`, error);
      toast.error(error instanceof Error ? error.message : 'Failed to assign ticket');
      throw error;
    }
  },

  /**
   * Add a note to a service ticket
   */
  addTicketNote: async (id: string, content: string): Promise<ServiceTicket> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/service/tickets/${id}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add note to ticket');
      }

      const data = await response.json();
      toast.success('Note added to ticket');
      return data.ticket;
    } catch (error) {
      console.error(`Error adding note to ticket ${id}:`, error);
      toast.error(error instanceof Error ? error.message : 'Failed to add note to ticket');
      throw error;
    }
  },

  /**
   * Get ticket notes
   */
  getTicketNotes: async (id: string): Promise<TicketNote[]> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/service/tickets/${id}/notes`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch ticket notes');
      }

      const data = await response.json();
      return data.notes;
    } catch (error) {
      console.error(`Error fetching notes for ticket ${id}:`, error);
      toast.error(error instanceof Error ? error.message : 'Failed to fetch ticket notes');
      throw error;
    }
  },

  /**
   * Get service ticket statistics
   */
  getTicketStats: async (): Promise<{ 
    total: number; 
    byStatus: Record<string, number>;
    byPriority: Record<string, number>;
    byCategory: Record<string, number>;
    responseTime: number; // Average in hours
    resolutionTime: number; // Average in hours
  }> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/service/tickets/stats`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch ticket statistics');
      }

      const data = await response.json();
      return data.stats;
    } catch (error) {
      console.error('Error fetching ticket statistics:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to fetch ticket statistics');
      throw error;
    }
  },
};

export default ServiceTicketService;