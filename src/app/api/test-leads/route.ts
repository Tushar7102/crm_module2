import { NextResponse } from 'next/server';
import { Lead } from '@/types';

// Mock database of leads
const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Acme Corporation',
    email: 'john.smith@acme.com',
    phone: '+1 (555) 123-4567',
    status: 'new',
    source: 'website',
    createdAt: '2023-06-15T10:30:00.000Z',
  },
  {
    id: '6864be1',
    name: 'New Potential Client',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 111-2222',
    status: 'new',
    source: 'website',
    createdAt: '2023-07-01T09:00:00.000Z',
  },
];

export async function GET() {
  // Return all leads for testing
  return NextResponse.json(mockLeads);
}