import { NextResponse } from 'next/server';
import { OpportunityService } from '@/services/opportunity-service';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const id = params.id;
    const { stage } = body;
    
    if (!stage) {
      return NextResponse.json(
        { error: 'Stage is required' },
        { status: 400 }
      );
    }
    
    // Use the opportunity service to update the opportunity stage
    const updatedOpportunity = await OpportunityService.changeOpportunityStage(id, stage);
    
    return NextResponse.json(updatedOpportunity);
  } catch (error) {
    console.error(`Error updating opportunity stage ${params.id}:`, error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update opportunity stage' },
      { status: error instanceof Error && error.message.includes('not found') ? 404 : 400 }
    );
  }
}