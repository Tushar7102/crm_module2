import { NextResponse } from 'next/server';
import { Opportunity } from '@/types';
import { OpportunityService } from '@/services/opportunity-service';
import { cookies } from 'next/headers';


export async function GET(request: Request) {
  try {
    // Get URL parameters for filtering and pagination
    const { searchParams } = new URL(request.url);
    const stage = searchParams.get('stage');
    const assignedTo = searchParams.get('assignedTo');
    const minValue = searchParams.get('minValue') ? parseInt(searchParams.get('minValue') || '0') : undefined;
    const maxValue = searchParams.get('maxValue') ? parseInt(searchParams.get('maxValue') || '0') : undefined;
    const searchTerm = searchParams.get('search') || undefined;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    // Build filters object for the service
    const filters = {
      stage,
      assignedTo,
      minValue,
      maxValue,
      searchTerm,
      page,
      limit
    };
    
    // Use the opportunity service to fetch data from the backend
    const opportunities = await OpportunityService.getOpportunities(filters);
    
    // Prepare response with pagination metadata in the format expected by the frontend
    const response = {
      opportunities: opportunities,
      totalOpportunities: opportunities.length, // This should ideally come from the backend
      totalPages: Math.ceil(opportunities.length / limit),
      page,
      limit,
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch opportunities' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Use the opportunity service to create a new opportunity
    const newOpportunity = await OpportunityService.createOpportunity(body);
    
    return NextResponse.json(newOpportunity, { status: 201 });
  } catch (error) {
    console.error('Error creating opportunity:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create opportunity' },
      { status: 400 }
    );
  }
}