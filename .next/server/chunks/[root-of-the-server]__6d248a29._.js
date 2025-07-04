module.exports = {

"[project]/.next-internal/server/app/api/inventory/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
"[project]/src/app/api/inventory/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET),
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
// Mock database of inventory items
const mockInventoryItems = [
    {
        id: '1',
        name: 'Enterprise Software License',
        sku: 'SW-ENT-001',
        category: 'software',
        description: 'Annual enterprise license for CRM software',
        price: 1200,
        quantity: 50,
        reorderLevel: 10,
        status: 'in_stock',
        createdAt: '2023-05-15T10:30:00.000Z',
        updatedAt: '2023-06-20T14:45:00.000Z'
    },
    {
        id: '2',
        name: 'Professional Services - Implementation',
        sku: 'SVC-IMP-001',
        category: 'service',
        description: 'Professional implementation services (per hour)',
        price: 150,
        quantity: 200,
        reorderLevel: 40,
        status: 'in_stock',
        createdAt: '2023-05-10T09:15:00.000Z',
        updatedAt: '2023-06-15T11:30:00.000Z'
    },
    {
        id: '3',
        name: 'Server Hardware - Basic',
        sku: 'HW-SRV-001',
        category: 'hardware',
        description: 'Entry-level server for small businesses',
        price: 2500,
        quantity: 15,
        reorderLevel: 5,
        status: 'in_stock',
        createdAt: '2023-04-20T13:45:00.000Z',
        updatedAt: '2023-06-10T10:15:00.000Z'
    },
    {
        id: '4',
        name: 'Cloud Storage - 1TB',
        sku: 'CLD-STR-001',
        category: 'cloud',
        description: '1TB cloud storage subscription (annual)',
        price: 120,
        quantity: 100,
        reorderLevel: 20,
        status: 'in_stock',
        createdAt: '2023-05-05T11:20:00.000Z',
        updatedAt: '2023-06-05T09:30:00.000Z'
    },
    {
        id: '5',
        name: 'Premium Support Package',
        sku: 'SUP-PRM-001',
        category: 'support',
        description: '24/7 premium support package (annual)',
        price: 5000,
        quantity: 30,
        reorderLevel: 5,
        status: 'in_stock',
        createdAt: '2023-04-15T14:30:00.000Z',
        updatedAt: '2023-06-01T15:45:00.000Z'
    },
    {
        id: '6',
        name: 'Network Switch - 24 Port',
        sku: 'HW-NSW-001',
        category: 'hardware',
        description: '24-port managed network switch',
        price: 450,
        quantity: 8,
        reorderLevel: 5,
        status: 'low_stock',
        createdAt: '2023-05-25T10:15:00.000Z',
        updatedAt: '2023-06-25T13:30:00.000Z'
    },
    {
        id: '7',
        name: 'Data Migration Service',
        sku: 'SVC-MIG-001',
        category: 'service',
        description: 'Data migration service (per project)',
        price: 3000,
        quantity: 10,
        reorderLevel: 2,
        status: 'in_stock',
        createdAt: '2023-05-20T09:45:00.000Z',
        updatedAt: '2023-06-22T11:15:00.000Z'
    },
    {
        id: '8',
        name: 'Wireless Access Point',
        sku: 'HW-WAP-001',
        category: 'hardware',
        description: 'Enterprise-grade wireless access point',
        price: 180,
        quantity: 0,
        reorderLevel: 5,
        status: 'out_of_stock',
        createdAt: '2023-04-25T13:20:00.000Z',
        updatedAt: '2023-06-18T14:30:00.000Z'
    }
];
async function GET(request) {
    // Get URL parameters for filtering and pagination
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const minPrice = searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice') || '0') : null;
    const maxPrice = searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice') || '0') : null;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    // Apply filters
    let filteredItems = [
        ...mockInventoryItems
    ];
    if (category) {
        filteredItems = filteredItems.filter((item)=>item.category === category);
    }
    if (status) {
        filteredItems = filteredItems.filter((item)=>item.status === status);
    }
    if (minPrice !== null) {
        filteredItems = filteredItems.filter((item)=>item.price >= minPrice);
    }
    if (maxPrice !== null) {
        filteredItems = filteredItems.filter((item)=>item.price <= maxPrice);
    }
    // Sort by name
    filteredItems.sort((a, b)=>a.name.localeCompare(b.name));
    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedItems = filteredItems.slice(startIndex, endIndex);
    // Prepare response with pagination metadata
    const response = {
        data: paginatedItems,
        pagination: {
            total: filteredItems.length,
            page,
            limit,
            pages: Math.ceil(filteredItems.length / limit)
        }
    };
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(response);
}
async function POST(request) {
    try {
        const body = await request.json();
        // In a real application, you would validate and save the item to your database
        // For now, we'll just return the item with a mock ID
        const newItem = {
            id: Math.random().toString(36).substring(2, 9),
            ...body,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(newItem, {
            status: 201
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to create inventory item'
        }, {
            status: 400
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__6d248a29._.js.map