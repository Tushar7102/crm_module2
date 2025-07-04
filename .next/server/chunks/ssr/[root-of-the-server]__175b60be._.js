module.exports = {

"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

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
"[project]/src/lib/api-config.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * API Configuration
 * 
 * This file centralizes API configuration and provides utility functions
 * for working with API endpoints.
 */ // Base API URL from environment variables
__turbopack_context__.s({
    "API_ENDPOINTS": (()=>API_ENDPOINTS),
    "API_URL": (()=>API_URL),
    "DEFAULT_HEADERS": (()=>DEFAULT_HEADERS),
    "default": (()=>__TURBOPACK__default__export__),
    "getAuthHeaders": (()=>getAuthHeaders)
});
const API_URL = ("TURBOPACK compile-time value", "https://crm-server-2ukd.onrender.com/api") || 'http://localhost:3000/api';
const API_ENDPOINTS = {
    // Auth endpoints
    AUTH: {
        LOGIN: `${API_URL}/auth/login`,
        REGISTER: `${API_URL}/auth/register`,
        PROFILE: `${API_URL}/auth/profile`,
        CHANGE_PASSWORD: `${API_URL}/auth/change-password`
    },
    // Lead endpoints
    LEADS: {
        BASE: `${API_URL}/leads`,
        DETAIL: (id)=>`${API_URL}/leads/${id}`,
        STATUS: (id)=>`${API_URL}/leads/${id}/status`,
        ASSIGN: (id)=>`${API_URL}/leads/${id}/assign`,
        STATS: `${API_URL}/leads/stats`
    },
    // Opportunity endpoints
    OPPORTUNITIES: {
        BASE: `${API_URL}/opportunities`,
        DETAIL: (id)=>`${API_URL}/opportunities/${id}`,
        STATUS: (id)=>`${API_URL}/opportunities/${id}/status`,
        ASSIGN: (id)=>`${API_URL}/opportunities/${id}/assign`,
        STATS: `${API_URL}/opportunities/stats`
    },
    // Service ticket endpoints
    SERVICE_TICKETS: {
        BASE: `${API_URL}/service-tickets`,
        DETAIL: (id)=>`${API_URL}/service-tickets/${id}`,
        STATUS: (id)=>`${API_URL}/service-tickets/${id}/status`,
        ASSIGN: (id)=>`${API_URL}/service-tickets/${id}/assign`
    },
    // User endpoints
    USERS: {
        BASE: `${API_URL}/users`,
        DETAIL: (id)=>`${API_URL}/users/${id}`
    },
    // Health check endpoint
    HEALTH: `${API_URL}/health`
};
const getAuthHeaders = (token)=>({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    });
const DEFAULT_HEADERS = {
    'Content-Type': 'application/json'
};
const __TURBOPACK__default__export__ = {
    API_URL,
    API_ENDPOINTS,
    getAuthHeaders,
    DEFAULT_HEADERS
};
}}),
"[project]/src/services/auth-service.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "AuthService": (()=>AuthService),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api-config.ts [app-ssr] (ecmascript)");
;
;
const AuthService = {
    /**
   * Login a user with email and password
   */ login: async (credentials)=>{
        try {
            const response = await fetch(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].AUTH.LOGIN, {
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
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(error instanceof Error ? error.message : 'Login failed');
            throw error;
        }
    },
    /**
   * Register a new user
   */ register: async (userData)=>{
        try {
            console.log('Sending registration data:', userData);
            const response = await fetch(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].AUTH.REGISTER, {
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
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(error instanceof Error ? error.message : 'Registration failed');
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
            const response = await fetch(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].AUTH.PROFILE, {
                method: 'PUT',
                headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthHeaders"])(token),
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
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(error instanceof Error ? error.message : 'Profile update failed');
            throw error;
        }
    },
    /**
   * Change user password
   */ changePassword: async (currentPassword, newPassword)=>{
        try {
            const token = AuthService.getToken();
            if (!token) throw new Error('Not authenticated');
            const response = await fetch(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].AUTH.CHANGE_PASSWORD, {
                method: 'POST',
                headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthHeaders"])(token),
                body: JSON.stringify({
                    currentPassword,
                    newPassword
                })
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Password change failed');
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Password changed successfully');
        } catch (error) {
            console.error('Password change error:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(error instanceof Error ? error.message : 'Password change failed');
            throw error;
        }
    }
};
const __TURBOPACK__default__export__ = AuthService;
}}),
"[project]/src/contexts/auth-context.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "AuthProvider": (()=>AuthProvider),
    "default": (()=>__TURBOPACK__default__export__),
    "useAuth": (()=>useAuth)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/auth-service.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const AuthProvider = ({ children })=>{
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    // Check if user is authenticated on initial load
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const checkAuth = async ()=>{
            try {
                if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isAuthenticated()) {
                    const currentUser = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].getCurrentUser();
                    setUser(currentUser);
                    // Ensure the cookie is set for middleware authentication
                    const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].getToken();
                    if (token) {
                        document.cookie = `auth-token=${token}; path=/; max-age=86400; SameSite=Strict`;
                    }
                }
            } catch (error) {
                console.error('Authentication check failed:', error);
                // Clear any invalid auth state
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].logout();
            } finally{
                setIsLoading(false);
            }
        };
        checkAuth();
    }, []);
    // Login function
    const login = async (email, password)=>{
        setIsLoading(true);
        try {
            const userData = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].login({
                email,
                password
            });
            setUser(userData);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Login successful');
            // Add a small delay to ensure the cookie is set before redirecting
            setTimeout(()=>{
                router.push('/dashboard');
            }, 100);
        } catch (error) {
            console.error('Login failed:', error);
            // Don't show toast here as AuthService already shows it
            throw error;
        } finally{
            setIsLoading(false);
        }
    };
    // Register function
    const register = async (userData)=>{
        setIsLoading(true);
        try {
            console.log('Auth context register function called with:', userData);
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].register(userData);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Registration successful. Please log in.');
            router.push('/auth/login');
        } catch (error) {
            console.error('Registration failed:', error);
            // Let the component handle the error display
            throw error;
        } finally{
            setIsLoading(false);
        }
    };
    // Logout function
    const logout = ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].logout();
        setUser(null);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Logged out successfully');
        router.push('/auth/login');
    };
    // Update user data
    const updateUser = (userData)=>{
        if (user) {
            setUser({
                ...user,
                ...userData
            });
        }
    };
    const value = {
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/auth-context.tsx",
        lineNumber: 115,
        columnNumber: 10
    }, this);
};
const useAuth = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
const __TURBOPACK__default__export__ = AuthContext;
}}),
"[project]/src/contexts/theme-context.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ThemeProvider": (()=>ThemeProvider),
    "default": (()=>__TURBOPACK__default__export__),
    "useTheme": (()=>useTheme)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const ThemeProvider = ({ children })=>{
    const [theme, setThemeState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('system');
    // Initialize theme from localStorage or system preference
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        console.log('Initializing theme...');
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            console.log(`Found stored theme: ${storedTheme}`);
            setThemeState(storedTheme);
        } else {
            // Check system preference
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            console.log(`No stored theme found. System preference: ${systemTheme}`);
            setThemeState('system');
            applyTheme(systemTheme);
        }
    }, []);
    // Listen for system theme changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = ()=>{
            if (theme === 'system') {
                const newTheme = mediaQuery.matches ? 'dark' : 'light';
                applyTheme(newTheme);
            }
        };
        mediaQuery.addEventListener('change', handleChange);
        return ()=>mediaQuery.removeEventListener('change', handleChange);
    }, [
        theme
    ]);
    // Apply theme changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        console.log(`Theme changed to: ${theme}`);
        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            console.log(`System theme detected: ${systemTheme}`);
            applyTheme(systemTheme);
        } else {
            applyTheme(theme);
        }
        localStorage.setItem('theme', theme);
    }, [
        theme
    ]);
    // Apply the theme to the document
    const applyTheme = (theme)=>{
        const root = document.documentElement;
        // First remove both classes
        root.classList.remove('light', 'dark');
        // Then add the appropriate one
        root.classList.add(theme);
        // For debugging
        console.log(`Theme applied: ${theme}`);
    };
    const setTheme = (newTheme)=>{
        setThemeState(newTheme);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: {
            theme,
            setTheme
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/theme-context.tsx",
        lineNumber: 82,
        columnNumber: 5
    }, this);
};
const useTheme = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
const __TURBOPACK__default__export__ = ThemeContext;
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__175b60be._.js.map