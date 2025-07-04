import { NextResponse } from 'next/server';

export async function GET() {
  // In a real application, this data would come from your database
  // For now, we'll return mock data
  const mockStats = {
    leads: {
      total: 145,
      new: 24,
      converted: 18,
      conversionRate: 12.4,
    },
    opportunities: {
      total: 89,
      won: 32,
      lost: 15,
      winRate: 68.1,
      value: 287500,
    },
    serviceTickets: {
      total: 112,
      open: 38,
      resolved: 74,
      avgResolutionTime: 2.3, // days
    },
    inventory: {
      total: 534,
      lowStock: 28,
      outOfStock: 12,
      value: 423750,
    },
    recentActivity: [
      {
        id: '1',
        type: 'lead',
        action: 'created',
        subject: 'New lead from Acme Corp',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
        user: 'John Doe',
      },
      {
        id: '2',
        type: 'opportunity',
        action: 'updated',
        subject: 'Updated deal value for XYZ Inc',
        timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
        user: 'Jane Smith',
      },
      {
        id: '3',
        type: 'ticket',
        action: 'resolved',
        subject: 'Technical issue with product A',
        timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
        user: 'Mike Johnson',
      },
      {
        id: '4',
        type: 'inventory',
        action: 'updated',
        subject: 'Restocked item #1234',
        timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(), // 4 hours ago
        user: 'Sarah Williams',
      },
      {
        id: '5',
        type: 'lead',
        action: 'converted',
        subject: 'Converted lead to opportunity',
        timestamp: new Date(Date.now() - 1000 * 60 * 300).toISOString(), // 5 hours ago
        user: 'John Doe',
      },
    ],
    upcomingTasks: [
      {
        id: '1',
        title: 'Follow up with Acme Corp',
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // tomorrow
        priority: 'high',
        type: 'call',
      },
      {
        id: '2',
        title: 'Prepare proposal for XYZ Inc',
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(), // 2 days from now
        priority: 'medium',
        type: 'task',
      },
      {
        id: '3',
        title: 'Meeting with sales team',
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 72).toISOString(), // 3 days from now
        priority: 'medium',
        type: 'meeting',
      },
      {
        id: '4',
        title: 'Review inventory levels',
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 96).toISOString(), // 4 days from now
        priority: 'low',
        type: 'task',
      },
    ],
    salesPerformance: {
      monthly: [
        { month: 'Jan', value: 45000 },
        { month: 'Feb', value: 52000 },
        { month: 'Mar', value: 48000 },
        { month: 'Apr', value: 61000 },
        { month: 'May', value: 55000 },
        { month: 'Jun', value: 67000 },
        { month: 'Jul', value: 72000 },
        { month: 'Aug', value: 78000 },
        { month: 'Sep', value: 74000 },
        { month: 'Oct', value: 82000 },
        { month: 'Nov', value: 85000 },
        { month: 'Dec', value: 91000 },
      ],
      quarterly: [
        { quarter: 'Q1', value: 145000 },
        { quarter: 'Q2', value: 183000 },
        { quarter: 'Q3', value: 224000 },
        { quarter: 'Q4', value: 258000 },
      ],
    },
  };

  return NextResponse.json(mockStats);
}