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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Access params directly without awaiting
  const id = params.id;
  const ticket = mockTickets.find((t) => t.id === id);

  if (!ticket) {
    return NextResponse.json(
      { error: 'Service ticket not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(ticket);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    // Access params directly without awaiting
    const id = params.id;
    const ticketIndex = mockTickets.findIndex((t) => t.id === id);

    if (ticketIndex === -1) {
      return NextResponse.json(
        { error: 'Service ticket not found' },
        { status: 404 }
      );
    }

    // Check if status is being updated to 'resolved'
    const isResolving = 
      mockTickets[ticketIndex].status !== 'resolved' && 
      body.status === 'resolved';

    // In a real application, you would update the ticket in your database
    // For now, we'll just return the updated ticket
    const updatedTicket: ServiceTicket = {
      ...mockTickets[ticketIndex],
      ...body,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
      // Set resolvedAt timestamp if ticket is being resolved
      resolvedAt: isResolving ? new Date().toISOString() : mockTickets[ticketIndex].resolvedAt,
    };

    return NextResponse.json(updatedTicket);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update service ticket' },
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
  const ticketIndex = mockTickets.findIndex((t) => t.id === id);

  if (ticketIndex === -1) {
    return NextResponse.json(
      { error: 'Service ticket not found' },
      { status: 404 }
    );
  }

  // In a real application, you would delete the ticket from your database
  // or mark it as deleted
  
  return NextResponse.json(
    { message: 'Service ticket deleted successfully' },
    { status: 200 }
  );
}