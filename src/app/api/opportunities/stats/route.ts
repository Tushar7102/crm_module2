import { NextResponse } from 'next/server';
import { OpportunityService } from '@/services/opportunity-service';

export async function GET() {
  try {
    // Use the opportunity service to get opportunity statistics
    const rawStats = await OpportunityService.getOpportunityStats();
    
    // Transform the data to match the format expected by the components
    const stageDistribution = Object.entries(rawStats.byStage).map(([stage, data]) => ({
      stage,
      count: data.count,
      value: data.value
    }));
    
    const transformedStats = {
      totalOpportunities: rawStats.total,
      totalValue: rawStats.totalValue,
      winRate: rawStats.winRate,
      avgDealSize: rawStats.totalValue / rawStats.total,
      stageDistribution
    };
    
    return NextResponse.json(transformedStats);
  } catch (error) {
    console.error('Error fetching opportunity statistics:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch opportunity statistics' },
      { status: 500 }
    );
  }
}