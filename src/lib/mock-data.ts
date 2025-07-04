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
    status: 'new',
    source: 'website',
    assignedTo: '1', // John Doe's ID
    notes: 'Looking for inventory management solutions',
    createdAt: '2023-06-02T09:10:00.000Z',
    updatedAt: '2023-06-02T09:10:00.000Z',
  },
  {
    id: '5',
    name: 'City Services Inc',
    contactName: 'David Clark',
    email: 'd.clark@cityservices.com',
    phone: '+1 (555) 234-5678',
    status: 'contacted',
    source: 'cold_call',
    assignedTo: '3', // Mike Johnson's ID
    notes: 'Scheduled follow-up call for next week',
    createdAt: '2023-05-28T15:20:00.000Z',
    updatedAt: '2023-05-30T11:45:00.000Z',
  }
];