module.exports = {

"[project]/.next-internal/server/app/api/leads/[id]/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
"[project]/src/app/api/leads/[id]/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "DELETE": (()=>DELETE),
    "GET": (()=>GET),
    "PUT": (()=>PUT)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
// Import mockLeads from the leads route file
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$leads$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/api/leads/route.ts [app-route] (ecmascript)");
;
;
async function GET(request, { params }) {
    try {
        // Ensure params is properly handled as it should be awaited in Next.js App Router
        const { id } = await params;
        // Find the lead in our mock database
        const lead = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$leads$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mockLeads"].find((l)=>l.id === id);
        if (!lead) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Lead not found'
            }, {
                status: 404
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(lead);
    } catch (error) {
        console.error('Error fetching lead:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to fetch lead'
        }, {
            status: 500
        });
    }
}
async function PUT(request, { params }) {
    try {
        // Ensure params is properly handled as it should be awaited in Next.js App Router
        const { id } = await params;
        const body = await request.json();
        const leadIndex = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$leads$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mockLeads"].findIndex((l)=>l.id === id);
        if (leadIndex === -1) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Lead not found'
            }, {
                status: 404
            });
        }
        // In a real application, you would update the lead in your database
        // For now, we'll just return the updated lead
        const updatedLead = {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$leads$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mockLeads"][leadIndex],
            ...body,
            id: id,
            updatedAt: new Date().toISOString()
        };
        // Update the lead in our mock database
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$leads$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mockLeads"][leadIndex] = updatedLead;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(updatedLead);
    } catch (error) {
        console.error('Error updating lead:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to update lead'
        }, {
            status: 500
        });
    }
}
async function DELETE(request, { params }) {
    try {
        // Ensure params is properly handled as it should be awaited in Next.js App Router
        const { id } = await params;
        const leadIndex = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$leads$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mockLeads"].findIndex((l)=>l.id === id);
        if (leadIndex === -1) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Lead not found'
            }, {
                status: 404
            });
        }
        // In a real application, you would delete the lead from your database
        // For now, we'll just simulate deletion by removing from our mock array
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$leads$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mockLeads"].splice(leadIndex, 1);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: 'Lead deleted successfully'
        }, {
            status: 200
        });
    } catch (error) {
        console.error('Error deleting lead:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to delete lead'
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__2ae8909b._.js.map