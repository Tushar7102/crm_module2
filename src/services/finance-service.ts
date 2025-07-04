import { toast } from 'sonner';
import AuthService from './auth-service';

// Types for finance module
export interface Invoice {
  id: string;
  opportunityId: string;
  customerName: string;
  customerEmail: string;
  issuedAt: string;
  dueDate: string;
  amount: number;
  tax: number;
  discount?: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  paymentTerms?: string;
  notes?: string;
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  method: string; // 'cash', 'check', 'credit_card', 'bank_transfer', etc.
  receivedAt: string;
  transactionId?: string;
  notes?: string;
  recordedBy: string;
  createdAt: string;
}

export interface Commission {
  id: string;
  repId: string;
  repName: string;
  amount: number;
  period: string; // 'YYYY-MM'
  status: 'pending' | 'approved' | 'paid';
  paidAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Expense {
  id: string;
  vendorId?: string;
  vendorName?: string;
  category: string;
  amount: number;
  tax?: number;
  date: string;
  description?: string;
  status: 'pending' | 'approved' | 'paid' | 'rejected';
  approvedBy?: string;
  approvedAt?: string;
  paidAt?: string;
  receiptUrl?: string;
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
}

export interface InvoiceFilters {
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
 * Service for handling finance-related API calls
 */
export const FinanceService = {
  /**
   * Get all invoices with optional filtering
   */
  getInvoices: async (filters?: InvoiceFilters): Promise<Invoice[]> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      let url = `${API_URL}/invoices`;
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
        throw new Error(error.message || 'Failed to fetch invoices');
      }

      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to fetch invoices');
      return [];
    }
  },

  /**
   * Get a specific invoice by ID
   */
  getInvoice: async (id: string): Promise<Invoice | null> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/invoices/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch invoice');
      }

      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to fetch invoice');
      return null;
    }
  },

  /**
   * Create a new invoice
   */
  createInvoice: async (data: Omit<Invoice, 'id' | 'createdAt'>): Promise<Invoice | null> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/invoices`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create invoice');
      }

      toast.success('Invoice created successfully');
      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create invoice');
      return null;
    }
  },

  /**
   * Update an existing invoice
   */
  updateInvoice: async (id: string, data: Partial<Invoice>): Promise<Invoice | null> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/invoices/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update invoice');
      }

      toast.success('Invoice updated successfully');
      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update invoice');
      return null;
    }
  },

  /**
   * Record a payment for an invoice
   */
  recordPayment: async (data: Omit<Payment, 'id' | 'createdAt'>): Promise<Payment | null> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/payments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to record payment');
      }

      toast.success('Payment recorded successfully');
      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to record payment');
      return null;
    }
  },

  /**
   * Get payments for an invoice
   */
  getPayments: async (invoiceId: string): Promise<Payment[]> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/invoices/${invoiceId}/payments`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch payments');
      }

      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to fetch payments');
      return [];
    }
  },

  /**
   * Get commissions for a period
   */
  getCommissions: async (period?: string): Promise<Commission[]> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      let url = `${API_URL}/commissions`;
      if (period) {
        url += `?period=${period}`;
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
        throw new Error(error.message || 'Failed to fetch commissions');
      }

      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to fetch commissions');
      return [];
    }
  },

  /**
   * Create or update an expense
   */
  submitExpense: async (data: Omit<Expense, 'id' | 'createdAt'>): Promise<Expense | null> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        if (key === 'receipt' && value instanceof File) {
          formData.append('receipt', value);
        } else if (value !== undefined) {
          formData.append(key, typeof value === 'string' ? value : JSON.stringify(value));
        }
      }

      const response = await fetch(`${API_URL}/expenses`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to submit expense');
      }

      toast.success('Expense submitted successfully');
      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to submit expense');
      return null;
    }
  },

  /**
   * Get expenses with optional filtering
   */
  getExpenses: async (status?: string): Promise<Expense[]> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      let url = `${API_URL}/expenses`;
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
        throw new Error(error.message || 'Failed to fetch expenses');
      }

      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to fetch expenses');
      return [];
    }
  },

  /**
   * Approve or reject an expense
   */
  reviewExpense: async (id: string, status: 'approved' | 'rejected', notes?: string): Promise<Expense | null> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/expenses/${id}/review`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, notes }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to review expense');
      }

      toast.success(`Expense ${status} successfully`);
      return await response.json();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to review expense');
      return null;
    }
  },
};

export default FinanceService;