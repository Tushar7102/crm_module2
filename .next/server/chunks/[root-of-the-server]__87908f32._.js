module.exports = {

"[project]/.next-internal/server/app/api/tickets/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
"[project]/src/app/api/tickets/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET),
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
// Mock database of service tickets
const mockTickets = [
    {
        id: '1',
        title: 'Software installation issue',
        description: 'Unable to install the latest update on client machine',
        status: 'open',
        priority: 'medium',
        category: 'software_installation',
        assignedTo: '3',
        customerId: '1',
        createdBy: '2',
        createdAt: '2023-07-10T09:30:00.000Z',
        updatedAt: '2023-07-10T09:30:00.000Z',
        resolvedAt: null
    },
    {
        id: '2',
        title: 'Login authentication failure',
        description: 'Users unable to login to the system after password reset',
        status: 'in_progress',
        priority: 'high',
        category: 'authentication',
        assignedTo: '3',
        customerId: '2',
        createdBy: '2',
        createdAt: '2023-07-08T14:15:00.000Z',
        updatedAt: '2023-07-09T10:45:00.000Z',
        resolvedAt: null
    },
    {
        id: '3',
        title: 'Data migration request',
        description: 'Need assistance with migrating data from legacy system',
        status: 'open',
        priority: 'low',
        category: 'data_migration',
        assignedTo: null,
        customerId: '3',
        createdBy: '1',
        createdAt: '2023-07-07T11:20:00.000Z',
        updatedAt: '2023-07-07T11:20:00.000Z',
        resolvedAt: null
    },
    {
        id: '4',
        title: 'Report generation error',
        description: 'Monthly sales report fails to generate with error code E-501',
        status: 'resolved',
        priority: 'medium',
        category: 'reporting',
        assignedTo: '3',
        customerId: '5',
        createdBy: '2',
        createdAt: '2023-07-05T16:30:00.000Z',
        updatedAt: '2023-07-06T13:45:00.000Z',
        resolvedAt: '2023-07-06T13:45:00.000Z'
    },
    {
        id: '5',
        title: 'Feature enhancement request',
        description: 'Add ability to export data in CSV format',
        status: 'on_hold',
        priority: 'low',
        category: 'feature_request',
        assignedTo: '3',
        customerId: '1',
        createdBy: '1',
        createdAt: '2023-07-03T10:15:00.000Z',
        updatedAt: '2023-07-04T09:30:00.000Z',
        resolvedAt: null
    }
];
async function GET(request) {
    // Get URL parameters for filtering and pagination
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const assignedTo = searchParams.get('assignedTo');
    const customerId = searchParams.get('customerId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    // Apply filters
    let filteredTickets = [
        ...mockTickets
    ];
    if (status) {
        filteredTickets = filteredTickets.filter((ticket)=>ticket.status === status);
    }
    if (priority) {
        filteredTickets = filteredTickets.filter((ticket)=>ticket.priority === priority);
    }
    if (assignedTo) {
        filteredTickets = filteredTickets.filter((ticket)=>ticket.assignedTo === assignedTo);
    }
    if (customerId) {
        filteredTickets = filteredTickets.filter((ticket)=>ticket.customerId === customerId);
    }
    // Sort by most recent
    filteredTickets.sort((a, b)=>{
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedTickets = filteredTickets.slice(startIndex, endIndex);
    // Prepare response with pagination metadata
    const response = {
        data: paginatedTickets,
        pagination: {
            total: filteredTickets.length,
            page,
            limit,
            pages: Math.ceil(filteredTickets.length / limit)
        }
    };
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(response);
}
async function POST(request) {
    try {
        const body = await request.json();
        // In a real application, you would validate and save the ticket to your database
        // For now, we'll just return the ticket with a mock ID
        const newTicket = {
            id: Math.random().toString(36).substring(2, 9),
            ...body,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            resolvedAt: null
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(newTicket, {
            status: 201
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to create service ticket'
        }, {
            status: 400
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__87908f32._.js.map