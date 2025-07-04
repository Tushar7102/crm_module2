import { NextResponse } from 'next/server';
import { InventoryItem } from '@/types';


export async function GET(request: Request) {
  // Get URL parameters for filtering and pagination
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const status = searchParams.get('status');
  const minPrice = searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice') || '0') : null;
  const maxPrice = searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice') || '0') : null;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  // Apply filters
  let filteredItems = [...mockInventoryItems];
  
  if (category) {
    filteredItems = filteredItems.filter(item => item.category === category);
  }
  
  if (status) {
    filteredItems = filteredItems.filter(item => item.status === status);
  }
  
  if (minPrice !== null) {
    filteredItems = filteredItems.filter(item => item.price >= minPrice);
  }
  
  if (maxPrice !== null) {
    filteredItems = filteredItems.filter(item => item.price <= maxPrice);
  }

  // Sort by name
  filteredItems.sort((a, b) => a.name.localeCompare(b.name));

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
      pages: Math.ceil(filteredItems.length / limit),
    },
  };

  return NextResponse.json(response);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In a real application, you would validate and save the item to your database
    // For now, we'll just return the item with a mock ID
    const newItem: InventoryItem = {
      id: Math.random().toString(36).substring(2, 9), // Generate a random ID
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return NextResponse.json(
      { error: 'Failed to create inventory item' },
      { status: 400 }
    );
  }
}