import { NextResponse } from 'next/server';

export async function GET() {
  // In a real application, this data would come from your database
  // For now, we'll return mock data
  const mockUsers = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'admin',
      department: 'management',
      status: 'active',
      createdAt: '2023-01-15T08:30:00.000Z',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'manager',
      department: 'sales',
      status: 'active',
      createdAt: '2023-02-20T10:15:00.000Z',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      role: 'user',
      department: 'service',
      status: 'active',
      createdAt: '2023-03-10T14:45:00.000Z',
    },
    {
      id: '4',
      name: 'Sarah Williams',
      email: 'sarah.williams@example.com',
      role: 'user',
      department: 'warehouse',
      status: 'inactive',
      createdAt: '2023-04-05T09:20:00.000Z',
    },
    {
      id: '5',
      name: 'David Brown',
      email: 'david.brown@example.com',
      role: 'manager',
      department: 'finance',
      status: 'active',
      createdAt: '2023-05-12T11:30:00.000Z',
    },
  ];

  return NextResponse.json(mockUsers);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In a real application, you would validate and save the user to your database
    // For now, we'll just return the user with a mock ID
    const newUser = {
      id: Math.random().toString(36).substring(2, 9), // Generate a random ID
      ...body,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    
    return NextResponse.json(newUser, { status: 201 });
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 400 }
    );
  }
}