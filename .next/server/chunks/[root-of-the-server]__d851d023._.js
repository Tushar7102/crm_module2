module.exports = {

"[project]/.next-internal/server/app/api/leads/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
"[project]/src/app/api/leads/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET),
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
// Mock database of leads
const mockLeads = [
    {
        id: '1',
        name: 'Acme Corporation',
        contactName: 'John Smith',
        email: 'john.smith@acme.com',
        phone: '+1 (555) 123-4567',
        status: 'new',
        source: 'website',
        assignedTo: '2',
        notes: 'Interested in our enterprise solution',
        createdAt: '2023-06-15T10:30:00.000Z',
        updatedAt: '2023-06-15T10:30:00.000Z'
    },
    {
        id: '2',
        name: 'XYZ Industries',
        contactName: 'Sarah Johnson',
        email: 'sarah.j@xyz-industries.com',
        phone: '+1 (555) 987-6543',
        status: 'contacted',
        source: 'referral',
        assignedTo: '2',
        notes: 'Follow up after initial call',
        createdAt: '2023-06-10T14:45:00.000Z',
        updatedAt: '2023-06-12T09:15:00.000Z'
    },
    {
        id: '3',
        name: 'Global Tech Solutions',
        contactName: 'Michael Brown',
        email: 'm.brown@globaltech.com',
        phone: '+1 (555) 456-7890',
        status: 'qualified',
        source: 'trade_show',
        assignedTo: '3',
        notes: 'Met at Tech Expo 2023, very interested in our new product line',
        createdAt: '2023-06-05T11:20:00.000Z',
        updatedAt: '2023-06-08T16:30:00.000Z'
    },
    {
        id: '4',
        name: 'Sunshine Retail',
        contactName: 'Emma Wilson',
        email: 'emma@sunshineretail.com',
        phone: '+1 (555) 789-0123',
        status: 'unqualified',
        source: 'cold_call',
        assignedTo: '2',
        notes: 'Not interested at this time, revisit in 6 months',
        createdAt: '2023-06-02T09:10:00.000Z',
        updatedAt: '2023-06-03T13:45:00.000Z'
    },
    {
        id: '5',
        name: 'Innovative Solutions Inc',
        contactName: 'David Lee',
        email: 'david.lee@innovative.com',
        phone: '+1 (555) 234-5678',
        status: 'new',
        source: 'email_campaign',
        assignedTo: '3',
        notes: 'Responded to our Q2 email campaign',
        createdAt: '2023-06-01T15:30:00.000Z',
        updatedAt: '2023-06-01T15:30:00.000Z'
    }
];
async function GET(request) {
    // Get URL parameters for filtering and pagination
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const source = searchParams.get('source');
    const assignedTo = searchParams.get('assignedTo');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    // Apply filters
    let filteredLeads = [
        ...mockLeads
    ];
    if (status) {
        filteredLeads = filteredLeads.filter((lead)=>lead.status === status);
    }
    if (source) {
        filteredLeads = filteredLeads.filter((lead)=>lead.source === source);
    }
    if (assignedTo) {
        filteredLeads = filteredLeads.filter((lead)=>lead.assignedTo === assignedTo);
    }
    // Sort by most recent
    filteredLeads.sort((a, b)=>{
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedLeads = filteredLeads.slice(startIndex, endIndex);
    // Prepare response with pagination metadata
    const response = {
        data: paginatedLeads,
        pagination: {
            total: filteredLeads.length,
            page,
            limit,
            pages: Math.ceil(filteredLeads.length / limit)
        }
    };
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(response);
}
async function POST(request) {
    try {
        const body = await request.json();
        // In a real application, you would validate and save the lead to your database
        // For now, we'll just return the lead with a mock ID
        const newLead = {
            id: Math.random().toString(36).substring(2, 9),
            ...body,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(newLead, {
            status: 201
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to create lead'
        }, {
            status: 400
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__d851d023._.js.map