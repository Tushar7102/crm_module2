'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { ArrowLeft, Edit, Loader2, Trash2, RefreshCw } from 'lucide-react';
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
import LeadService, { Lead as ServiceLead } from '@/services/lead-service';

// Define interface for our Lead data type that matches the API response
interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  contactName?: string;
  source: string;
  status: string;
  requirements?: string;
  notes?: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt?: string;
}

export default function LeadDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {
    if (params.id) {
      fetchLead();
    }
  }, [params.id]);
  
  const fetchLead = async () => {
    setLoading(true);
    try {
      // Ensure we're using the correct ID from params and clean it
      const id = typeof params.id === 'string' ? params.id.trim() : '';
      console.log('Fetching lead with ID:', id);
      
      // Try to fetch from the real API first using LeadService
      try {
        const data = await LeadService.getLead(id);
        console.log('Lead data from service:', data);
        
        // Convert the service lead format to our local Lead format if needed
        const formattedLead: Lead = {
          id: data._id || data.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          source: data.source,
          status: data.status,
          requirements: data.requirements,
          assignedTo: data.assignedTo,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          // Map other fields as needed
          contactName: data.contactName,
          notes: data.notes
        };
        
        setLead(formattedLead);
        return;
      } catch (serviceError) {
        console.warn('Failed to fetch from service API, falling back to mock API:', serviceError);
        // Fall back to the mock API
      }
      
      // Fallback to mock API
      const response = await fetch(`/api/leads/${id}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch lead');
      }
      
      const data = await response.json();
      console.log('Lead data from mock API:', data);
      setLead(data);
    } catch (error) {
      console.error('Error fetching lead:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to load lead details');
    } finally {
      setLoading(false);
    }
  };
  
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchLead();
    setRefreshing(false);
    toast.success('Lead data refreshed');
  };

  const handleDeleteLead = async () => {
    setDeleteLoading(true);
    try {
      // Ensure we're using the correct ID from params and clean it
      const id = typeof params.id === 'string' ? params.id.trim() : '';
      console.log('Deleting lead with ID:', id);
      
      // Try to delete using the real API first
      try {
        await LeadService.deleteLead(id);
        toast.success('Lead deleted successfully');
        router.push('/dashboard/leads');
        return;
      } catch (serviceError) {
        console.warn('Failed to delete from service API, falling back to mock API:', serviceError);
        // Fall back to the mock API
      }
      
      // Fallback to mock API
      const response = await fetch(`/api/leads/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete lead');
      }
      
      const result = await response.json();
      toast.success(result.message || 'Lead deleted successfully');
      router.push('/dashboard/leads');
    } catch (error) {
      console.error('Error deleting lead:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to delete lead');
    } finally {
      setDeleteLoading(false);
    }
  };

  const formatStatus = (status: string | undefined) => {
    if (!status) return 'Unknown';
    return status
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatSource = (source: string | undefined) => {
    if (!source) return 'Unknown';
    return source
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getStatusColor = (status: string | undefined) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'qualified':
        return 'bg-green-100 text-green-800';
      case 'unqualified':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading lead details...</span>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="flex h-[calc(100vh-200px)] flex-col items-center justify-center">
        <p className="text-lg text-muted-foreground">Lead not found</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => router.push('/dashboard/leads')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Leads
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="icon" onClick={() => router.back()} className="h-10 w-10 rounded-full border-border/50 shadow-md hover:bg-primary/10 hover:text-primary transition-all">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Lead Details</h2>
          <Badge className={getStatusColor(lead.status)}>
            {formatStatus(lead.status)}
          </Badge>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={refreshing}
            className="rounded-full border-border/50 shadow-md hover:bg-primary/10 hover:text-primary transition-all"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push(`/dashboard/leads/${lead.id}/edit`)}
            className="rounded-full border-border/50 shadow-md hover:bg-primary/10 hover:text-primary transition-all"
          >
            <Edit className="mr-2 h-4 w-4" /> Edit Lead
          </Button>
          <Button
            variant="default"
            onClick={() => router.push(`/dashboard/leads/${lead.id}/convert`)}
            className="rounded-full shadow-md hover:shadow-lg transition-all bg-green-600 hover:bg-green-700 text-white"
          >
            Convert to Opportunity
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="rounded-full shadow-md hover:shadow-lg transition-all">
                <Trash2 className="mr-2 h-4 w-4" /> Delete Lead
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="border-none shadow-lg">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl font-bold text-primary/90">Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription className="text-muted-foreground mt-2">
                  This action cannot be undone. This will permanently delete the lead
                  and remove the data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="mt-6">
                <AlertDialogCancel className="rounded-full border-border/50 shadow-md hover:bg-muted/50 transition-all">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteLead}
                  disabled={deleteLoading}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full shadow-md hover:shadow-lg transition-all"
                >
                  {deleteLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    'Delete'
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Lead Information</CardTitle>
            <CardDescription>
              Basic information about the lead.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
              <p className="text-base">{lead.name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
              <p className="text-base">{lead.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
              <p className="text-base">{lead.phone}</p>
            </div>
            {lead.company && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Company</h3>
                <p className="text-base">{lead.company}</p>
              </div>
            )}
            {lead.contactName && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Contact Person</h3>
                <p className="text-base">{lead.contactName}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Details</CardTitle>
            <CardDescription>
              More information about the lead.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
              <Badge className={`mt-1 ${getStatusColor(lead.status)}`}>
                {formatStatus(lead.status)}
              </Badge>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Source</h3>
              <p className="text-base">{formatSource(lead.source)}</p>
            </div>
            {lead.requirements && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Requirements</h3>
                <p className="text-base">{lead.requirements}</p>
              </div>
            )}
            {lead.assignedTo && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Assigned To</h3>
                <p className="text-base">{lead.assignedTo}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
            <CardDescription>
              History of interactions with this lead.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mr-4 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-xs font-medium text-primary">1</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Lead Created</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(lead.createdAt)}
                  </p>
                </div>
              </div>
              {lead.updatedAt && lead.updatedAt !== lead.createdAt && (
                <div className="flex items-start">
                  <div className="mr-4 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-xs font-medium text-primary">2</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Lead Updated</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(lead.updatedAt)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              This timeline shows the history of interactions with this lead.
            </p>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
            <CardDescription>
              Additional notes and information about this lead.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md bg-muted p-4">
              {lead.notes ? (
                <p className="text-sm whitespace-pre-wrap">{lead.notes}</p>
              ) : (
                <p className="text-sm text-muted-foreground italic">No notes available for this lead.</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => router.push(`/dashboard/leads/${lead.id}/edit?focus=notes`)}
              className="text-xs"
            >
              Add/Edit Notes
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}