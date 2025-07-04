import { toast } from 'sonner';
import AuthService from './auth-service';

// Types for telecaller module
export interface CallRecord {
  id: string;
  leadId: string;
  agentId: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  outcome: string;
  notes?: string;
  recordingUrl?: string;
  followUpDate?: string;
}

export interface Campaign {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate?: string;
  status: string;
  targetAudience?: string;
  script?: string;
  assignedAgents?: string[];
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Template {
  id: string;
  name: string;
  type: 'sms' | 'email' | 'whatsapp';
  content: string;
  variables?: string[];
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CallFilters {
  agentId?: string;
  leadId?: string;
  outcome?: string;
  dateRange?: {
    from: string;
    to: string;
  };
  campaignId?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Service for handling telecaller-related API calls
 */
export const TelecallerService = {
  /**
   * Get all call records with optional filtering
   */
  getCallRecords: async (filters?: CallFilters): Promise<CallRecord[]> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      let url = `${API_URL}/calls`;
      if (filters) {
        const params = new URLSearchParams();
        if (filters.agentId) params.append('agentId', filters.agentId);
        if (filters.leadId) params.append('leadId', filters.leadId);
        if (filters.outcome) params.append('outcome', filters.outcome);
        if (filters.campaignId) params.append('campaignId', filters.campaignId);
        if (filters.dateRange) {
          params.append('from', filters.dateRange.from);
          params.append('to', filters.dateRange.to);
        }
        url += `?${params.toString()}`;
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
        throw new Error(error.message || 'Failed to fetch call records');
      }

      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to fetch call records');
      return [];
    }
  },

  /**
   * Get a specific call record by ID
   */
  getCallRecord: async (id: string): Promise<CallRecord | null> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/calls/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch call record');
      }

      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to fetch call record');
      return null;
    }
  },

  /**
   * Create a new call record
   */
  createCallRecord: async (data: Omit<CallRecord, 'id' | 'createdAt'>): Promise<CallRecord | null> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/calls`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create call record');
      }

      toast.success('Call record created successfully');
      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create call record');
      return null;
    }
  },

  /**
   * Update an existing call record
   */
  updateCallRecord: async (id: string, data: Partial<CallRecord>): Promise<CallRecord | null> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/calls/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update call record');
      }

      toast.success('Call record updated successfully');
      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update call record');
      return null;
    }
  },

  /**
   * Get all campaigns
   */
  getCampaigns: async (): Promise<Campaign[]> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/campaigns`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch campaigns');
      }

      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to fetch campaigns');
      return [];
    }
  },

  /**
   * Get a specific campaign by ID
   */
  getCampaign: async (id: string): Promise<Campaign | null> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/campaigns/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch campaign');
      }

      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to fetch campaign');
      return null;
    }
  },

  /**
   * Create a new campaign
   */
  createCampaign: async (data: Omit<Campaign, 'id' | 'createdAt'>): Promise<Campaign | null> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/campaigns`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create campaign');
      }

      toast.success('Campaign created successfully');
      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create campaign');
      return null;
    }
  },

  /**
   * Get all templates
   */
  getTemplates: async (type?: 'sms' | 'email' | 'whatsapp'): Promise<Template[]> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      let url = `${API_URL}/templates`;
      if (type) {
        url += `?type=${type}`;
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
        throw new Error(error.message || 'Failed to fetch templates');
      }

      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to fetch templates');
      return [];
    }
  },

  /**
   * Create a new template
   */
  createTemplate: async (data: Omit<Template, 'id' | 'createdAt'>): Promise<Template | null> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/templates`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create template');
      }

      toast.success('Template created successfully');
      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create template');
      return null;
    }
  },
};

export default TelecallerService;