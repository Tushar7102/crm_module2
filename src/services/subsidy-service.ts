import { toast } from 'sonner';
import AuthService from './auth-service';

// Types for subsidy module
export interface SubsidyClaim {
  id: string;
  jobId: string;
  jobReference: string;
  customerName: string;
  expectedAmount: number;
  status: 'draft' | 'pending' | 'submitted' | 'approved' | 'rejected' | 'received';
  submittedAt?: string;
  receivedAt?: string;
  agencyResponse?: string;
  documents: string[];
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
}

export interface RejectionLog {
  id: string;
  claimId: string;
  reason: string;
  details?: string;
  timestamp: string;
  actionRequired?: string;
  resolvedAt?: string;
}

export interface SubsidyClaimFormData {
  jobId: string;
  expectedAmount: number;
  documents: File[];
  notes?: string;
}

export interface SubsidyClaimFilters {
  status?: string;
  dateRange?: {
    from: string;
    to: string;
  };
  minAmount?: number;
  maxAmount?: number;
  searchTerm?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Service for handling subsidy-related API calls
 */
export const SubsidyService = {
  /**
   * Get all subsidy claims with optional filtering
   */
  getSubsidyClaims: async (filters?: SubsidyClaimFilters): Promise<SubsidyClaim[]> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      let url = `${API_URL}/subsidy-claims`;
      if (filters) {
        const params = new URLSearchParams();
        if (filters.status) params.append('status', filters.status);
        if (filters.minAmount) params.append('minAmount', filters.minAmount.toString());
        if (filters.maxAmount) params.append('maxAmount', filters.maxAmount.toString());
        if (filters.searchTerm) params.append('search', filters.searchTerm);
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
        throw new Error(error.message || 'Failed to fetch subsidy claims');
      }

      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to fetch subsidy claims');
      return [];
    }
  },

  /**
   * Get a specific subsidy claim by ID
   */
  getSubsidyClaim: async (id: string): Promise<SubsidyClaim | null> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/subsidy-claims/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch subsidy claim');
      }

      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to fetch subsidy claim');
      return null;
    }
  },

  /**
   * Create a new subsidy claim
   */
  createSubsidyClaim: async (data: SubsidyClaimFormData): Promise<SubsidyClaim | null> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const formData = new FormData();
      formData.append('jobId', data.jobId);
      formData.append('expectedAmount', data.expectedAmount.toString());
      
      if (data.notes) {
        formData.append('notes', data.notes);
      }
      
      if (data.documents && data.documents.length > 0) {
        for (let i = 0; i < data.documents.length; i++) {
          formData.append('documents', data.documents[i]);
        }
      }

      const response = await fetch(`${API_URL}/subsidy-claims`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create subsidy claim');
      }

      toast.success('Subsidy claim created successfully');
      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create subsidy claim');
      return null;
    }
  },

  /**
   * Update an existing subsidy claim
   */
  updateSubsidyClaim: async (id: string, data: Partial<SubsidyClaim>): Promise<SubsidyClaim | null> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/subsidy-claims/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update subsidy claim');
      }

      toast.success('Subsidy claim updated successfully');
      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update subsidy claim');
      return null;
    }
  },

  /**
   * Submit a subsidy claim to the agency
   */
  submitSubsidyClaim: async (id: string): Promise<SubsidyClaim | null> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/subsidy-claims/${id}/submit`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to submit subsidy claim');
      }

      toast.success('Subsidy claim submitted successfully');
      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to submit subsidy claim');
      return null;
    }
  },

  /**
   * Get rejection logs for a claim
   */
  getRejectionLogs: async (claimId: string): Promise<RejectionLog[]> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/subsidy-claims/${claimId}/rejections`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch rejection logs');
      }

      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to fetch rejection logs');
      return [];
    }
  },

  /**
   * Add a document to a subsidy claim
   */
  addDocument: async (claimId: string, file: File, description?: string): Promise<SubsidyClaim | null> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const formData = new FormData();
      formData.append('document', file);
      if (description) {
        formData.append('description', description);
      }

      const response = await fetch(`${API_URL}/subsidy-claims/${claimId}/documents`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add document');
      }

      toast.success('Document added successfully');
      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to add document');
      return null;
    }
  },

  /**
   * Update claim status based on agency response
   */
  updateClaimStatus: async (id: string, status: 'approved' | 'rejected' | 'received', details?: string): Promise<SubsidyClaim | null> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/subsidy-claims/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, details }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update claim status');
      }

      toast.success(`Claim status updated to ${status}`);
      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update claim status');
      return null;
    }
  },
};

export default SubsidyService;