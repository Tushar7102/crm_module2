import { toast } from 'sonner';
import AuthService from './auth-service';

// Types for inventory items
export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  description?: string;
  category: string;
  price: number;
  cost: number;
  quantity: number;
  reorderLevel: number;
  locationId?: string;
  supplier?: string;
  status: string; // 'in-stock', 'low-stock', 'out-of-stock', 'discontinued'
  imageUrl?: string;
  lastRestocked?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface InventoryItemFormData {
  name: string;
  sku: string;
  description?: string;
  category: string;
  price: number;
  cost: number;
  quantity: number;
  reorderLevel: number;
  locationId?: string;
  supplier?: string;
  image?: File;
}

export interface InventoryFilters {
  category?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  supplier?: string;
  locationId?: string;
  searchTerm?: string;
}

export interface InventoryTransaction {
  id: string;
  itemId: string;
  type: 'receipt' | 'issue' | 'adjustment' | 'transfer';
  quantity: number;
  reference?: string; // PO number, order ID, etc.
  notes?: string;
  performedBy: string;
  timestamp: string;
}

export interface WarehouseLocation {
  id: string;
  name: string;
  code: string;
  type: string; // 'shelf', 'bin', 'rack', 'zone', etc.
  capacity?: number;
  occupied?: number;
  status: 'active' | 'inactive' | 'maintenance';
  parentId?: string; // For hierarchical locations
}

export interface OrderReservation {
  id: string;
  orderId: string;
  itemId: string;
  sku: string;
  qtyReserved: number;
  reservedAt: string;
  reservedBy: string;
  status: 'pending' | 'picked' | 'shipped' | 'cancelled';
  expiresAt?: string;
}

export interface Shipment {
  id: string;
  orderId: string;
  carrier: string;
  trackingNumber?: string;
  status: 'pending' | 'picked' | 'packed' | 'shipped' | 'delivered';
  shippedAt?: string;
  estimatedDelivery?: string;
  actualDelivery?: string;
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
}

export interface PickList {
  id: string;
  orderId: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  assignedTo?: string;
  createdAt: string;
  completedAt?: string;
  items: PickListItem[];
}

export interface PickListItem {
  itemId: string;
  sku: string;
  name: string;
  locationId: string;
  locationName: string;
  quantity: number;
  picked: number;
  status: 'pending' | 'partial' | 'complete';
}
  type: 'restock' | 'sale' | 'adjustment' | 'return';
  quantity: number;
  previousQuantity: number;
  newQuantity: number;
  reason?: string;
  performedBy: string;
  createdAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Service for handling inventory-related API calls
 */
export const InventoryService = {
  /**
   * Get all inventory items with optional filtering
   */
  getInventoryItems: async (filters?: InventoryFilters): Promise<InventoryItem[]> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      // Build query string from filters
      let queryString = '';
      if (filters) {
        const params = new URLSearchParams();
        if (filters.category) params.append('category', filters.category);
        if (filters.status) params.append('status', filters.status);
        if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
        if (filters.supplier) params.append('supplier', filters.supplier);
        if (filters.location) params.append('location', filters.location);
        if (filters.searchTerm) params.append('search', filters.searchTerm);
        queryString = `?${params.toString()}`;
      }

      const response = await fetch(`${API_URL}/inventory/items${queryString}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch inventory items');
      }

      const data = await response.json();
      return data.items;
    } catch (error) {
      console.error('Error fetching inventory items:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to fetch inventory items');
      throw error;
    }
  },

  /**
   * Get a single inventory item by ID
   */
  getInventoryItem: async (id: string): Promise<InventoryItem> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/inventory/items/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch inventory item');
      }

      const data = await response.json();
      return data.item;
    } catch (error) {
      console.error(`Error fetching inventory item ${id}:`, error);
      toast.error(error instanceof Error ? error.message : 'Failed to fetch inventory item');
      throw error;
    }
  },

  /**
   * Create a new inventory item
   */
  createInventoryItem: async (itemData: InventoryItemFormData): Promise<InventoryItem> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      // Handle file upload if present
      const formData = new FormData();
      
      // Add all non-file fields
      Object.entries(itemData).forEach(([key, value]) => {
        if (key !== 'image' && value !== undefined) {
          formData.append(key, value.toString());
        }
      });
      
      // Add image if present
      if (itemData.image) {
        formData.append('image', itemData.image);
      }

      const response = await fetch(`${API_URL}/inventory/items`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          // Don't set Content-Type when using FormData, browser will set it with boundary
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create inventory item');
      }

      const data = await response.json();
      toast.success('Inventory item created successfully');
      return data.item;
    } catch (error) {
      console.error('Error creating inventory item:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create inventory item');
      throw error;
    }
  },

  /**
   * Update an existing inventory item
   */
  updateInventoryItem: async (id: string, itemData: Partial<InventoryItemFormData>): Promise<InventoryItem> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      // Handle file upload if present
      const formData = new FormData();
      
      // Add all non-file fields
      Object.entries(itemData).forEach(([key, value]) => {
        if (key !== 'image' && value !== undefined) {
          formData.append(key, value.toString());
        }
      });
      
      // Add image if present
      if (itemData.image) {
        formData.append('image', itemData.image);
      }

      const response = await fetch(`${API_URL}/inventory/items/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          // Don't set Content-Type when using FormData, browser will set it with boundary
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update inventory item');
      }

      const data = await response.json();
      toast.success('Inventory item updated successfully');
      return data.item;
    } catch (error) {
      console.error(`Error updating inventory item ${id}:`, error);
      toast.error(error instanceof Error ? error.message : 'Failed to update inventory item');
      throw error;
    }
  },

  /**
   * Delete an inventory item
   */
  deleteInventoryItem: async (id: string): Promise<void> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/inventory/items/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete inventory item');
      }

      toast.success('Inventory item deleted successfully');
    } catch (error) {
      console.error(`Error deleting inventory item ${id}:`, error);
      toast.error(error instanceof Error ? error.message : 'Failed to delete inventory item');
      throw error;
    }
  },

  /**
   * Update inventory item quantity (restock, sale, adjustment)
   */
  updateItemQuantity: async (
    id: string, 
    quantity: number, 
    type: 'restock' | 'sale' | 'adjustment' | 'return',
    reason?: string
  ): Promise<InventoryItem> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/inventory/items/${id}/quantity`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity, type, reason }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update inventory quantity');
      }

      const data = await response.json();
      toast.success(`Inventory quantity updated successfully`);
      return data.item;
    } catch (error) {
      console.error(`Error updating inventory quantity ${id}:`, error);
      toast.error(error instanceof Error ? error.message : 'Failed to update inventory quantity');
      throw error;
    }
  },

  /**
   * Get inventory transaction history for an item
   */
  getItemTransactions: async (id: string): Promise<InventoryTransaction[]> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/inventory/items/${id}/transactions`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch inventory transactions');
      }

      const data = await response.json();
      return data.transactions;
    } catch (error) {
      console.error(`Error fetching inventory transactions for item ${id}:`, error);
      toast.error(error instanceof Error ? error.message : 'Failed to fetch inventory transactions');
      throw error;
    }
  },

  /**
   * Get inventory statistics
   */
  getInventoryStats: async (): Promise<{ 
    totalItems: number; 
    totalValue: number;
    lowStockItems: number;
    outOfStockItems: number;
    byCategory: Record<string, { count: number; value: number }>;
  }> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/inventory/stats`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch inventory statistics');
      }

      const data = await response.json();
      return data.stats;
    } catch (error) {
      console.error('Error fetching inventory statistics:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to fetch inventory statistics');
      throw error;
    }
  },

  /**
   * Generate inventory report
   */
  generateInventoryReport: async (format: 'csv' | 'pdf' | 'excel'): Promise<Blob> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/inventory/report?format=${format}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate inventory report');
      }

      toast.success(`Inventory report generated successfully`);
      return await response.blob();
    } catch (error) {
      console.error('Error generating inventory report:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate inventory report');
      throw error;
    }
  },
};

export default InventoryService;