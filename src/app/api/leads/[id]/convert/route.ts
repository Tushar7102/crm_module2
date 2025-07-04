import { NextResponse } from 'next/server';
import { OpportunityService } from '@/services/opportunity-service';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    // Clean the ID parameter to ensure it doesn't have any extra characters
    const leadId = params.id.trim();
    console.log('POST convert request for lead with ID:', leadId);
    
    // Validate required fields
    if (!body.name || !body.clientName || !body.value || !body.stage || !body.probability) {
      console.log('Missing required fields:', body);
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Make sure expectedCloseDate is in the correct format
    if (!body.expectedCloseDate) {
      body.expectedCloseDate = new Date().toISOString().split('T')[0]; // Default to today
    }
    
    // Ensure numeric values are properly formatted
    body.value = parseFloat(body.value.toString());
    body.probability = parseFloat(body.probability.toString());
    
    // Add lead email and phone if available
    const formattedData = {
      ...body,
      // Add any additional formatting needed
    };
    
    // Use the opportunity service to convert lead to opportunity
    console.log('Converting lead to opportunity with data:', formattedData);
    const opportunity = await OpportunityService.convertLeadToOpportunity(leadId, formattedData);
    
    console.log('Lead converted successfully:', opportunity);
    return NextResponse.json(opportunity);
  } catch (error) {
    console.error(`Error converting lead ${params.id} to opportunity:`, error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to convert lead to opportunity' },
      { status: error instanceof Error && error.message.includes('not found') ? 404 : 500 }
    );
  }
}