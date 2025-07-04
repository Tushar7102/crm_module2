import { NextResponse } from 'next/server';
import { ServiceTicket } from '@/types';

// Mock database of service tickets
const mockTickets: ServiceTicket[] = [
  {
    id: '1',
    title: 'Software installation issue',
    description: 'Unable to install the latest update on client machine',
    status: 'open',
    priority: 'medium',
    category: 'software_installation',
    assignedTo: '3', // Mike Johnson's ID
    customerId: '1', // Acme Corp
    createdBy: '2', // Jane Smith
    createdAt: '2023-07-10T09:30:00.000Z',
    updatedAt: '2023-07-10T09:30:00.000Z',
    resolvedAt: null,
  },
  {
    id: '2',
    title: 'Login authentication failure',
    description: 'Users unable to login to the system after password reset',
    status: 'in_progress',
    priority: 'high',
    category: 'authentication',
    assignedTo: '3', // Mike Johnson's ID
    customerId: '2', // XYZ Industries
    createdBy: '2', // Jane Smith
    createdAt: '2023-07-08T14:15:00.000Z',
    updatedAt: '2023-07-09T10:45:00.000Z',
    resolvedAt: null,
  },
  {
    id: '3',
    title: 'Data migration request',
    description: 'Need assistance with migrating data from legacy system',
    status: 'open',
    priority: 'low',
    category: 'data_migration',
    assignedTo: null, // Not assigned yet
    customerId: '3', // Global Tech Solutions
    createdBy: '1', // John Doe
    createdAt: '2023-07-07T11:20:00.000Z',
    updatedAt: '2023-07-07T11:20:00.000Z',
    resolvedAt: null,
  },
  {
    id: '4',
    title: 'Report generation error',
    description: 'Monthly sales report fails to generate with error code E-501',
    status: 'resolved',
    priority: 'medium',
    category: 'reporting',
    assignedTo: '3', // Mike Johnson's ID
    customerId: '5', // Innovative Solutions
    createdBy: '2', // Jane Smith
    createdAt: '2023-07-05T16:30:00.000Z',
    updatedAt: '2023-07-06T13:45:00.000Z',
    resolvedAt: '2023-07-06T13:45:00.000Z',
  },
  {
    id: '5',
    title: 'Feature enhancement request',
    description: 'Add ability to export data in CSV format',
    status: 'on_hold',
    priority: 'low',
    category: 'feature_request',
    assignedTo: '3', // Mike Johnson's ID
    customerId: '1', // Acme Corp
    createdBy: '1', // John Doe
    createdAt: '2023-07-03T10:15:00.000Z',
    updatedAt: '2023-07-04T09:30:00.000Z',
    resolvedAt: null,
  },
];

export async function GET(request: Request) {
  // Get URL parameters for filtering and pagination
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const priority = searchParams.get('priority');
  const assignedTo = searchParams.get('assignedTo');
  const customerId = searchParams.get('customerId');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  // Apply filters
  let filteredTickets = [...mockTickets];
  
  if (status) {
    filteredTickets = filteredTickets.filter(ticket => ticket.status === status);
  }
  
  if (priority) {
    filteredTickets = filteredTickets.filter(ticket => ticket.priority === priority);
  }
  
  if (assignedTo) {
    filteredTickets = filteredTickets.filter(ticket => ticket.assignedTo === assignedTo);
  }
  
  if (customerId) {
    filteredTickets = filteredTickets.filter(ticket => ticket.customerId === customerId);
  }

  // Sort by most recent
  filteredTickets.sort((a, b) => {
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
      pages: Math.ceil(filteredTickets.length / limit),
    },
  };

  return NextResponse.json(response);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In a real application, you would validate and save the ticket to your database
    // For now, we'll just return the ticket with a mock ID
    const newTicket: ServiceTicket = {
      id: Math.random().toString(36).substring(2, 9), // Generate a random ID
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      resolvedAt: null,
    };
    
    return NextResponse.json(newTicket, { status: 201 });
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to create service ticket' },
      { status: 400 }
    );
  }
}