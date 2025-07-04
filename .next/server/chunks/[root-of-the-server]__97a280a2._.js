module.exports = {

"[project]/.next-internal/server/app/api/opportunities/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/services/auth-service.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "AuthService": (()=>AuthService),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-route] (ecmascript)");
;
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const AuthService = {
    /**
   * Login a user with email and password
   */ login: async (credentials)=>{
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || errorData.message || 'Login failed');
            }
            const data = await response.json();
            // Store token in localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            // Also set token in cookie for middleware authentication
            document.cookie = `auth-token=${data.token}; path=/; max-age=86400; SameSite=Strict`;
            return data;
        } catch (error) {
            console.error('Login error:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toast"].error(error instanceof Error ? error.message : 'Login failed');
            throw error;
        }
    },
    /**
   * Register a new user
   */ register: async (userData)=>{
        try {
            console.log('Sending registration data:', userData);
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Server response error:', errorData);
                throw new Error(errorData.msg || errorData.message || 'Registration failed');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Registration error:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toast"].error(error instanceof Error ? error.message : 'Registration failed');
            throw error;
        }
    },
    /**
   * Logout the current user
   */ logout: ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Remove the auth token cookie
        document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict';
    // Optionally call the backend to invalidate the token
    },
    /**
   * Get the current authenticated user
   */ getCurrentUser: ()=>{
        const userStr = localStorage.getItem('user');
        if (!userStr) return null;
        try {
            return JSON.parse(userStr);
        } catch (error) {
            console.error('Error parsing user data:', error);
            return null;
        }
    },
    /**
   * Check if a user is authenticated
   */ isAuthenticated: ()=>{
        return !!localStorage.getItem('token');
    },
    /**
   * Get the authentication token
   */ getToken: ()=>{
        return localStorage.getItem('token');
    },
    /**
   * Update user profile
   */ updateProfile: async (userData)=>{
        try {
            const token = AuthService.getToken();
            if (!token) throw new Error('Not authenticated');
            const response = await fetch(`${API_URL}/auth/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Profile update failed');
            }
            const data = await response.json();
            // Update stored user data
            const currentUser = AuthService.getCurrentUser();
            if (currentUser) {
                const updatedUser = {
                    ...currentUser,
                    ...data.user
                };
                localStorage.setItem('user', JSON.stringify(updatedUser));
            }
            return data.user;
        } catch (error) {
            console.error('Profile update error:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toast"].error(error instanceof Error ? error.message : 'Profile update failed');
            throw error;
        }
    },
    /**
   * Change user password
   */ changePassword: async (currentPassword, newPassword)=>{
        try {
            const token = AuthService.getToken();
            if (!token) throw new Error('Not authenticated');
            const response = await fetch(`${API_URL}/auth/change-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword
                })
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Password change failed');
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toast"].success('Password changed successfully');
        } catch (error) {
            console.error('Password change error:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toast"].error(error instanceof Error ? error.message : 'Password change failed');
            throw error;
        }
    }
};
const __TURBOPACK__default__export__ = AuthService;
}}),
"[project]/src/services/opportunity-service.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "OpportunityService": (()=>OpportunityService),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/auth-service.ts [app-route] (ecmascript)");
;
;
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const OpportunityService = {
    /**
   * Get all opportunities with optional filtering
   */ getOpportunities: async (filters)=>{
        try {
            const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].getToken();
            if (!token) throw new Error('Not authenticated');
            // Build query string from filters
            let queryString = '';
            if (filters) {
                const params = new URLSearchParams();
                if (filters.stage) params.append('stage', filters.stage);
                if (filters.assignedTo) params.append('assignedTo', filters.assignedTo);
                if (filters.minValue) params.append('minValue', filters.minValue.toString());
                if (filters.maxValue) params.append('maxValue', filters.maxValue.toString());
                if (filters.searchTerm) params.append('search', filters.searchTerm);
                if (filters.dateRange) {
                    params.append('fromDate', filters.dateRange.from);
                    params.append('toDate', filters.dateRange.to);
                }
                queryString = `?${params.toString()}`;
            }
            const response = await fetch(`${API_URL}/sales/opportunities${queryString}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch opportunities');
            }
            const data = await response.json();
            return data.opportunities;
        } catch (error) {
            console.error('Error fetching opportunities:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toast"].error(error instanceof Error ? error.message : 'Failed to fetch opportunities');
            throw error;
        }
    },
    /**
   * Get a single opportunity by ID
   */ getOpportunity: async (id)=>{
        try {
            const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].getToken();
            if (!token) throw new Error('Not authenticated');
            const response = await fetch(`${API_URL}/sales/opportunities/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch opportunity');
            }
            const data = await response.json();
            return data.opportunity;
        } catch (error) {
            console.error(`Error fetching opportunity ${id}:`, error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toast"].error(error instanceof Error ? error.message : 'Failed to fetch opportunity');
            throw error;
        }
    },
    /**
   * Create a new opportunity
   */ createOpportunity: async (opportunityData)=>{
        try {
            const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].getToken();
            if (!token) throw new Error('Not authenticated');
            const response = await fetch(`${API_URL}/sales/opportunities`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(opportunityData)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create opportunity');
            }
            const data = await response.json();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toast"].success('Opportunity created successfully');
            return data.opportunity;
        } catch (error) {
            console.error('Error creating opportunity:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toast"].error(error instanceof Error ? error.message : 'Failed to create opportunity');
            throw error;
        }
    },
    /**
   * Update an existing opportunity
   */ updateOpportunity: async (id, opportunityData)=>{
        try {
            const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].getToken();
            if (!token) throw new Error('Not authenticated');
            const response = await fetch(`${API_URL}/sales/opportunities/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(opportunityData)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update opportunity');
            }
            const data = await response.json();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toast"].success('Opportunity updated successfully');
            return data.opportunity;
        } catch (error) {
            console.error(`Error updating opportunity ${id}:`, error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toast"].error(error instanceof Error ? error.message : 'Failed to update opportunity');
            throw error;
        }
    },
    /**
   * Delete an opportunity
   */ deleteOpportunity: async (id)=>{
        try {
            const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].getToken();
            if (!token) throw new Error('Not authenticated');
            const response = await fetch(`${API_URL}/sales/opportunities/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete opportunity');
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toast"].success('Opportunity deleted successfully');
        } catch (error) {
            console.error(`Error deleting opportunity ${id}:`, error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toast"].error(error instanceof Error ? error.message : 'Failed to delete opportunity');
            throw error;
        }
    },
    /**
   * Change the stage of an opportunity
   */ changeOpportunityStage: async (id, stage)=>{
        try {
            const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].getToken();
            if (!token) throw new Error('Not authenticated');
            const response = await fetch(`${API_URL}/sales/opportunities/${id}/stage`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    stage
                })
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update opportunity stage');
            }
            const data = await response.json();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toast"].success(`Opportunity stage updated to ${stage}`);
            return data.opportunity;
        } catch (error) {
            console.error(`Error updating opportunity stage ${id}:`, error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toast"].error(error instanceof Error ? error.message : 'Failed to update opportunity stage');
            throw error;
        }
    },
    /**
   * Assign an opportunity to a user
   */ assignOpportunity: async (id, userId)=>{
        try {
            const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].getToken();
            if (!token) throw new Error('Not authenticated');
            const response = await fetch(`${API_URL}/sales/opportunities/${id}/assign`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    assignedTo: userId
                })
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to assign opportunity');
            }
            const data = await response.json();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toast"].success('Opportunity assigned successfully');
            return data.opportunity;
        } catch (error) {
            console.error(`Error assigning opportunity ${id}:`, error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toast"].error(error instanceof Error ? error.message : 'Failed to assign opportunity');
            throw error;
        }
    },
    /**
   * Convert a lead to an opportunity
   */ convertLeadToOpportunity: async (leadId, opportunityData)=>{
        try {
            const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].getToken();
            if (!token) throw new Error('Not authenticated');
            const response = await fetch(`${API_URL}/sales/leads/${leadId}/convert`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(opportunityData)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to convert lead to opportunity');
            }
            const data = await response.json();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toast"].success('Lead converted to opportunity successfully');
            return data.opportunity;
        } catch (error) {
            console.error(`Error converting lead ${leadId} to opportunity:`, error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toast"].error(error instanceof Error ? error.message : 'Failed to convert lead to opportunity');
            throw error;
        }
    },
    /**
   * Get opportunity statistics
   */ getOpportunityStats: async ()=>{
        try {
            const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].getToken();
            if (!token) throw new Error('Not authenticated');
            const response = await fetch(`${API_URL}/sales/opportunities/stats`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch opportunity statistics');
            }
            const data = await response.json();
            return data.stats;
        } catch (error) {
            console.error('Error fetching opportunity statistics:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toast"].error(error instanceof Error ? error.message : 'Failed to fetch opportunity statistics');
            throw error;
        }
    }
};
const __TURBOPACK__default__export__ = OpportunityService;
}}),
"[project]/src/app/api/opportunities/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET),
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$opportunity$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/opportunity-service.ts [app-route] (ecmascript)");
;
;
async function GET(request) {
    try {
        // Get URL parameters for filtering and pagination
        const { searchParams } = new URL(request.url);
        const stage = searchParams.get('stage');
        const assignedTo = searchParams.get('assignedTo');
        const minValue = searchParams.get('minValue') ? parseInt(searchParams.get('minValue') || '0') : undefined;
        const maxValue = searchParams.get('maxValue') ? parseInt(searchParams.get('maxValue') || '0') : undefined;
        const searchTerm = searchParams.get('search') || undefined;
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        // Build filters object for the service
        const filters = {
            stage,
            assignedTo,
            minValue,
            maxValue,
            searchTerm,
            page,
            limit
        };
        // Use the opportunity service to fetch data from the backend
        const opportunities = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$opportunity$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpportunityService"].getOpportunities(filters);
        // Prepare response with pagination metadata in the format expected by the frontend
        const response = {
            opportunities: opportunities,
            totalOpportunities: opportunities.length,
            totalPages: Math.ceil(opportunities.length / limit),
            page,
            limit
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(response);
    } catch (error) {
        console.error('Error fetching opportunities:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to fetch opportunities'
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const body = await request.json();
        // Use the opportunity service to create a new opportunity
        const newOpportunity = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$opportunity$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpportunityService"].createOpportunity(body);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(newOpportunity, {
            status: 201
        });
    } catch (error) {
        console.error('Error creating opportunity:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error instanceof Error ? error.message : 'Failed to create opportunity'
        }, {
            status: 400
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__97a280a2._.js.map