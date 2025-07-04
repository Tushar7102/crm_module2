// Common types used across the application

// User related types
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

export type UserRole = 'admin' | 'manager' | 'sales' | 'service' | 'inventory';

export type Department = 'sales' | 'service' | 'support' | 'marketing' | 'finance' | 'hr' | 'it' | 'operations';

// Authentication related types
export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: string;
  department?: string;
}

// Lead related types
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  status: string;
  requirements?: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt?: string;
}

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'unqualified' | 'converted' | 'closed';

export type LeadSource = 'website' | 'referral' | 'social_media' | 'email_campaign' | 'cold_call' | 'event' | 'other';

// Opportunity related types
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

export type OpportunityStage = 'prospecting' | 'qualification' | 'needs_analysis' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';

// Service ticket related types
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

export type TicketStatus = 'open' | 'in_progress' | 'waiting_on_client' | 'waiting_on_third_party' | 'resolved' | 'closed';

export type TicketPriority = 'low' | 'medium' | 'high' | 'critical';

export type TicketCategory = 'technical_support' | 'account_support' | 'billing' | 'feature_request' | 'bug' | 'other';

// Inventory related types
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
  location?: string;
  supplier?: string;
  status: string; // 'in-stock', 'low-stock', 'out-of-stock', 'discontinued'
  imageUrl?: string;
  lastRestocked?: string;
  createdAt: string;
  updatedAt?: string;
}

export type InventoryStatus = 'in-stock' | 'low-stock' | 'out-of-stock' | 'discontinued';

export type InventoryCategory = 'electronics' | 'furniture' | 'office_supplies' | 'software' | 'hardware' | 'other';

// Common types for API responses
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

// Pagination types
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Filter types
export interface DateRangeFilter {
  from: string;
  to: string;
}

// Notification types
export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

// Dashboard types
export interface DashboardStats {
  totalLeads: number;
  totalOpportunities: number;
  totalTickets: number;
  totalRevenue: number;
  leadsThisMonth: number;
  opportunitiesThisMonth: number;
  ticketsThisMonth: number;
  revenueThisMonth: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}

// Activity types
export interface Activity {
  id: string;
  type: string;
  description: string;
  userId: string;
  entityId?: string;
  entityType?: string;
  createdAt: string;
}

// Task types
export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  assignedTo: string;
  relatedTo?: {
    type: 'lead' | 'opportunity' | 'ticket';
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt?: string;
}

// Settings types
export interface UserSettings {
  notifications: {
    email: boolean;
    browser: boolean;
    mobile: boolean;
  };
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  dateFormat: string;
}

export interface SystemSettings {
  companyName: string;
  companyLogo?: string;
  supportEmail: string;
  defaultCurrency: string;
  dateFormat: string;
  timeFormat: string;
  timezone: string;
}