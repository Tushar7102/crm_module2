'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { ArrowLeft, Calendar, DollarSign, Edit, Trash2, User } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Opportunity {
  id: string;
  name: string;
  value: number;
  stage: string;
  expectedCloseDate: string; // Changed from closeDate to match API
  probability: number;
  leadSource?: string; // Made optional as it might not be in API
  assignedTo?: string | { name: string }; // Can be string or object with name
  clientName: string; // Changed from customerName to match API
  description?: string; // Changed from notes to match API
  createdAt: string;
  updatedAt?: string;
}

export default function OpportunityDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  // Convert params.id to string and ensure it's not an array
  const opportunityId = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : undefined;
  
  // Don't fetch if opportunityId is undefined
  if (!opportunityId) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center">
        <p className="text-xl">Invalid opportunity ID</p>
        <Button 
          variant="outline" 
          className="mt-4" 
          onClick={() => router.push('/dashboard/opportunities')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Opportunities
        </Button>
      </div>
    );
  }

  useEffect(() => {
    if (opportunityId) {
      fetchOpportunity();
    }
  }, [opportunityId]);

  const fetchOpportunity = async () => {
    try {
      setLoading(true);
      
      console.log('Fetching opportunity with ID:', opportunityId);
      
      // Import and use the OpportunityService
      const { OpportunityService } = await import('@/services/opportunity-service');
      
      // Call the service to get the opportunity
      const data = await OpportunityService.getOpportunity(opportunityId);
      console.log('Opportunity data received:', data);
      setOpportunity(data);
    } catch (error) {
      console.error('Error fetching opportunity:', error);
      toast.error('Failed to load opportunity details');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      // Import and use the OpportunityService
      const { OpportunityService } = await import('@/services/opportunity-service');
      
      // Call the service to delete the opportunity
      await OpportunityService.deleteOpportunity(opportunityId);
      
      toast.success('Opportunity deleted successfully');
      router.push('/dashboard/opportunities');
    } catch (error) {
      console.error('Error deleting opportunity:', error);
      toast.error('Failed to delete opportunity');
    }
  };

  const handleStageChange = async (stage: string) => {
    try {
      // Import and use the OpportunityService
      const { OpportunityService } = await import('@/services/opportunity-service');
      
      // Call the service to change the opportunity stage
      const data = await OpportunityService.changeOpportunityStage(opportunityId, stage);
      
      setOpportunity(data);
      toast.success(`Stage updated to ${formatStage(stage)}`);
    } catch (error) {
      console.error('Error updating opportunity stage:', error);
      toast.error('Failed to update opportunity stage');
    }
  };

  const getStageColor = (stage: string | undefined) => {
    if (!stage) return 'bg-gray-100 text-gray-800';
    
    switch (stage) {
      case 'prospecting':
        return 'bg-blue-100 text-blue-800';
      case 'qualification':
        return 'bg-purple-100 text-purple-800';
      case 'proposal':
        return 'bg-yellow-100 text-yellow-800';
      case 'negotiation':
        return 'bg-orange-100 text-orange-800';
      case 'closed_won':
        return 'bg-green-100 text-green-800';
      case 'closed_lost':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatStage = (stage: string | undefined) => {
    if (!stage) return 'Unknown';
    return stage
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading opportunity details...</p>
        </div>
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center">
        <p className="text-xl">Opportunity not found</p>
        <Button 
          variant="outline" 
          className="mt-4" 
          onClick={() => router.push('/dashboard/opportunities')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Opportunities
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => router.push('/dashboard/opportunities')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">{opportunity.name}</h2>
          <Badge className={getStageColor(opportunity.stage)}>
            {formatStage(opportunity.stage)}
          </Badge>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={() => router.push(`/dashboard/opportunities/${opportunity.id}/edit`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
          <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the opportunity
                  and remove it from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(opportunity.value)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Probability</CardTitle>
            <div className="h-4 w-4 text-muted-foreground">%</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{opportunity.probability}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expected Close</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Date(opportunity.expectedCloseDate).toLocaleDateString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned To</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{typeof opportunity.assignedTo === 'object' && opportunity.assignedTo ? opportunity.assignedTo.name || 'Unassigned' : opportunity.assignedTo || 'Unassigned'}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Opportunity Details</CardTitle>
              <CardDescription>
                View and manage the details of this opportunity.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">Customer</h3>
                  <p>{opportunity.clientName || 'No customer assigned'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Lead Source</h3>
                  <p>{opportunity.leadSource || 'Unknown'}</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium">Notes</h3>
                <p className="mt-1">{opportunity.description || 'No notes available'}</p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium">Stage</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {['prospecting', 'qualification', 'proposal', 'negotiation', 'closed_won', 'closed_lost'].map((stage) => (
                    <Button 
                      key={stage} 
                      variant={opportunity.stage === stage ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleStageChange(stage)}
                      className={opportunity.stage === stage ? '' : 'hover:bg-secondary'}
                    >
                      {formatStage(stage)}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
              <CardDescription>
                Recent activity for this opportunity.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Activity timeline will be implemented in a future update.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>
                Manage documents related to this opportunity.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Document management will be implemented in a future update.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}