/**
 * API Configuration
 * 
 * This file centralizes API configuration and provides utility functions
 * for working with API endpoints.
 */

// Base API URL from environment variables
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: `${API_URL}/auth/login`,
    REGISTER: `${API_URL}/auth/register`,
    PROFILE: `${API_URL}/auth/profile`,
    CHANGE_PASSWORD: `${API_URL}/auth/change-password`,
  },
  
  // Lead endpoints
  LEADS: {
    BASE: `${API_URL}/leads`,
    DETAIL: (id: string) => `${API_URL}/leads/${id}`,
    STATUS: (id: string) => `${API_URL}/leads/${id}/status`,
    ASSIGN: (id: string) => `${API_URL}/leads/${id}/assign`,
    STATS: `${API_URL}/leads/stats`,
  },
  
  // Opportunity endpoints
  OPPORTUNITIES: {
    BASE: `${API_URL}/opportunities`,
    DETAIL: (id: string) => `${API_URL}/opportunities/${id}`,
    STATUS: (id: string) => `${API_URL}/opportunities/${id}/status`,
    ASSIGN: (id: string) => `${API_URL}/opportunities/${id}/assign`,
    STATS: `${API_URL}/opportunities/stats`,
  },
  
  // Service ticket endpoints
  SERVICE_TICKETS: {
    BASE: `${API_URL}/service-tickets`,
    DETAIL: (id: string) => `${API_URL}/service-tickets/${id}`,
    STATUS: (id: string) => `${API_URL}/service-tickets/${id}/status`,
    ASSIGN: (id: string) => `${API_URL}/service-tickets/${id}/assign`,
  },
  
  // User endpoints
  USERS: {
    BASE: `${API_URL}/users`,
    DETAIL: (id: string) => `${API_URL}/users/${id}`,
  },
  
  // Health check endpoint
  HEALTH: `${API_URL}/health`,
};

/**
 * Get authorization headers with the provided token
 */
export const getAuthHeaders = (token: string) => ({
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
});

/**
 * Default headers for API requests
 */
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

export default {
  API_URL,
  API_ENDPOINTS,
  getAuthHeaders,
  DEFAULT_HEADERS,
};