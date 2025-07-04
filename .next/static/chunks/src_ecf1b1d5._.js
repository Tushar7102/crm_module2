(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/utils/id-utils.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
/**
 * Utility functions for handling IDs consistently across the application
 */ /**
 * Ensures an object has both id and _id fields populated consistently
 * @param obj The object to normalize IDs for
 * @returns The same object with consistent id and _id fields
 */ __turbopack_context__.s({
    "cleanObjectId": (()=>cleanObjectId),
    "getConsistentId": (()=>getConsistentId),
    "normalizeId": (()=>normalizeId)
});
function normalizeId(obj) {
    if (!obj) return obj;
    // Create a copy to avoid mutating the original object
    const result = {
        ...obj
    };
    // If the object has _id but not id, add id field
    if (result._id && !result.id) {
        console.log('Adding id field from _id for consistency');
        result.id = result._id;
    } else if (result.id && !result._id) {
        console.log('Adding _id field from id for consistency');
        result._id = result.id;
    }
    return result;
}
function getConsistentId(obj) {
    if (!obj) return undefined;
    return obj.id || obj._id;
}
function cleanObjectId(id) {
    if (!id) return null;
    // Remove any whitespace
    const trimmed = id.trim();
    if (!trimmed) return null;
    // Basic validation for MongoDB ObjectId format (24 hex characters)
    // This is a simple check and can be enhanced based on specific requirements
    if (/^[0-9a-fA-F]{24}$/.test(trimmed)) {
        return trimmed;
    }
    // If it's not a valid MongoDB ObjectId format, return as is
    // This allows for custom ID formats if your application uses them
    return trimmed;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/services/opportunity-service.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "OpportunityService": (()=>OpportunityService),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/auth-service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$id$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/id-utils.ts [app-client] (ecmascript)");
;
;
;
const API_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const OpportunityService = {
    /**
   * Get all opportunities with optional filtering
   */ getOpportunities: async (params)=>{
        try {
            const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getToken();
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
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch opportunities');
            }
            const data = await response.json();
            console.log(data);
            return {
                opportunities: data.opportunities,
                total: data.total
            };
        } catch (error) {
            console.error('Error fetching opportunities:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(error instanceof Error ? error.message : 'Failed to fetch opportunities');
            return {
                opportunities: [],
                total: 0
            };
        }
    },
    /**
   * Get a single opportunity by ID
   */ getOpportunity: async (id)=>{
        try {
            console.log('getOpportunity called with ID:', id);
            if (!id) {
                console.error('Invalid opportunity ID:', id);
                throw new Error('Invalid opportunity ID');
            }
            const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getToken();
            if (!token) throw new Error('Not authenticated');
            const url = `${API_URL}/opportunities/${id}`;
            console.log('Fetching from URL:', url);
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Response status:', response.status);
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response data:', errorData);
                throw new Error(errorData.message || 'Failed to fetch opportunity');
            }
            const data = await response.json();
            console.log('Opportunity data from API:', data);
            // Use the utility function to normalize the ID fields
            const normalizedData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$id$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeId"])(data);
            console.log('Opportunity data with consistent ID:', normalizedData);
            return normalizedData;
        } catch (error) {
            console.error(`Error fetching opportunity ${id}:`, error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(error instanceof Error ? error.message : 'Failed to fetch opportunity');
            throw error;
        }
    },
    /**
   * Create a new opportunity
   */ createOpportunity: async (opportunityData)=>{
        try {
            const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getToken();
            if (!token) throw new Error('Not authenticated');
            const response = await fetch(`${API_URL}/opportunities`, {
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
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Opportunity created successfully');
            return data;
        } catch (error) {
            console.error('Error creating opportunity:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(error instanceof Error ? error.message : 'Failed to create opportunity');
            throw error;
        }
    },
    /**
   * Update an existing opportunity
   */ updateOpportunity: async (id, opportunityData)=>{
        try {
            console.log('updateOpportunity called with ID:', id);
            if (!id) {
                console.error('Invalid opportunity ID:', id);
                throw new Error('Invalid opportunity ID');
            }
            const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getToken();
            if (!token) throw new Error('Not authenticated');
            const url = `${API_URL}/opportunities/${id}`;
            console.log('Updating opportunity at URL:', url);
            console.log('Update data:', opportunityData);
            const response = await fetch(url, {
                method: 'PATCH',
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
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Opportunity updated successfully');
            return data;
        } catch (error) {
            console.error(`Error updating opportunity ${id}:`, error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(error instanceof Error ? error.message : 'Failed to update opportunity');
            throw error;
        }
    },
    /**
   * Delete an opportunity
   */ deleteOpportunity: async (id)=>{
        try {
            console.log('deleteOpportunity called with ID:', id);
            if (!id) {
                console.error('Invalid opportunity ID:', id);
                throw new Error('Invalid opportunity ID');
            }
            const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getToken();
            if (!token) throw new Error('Not authenticated');
            const url = `${API_URL}/opportunities/${id}`;
            console.log('Deleting opportunity at URL:', url);
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete opportunity');
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Opportunity deleted successfully');
        } catch (error) {
            console.error(`Error deleting opportunity ${id}:`, error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(error instanceof Error ? error.message : 'Failed to delete opportunity');
            throw error;
        }
    },
    /**
   * Change the stage of an opportunity
   */ changeOpportunityStage: async (id, stage)=>{
        try {
            const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getToken();
            if (!token) throw new Error('Not authenticated');
            const response = await fetch(`${API_URL}/opportunities/${id}/stage`, {
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
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(`Opportunity stage updated to ${stage}`);
            return data;
        } catch (error) {
            console.error(`Error updating opportunity stage ${id}:`, error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(error instanceof Error ? error.message : 'Failed to update opportunity stage');
            throw error;
        }
    },
    /**
   * Assign an opportunity to a user
   */ assignOpportunity: async (id, userId)=>{
        try {
            const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getToken();
            if (!token) throw new Error('Not authenticated');
            const response = await fetch(`${API_URL}/opportunities/${id}/assign`, {
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
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Opportunity assigned successfully');
            return data;
        } catch (error) {
            console.error(`Error assigning opportunity ${id}:`, error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(error instanceof Error ? error.message : 'Failed to assign opportunity');
            throw error;
        }
    },
    /**
   * Convert a lead to an opportunity
   */ convertLeadToOpportunity: async (leadId, opportunityData)=>{
        try {
            console.log('OpportunityService.convertLeadToOpportunity called with ID:', leadId);
            // Clean the ID parameter to ensure it doesn't have any extra characters
            const cleanLeadId = leadId.trim();
            console.log('Using cleaned lead ID:', cleanLeadId);
            const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getToken();
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
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(serverData)
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response from server:', errorData);
                throw new Error(errorData.message || 'Failed to convert lead to opportunity');
            }
            const data = await response.json();
            console.log('Lead converted successfully:', data);
            // Use the utility function to normalize the ID fields
            const normalizedData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$id$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeId"])(data);
            console.log('Final opportunity data with consistent ID:', normalizedData);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Lead converted to opportunity successfully');
            return normalizedData;
        } catch (error) {
            console.error(`Error converting lead ${leadId} to opportunity:`, error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(error instanceof Error ? error.message : 'Failed to convert lead to opportunity');
            throw error;
        }
    },
    /**
   * Get opportunity statistics
   */ getOpportunityStats: async ()=>{
        try {
            const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getToken();
            if (!token) throw new Error('Not authenticated');
            const response = await fetch(`${API_URL}/opportunities/stats`, {
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
            return data;
        } catch (error) {
            console.error('Error fetching opportunity statistics:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(error instanceof Error ? error.message : 'Failed to fetch opportunity statistics');
            throw error;
        }
    }
};
const __TURBOPACK__default__export__ = OpportunityService;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_ecf1b1d5._.js.map