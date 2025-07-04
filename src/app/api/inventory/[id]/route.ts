import { NextResponse } from 'next/server';
import { InventoryItem } from '@/types';

// Mock database of inventory items
const mockInventoryItems: InventoryItem[] = [
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
    updatedAt: '2023-06-20T14:45:00.000Z',
  },
  {
    id: '2',
    name: 'Professional Services - Implementation',
    sku: 'SVC-IMP-001',
    category: 'service',
    description: 'Professional implementation services (per hour)',
    price: 150,
    quantity: 200, // Hours available
    reorderLevel: 40,
    status: 'in_stock',
    createdAt: '2023-05-10T09:15:00.000Z',
    updatedAt: '2023-06-15T11:30:00.000Z',
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
    updatedAt: '2023-06-10T10:15:00.000Z',
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
    updatedAt: '2023-06-05T09:30:00.000Z',
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
    updatedAt: '2023-06-01T15:45:00.000Z',
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
    updatedAt: '2023-06-25T13:30:00.000Z',
  },
  {
    id: '7',
    name: 'Data Migration Service',
    sku: 'SVC-MIG-001',
    category: 'service',
    description: 'Data migration service (per project)',
    price: 3000,
    quantity: 10, // Projects capacity
    reorderLevel: 2,
    status: 'in_stock',
    createdAt: '2023-05-20T09:45:00.000Z',
    updatedAt: '2023-06-22T11:15:00.000Z',
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
    updatedAt: '2023-06-18T14:30:00.000Z',
  },
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Access params directly without awaiting
  const id = params.id;
  const item = mockInventoryItems.find((i) => i.id === id);

  if (!item) {
    return NextResponse.json(
      { error: 'Inventory item not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(item);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    // Access params directly without awaiting
    const id = params.id;
    const itemIndex = mockInventoryItems.findIndex((i) => i.id === id);

    if (itemIndex === -1) {
      return NextResponse.json(
        { error: 'Inventory item not found' },
        { status: 404 }
      );
    }

    // Update the status based on quantity and reorder level
    let status = body.status || mockInventoryItems[itemIndex].status;
    const quantity = body.quantity !== undefined ? body.quantity : mockInventoryItems[itemIndex].quantity;
    const reorderLevel = body.reorderLevel || mockInventoryItems[itemIndex].reorderLevel;
    
    if (quantity <= 0) {
      status = 'out_of_stock';
    } else if (quantity <= reorderLevel) {
      status = 'low_stock';
    } else {
      status = 'in_stock';
    }

    // In a real application, you would update the item in your database
    // For now, we'll just return the updated item
    const updatedItem: InventoryItem = {
      ...mockInventoryItems[itemIndex],
      ...body,
      status,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(updatedItem);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return NextResponse.json(
      { error: 'Failed to update inventory item' },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Access params directly without awaiting
  const id = params.id;
  const itemIndex = mockInventoryItems.findIndex((i) => i.id === id);

  if (itemIndex === -1) {
    return NextResponse.json(
      { error: 'Inventory item not found' },
      { status: 404 }
    );
  }

  // In a real application, you would delete the item from your database
  // or mark it as deleted
  
  return NextResponse.json(
    { message: 'Inventory item deleted successfully' },
    { status: 200 }
  );
}