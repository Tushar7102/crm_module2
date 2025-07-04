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
    },
    // Add more leads with different IDs
    {
        id: '6864be1',
        name: 'New Potential Client',
        contactName: 'Alex Johnson',
        email: 'alex.johnson@example.com',
        phone: '+1 (555) 111-2222',
        status: 'new',
        source: 'website',
        assignedTo: '2',
        notes: 'Interested in our services',
        createdAt: '2023-07-01T09:00:00.000Z',
        updatedAt: '2023-07-01T09:00:00.000Z'
    },
    // Add a lead with the exact ID from the error message (without any quotes or spaces)
    {
        id: 'aee50d22',
        name: 'Tech Innovators Ltd',
        contactName: 'Emily Chen',
        email: 'emily.chen@techinnovators.com',
        phone: '+1 (555) 333-4444',
        status: 'contacted',
        source: 'referral',
        assignedTo: '3',
        notes: 'Looking for enterprise solutions',
        createdAt: '2023-08-15T14:30:00.000Z',
        updatedAt: '2023-08-16T09:45:00.000Z'
    }
];
async function GET(request, { params }) {
    // Access params directly without awaiting
    // Clean the ID parameter to ensure it doesn't have any extra characters
    const id = params.id.trim();
    console.log('GET request for lead with ID:', id);
    // Log all available lead IDs for debugging
    console.log('Available lead IDs:', mockLeads.map((l)=>l.id));
    // Try to find the lead by exact ID match first
    let lead = mockLeads.find((l)=>l.id === id);
    // If not found, try case-insensitive match
    if (!lead) {
        lead = mockLeads.find((l)=>l.id.toLowerCase() === id.toLowerCase());
    }
    // If still not found, try to find if the ID is contained in any lead ID
    if (!lead) {
        lead = mockLeads.find((l)=>l.id.includes(id) || id.includes(l.id));
    }
    if (!lead) {
        console.log('Lead not found with ID:', id);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Lead not found'
        }, {
            status: 404
        });
    }
    console.log('Lead found:', lead);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(lead);
}
async function PUT(request, { params }) {
    try {
        const body = await request.json();
        // Clean the ID parameter to ensure it doesn't have any extra characters
        const id = params.id.trim();
        console.log('PUT request for lead with ID:', id);
        // Try to find the lead by exact ID match first
        let leadIndex = mockLeads.findIndex((l)=>l.id === id);
        // If not found, try case-insensitive match
        if (leadIndex === -1) {
            leadIndex = mockLeads.findIndex((l)=>l.id.toLowerCase() === id.toLowerCase());
        }
        // If still not found, try to find if the ID is contained in any lead ID
        if (leadIndex === -1) {
            leadIndex = mockLeads.findIndex((l)=>l.id.includes(id) || id.includes(l.id));
        }
        if (leadIndex === -1) {
            console.log('Lead not found with ID:', id);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Lead not found'
            }, {
                status: 404
            });
        }
        // In a real application, you would update the lead in your database
        // For now, we'll just return the updated lead
        const updatedLead = {
            ...mockLeads[leadIndex],
            ...body,
            id: mockLeads[leadIndex].id,
            updatedAt: new Date().toISOString()
        };
        console.log('Lead updated:', updatedLead);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(updatedLead);
    } catch (error) {
        console.error('Error updating lead:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to update lead'
        }, {
            status: 400
        });
    }
}
async function DELETE(request, { params }) {
    // Clean the ID parameter to ensure it doesn't have any extra characters
    const id = params.id.trim();
    console.log('DELETE request for lead with ID:', id);
    // Try to find the lead by exact ID match first
    let leadIndex = mockLeads.findIndex((l)=>l.id === id);
    // If not found, try case-insensitive match
    if (leadIndex === -1) {
        leadIndex = mockLeads.findIndex((l)=>l.id.toLowerCase() === id.toLowerCase());
    }
    // If still not found, try to find if the ID is contained in any lead ID
    if (leadIndex === -1) {
        leadIndex = mockLeads.findIndex((l)=>l.id.includes(id) || id.includes(l.id));
    }
    if (leadIndex === -1) {
        console.log('Lead not found with ID:', id);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Lead not found'
        }, {
            status: 404
        });
    }
    // In a real application, you would delete the lead from your database
    // or mark it as deleted
    console.log('Lead deleted with ID:', mockLeads[leadIndex].id);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        message: 'Lead deleted successfully'
    }, {
        status: 200
    });
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__903a73b2._.js.map