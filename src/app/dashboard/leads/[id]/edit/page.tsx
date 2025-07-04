'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { ArrowLeft, Loader2, RefreshCw, Save, Edit } from 'lucide-react';
import LeadService, { Lead as ServiceLead } from '@/services/lead-service';
import { Badge } from '@/components/ui/badge';

// Define interface for our Lead data type
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
  assignedTo?: string;
  createdAt: string;
  updatedAt?: string;
  notes?: string;
}

// Helper functions for formatting data
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const formatStatus = (status: string) => {
  const statusMap: Record<string, string> = {
    new: 'New',
    contacted: 'Contacted',
    qualified: 'Qualified',
    unqualified: 'Unqualified',
  };
  return statusMap[status] || status.charAt(0).toUpperCase() + status.slice(1);
};

const formatSource = (source: string) => {
  const sourceMap: Record<string, string> = {
    website: 'Website',
    referral: 'Referral',
    email_campaign: 'Email Campaign',
    cold_call: 'Cold Call',
    trade_show: 'Trade Show',
    social_media: 'Social Media',
    other: 'Other',
  };
  return sourceMap[source] || source.charAt(0).toUpperCase() + source.slice(1);
};

const getStatusColor = (status: string) => {
  const colorMap: Record<string, string> = {
    new: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    contacted: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    qualified: 'bg-green-100 text-green-800 hover:bg-green-200',
    unqualified: 'bg-red-100 text-red-800 hover:bg-red-200',
  };
  return colorMap[status] || 'bg-gray-100 text-gray-800 hover:bg-gray-200';
};

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  company: z.string().optional(),
  contactName: z.string().optional(),
  source: z.string(),
  status: z.string(),
  requirements: z.string().optional(),
  assignedTo: z.string().optional(),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditLeadPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const form = useForm<FormValues & { createdAt: string; updatedAt?: string }>({    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      contactName: '',
      source: '',
      status: '',
      requirements: '',
      assignedTo: '',
      notes: '',
      createdAt: new Date().toISOString(),
      updatedAt: undefined,
    },
  });

  useEffect(() => {
    fetchLead();
  }, []);
  
  const fetchLead = async () => {
    setLoading(true);
    try {
      // Ensure we're using the correct ID from params
      const id = params.id as string;
      
      // Try to fetch from the service first
      try {
        const serviceData: ServiceLead = await LeadService.getLead(id);
        console.log('Lead data from service:', serviceData);
        
        // Map service data to our local Lead format
        const mappedData: Lead = {
          id: serviceData._id,
          name: serviceData.name,
          email: serviceData.email,
          phone: serviceData.phone,
          company: serviceData.company || '',
          contactName: serviceData.contactName || '',
          source: serviceData.source,
          status: serviceData.status,
          requirements: serviceData.requirements || '',
          assignedTo: serviceData.assignedTo || '',
          createdAt: serviceData.createdAt,
          updatedAt: serviceData.updatedAt || '',
          notes: serviceData.notes || '',
        };
        
        // Set form values
        form.reset({
          name: mappedData.name,
          email: mappedData.email,
          phone: mappedData.phone,
          company: mappedData.company,
          contactName: mappedData.contactName,
          source: mappedData.source,
          status: mappedData.status,
          requirements: mappedData.requirements,
          assignedTo: mappedData.assignedTo,
          notes: mappedData.notes,
          createdAt: mappedData.createdAt,
          updatedAt: mappedData.updatedAt,
        });
        
        return;
      } catch (serviceError) {
        console.error('Error fetching from service, falling back to API:', serviceError);
      }
      
      // Fallback to API
      const response = await fetch(`/api/leads/${id}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch lead');
      }
      
      const lead: Lead = await response.json();
      
      // Set form values
      form.reset({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        company: lead.company || '',
        contactName: lead.contactName || '',
        source: lead.source,
        status: lead.status,
        requirements: lead.requirements || '',
        assignedTo: lead.assignedTo || '',
        notes: lead.notes || '',
        createdAt: lead.createdAt,
        updatedAt: lead.updatedAt,
      });
    } catch (error) {
      console.error('Error fetching lead:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to load lead details');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Ensure we're using the correct ID from params
      const id = params.id as string;
      
      // Try to update using the service first
      try {
        const updatedLead = await LeadService.updateLead(id, {
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          contactName: data.contactName,
          source: data.source,
          status: data.status,
          requirements: data.requirements,
          assignedTo: data.assignedTo,
          notes: data.notes,
        });
        
        toast.success('Lead updated successfully');
        router.push(`/dashboard/leads/${id}`);
        return;
      } catch (serviceError) {
        console.error('Error updating with service, falling back to API:', serviceError);
      }
      
      // Fallback to API
      const response = await fetch(`/api/leads/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update lead');
      }
      
      const updatedLead = await response.json();
      toast.success('Lead updated successfully');
      router.push(`/dashboard/leads/${id}`);
    } catch (error) {
      console.error('Error updating lead:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update lead');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const refreshLead = async () => {
    setIsRefreshing(true);
    try {
      await fetchLead();
      toast.success('Lead data refreshed');
    } catch (error) {
      console.error('Error refreshing lead:', error);
      toast.error('Failed to refresh lead data');
    } finally {
      setIsRefreshing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading lead details...</span>
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
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Edit Lead</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={refreshLead}
          disabled={isRefreshing}
          className="rounded-full border-border/50 shadow-sm hover:bg-primary/10 hover:text-primary transition-all"
        >
          {isRefreshing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-1" />
          )}
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 mb-6">
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
              <p className="text-base">{form.getValues().name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
              <p className="text-base">{form.getValues().email}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
              <p className="text-base">{form.getValues().phone}</p>
            </div>
            {form.getValues().company && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Company</h3>
                <p className="text-base">{form.getValues().company}</p>
              </div>
            )}
            {form.getValues().contactName && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Contact Person</h3>
                <p className="text-base">{form.getValues().contactName}</p>
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
              <Badge className={`mt-1 ${getStatusColor(form.getValues().status)}`}>
                {formatStatus(form.getValues().status)}
              </Badge>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Source</h3>
              <p className="text-base">{formatSource(form.getValues().source)}</p>
            </div>
            {form.getValues().requirements && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Requirements</h3>
                <p className="text-base">{form.getValues().requirements}</p>
              </div>
            )}
            {form.getValues().assignedTo && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Assigned To</h3>
                <p className="text-base">{form.getValues().assignedTo}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-md overflow-hidden">
        <CardHeader className="bg-card/50 border-b border-border/30">
          <CardTitle className="flex items-center gap-2 text-primary/90">
            <span className="text-xl">✏️</span> Edit Lead Information
          </CardTitle>
          <CardDescription>
            Update the information for this lead.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="qualified">Qualified</SelectItem>
                          <SelectItem value="unqualified">Unqualified</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="(555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Person</FormLabel>
                      <FormControl>
                        <Input placeholder="Contact person name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lead Source</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select lead source" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="website">Website</SelectItem>
                        <SelectItem value="referral">Referral</SelectItem>
                        <SelectItem value="email_campaign">Email Campaign</SelectItem>
                        <SelectItem value="cold_call">Cold Call</SelectItem>
                        <SelectItem value="trade_show">Trade Show</SelectItem>
                        <SelectItem value="social_media">Social Media</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Requirements</FormLabel>
                    <FormControl>
                      <Input placeholder="Customer requirements" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="assignedTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assigned To</FormLabel>
                    <FormControl>
                      <Input placeholder="Assigned team member" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Add any additional notes about this lead" 
                        className="min-h-[120px] resize-y"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => router.back()}
                  type="button"
                  className="rounded-full border-border/50 shadow-md hover:bg-muted/50 transition-all"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="rounded-full shadow-md hover:shadow-lg transition-all bg-primary/90 hover:bg-primary text-white"
                >
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 mt-6">
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
                    {formatDate(form.getValues().createdAt || new Date().toISOString())}
                  </p>
                </div>
              </div>
              {form.getValues().updatedAt && form.getValues().updatedAt !== form.getValues().createdAt && (
                <div className="flex items-start">
                  <div className="mr-4 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-xs font-medium text-primary">2</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Lead Updated</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(form.getValues().updatedAt)}
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
            <CardTitle>Notes Preview</CardTitle>
            <CardDescription>
              Current notes for this lead.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md bg-muted p-4">
              {form.getValues().notes ? (
                <p className="text-sm whitespace-pre-wrap">{form.getValues().notes}</p>
              ) : (
                <p className="text-sm text-muted-foreground italic">No notes available for this lead.</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              You can update the notes in the form above.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}