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
"[project]/src/app/api/opportunities/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET),
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
// Mock database of opportunities
const mockOpportunities = [
    {
        id: '1',
        name: 'Enterprise Solution for Acme Corp',
        leadId: '1',
        value: 75000,
        stage: 'proposal',
        assignedTo: '2',
        probability: 60,
        expectedCloseDate: '2023-08-15T00:00:00.000Z',
        notes: 'Proposal sent, awaiting feedback',
        createdAt: '2023-06-20T10:30:00.000Z',
        updatedAt: '2023-07-05T14:45:00.000Z'
    },
    {
        id: '2',
        name: 'Software Upgrade for XYZ Industries',
        leadId: '2',
        value: 45000,
        stage: 'negotiation',
        assignedTo: '2',
        probability: 80,
        expectedCloseDate: '2023-07-30T00:00:00.000Z',
        notes: 'Final negotiation on pricing',
        createdAt: '2023-06-15T09:20:00.000Z',
        updatedAt: '2023-07-10T11:30:00.000Z'
    },
    {
        id: '3',
        name: 'New Product Line for Global Tech',
        leadId: '3',
        value: 120000,
        stage: 'prospecting',
        assignedTo: '3',
        probability: 40,
        expectedCloseDate: '2023-09-30T00:00:00.000Z',
        notes: 'Initial requirements gathering',
        createdAt: '2023-06-25T13:15:00.000Z',
        updatedAt: '2023-07-02T10:45:00.000Z'
    },
    {
        id: '4',
        name: 'Maintenance Contract for Innovative Solutions',
        leadId: '5',
        value: 35000,
        stage: 'closed_won',
        assignedTo: '3',
        probability: 100,
        expectedCloseDate: '2023-07-01T00:00:00.000Z',
        notes: 'Contract signed, implementation starting next week',
        createdAt: '2023-06-10T11:30:00.000Z',
        updatedAt: '2023-07-01T09:15:00.000Z'
    },
    {
        id: '5',
        name: 'Custom Development for ABC Company',
        leadId: null,
        value: 95000,
        status: 'lost',
        assignedTo: '2',
        probability: 0,
        expectedCloseDate: '2023-06-30T00:00:00.000Z',
        notes: 'Lost to competitor due to pricing',
        createdAt: '2023-05-20T14:30:00.000Z',
        updatedAt: '2023-06-28T16:45:00.000Z'
    }
];
async function GET(request) {
    // Get URL parameters for filtering and pagination
    const { searchParams } = new URL(request.url);
    const stage = searchParams.get('stage');
    const assignedTo = searchParams.get('assignedTo');
    const minValue = searchParams.get('minValue') ? parseInt(searchParams.get('minValue') || '0') : null;
    const maxValue = searchParams.get('maxValue') ? parseInt(searchParams.get('maxValue') || '0') : null;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    // Apply filters
    let filteredOpportunities = [
        ...mockOpportunities
    ];
    if (stage) {
        filteredOpportunities = filteredOpportunities.filter((opp)=>opp.stage === stage);
    }
    if (assignedTo) {
        filteredOpportunities = filteredOpportunities.filter((opp)=>opp.assignedTo === assignedTo);
    }
    if (minValue !== null) {
        filteredOpportunities = filteredOpportunities.filter((opp)=>opp.value >= minValue);
    }
    if (maxValue !== null) {
        filteredOpportunities = filteredOpportunities.filter((opp)=>opp.value <= maxValue);
    }
    // Sort by most recent
    filteredOpportunities.sort((a, b)=>{
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedOpportunities = filteredOpportunities.slice(startIndex, endIndex);
    // Prepare response with pagination metadata
    const response = {
        data: paginatedOpportunities,
        pagination: {
            total: filteredOpportunities.length,
            page,
            limit,
            pages: Math.ceil(filteredOpportunities.length / limit)
        }
    };
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(response);
}
async function POST(request) {
    try {
        const body = await request.json();
        // In a real application, you would validate and save the opportunity to your database
        // For now, we'll just return the opportunity with a mock ID
        const newOpportunity = {
            id: Math.random().toString(36).substring(2, 9),
            ...body,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(newOpportunity, {
            status: 201
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to create opportunity'
        }, {
            status: 400
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__69d619af._.js.map