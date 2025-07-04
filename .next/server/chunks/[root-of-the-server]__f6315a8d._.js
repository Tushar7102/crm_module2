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
"[project]/src/lib/mock-data.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "mockLeads": (()=>mockLeads)
});
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
        status: 'new',
        source: 'website',
        assignedTo: '1',
        notes: 'Looking for inventory management solutions',
        createdAt: '2023-06-02T09:10:00.000Z',
        updatedAt: '2023-06-02T09:10:00.000Z'
    },
    {
        id: '5',
        name: 'City Services Inc',
        contactName: 'David Clark',
        email: 'd.clark@cityservices.com',
        phone: '+1 (555) 234-5678',
        status: 'contacted',
        source: 'cold_call',
        assignedTo: '3',
        notes: 'Scheduled follow-up call for next week',
        createdAt: '2023-05-28T15:20:00.000Z',
        updatedAt: '2023-05-30T11:45:00.000Z'
    }
];
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mock-data.ts [app-route] (ecmascript)");
;
;
async function GET(request, { params }) {
    try {
        // Ensure params is properly handled as it should be awaited in Next.js App Router
        const { id } = await params;
        // Find the lead in our mock database
        const lead = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mockLeads"].find((l)=>l.id === id);
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
        const leadIndex = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mockLeads"].findIndex((l)=>l.id === id);
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
            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mockLeads"][leadIndex],
            ...body,
            id: id,
            updatedAt: new Date().toISOString()
        };
        // Update the lead in our mock database
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mockLeads"][leadIndex] = updatedLead;
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
        const leadIndex = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mockLeads"].findIndex((l)=>l.id === id);
        if (leadIndex === -1) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Lead not found'
            }, {
                status: 404
            });
        }
        // In a real application, you would delete the lead from your database
        // For now, we'll just simulate deletion by removing from our mock array
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mockLeads"].splice(leadIndex, 1);
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

//# sourceMappingURL=%5Broot-of-the-server%5D__f6315a8d._.js.map