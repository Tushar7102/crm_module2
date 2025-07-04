import { toast } from 'sonner';
import AuthService from './auth-service';

// Types for leads
export interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  contactName?: string;
  source: string;
  status: string;
  requirements?: string;
  assignedTo?: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  source: string;
  company?: string;
  contactName?: string;
  status?: string;
  requirements?: string;
  assignedTo?: string;
  notes?: string;
}

export interface LeadFilters {
  status?: string;
  source?: string;
  assignedTo?: string;
  dateRange?: {
    from: string;
    to: string;
  };
  searchTerm?: string;
  page?: number;
  limit?: number;
}

export interface LeadsResponse {
  data: Lead[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Service for handling lead-related API calls
 */
export const LeadService = {
  /**
   * Get all leads with optional filtering
   */
  getLeads: async (filters?: LeadFilters): Promise<LeadsResponse> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');
  
      // Build query string from filters
      let queryString = '';
      if (filters) {
        const params = new URLSearchParams();
        if (filters.status) params.append('status', filters.status);
        if (filters.source) params.append('source', filters.source);
        if (filters.assignedTo) params.append('assignedTo', filters.assignedTo);
        if (filters.searchTerm) params.append('search', filters.searchTerm);
        if (filters.page) params.append('page', filters.page.toString());
        if (filters.limit) params.append('limit', filters.limit.toString());
        if (filters.dateRange) {
          params.append('fromDate', filters.dateRange.from);
          params.append('toDate', filters.dateRange.to);
        }
        queryString = `?${params.toString()}`;
      }
  
      // Always use the real backend API
      const apiUrl = `${API_URL}/leads${queryString}`;
  
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch leads');
      }
  
      const data = await response.json();
      
      // Format the response to match the LeadsResponse interface
      return {
        data: data || [],
        pagination: data.pagination || {
          total: data?.length || 0,
          page: filters?.page || 1,
          limit: filters?.limit || 10,
          pages: Math.ceil((data?.length || 0) / (filters?.limit || 10))
        }
      };
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to fetch leads');
      throw error;
    }
  },

  /**
   * Get a single lead by ID
   */
  getLead: async (id: string): Promise<Lead> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/leads/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch lead');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching lead:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to fetch lead');
      throw error;
    }
  },

  /**
   * Create a new lead
   */
  createLead: async (leadData: LeadFormData): Promise<Lead> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      // Prepare the data according to backend schema
      const backendLeadData = {
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone,
        company: leadData.company || '',
        contactName: leadData.contactName || '',
        source: leadData.source,
        status: leadData.status || 'new',
        requirements: leadData.requirements || '',
        assignedTo: leadData.assignedTo || '',
        notes: leadData.notes || ''
      };

      const response = await fetch(`${API_URL}/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(backendLeadData),
      });

      if (!response.ok) {
        try {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to create lead');
        } catch (jsonError) {
          // If the response is not valid JSON
          throw new Error(`Failed to create lead: ${response.statusText}`);
        }
      }

      const data = await response.json();
      toast.success('Lead created successfully');
      return data;
    } catch (error) {
      console.error('Error creating lead:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create lead');
      throw error;
    }
  },

  /**
   * Update an existing lead
   */
  updateLead: async (id: string, leadData: Partial<LeadFormData>): Promise<Lead> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      // Prepare the data according to backend schema
      const backendLeadData: any = {};
      
      if (leadData.name) backendLeadData.name = leadData.name;
      if (leadData.email) backendLeadData.email = leadData.email;
      if (leadData.phone) backendLeadData.phone = leadData.phone;
      if (leadData.source) backendLeadData.source = leadData.source;
      if (leadData.status) backendLeadData.status = leadData.status;
      if (leadData.company) backendLeadData.company = leadData.company;
      if (leadData.contactName) backendLeadData.contactName = leadData.contactName;
      if (leadData.requirements) backendLeadData.requirements = leadData.requirements;
      if (leadData.assignedTo) backendLeadData.assignedTo = leadData.assignedTo;
      if (leadData.notes) backendLeadData.notes = leadData.notes;

      const response = await fetch(`${API_URL}/leads/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(backendLeadData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update lead');
      }

      const data = await response.json();
      toast.success('Lead updated successfully');
      return data;
    } catch (error) {
      console.error('Error updating lead:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update lead');
      throw error;
    }
  },

  /**
   * Delete a lead
   */
  deleteLead: async (id: string): Promise<void> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      console.log(`Attempting to delete lead with ID: ${id}`);
      console.log(`Using API URL: ${API_URL}/leads/${id}`);
      
      const response = await fetch(`${API_URL}/leads/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      console.log(`Delete response status: ${response.status} ${response.statusText}`);
      console.log(`Response headers:`, response.headers);

      if (!response.ok) {
        // Check if the response is JSON before trying to parse it
        const contentType = response.headers.get('content-type');
        console.log(`Response content type: ${contentType}`);
        
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          console.error('Error data from server:', errorData);
          throw new Error(errorData.message || 'Failed to delete lead');
        } else {
          // Handle non-JSON response
          const text = await response.text();
          console.error('Non-JSON error response:', text);
          throw new Error(`Failed to delete lead: ${response.status} ${response.statusText}`);
        }
      }

      toast.success('Lead deleted successfully');
    } catch (error) {
      console.error('Full error object:', error);
      console.error('Error deleting lead:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to delete lead');
      throw error;
    }
  },

  /**
   * Change the status of a lead
   */
  changeLeadStatus: async (id: string, status: string): Promise<Lead> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/leads/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update lead status');
      }

      const data = await response.json();
      toast.success(`Lead status updated to ${status}`);
      return data.lead;
    } catch (error) {
      console.error(`Error updating lead status ${id}:`, error);
      toast.error(error instanceof Error ? error.message : 'Failed to update lead status');
      throw error;
    }
  },

  /**
   * Assign a lead to a user
   */
  assignLead: async (id: string, userId: string): Promise<Lead> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/leads/${id}/assign`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ assignedTo: userId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to assign lead');
      }

      const data = await response.json();
      toast.success('Lead assigned successfully');
      return data.lead;
    } catch (error) {
      console.error(`Error assigning lead ${id}:`, error);
      toast.error(error instanceof Error ? error.message : 'Failed to assign lead');
      throw error;
    }
  },

  /**
   * Get lead statistics
   */
  getLeadStats: async (): Promise<{ 
    total: number; 
    byStatus: Record<string, number>;
    bySource: Record<string, number>;
  }> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/leads/stats`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch lead statistics');
      }

      const data = await response.json();
      return data.stats;
    } catch (error) {
      console.error('Error fetching lead statistics:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to fetch lead statistics');
      throw error;
    }
  },
};

export default LeadService;