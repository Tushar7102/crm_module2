'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Search, Plus, Filter, MoreHorizontal, Eye, Edit, Trash, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Opportunity, OpportunitiesResponse, OpportunityFilters, OpportunityFilterParams } from '@/services/opportunity-service';

// Remove the duplicate interface definitions since we're importing them now

export default function OpportunityGrid() {
  const router = useRouter();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOpportunities, setTotalOpportunities] = useState(0);

  useEffect(() => {
    fetchOpportunities();
  }, [currentPage, stageFilter]);

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      
      // Create filters object
      const filterParams: OpportunityFilterParams = {
        page: currentPage,
        limit: 10,
        stage: stageFilter !== 'all' ? stageFilter : undefined,
        search: searchTerm || undefined
      };
      
      // Import and use the OpportunityService
      const { OpportunityService } = await import('@/services/opportunity-service');
      
      // Call the service with filter params
      const result = await OpportunityService.getOpportunities(filterParams);
      
      // Update state with the response data
      setOpportunities(result.opportunities || []);
      setTotalPages(Math.ceil((result.total || 0) / 10));
      setTotalOpportunities(result.total || 0);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
      toast.error('Failed to load opportunities');
      // Set default values in case of error
      setOpportunities([]);
      setTotalPages(1);
      setTotalOpportunities(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchOpportunities();
  };

  const handleStageChange = (value: string) => {
    setStageFilter(value);
    setCurrentPage(1);
  };

  const handleDeleteOpportunity = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this opportunity?')) {
      return;
    }
    
    try {
      console.log('Deleting opportunity with ID:', id);
      
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/opportunities/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete opportunity');
      }

      toast.success('Opportunity deleted successfully');
      setOpportunities(opportunities.filter(opportunity => (opportunity.id !== id && opportunity._id !== id)));
      fetchOpportunities();
    } catch (error) {
      console.error('Error deleting opportunity:', error);
      toast.error('Failed to delete opportunity');
    }
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };
  
  const formatStage = (stage: string) => {
    if (!stage) return 'Unknown';
    
    // First capitalize the first letter
    const formatted = stage
      .replace(/^./, (str) => str.toUpperCase())
      // Then add spaces before capital letters
      .replace(/([A-Z])/g, ' $1')
      // Fix any double spaces
      .replace(/\s+/g, ' ')
      .trim();
    
    return formatted;
  };
  
  const getStageVariant = (stage: string) => {
    if (!stage) return 'secondary';
    
    // Convert to lowercase for case-insensitive comparison
    const stageLower = stage.toLowerCase();
    
    switch (stageLower) {
      case 'initial':
      case 'prospecting':
        return 'default';
      case 'qualification':
        return 'secondary';
      case 'proposal':
        return 'warning';
      case 'negotiation':
        return 'info';
      case 'closedwon':
      case 'won':
      case 'closed won':
        return 'success';
      case 'closedlost':
      case 'lost':
      case 'closed lost':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const renderSkeletons = () => {
    return (
      <div className="rounded-xl border border-border/50 overflow-hidden shadow-md bg-card/50 backdrop-blur-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-semibold text-primary/80">Name</TableHead>
              <TableHead className="font-semibold text-primary/80">Client</TableHead>
              <TableHead className="font-semibold text-primary/80">Value</TableHead>
              <TableHead className="font-semibold text-primary/80">Stage</TableHead>
              <TableHead className="font-semibold text-primary/80">Close Date</TableHead>
              <TableHead className="text-right font-semibold text-primary/80">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array(5).fill(0).map((_, index) => (
              <TableRow key={`skeleton-row-${index}`} className="hover:bg-muted/30 transition-colors border-b border-border/30 last:border-0">
                <TableCell><Skeleton className="h-5 w-[150px]" /></TableCell>
                <TableCell><Skeleton className="h-5 w-[120px]" /></TableCell>
                <TableCell><Skeleton className="h-5 w-[80px]" /></TableCell>
                <TableCell><Skeleton className="h-6 w-[100px] rounded-full" /></TableCell>
                <TableCell><Skeleton className="h-5 w-[100px]" /></TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search opportunities..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button onClick={handleSearch} className="w-full sm:w-auto">
            Search
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={stageFilter} onValueChange={handleStageChange}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="prospecting">Prospecting</SelectItem>
                <SelectItem value="qualification">Qualification</SelectItem>
                <SelectItem value="proposal">Proposal</SelectItem>
                <SelectItem value="negotiation">Negotiation</SelectItem>
                <SelectItem value="closedWon">Closed Won</SelectItem>
                <SelectItem value="closedLost">Closed Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={() => router.push('/dashboard/opportunities/create')} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            New Opportunity
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-md overflow-hidden">
        <CardHeader className="bg-card/50 border-b border-border/30">
          <CardTitle className="flex items-center gap-2 text-primary/90">
            <span className="text-xl">💼</span> Manage Opportunities
          </CardTitle>
          <CardDescription>
            You have a total of {totalOpportunities} opportunities in your database.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="h-16 w-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">CRM</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">Loading opportunities...</p>
              </div>
            </div>
          ) : opportunities && opportunities.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center bg-muted/30 rounded-xl border border-dashed border-border/50 backdrop-blur-sm">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Filter className="h-12 w-12 text-primary/70" />
              </div>
              <h3 className="text-lg font-medium text-primary/90">No opportunities found</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-md">
                {searchTerm || stageFilter !== 'all'
                  ? 'Try adjusting your filters or search criteria to find what you\'re looking for.'
                  : 'Get started by adding a new opportunity using the button above.'}
              </p>
              {!searchTerm && stageFilter === 'all' && (
                <Button 
                  onClick={() => router.push('/dashboard/opportunities/create')} 
                  className="mt-6 shadow-md hover:shadow-lg transition-all bg-primary/90 hover:bg-primary text-white rounded-full px-4"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Opportunity
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
                      <TableHead className="font-semibold text-primary/80">Client</TableHead>
                      <TableHead className="font-semibold text-primary/80">Value</TableHead>
                      <TableHead className="font-semibold text-primary/80">Stage</TableHead>
                      <TableHead className="font-semibold text-primary/80">Close Date</TableHead>
                      <TableHead className="text-right font-semibold text-primary/80">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {opportunities && opportunities.map((opportunity) => (
                      <TableRow key={opportunity.id || opportunity._id} className="hover:bg-muted/30 transition-colors border-b border-border/30 last:border-0">
                        <TableCell className="font-medium">
                          <Link href={`/dashboard/opportunities/${opportunity.id || opportunity._id}`} className="hover:text-primary transition-colors hover:underline underline-offset-4">
                            {opportunity.title || opportunity.name || 'No Name'}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm">{typeof opportunity.customer === 'object' && opportunity.customer?.name ? opportunity.customer.name : opportunity.clientName || 'No Client'}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold">{formatCurrency(opportunity.value)}</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStageVariant(opportunity.stage)} className="font-normal">
                            {formatStage(opportunity.stage)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">
                            {formatDate(opportunity.expectedCloseDate)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon" asChild className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                              <Link href={`/dashboard/opportunities/${opportunity.id || opportunity._id}`}>
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View Details</span>
                              </Link>
                            </Button>
                            <Button variant="ghost" size="icon" asChild className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                              <Link href={`/dashboard/opportunities/${opportunity.id || opportunity._id}/edit`}>
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Link>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 rounded-full hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-500 transition-colors"
                              onClick={() => handleDeleteOpportunity(opportunity.id || opportunity._id)}
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
          {!loading && opportunities.length > 0 && (
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm text-muted-foreground bg-muted/30 px-4 py-2 rounded-full border border-border/30 shadow-sm">
                Showing <span className="font-medium text-primary">{(currentPage - 1) * 10 + 1}</span> to{' '}
                <span className="font-medium text-primary">{Math.min(currentPage * 10, totalOpportunities)}</span> of{' '}
                <span className="font-medium text-primary">{totalOpportunities}</span> opportunities
              </div>
              <div className="flex space-x-3 self-end sm:self-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="h-10 px-4 rounded-full border-border/50 shadow-md hover:bg-primary/10 hover:text-primary transition-all disabled:opacity-50 disabled:pointer-events-none"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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