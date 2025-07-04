'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Loader2, MoreHorizontal, Plus, Search, ClipboardList, Folder, Eye, Edit, Trash, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LeadService, LeadFilters, LeadFormData, LeadsResponse } from '@/services/lead-service';

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
  source: string;
  sourceDetails?: string;
  status: string;
  requirements?: string;
  interestedProducts?: string[];
  systemSize?: number;
  budget?: number;
  notes?: string;
  assignedTo?: string;
  lastContacted?: string;
  followUpDate?: string;
  convertedToOpportunity?: boolean;
  opportunityId?: string;
  createdBy?: string;
  createdAt: string;
  updatedAt?: string;
}

interface LeadsResponse {
  data: Lead[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  source: z.string(),
  requirements: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function LeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLeads, setTotalLeads] = useState(0);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      source: 'website',
      requirements: '',
    },
  });

  useEffect(() => {
    fetchLeads();
  }, [currentPage, statusFilter, sourceFilter]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      // Create filters object for LeadService
      const filters: LeadFilters = {};
      
      if (statusFilter) {
        filters.status = statusFilter;
      }
      
      if (sourceFilter) {
        filters.source = sourceFilter;
      }
      
      if (searchTerm) {
        filters.searchTerm = searchTerm;
      }
      
      // Use page and limit for pagination
      filters.page = currentPage;
      filters.limit = 10;
      
      // Use the LeadService to fetch leads from backend
      const response = await LeadService.getLeads(filters);
      
      // Check if response data is an array or has a data property
      const leadsData = Array.isArray(response.data) ? response.data : response.data;
      
      // Update state with the response data
      setLeads(leadsData || []);
      
      // Handle pagination data
      if (response.pagination) {
        setTotalPages(response.pagination.pages || 1);
        setTotalLeads(response.pagination.total || 0);
      } else {
        // If pagination is not provided, calculate it based on data length
        const totalItems = leadsData?.length || 0;
        const itemsPerPage = 10;
        setTotalLeads(totalItems);
        setTotalPages(Math.ceil(totalItems / itemsPerPage));
      }
      
      console.log('Fetched leads:', leadsData);
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast.error('Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLeads();
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value === 'all' ? '' : value);
    setCurrentPage(1);
  };

  const handleSourceChange = (value: string) => {
    setSourceFilter(value === 'all' ? '' : value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeleteLead = async (id: string) => {
    try {
      console.log('Deleting lead with ID:', id);
      await LeadService.deleteLead(id);
      toast.success('Lead deleted successfully');
      fetchLeads();
    } catch (error) {
      console.error('Error deleting lead:', error);
      toast.error('Failed to delete lead');
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      // Convert form data to LeadFormData
      const leadData: LeadFormData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        source: data.source,
        requirements: data.requirements,
      };
      
      console.log('Submitting lead data:', leadData);
      
      // Use the LeadService to create a new lead
      const newLead = await LeadService.createLead(leadData);
      
      console.log('Created lead:', newLead);
      
      setIsDialogOpen(false);
      form.reset();
      toast.success('Lead created successfully');
      fetchLeads();
    } catch (error) {
      console.error('Error creating lead:', error);
      toast.error('Failed to create lead');
    } finally {
      setIsLoading(false);
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
      case 'converted':
        return 'bg-purple-100 text-purple-800';
      case 'dead':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusVariant = (status: string | undefined) => {
    if (!status) return 'secondary';
    switch (status) {
      case 'new':
        return 'default';
      case 'contacted':
        return 'secondary';
      case 'qualified':
        return 'success';
      case 'unqualified':
        return 'destructive';
      case 'converted':
        return 'default';
      case 'dead':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Leads</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="shadow-md hover:shadow-lg transition-all bg-primary/90 hover:bg-primary text-white rounded-full px-4">
              <Plus className="mr-2 h-4 w-4" /> Add New Lead
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Lead</DialogTitle>
              <DialogDescription>
                Enter the details of the new sales lead below.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          <SelectItem value="cold_call">Cold Call</SelectItem>
                          <SelectItem value="exhibition">Exhibition</SelectItem>
                          <SelectItem value="social_media">Social Media</SelectItem>
                          <SelectItem value="partner">Partner</SelectItem>
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
                <DialogFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Creating...' : 'Create Lead'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-none shadow-md overflow-hidden">
        <CardHeader className="bg-card/50 border-b border-border/30">
          <CardTitle className="flex items-center gap-2 text-primary/90">
            <span className="text-xl">📋</span> Manage Leads
          </CardTitle>
          <CardDescription>
            You have a total of {totalLeads} leads in your database.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="bg-card/30 p-6 rounded-xl shadow-sm border border-border/30 mb-6 backdrop-blur-sm">
            <h2 className="text-lg font-semibold mb-5 flex items-center">
              <ClipboardList className="mr-2 h-5 w-5 text-primary" />
              Filter & Search
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="search" className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">Search</label>
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    type="search"
                    id="search"
                    placeholder="Search by name, email..."
                    className="pl-9 py-6 h-10 rounded-md border-border/50 focus-visible:ring-primary/50 shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button type="submit" className="sr-only">Search</button>
                </form>
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium mb-2 text-muted-foreground">Status</label>
                <Select value={statusFilter} onValueChange={handleStatusChange}>
                  <SelectTrigger id="status" className="h-10 rounded-md border-border/50 focus:ring-primary/50 shadow-sm">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent className="rounded-md border-border/50 shadow-md">
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="unqualified">Unqualified</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                    <SelectItem value="dead">Dead</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="source" className="block text-sm font-medium mb-2 text-muted-foreground">Source</label>
                <Select value={sourceFilter} onValueChange={handleSourceChange}>
                  <SelectTrigger id="source" className="h-10 rounded-md border-border/50 focus:ring-primary/50 shadow-sm">
                    <SelectValue placeholder="All Sources" />
                  </SelectTrigger>
                  <SelectContent className="rounded-md border-border/50 shadow-md">
                    <SelectItem value="all">All Sources</SelectItem>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                    <SelectItem value="cold_call">Cold Call</SelectItem>
                    <SelectItem value="exhibition">Exhibition</SelectItem>
                    <SelectItem value="social_media">Social Media</SelectItem>
                    <SelectItem value="partner">Partner</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="h-16 w-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">CRM</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">Loading leads...</p>
              </div>
            </div>
          ) : leads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center bg-muted/30 rounded-xl border border-dashed border-border/50 backdrop-blur-sm">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Folder className="h-12 w-12 text-primary/70" />
              </div>
              <h3 className="text-lg font-medium text-primary/90">No leads found</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-md">
                {searchTerm || statusFilter || sourceFilter
                  ? 'Try adjusting your filters or search criteria to find what you\'re looking for.'
                  : 'Get started by adding a new lead using the button above.'}
              </p>
              {!searchTerm && !statusFilter && !sourceFilter && (
                <Button 
                  onClick={() => setIsDialogOpen(true)} 
                  className="mt-6 shadow-md hover:shadow-lg transition-all bg-primary/90 hover:bg-primary text-white rounded-full px-4"
                  size="sm"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Lead
                </Button>
              )}
            </div>
          ) : (
            <div className="mt-6">
              <div className="rounded-xl border border-border/50 overflow-hidden shadow-md bg-card/50 backdrop-blur-sm">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="font-semibold text-primary/80">Name</TableHead>
                      <TableHead className="font-semibold text-primary/80">Contact</TableHead>
                      <TableHead className="font-semibold text-primary/80">Status</TableHead>
                      <TableHead className="font-semibold text-primary/80">Source</TableHead>
                      <TableHead className="font-semibold text-primary/80">Created</TableHead>
                      <TableHead className="text-right font-semibold text-primary/80">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => (
                      <TableRow key={lead._id} className="hover:bg-muted/30 transition-colors border-b border-border/30 last:border-0">
                        <TableCell className="font-medium">
                          <Link href={`/dashboard/leads/${lead._id}`} className="hover:text-primary transition-colors hover:underline underline-offset-4">
                            {lead.name || 'No Name'}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm">{lead.email || 'No Email'}</span>
                            <span className="text-xs text-muted-foreground mt-0.5">{lead.phone || 'No Phone'}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(lead.status)} className="font-normal">
                            {formatStatus(lead.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm font-medium bg-muted/50 px-2 py-1 rounded-md">{formatSource(lead.source)}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">
                            {new Date(lead.createdAt).toLocaleDateString(undefined, { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric',
                              weekday: 'short'
                            })}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon" asChild className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                              <Link href={`/dashboard/leads/${lead._id}`}>
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View Details</span>
                              </Link>
                            </Button>
                            <Button variant="ghost" size="icon" asChild className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                              <Link href={`/dashboard/leads/${lead._id}/edit`}>
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Link>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 rounded-full hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-500 transition-colors"
                              onClick={() => handleDeleteLead(lead._id)}
                            >
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
          
          {/* Pagination */}
          {!loading && leads.length > 0 && (
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm text-muted-foreground bg-muted/30 px-4 py-2 rounded-full border border-border/30 shadow-sm">
                Showing <span className="font-medium text-primary">{(currentPage - 1) * 10 + 1}</span> to{' '}
                <span className="font-medium text-primary">{Math.min(currentPage * 10, totalLeads)}</span> of{' '}
                <span className="font-medium text-primary">{totalLeads}</span> leads
              </div>
              <div className="flex space-x-3 self-end sm:self-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-10 px-4 rounded-full border-border/50 shadow-md hover:bg-primary/10 hover:text-primary transition-all disabled:opacity-50 disabled:pointer-events-none"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="h-10 px-4 rounded-full border-border/50 shadow-md hover:bg-primary/10 hover:text-primary transition-all disabled:opacity-50 disabled:pointer-events-none"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}