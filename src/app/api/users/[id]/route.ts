import { NextResponse } from 'next/server';

// Mock database of users
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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Access params directly without awaiting
  const id = params.id;
  const user = mockUsers.find((u) => u.id === id);

  if (!user) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    // Access params directly without awaiting
    const id = params.id;
    const userIndex = mockUsers.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // In a real application, you would update the user in your database
    // For now, we'll just return the updated user
    const updatedUser = {
      ...mockUsers[userIndex],
      ...body,
      id, // Ensure ID doesn't change
    };

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update user' },
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
  const userIndex = mockUsers.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }

  // In a real application, you would delete the user from your database
  // or mark them as deleted
  
  return NextResponse.json(
    { message: 'User deleted successfully' },
    { status: 200 }
  );
}