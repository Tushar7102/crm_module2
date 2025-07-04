import { toast } from 'sonner';
import AuthService from './auth-service';

// Types for document management
export interface Document {
  id: string;
  name: string;
  type: string;
  category: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  uploadedBy: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  version: number;
  metadata?: Record<string, any>;
  tags?: string[];
  expiresAt?: string;
}

export interface Approval {
  id: string;
  documentId: string;
  requestedBy: string;
  requestedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  status: 'pending' | 'approved' | 'rejected';
  comments?: string;
  level: number;
  workflow?: string;
}

export interface DocumentFormData {
  name: string;
  type: string;
  category: string;
  file: File;
  metadata?: Record<string, any>;
  tags?: string[];
  expiresAt?: string;
}

export interface DocumentFilters {
  type?: string;
  category?: string;
  status?: string;
  uploadedBy?: string;
  dateRange?: {
    from: string;
    to: string;
  };
  searchTerm?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Service for handling document-related API calls
 */
export const DocumentService = {
  /**
   * Get all documents with optional filtering
   */
  getDocuments: async (filters?: DocumentFilters): Promise<Document[]> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      let url = `${API_URL}/documents`;
      if (filters) {
        const params = new URLSearchParams();
        if (filters.type) params.append('type', filters.type);
        if (filters.category) params.append('category', filters.category);
        if (filters.status) params.append('status', filters.status);
        if (filters.uploadedBy) params.append('uploadedBy', filters.uploadedBy);
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
        throw new Error(error.message || 'Failed to fetch documents');
      }

      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to fetch documents');
      return [];
    }
  },

  /**
   * Get a specific document by ID
   */
  getDocument: async (id: string): Promise<Document | null> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/documents/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch document');
      }

      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to fetch document');
      return null;
    }
  },

  /**
   * Upload a new document
   */
  uploadDocument: async (data: DocumentFormData): Promise<Document | null> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('type', data.type);
      formData.append('category', data.category);
      formData.append('file', data.file);
      
      if (data.metadata) {
        formData.append('metadata', JSON.stringify(data.metadata));
      }
      
      if (data.tags) {
        formData.append('tags', JSON.stringify(data.tags));
      }
      
      if (data.expiresAt) {
        formData.append('expiresAt', data.expiresAt);
      }

      const response = await fetch(`${API_URL}/documents`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to upload document');
      }

      toast.success('Document uploaded successfully');
      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to upload document');
      return null;
    }
  },

  /**
   * Update document metadata
   */
  updateDocument: async (id: string, data: Partial<Document>): Promise<Document | null> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/documents/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update document');
      }

      toast.success('Document updated successfully');
      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update document');
      return null;
    }
  },

  /**
   * Delete a document
   */
  deleteDocument: async (id: string): Promise<boolean> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/documents/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete document');
      }

      toast.success('Document deleted successfully');
      return true;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete document');
      return false;
    }
  },

  /**
   * Get approvals for a document
   */
  getApprovals: async (documentId: string): Promise<Approval[]> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/documents/${documentId}/approvals`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch approvals');
      }

      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to fetch approvals');
      return [];
    }
  },

  /**
   * Request approval for a document
   */
  requestApproval: async (documentId: string, workflow?: string): Promise<Approval | null> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/approvals`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ documentId, workflow }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to request approval');
      }

      toast.success('Approval requested successfully');
      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to request approval');
      return null;
    }
  },

  /**
   * Approve or reject a document
   */
  respondToApproval: async (approvalId: string, status: 'approved' | 'rejected', comments?: string): Promise<Approval | null> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/approvals/${approvalId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, comments }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to respond to approval');
      }

      toast.success(`Document ${status} successfully`);
      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to respond to approval');
      return null;
    }
  },

  /**
   * Generate e-signature link for a document
   */
  generateESignLink: async (documentId: string, expiresIn?: number): Promise<string | null> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/documents/${documentId}/esign`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expiresIn }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to generate e-signature link');
      }

      const data = await response.json();
      toast.success('E-signature link generated successfully');
      return data.signUrl;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to generate e-signature link');
      return null;
    }
  },
};

export default DocumentService;