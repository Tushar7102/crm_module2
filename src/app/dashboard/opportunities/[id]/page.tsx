'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { ArrowLeft, Calendar, CheckSquare, DollarSign, Download, Edit, File, Presentation, FileSpreadsheet, FileText, Image, Mail, MessageSquare, Phone, Trash2, Upload, User } from 'lucide-react';
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
  _id: string;
  title: string;
  value: number;
  stage: string;
  expectedCloseDate: string;
  probability: number;
  leadSource?: string;
  assignedTo?: { _id: string; name: string; email: string };
  leadId?: { _id: string; name: string; phone: string; email: string };
  customer: { name: string; phone: string; email: string };
  notes?: string;
  createdAt: string;
  updatedAt?: string;
  activities?: Array<any>;
  competitors?: Array<any>;
  documents?: Array<any>;
  products?: Array<{ name: string; quantity: number; unitPrice: number; totalPrice: number; description?: string }>;
  quotes?: Array<any>;
  createdBy?: string;
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
          <h2 className="text-3xl font-bold tracking-tight">{opportunity.title}</h2>
          <Badge className={`${getStageColor(opportunity.stage)} animate-pulse`}>
            {formatStage(opportunity.stage)}
          </Badge>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={() => router.push(`/dashboard/opportunities/${opportunity._id}/edit`)}
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
        <Card className="hover:shadow-lg transition-all duration-300 hover:border-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold animate-in fade-in-50 duration-500">{formatCurrency(opportunity.value)}</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300 hover:border-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Probability</CardTitle>
            <div className="h-4 w-4 text-muted-foreground">%</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold animate-in fade-in-50 duration-500 delay-100">{opportunity.probability}%</div>
            <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
              <div 
                className="h-2 bg-primary rounded-full transition-all duration-1000" 
                style={{ width: `${opportunity.probability}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300 hover:border-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expected Close</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold animate-in fade-in-50 duration-500 delay-200">{new Date(opportunity.expectedCloseDate).toLocaleDateString()}</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300 hover:border-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned To</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold animate-in fade-in-50 duration-500 delay-300">{typeof opportunity.assignedTo === 'object' && opportunity.assignedTo ? opportunity.assignedTo.name || 'Unassigned' : opportunity.assignedTo || 'Unassigned'}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">Details</TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">Activity</TabsTrigger>
          <TabsTrigger value="documents" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="space-y-4 animate-in slide-in-from-left-5 duration-500">
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center"><span className="mr-2 text-primary">📋</span> Opportunity Details</CardTitle>
              <CardDescription>
                View and manage the details of this opportunity.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-all duration-300">
                  <h3 className="text-sm font-medium text-primary">Customer</h3>
                  <p className="font-semibold">{opportunity.customer?.name || 'No customer assigned'}</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-all duration-300">
                  <h3 className="text-sm font-medium text-primary">Customer Email</h3>
                  <p className="font-semibold">{opportunity.customer?.email || 'No email available'}</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-all duration-300">
                  <h3 className="text-sm font-medium text-primary">Customer Phone</h3>
                  <p className="font-semibold">{opportunity.customer?.phone || 'No phone available'}</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-all duration-300">
                  <h3 className="text-sm font-medium text-primary">Lead Source</h3>
                  <p className="font-semibold">{opportunity.leadId ? `Lead #${opportunity.leadId._id}` : 'No lead associated'}</p>
                </div>
              </div>
              
              <Separator className="bg-primary/20" />
              
              <div className="p-3 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-all duration-300">
                <h3 className="text-sm font-medium text-primary">Notes</h3>
                <p className="mt-1 whitespace-pre-line">{opportunity.notes || 'No notes available'}</p>
              </div>
              
              <Separator className="bg-primary/20" />
              
              <div className="p-3 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-all duration-300">
                <h3 className="text-sm font-medium text-primary mb-2">Products</h3>
                {opportunity.products && opportunity.products.length > 0 ? (
                  <div className="space-y-2 mt-2">
                    {opportunity.products.map((product, index) => (
                      <div key={index} className="p-2 border rounded-md">
                        <p className="font-medium">{product.name}</p>
                        <div className="flex justify-between text-sm">
                          <span>Quantity: {product.quantity}</span>
                          <span>Price: {formatCurrency(product.unitPrice || product.price)}</span>
                        </div>
                        {product.description && <p className="text-xs text-muted-foreground mt-1">{product.description}</p>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No products added</p>
                )}
              </div>
              
              <Separator className="bg-primary/20" />
              
              <div className="p-3 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-all duration-300">
                <h3 className="text-sm font-medium text-primary mb-2">Competitors</h3>
                {opportunity.competitors && opportunity.competitors.length > 0 ? (
                  <div className="space-y-2 mt-2">
                    {opportunity.competitors.map((competitor, index) => (
                      <div key={index} className="p-2 border rounded-md">
                        <p className="font-medium">{competitor.name}</p>
                        <p className="text-sm text-muted-foreground">{competitor.strengths}</p>
                        <p className="text-sm text-muted-foreground">{competitor.weaknesses}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No competitors identified</p>
                )}
              </div>
              
              <Separator className="bg-primary/20" />
              
              <div>
                <h3 className="text-sm font-medium text-primary mb-2">Stage</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {['prospecting', 'qualification', 'proposal', 'negotiation', 'closed_won', 'closed_lost'].map((stage, index) => (
                    <Button 
                      key={stage} 
                      variant={opportunity.stage === stage ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleStageChange(stage)}
                      className={`${opportunity.stage === stage ? 'animate-pulse shadow-md' : 'hover:bg-secondary'} transition-all duration-300 animate-in fade-in-50 delay-${index * 100}`}
                    >
                      {formatStage(stage)}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity" className="space-y-4 animate-in slide-in-from-right-5 duration-500">
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center"><span className="mr-2 text-primary">📅</span> Activity Timeline</CardTitle>
              <CardDescription>
                Recent activity for this opportunity.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-3 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-all duration-300 animate-in fade-in-50 duration-500">
                  <div className="bg-primary text-primary-foreground rounded-full p-2">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Opportunity Created</p>
                    <p className="text-sm text-muted-foreground">{new Date(opportunity.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-3 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-all duration-300 animate-in fade-in-50 duration-500 delay-100">
                  <div className="bg-primary text-primary-foreground rounded-full p-2">
                    <Edit className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Stage Updated to {formatStage(opportunity.stage)}</p>
                    <p className="text-sm text-muted-foreground">{new Date(opportunity.updatedAt).toLocaleString()}</p>
                  </div>
                </div>
                
                {opportunity.activities && opportunity.activities.length > 0 ? (
                  opportunity.activities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4 p-3 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-all duration-300 animate-in fade-in-50 duration-500" style={{ animationDelay: `${(index + 2) * 100}ms` }}>
                      <div className="bg-primary text-primary-foreground rounded-full p-2">
                        {activity.type === 'call' ? <Phone className="h-4 w-4" /> : 
                         activity.type === 'email' ? <Mail className="h-4 w-4" /> : 
                         activity.type === 'meeting' ? <Calendar className="h-4 w-4" /> : 
                         activity.type === 'task' ? <CheckSquare className="h-4 w-4" /> : 
                         <MessageSquare className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="font-medium">{activity.title || activity.type}</p>
                        <p className="text-sm">{activity.description}</p>
                        {activity.date && <p className="text-sm text-muted-foreground">{new Date(activity.date).toLocaleString()}</p>}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground animate-in fade-in-50 duration-500 delay-200">
                    No additional activities recorded yet.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documents" className="space-y-4 animate-in slide-in-from-right-5 duration-500">
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center"><span className="mr-2 text-primary">📄</span> Documents</CardTitle>
              <CardDescription>
                Manage documents related to this opportunity.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg border border-dashed border-primary/50 hover:border-primary transition-all duration-300 animate-in fade-in-50 duration-500">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="font-medium">Upload Documents</span>
                  </div>
                  <Button size="sm" variant="outline" className="animate-pulse">
                    <Upload className="h-4 w-4 mr-2" /> Upload
                  </Button>
                </div>
                
                {opportunity.documents && opportunity.documents.length > 0 ? (
                  <div className="space-y-3">
                    {opportunity.documents.map((document, index) => (
                      <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-all duration-300 animate-in fade-in-50 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary/10 p-2 rounded">
                            {document.fileType?.includes('pdf') ? <FileText className="h-5 w-5 text-primary" /> :
                             document.fileType?.includes('doc') ? <FileText className="h-5 w-5 text-primary" /> :
                             document.fileType?.includes('xls') ? <FileSpreadsheet className="h-5 w-5 text-primary" /> :
                             document.fileType?.includes('ppt') ? <Presentation className="h-5 w-5 text-primary" /> :
                             document.fileType?.includes('image') ? <Image className="h-5 w-5 text-primary" /> :
                             <File className="h-5 w-5 text-primary" />}
                          </div>
                          <div>
                            <p className="font-medium">{document.name || document.fileName || 'Document'}</p>
                            <p className="text-xs text-muted-foreground">
                              {document.fileSize ? `${Math.round(document.fileSize / 1024)} KB` : ''}
                              {document.uploadDate ? ` • Uploaded ${new Date(document.uploadDate).toLocaleDateString()}` : ''}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted-foreground animate-in fade-in-50 duration-500 delay-100">
                    No documents uploaded yet.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}