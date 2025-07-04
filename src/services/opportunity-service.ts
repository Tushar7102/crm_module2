import { toast } from 'sonner';
import AuthService from './auth-service';

// Types for opportunities
export interface Opportunity {
  id: string;
  name: string;
  leadId?: string;
  clientName: string;
  value: number;
  stage: string;
  probability: number;
  expectedCloseDate: string;
  description?: string;
  assignedTo?: string;
  products?: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface OpportunityFormData {
  name: string;
  leadId?: string;
  clientName: string;
  value: number;
  stage: string;
  probability: number;
  expectedCloseDate: string;
  description?: string;
  products?: string[];
  leadEmail?: string;
  leadPhone?: string;
}

export interface OpportunityFilters {
  stage?: string;
  assignedTo?: string;
  minValue?: number;
  maxValue?: number;
  dateRange?: {
    from: string;
    to: string;
  };
  searchTerm?: string;
}

export interface OpportunityFilterParams {
  page?: number;
  limit?: number;
  search?: string;
  stage?: string;
  assignedTo?: string;
  sortBy?: string;
  sortOrder?: string;
}

export interface OpportunitiesResponse {
  opportunities?: Opportunity[];
  totalOpportunities?: number;
  totalPages?: number;
  currentPage?: number;
}

export interface OpportunityStats {
  total: number;
  totalValue: number;
  byStage: Record<string, { count: number; value: number }>;
  winRate: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Service for handling opportunity-related API calls
 */
export const OpportunityService = {
  /**
   * Get all opportunities with optional filtering
   */
  getOpportunities: async (params?: OpportunityFilterParams): Promise<{ opportunities: Opportunity[], total: number }> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      // Build query string from params
      const queryParams = new URLSearchParams();
      if (params) {
        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());
        if (params.search) queryParams.append('search', params.search);
        if (params.stage) queryParams.append('stage', params.stage);
        if (params.assignedTo) queryParams.append('assignedTo', params.assignedTo);
        if (params.sortBy) queryParams.append('sortBy', params.sortBy);
        if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
      }

      const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
      const response = await fetch(`${API_URL}/opportunities${queryString}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch opportunities');
      }

      const data = await response.json();
      console.log(data);
      return {
        opportunities: data.opportunities,
        total: data.total,
      };
    } catch (error) {
      console.error('Error fetching opportunities:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to fetch opportunities');
      return {
        opportunities: [],
        total: 0
      };
    }
  },

  /**
   * Get a single opportunity by ID
   */
  getOpportunity: async (id: string): Promise<Opportunity> => {
    try {
      console.log('getOpportunity called with ID:', id);
      
      if (!id) {
        console.error('Invalid opportunity ID:', id);
        throw new Error('Invalid opportunity ID');
      }
      
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const url = `${API_URL}/opportunities/${id}`;
      console.log('Fetching from URL:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response data:', errorData);
        throw new Error(errorData.message || 'Failed to fetch opportunity');
      }

      const data = await response.json();
      console.log('Opportunity data:', data);
      return data;
    } catch (error) {
      console.error(`Error fetching opportunity ${id}:`, error);
      toast.error(error instanceof Error ? error.message : 'Failed to fetch opportunity');
      throw error;
    }
  },

  /**
   * Create a new opportunity
   */
  createOpportunity: async (opportunityData: OpportunityFormData): Promise<Opportunity> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/opportunities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(opportunityData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create opportunity');
      }

      const data = await response.json();
      toast.success('Opportunity created successfully');
      return data;
    } catch (error) {
      console.error('Error creating opportunity:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create opportunity');
      throw error;
    }
  },

  /**
   * Update an existing opportunity
   */
  updateOpportunity: async (id: string, opportunityData: Partial<Opportunity>): Promise<Opportunity> => {
    try {
      console.log('updateOpportunity called with ID:', id);
      
      if (!id) {
        console.error('Invalid opportunity ID:', id);
        throw new Error('Invalid opportunity ID');
      }
      
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const url = `${API_URL}/opportunities/${id}`;
      console.log('Updating opportunity at URL:', url);
      console.log('Update data:', opportunityData);
      
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(opportunityData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update opportunity');
      }

      const data = await response.json();
      toast.success('Opportunity updated successfully');
      return data;
    } catch (error) {
      console.error(`Error updating opportunity ${id}:`, error);
      toast.error(error instanceof Error ? error.message : 'Failed to update opportunity');
      throw error;
    }
  },

  /**
   * Delete an opportunity
   */
  deleteOpportunity: async (id: string): Promise<void> => {
    try {
      console.log('deleteOpportunity called with ID:', id);
      
      if (!id) {
        console.error('Invalid opportunity ID:', id);
        throw new Error('Invalid opportunity ID');
      }
      
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const url = `${API_URL}/opportunities/${id}`;
      console.log('Deleting opportunity at URL:', url);
      
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete opportunity');
      }

      toast.success('Opportunity deleted successfully');
    } catch (error) {
      console.error(`Error deleting opportunity ${id}:`, error);
      toast.error(error instanceof Error ? error.message : 'Failed to delete opportunity');
      throw error;
    }
  },

  /**
   * Change the stage of an opportunity
   */
  changeOpportunityStage: async (id: string, stage: string): Promise<Opportunity> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/opportunities/${id}/stage`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ stage }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update opportunity stage');
      }

      const data = await response.json();
      toast.success(`Opportunity stage updated to ${stage}`);
      return data;
    } catch (error) {
      console.error(`Error updating opportunity stage ${id}:`, error);
      toast.error(error instanceof Error ? error.message : 'Failed to update opportunity stage');
      throw error;
    }
  },

  /**
   * Assign an opportunity to a user
   */
  assignOpportunity: async (id: string, userId: string): Promise<Opportunity> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/opportunities/${id}/assign`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ assignedTo: userId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to assign opportunity');
      }

      const data = await response.json();
      toast.success('Opportunity assigned successfully');
      return data;
    } catch (error) {
      console.error(`Error assigning opportunity ${id}:`, error);
      toast.error(error instanceof Error ? error.message : 'Failed to assign opportunity');
      throw error;
    }
  },

  /**
   * Convert a lead to an opportunity
   */
  convertLeadToOpportunity: async (leadId: string, opportunityData: OpportunityFormData): Promise<Opportunity> => {
    try {
      console.log('OpportunityService.convertLeadToOpportunity called with ID:', leadId);
      
      // Clean the ID parameter to ensure it doesn't have any extra characters
      const cleanLeadId = leadId.trim();
      console.log('Using cleaned lead ID:', cleanLeadId);
      
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      // Prepare the data for the API call
      // Map the client-side form data to the server-side expected format
      const serverData = {
        leadId: cleanLeadId,
        name: opportunityData.name,
        value: parseFloat(opportunityData.value.toString()),
        stage: opportunityData.stage,
        probability: parseFloat(opportunityData.probability.toString()),
        expectedCloseDate: opportunityData.expectedCloseDate || new Date().toISOString().split('T')[0],
        description: opportunityData.description,
        customer: {
          name: opportunityData.clientName,
          email: opportunityData.leadEmail || '',
          phone: opportunityData.leadPhone || ''
        }
      };

      console.log('Sending data to server:', serverData);

      // Make the API call to create an opportunity from the lead
      const response = await fetch(`${API_URL}/opportunities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(serverData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response from server:', errorData);
        throw new Error(errorData.message || 'Failed to convert lead to opportunity');
      }

      const data = await response.json();
      console.log('Lead converted successfully:', data);
      toast.success('Lead converted to opportunity successfully');
      return data;
    } catch (error) {
      console.error(`Error converting lead ${leadId} to opportunity:`, error);
      toast.error(error instanceof Error ? error.message : 'Failed to convert lead to opportunity');
      throw error;
    }
  },

  /**
   * Get opportunity statistics
   */
  getOpportunityStats: async (): Promise<OpportunityStats> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/opportunities/stats`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch opportunity statistics');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching opportunity statistics:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to fetch opportunity statistics');
      throw error;
    }
  },
};

export default OpportunityService;