import { NextResponse } from 'next/server';
import { OpportunityService } from '@/services/opportunity-service';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Use the opportunity service to fetch a single opportunity
    const opportunity = await OpportunityService.getOpportunity(id);
    
    return NextResponse.json(opportunity);
  } catch (error) {
    console.error(`Error fetching opportunity ${params.id}:`, error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Opportunity not found' },
      { status: 404 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const id = params.id;
    
    // Use the opportunity service to update the opportunity
    const updatedOpportunity = await OpportunityService.updateOpportunity(id, body);
    
    return NextResponse.json(updatedOpportunity);
  } catch (error) {
    console.error(`Error updating opportunity ${params.id}:`, error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update opportunity' },
      { status: error instanceof Error && error.message.includes('not found') ? 404 : 400 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Use the opportunity service to delete the opportunity
    await OpportunityService.deleteOpportunity(id);
    
    return NextResponse.json(
      { message: 'Opportunity deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error deleting opportunity ${params.id}:`, error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete opportunity' },
      { status: error instanceof Error && error.message.includes('not found') ? 404 : 500 }
    );
  }
}