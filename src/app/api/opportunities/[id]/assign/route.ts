import { NextResponse } from 'next/server';
import { OpportunityService } from '@/services/opportunity-service';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const id = params.id;
    const { assignedTo } = body;
    
    if (!assignedTo) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // Use the opportunity service to assign the opportunity
    const updatedOpportunity = await OpportunityService.assignOpportunity(id, assignedTo);
    
    return NextResponse.json(updatedOpportunity);
  } catch (error) {
    console.error(`Error assigning opportunity ${params.id}:`, error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to assign opportunity' },
      { status: error instanceof Error && error.message.includes('not found') ? 404 : 400 }
    );
  }
}