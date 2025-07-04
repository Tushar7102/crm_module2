import { NextResponse } from 'next/server';
import { Lead } from '@/types';

// Mock database of leads
export const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Acme Corporation',
    contactName: 'John Smith',
    email: 'john.smith@acme.com',
    phone: '+1 (555) 123-4567',
    status: 'new',
    source: 'website',
    assignedTo: '2', // Jane Smith's ID
    notes: 'Interested in our enterprise solution',
    createdAt: '2023-06-15T10:30:00.000Z',
    updatedAt: '2023-06-15T10:30:00.000Z',
  },
  {
    id: '2',
    name: 'XYZ Industries',
    contactName: 'Sarah Johnson',
    email: 'sarah.j@xyz-industries.com',
    phone: '+1 (555) 987-6543',
    status: 'contacted',
    source: 'referral',
    assignedTo: '2', // Jane Smith's ID
    notes: 'Follow up after initial call',
    createdAt: '2023-06-10T14:45:00.000Z',
    updatedAt: '2023-06-12T09:15:00.000Z',
  },
  {
    id: '3',
    name: 'Global Tech Solutions',
    contactName: 'Michael Brown',
    email: 'm.brown@globaltech.com',
    phone: '+1 (555) 456-7890',
    status: 'qualified',
    source: 'trade_show',
    assignedTo: '3', // Mike Johnson's ID
    notes: 'Met at Tech Expo 2023, very interested in our new product line',
    createdAt: '2023-06-05T11:20:00.000Z',
    updatedAt: '2023-06-08T16:30:00.000Z',
  },
  {
    id: '4',
    name: 'Sunshine Retail',
    contactName: 'Emma Wilson',
    email: 'emma@sunshineretail.com',
    phone: '+1 (555) 789-0123',
    status: 'unqualified',
    source: 'cold_call',
    assignedTo: '2', // Jane Smith's ID
    notes: 'Not interested at this time, revisit in 6 months',
    createdAt: '2023-06-02T09:10:00.000Z',
    updatedAt: '2023-06-03T13:45:00.000Z',
  },
  {
    id: '5',
    name: 'Innovative Solutions Inc',
    contactName: 'David Lee',
    email: 'david.lee@innovative.com',
    phone: '+1 (555) 234-5678',
    status: 'new',
    source: 'email_campaign',
    assignedTo: '3', // Mike Johnson's ID
    notes: 'Responded to our Q2 email campaign',
    createdAt: '2023-06-01T15:30:00.000Z',
    updatedAt: '2023-06-01T15:30:00.000Z',
  },
];

export async function GET(request: Request) {
  // Get URL parameters for filtering and pagination
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const source = searchParams.get('source');
  const assignedTo = searchParams.get('assignedTo');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  // Apply filters
  let filteredLeads = [...mockLeads];
  
  if (status) {
    filteredLeads = filteredLeads.filter(lead => lead.status === status);
  }
  
  if (source) {
    filteredLeads = filteredLeads.filter(lead => lead.source === source);
  }
  
  if (assignedTo) {
    filteredLeads = filteredLeads.filter(lead => lead.assignedTo === assignedTo);
  }

  // Sort by most recent
  filteredLeads.sort((a, b) => {
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
      pages: Math.ceil(filteredLeads.length / limit),
    },
  };

  return NextResponse.json(response);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In a real application, you would validate and save the lead to your database
    // For now, we'll just return the lead with a mock ID
    const newLead: Lead = {
      id: Math.random().toString(36).substring(2, 9), // Generate a random ID
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return NextResponse.json(newLead, { status: 201 });
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 400 }
    );
  }
}