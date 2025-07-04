'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Search, Filter, Plus, MoreHorizontal, Download, Send, DollarSign, Calendar, Clock, CheckCircle2, XCircle, AlertCircle, CreditCard, User, ArrowUpRight, BarChart3, Printer, FileText, Upload, Building2, Users, Tag, Receipt, FileSpreadsheet, ClipboardList, FileCheck, FileWarning, History, Eye, Pencil, Trash2, ArrowRight, ExternalLink } from 'lucide-react';

export default function SubsidyClaimsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewClaimDialogOpen, setIsNewClaimDialogOpen] = useState(false);
  const [isClaimDetailsDialogOpen, setIsClaimDetailsDialogOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<any>(null);
  
  // Mock data for subsidy claims
  const claims = [
    { 
      id: 'SC-2023-0001',
      customerName: 'John Smith',
      customerEmail: 'john.smith@example.com',
      customerPhone: '(555) 123-4567',
      installationAddress: '123 Solar Ave, Sunnyville, CA 94123',
      systemSize: 8.5,
      systemCost: 25500.00,
      subsidyProgram: 'Federal ITC',
      subsidyAmount: 6630.00,
      submissionDate: '2023-07-10T09:30:00',
      status: 'approved',
      approvalDate: '2023-07-25T14:20:00',
      paymentStatus: 'paid',
      paymentDate: '2023-08-05T10:15:00',
      assignedTo: 'Priya Sharma',
      documents: [
        { name: 'Installation Contract', url: '/documents/SC-2023-0001/contract.pdf', uploadDate: '2023-07-10T09:30:00', status: 'verified' },
        { name: 'System Specifications', url: '/documents/SC-2023-0001/specs.pdf', uploadDate: '2023-07-10T09:35:00', status: 'verified' },
        { name: 'Proof of Payment', url: '/documents/SC-2023-0001/payment.pdf', uploadDate: '2023-07-10T09:40:00', status: 'verified' },
        { name: 'Utility Interconnection', url: '/documents/SC-2023-0001/interconnection.pdf', uploadDate: '2023-07-10T09:45:00', status: 'verified' }
      ],
      notes: 'All documentation complete and verified. Subsidy approved and payment processed.',
      timeline: [
        { date: '2023-07-10T09:30:00', action: 'Claim submitted', user: 'Robert Chen' },
        { date: '2023-07-15T11:20:00', action: 'Documentation verified', user: 'Priya Sharma' },
        { date: '2023-07-25T14:20:00', action: 'Claim approved', user: 'Priya Sharma' },
        { date: '2023-08-05T10:15:00', action: 'Payment processed', user: 'Lisa Wong' }
      ]
    },
    { 
      id: 'SC-2023-0002',
      customerName: 'Emily Davis',
      customerEmail: 'emily.davis@example.com',
      customerPhone: '(555) 234-5678',
      installationAddress: '456 Green St, Ecotown, NY 10001',
      systemSize: 6.2,
      systemCost: 18600.00,
      subsidyProgram: 'NY-Sun Incentive',
      subsidyAmount: 4650.00,
      submissionDate: '2023-07-15T14:45:00',
      status: 'approved',
      approvalDate: '2023-07-30T09:10:00',
      paymentStatus: 'paid',
      paymentDate: '2023-08-10T11:30:00',
      assignedTo: 'Priya Sharma',
      documents: [
        { name: 'Installation Contract', url: '/documents/SC-2023-0002/contract.pdf', uploadDate: '2023-07-15T14:45:00', status: 'verified' },
        { name: 'System Specifications', url: '/documents/SC-2023-0002/specs.pdf', uploadDate: '2023-07-15T14:50:00', status: 'verified' },
        { name: 'Proof of Payment', url: '/documents/SC-2023-0002/payment.pdf', uploadDate: '2023-07-15T14:55:00', status: 'verified' },
        { name: 'Utility Interconnection', url: '/documents/SC-2023-0002/interconnection.pdf', uploadDate: '2023-07-15T15:00:00', status: 'verified' }
      ],
      notes: 'All documentation complete and verified. NY-Sun incentive approved and payment processed.',
      timeline: [
        { date: '2023-07-15T14:45:00', action: 'Claim submitted', user: 'Robert Chen' },
        { date: '2023-07-20T10:30:00', action: 'Documentation verified', user: 'Priya Sharma' },
        { date: '2023-07-30T09:10:00', action: 'Claim approved', user: 'Priya Sharma' },
        { date: '2023-08-10T11:30:00', action: 'Payment processed', user: 'Lisa Wong' }
      ]
    },
    { 
      id: 'SC-2023-0003',
      customerName: 'Michael Johnson',
      customerEmail: 'michael.johnson@example.com',
      customerPhone: '(555) 345-6789',
      installationAddress: '789 Sunny Rd, Clearwater, FL 33756',
      systemSize: 10.8,
      systemCost: 32400.00,
      subsidyProgram: 'Federal ITC',
      subsidyAmount: 8424.00,
      submissionDate: '2023-07-22T11:15:00',
      status: 'in review',
      approvalDate: null,
      paymentStatus: 'pending',
      paymentDate: null,
      assignedTo: 'Priya Sharma',
      documents: [
        { name: 'Installation Contract', url: '/documents/SC-2023-0003/contract.pdf', uploadDate: '2023-07-22T11:15:00', status: 'verified' },
        { name: 'System Specifications', url: '/documents/SC-2023-0003/specs.pdf', uploadDate: '2023-07-22T11:20:00', status: 'verified' },
        { name: 'Proof of Payment', url: '/documents/SC-2023-0003/payment.pdf', uploadDate: '2023-07-22T11:25:00', status: 'pending' },
        { name: 'Utility Interconnection', url: '/documents/SC-2023-0003/interconnection.pdf', uploadDate: '2023-07-22T11:30:00', status: 'pending' }
      ],
      notes: 'Waiting for additional documentation for proof of payment and utility interconnection.',
      timeline: [
        { date: '2023-07-22T11:15:00', action: 'Claim submitted', user: 'Robert Chen' },
        { date: '2023-07-25T09:45:00', action: 'Initial review completed', user: 'Priya Sharma' },
        { date: '2023-07-25T09:50:00', action: 'Additional documentation requested', user: 'Priya Sharma' }
      ]
    },
    { 
      id: 'SC-2023-0004',
      customerName: 'Sarah Thompson',
      customerEmail: 'sarah.thompson@example.com',
      customerPhone: '(555) 456-7890',
      installationAddress: '101 Mountain View Dr, Boulder, CO 80301',
      systemSize: 7.5,
      systemCost: 22500.00,
      subsidyProgram: 'Colorado REAP',
      subsidyAmount: 5625.00,
      submissionDate: '2023-07-28T15:30:00',
      status: 'in review',
      approvalDate: null,
      paymentStatus: 'pending',
      paymentDate: null,
      assignedTo: 'Amit Patel',
      documents: [
        { name: 'Installation Contract', url: '/documents/SC-2023-0004/contract.pdf', uploadDate: '2023-07-28T15:30:00', status: 'verified' },
        { name: 'System Specifications', url: '/documents/SC-2023-0004/specs.pdf', uploadDate: '2023-07-28T15:35:00', status: 'verified' },
        { name: 'Proof of Payment', url: '/documents/SC-2023-0004/payment.pdf', uploadDate: '2023-07-28T15:40:00', status: 'verified' },
        { name: 'Utility Interconnection', url: '/documents/SC-2023-0004/interconnection.pdf', uploadDate: '2023-07-28T15:45:00', status: 'pending' }
      ],
      notes: 'Waiting for final utility interconnection approval.',
      timeline: [
        { date: '2023-07-28T15:30:00', action: 'Claim submitted', user: 'Robert Chen' },
        { date: '2023-08-02T10:15:00', action: 'Initial review completed', user: 'Amit Patel' },
        { date: '2023-08-02T10:20:00', action: 'Waiting for utility interconnection', user: 'Amit Patel' }
      ]
    },
    { 
      id: 'SC-2023-0005',
      customerName: 'David Wilson',
      customerEmail: 'david.wilson@example.com',
      customerPhone: '(555) 567-8901',
      installationAddress: '222 Desert Sun Way, Phoenix, AZ 85001',
      systemSize: 12.4,
      systemCost: 37200.00,
      subsidyProgram: 'Arizona Solar Initiative',
      subsidyAmount: 9300.00,
      submissionDate: '2023-08-05T10:45:00',
      status: 'submitted',
      approvalDate: null,
      paymentStatus: 'pending',
      paymentDate: null,
      assignedTo: null,
      documents: [
        { name: 'Installation Contract', url: '/documents/SC-2023-0005/contract.pdf', uploadDate: '2023-08-05T10:45:00', status: 'pending' },
        { name: 'System Specifications', url: '/documents/SC-2023-0005/specs.pdf', uploadDate: '2023-08-05T10:50:00', status: 'pending' },
        { name: 'Proof of Payment', url: '/documents/SC-2023-0005/payment.pdf', uploadDate: '2023-08-05T10:55:00', status: 'pending' },
        { name: 'Utility Interconnection', url: '/documents/SC-2023-0005/interconnection.pdf', uploadDate: '2023-08-05T11:00:00', status: 'pending' }
      ],
      notes: 'New submission, awaiting initial review and document verification.',
      timeline: [
        { date: '2023-08-05T10:45:00', action: 'Claim submitted', user: 'Robert Chen' }
      ]
    },
    { 
      id: 'SC-2023-0006',
      customerName: 'Jennifer Lee',
      customerEmail: 'jennifer.lee@example.com',
      customerPhone: '(555) 678-9012',
      installationAddress: '333 Coastal Hwy, San Diego, CA 92101',
      systemSize: 9.2,
      systemCost: 27600.00,
      subsidyProgram: 'California SGIP',
      subsidyAmount: 6900.00,
      submissionDate: '2023-08-10T13:20:00',
      status: 'submitted',
      approvalDate: null,
      paymentStatus: 'pending',
      paymentDate: null,
      assignedTo: null,
      documents: [
        { name: 'Installation Contract', url: '/documents/SC-2023-0006/contract.pdf', uploadDate: '2023-08-10T13:20:00', status: 'pending' },
        { name: 'System Specifications', url: '/documents/SC-2023-0006/specs.pdf', uploadDate: '2023-08-10T13:25:00', status: 'pending' },
        { name: 'Proof of Payment', url: '/documents/SC-2023-0006/payment.pdf', uploadDate: '2023-08-10T13:30:00', status: 'pending' },
        { name: 'Utility Interconnection', url: '/documents/SC-2023-0006/interconnection.pdf', uploadDate: '2023-08-10T13:35:00', status: 'pending' }
      ],
      notes: 'New submission, awaiting initial review and document verification.',
      timeline: [
        { date: '2023-08-10T13:20:00', action: 'Claim submitted', user: 'Robert Chen' }
      ]
    },
    { 
      id: 'SC-2023-0007',
      customerName: 'Robert Miller',
      customerEmail: 'robert.miller@example.com',
      customerPhone: '(555) 789-0123',
      installationAddress: '444 Windy Lane, Chicago, IL 60601',
      systemSize: 5.8,
      systemCost: 17400.00,
      subsidyProgram: 'Illinois Shines',
      subsidyAmount: 4350.00,
      submissionDate: '2023-07-18T09:10:00',
      status: 'rejected',
      approvalDate: '2023-07-30T11:45:00',
      paymentStatus: 'not applicable',
      paymentDate: null,
      assignedTo: 'Amit Patel',
      documents: [
        { name: 'Installation Contract', url: '/documents/SC-2023-0007/contract.pdf', uploadDate: '2023-07-18T09:10:00', status: 'verified' },
        { name: 'System Specifications', url: '/documents/SC-2023-0007/specs.pdf', uploadDate: '2023-07-18T09:15:00', status: 'verified' },
        { name: 'Proof of Payment', url: '/documents/SC-2023-0007/payment.pdf', uploadDate: '2023-07-18T09:20:00', status: 'rejected' },
        { name: 'Utility Interconnection', url: '/documents/SC-2023-0007/interconnection.pdf', uploadDate: '2023-07-18T09:25:00', status: 'verified' }
      ],
      notes: 'Rejected due to incomplete payment documentation. Customer notified to resubmit with proper documentation.',
      timeline: [
        { date: '2023-07-18T09:10:00', action: 'Claim submitted', user: 'Robert Chen' },
        { date: '2023-07-25T14:30:00', action: 'Documentation review', user: 'Amit Patel' },
        { date: '2023-07-25T14:35:00', action: 'Payment proof issues identified', user: 'Amit Patel' },
        { date: '2023-07-30T11:45:00', action: 'Claim rejected', user: 'Amit Patel' },
        { date: '2023-07-30T11:50:00', action: 'Customer notified', user: 'Amit Patel' }
      ]
    },
    { 
      id: 'SC-2023-0008',
      customerName: 'Patricia Martinez',
      customerEmail: 'patricia.martinez@example.com',
      customerPhone: '(555) 890-1234',
      installationAddress: '555 Maple Ave, Austin, TX 78701',
      systemSize: 11.5,
      systemCost: 34500.00,
      subsidyProgram: 'Federal ITC',
      subsidyAmount: 8970.00,
      submissionDate: '2023-08-08T16:40:00',
      status: 'submitted',
      approvalDate: null,
      paymentStatus: 'pending',
      paymentDate: null,
      assignedTo: null,
      documents: [
        { name: 'Installation Contract', url: '/documents/SC-2023-0008/contract.pdf', uploadDate: '2023-08-08T16:40:00', status: 'pending' },
        { name: 'System Specifications', url: '/documents/SC-2023-0008/specs.pdf', uploadDate: '2023-08-08T16:45:00', status: 'pending' },
        { name: 'Proof of Payment', url: '/documents/SC-2023-0008/payment.pdf', uploadDate: '2023-08-08T16:50:00', status: 'pending' },
        { name: 'Utility Interconnection', url: '/documents/SC-2023-0008/interconnection.pdf', uploadDate: '2023-08-08T16:55:00', status: 'pending' }
      ],
      notes: 'New submission, awaiting initial review and document verification.',
      timeline: [
        { date: '2023-08-08T16:40:00', action: 'Claim submitted', user: 'Robert Chen' }
      ]
    },
  ];

  // Filter claims based on active tab and search query
  const filteredClaims = claims.filter(claim => {
    // Filter by tab
    if (activeTab === 'submitted' && claim.status !== 'submitted') return false;
    if (activeTab === 'in-review' && claim.status !== 'in review') return false;
    if (activeTab === 'approved' && claim.status !== 'approved') return false;
    if (activeTab === 'rejected' && claim.status !== 'rejected') return false;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        claim.id.toLowerCase().includes(query) ||
        claim.customerName.toLowerCase().includes(query) ||
        claim.customerEmail.toLowerCase().includes(query) ||
        claim.installationAddress.toLowerCase().includes(query) ||
        claim.subsidyProgram.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Approved</Badge>;
      case 'in review':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">In Review</Badge>;
      case 'submitted':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Submitted</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Pending</Badge>;
      case 'not applicable':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">N/A</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getDocumentStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Verified</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getProgramBadge = (program: string) => {
    const programColors: Record<string, { bg: string, text: string, border: string }> = {
      'Federal ITC': { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-200' },
      'NY-Sun Incentive': { bg: 'bg-orange-50', text: 'text-orange-800', border: 'border-orange-200' },
      'Colorado REAP': { bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-200' },
      'Arizona Solar Initiative': { bg: 'bg-red-50', text: 'text-red-800', border: 'border-red-200' },
      'California SGIP': { bg: 'bg-green-50', text: 'text-green-800', border: 'border-green-200' },
      'Illinois Shines': { bg: 'bg-yellow-50', text: 'text-yellow-800', border: 'border-yellow-200' },
    };
    
    const colors = programColors[program] || { bg: 'bg-gray-50', text: 'text-gray-800', border: 'border-gray-200' };
    
    return (
      <Badge variant="outline" className={`${colors.bg} ${colors.text} ${colors.border}`}>
        {program}
      </Badge>
    );
  };

  const handleOpenClaimDetails = (claim: any) => {
    setSelectedClaim(claim);
    setIsClaimDetailsDialogOpen(true);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const calculateTotalSubsidyAmount = () => {
    return claims.reduce((sum, claim) => sum + claim.subsidyAmount, 0);
  };

  const calculatePendingSubsidyAmount = () => {
    return claims
      .filter(claim => claim.status !== 'approved' && claim.status !== 'rejected')
      .reduce((sum, claim) => sum + claim.subsidyAmount, 0);
  };

  const calculateApprovedSubsidyAmount = () => {
    return claims
      .filter(claim => claim.status === 'approved')
      .reduce((sum, claim) => sum + claim.subsidyAmount, 0);
  };

  const calculateSubsidyByProgram = () => {
    const programTotals: Record<string, number> = {};
    
    claims.forEach(claim => {
      if (!programTotals[claim.subsidyProgram]) {
        programTotals[claim.subsidyProgram] = 0;
      }
      programTotals[claim.subsidyProgram] += claim.subsidyAmount;
    });
    
    return programTotals;
  };

  const getClaimProgress = (claim: any) => {
    switch (claim.status) {
      case 'submitted':
        return 25;
      case 'in review':
        return 50;
      case 'approved':
        return claim.paymentStatus === 'paid' ? 100 : 75;
      case 'rejected':
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Subsidy Claims</h1>
        <Button onClick={() => setIsNewClaimDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> New Claim
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search claims..." 
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="submitted">Submitted</TabsTrigger>
              <TabsTrigger value="in-review">In Review</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Subsidy Claims</CardTitle>
          <CardDescription>
            {filteredClaims.length} claim{filteredClaims.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredClaims.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>System Size</TableHead>
                  <TableHead>Subsidy Amount</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClaims.map((claim) => (
                  <TableRow key={claim.id}>
                    <TableCell className="font-medium">{claim.id}</TableCell>
                    <TableCell>
                      <div>
                        <div>{claim.customerName}</div>
                        <div className="text-xs text-muted-foreground">{claim.customerEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getProgramBadge(claim.subsidyProgram)}</TableCell>
                    <TableCell>{claim.systemSize} kW</TableCell>
                    <TableCell className="font-medium">{formatCurrency(claim.subsidyAmount)}</TableCell>
                    <TableCell>{formatDate(claim.submissionDate)}</TableCell>
                    <TableCell>
                      {getStatusBadge(claim.status)}
                    </TableCell>
                    <TableCell>
                      <div className="w-[100px]">
                        <Progress value={getClaimProgress(claim)} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenClaimDetails(claim)}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <ClipboardList className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No claims found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Claims Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Claims</span>
                <span className="font-medium">{claims.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Submitted</span>
                <span className="font-medium">{claims.filter(c => c.status === 'submitted').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">In Review</span>
                <span className="font-medium">{claims.filter(c => c.status === 'in review').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Approved</span>
                <span className="font-medium text-green-600">{claims.filter(c => c.status === 'approved').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Rejected</span>
                <span className="font-medium text-red-600">{claims.filter(c => c.status === 'rejected').length}</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Subsidy Amount</span>
                  <span className="font-medium">{formatCurrency(calculateTotalSubsidyAmount())}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Pending Amount</span>
                  <span className="font-medium text-amber-600">{formatCurrency(calculatePendingSubsidyAmount())}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Approved Amount</span>
                  <span className="font-medium text-green-600">{formatCurrency(calculateApprovedSubsidyAmount())}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Subsidy by Program</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(calculateSubsidyByProgram())
                .sort((a, b) => b[1] - a[1])
                .map(([program, total], index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{program}</span>
                    </div>
                    <span className="font-medium">{formatCurrency(total)}</span>
                  </div>
                ))
              }
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {claims
                .flatMap(claim => 
                  claim.timeline.map(event => ({
                    ...event,
                    claimId: claim.id,
                    customerName: claim.customerName
                  }))
                )
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 5)
                .map((event, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="mt-0.5">
                      <History className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="text-sm">
                        <span className="font-medium">{event.action}</span> - {event.claimId}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatDate(event.date)} by {event.user}
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Claim Dialog */}
      <Dialog open={isNewClaimDialogOpen} onOpenChange={setIsNewClaimDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Subsidy Claim</DialogTitle>
            <DialogDescription>
              Submit a new subsidy claim for a customer's solar installation.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="customer-name">Customer Name</Label>
              <Input id="customer-name" placeholder="Full name" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customer-email">Email</Label>
                <Input id="customer-email" type="email" placeholder="email@example.com" />
              </div>
              <div>
                <Label htmlFor="customer-phone">Phone</Label>
                <Input id="customer-phone" placeholder="(555) 123-4567" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="installation-address">Installation Address</Label>
              <Input id="installation-address" placeholder="Full address" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="system-size">System Size (kW)</Label>
                <Input id="system-size" type="number" min="0" step="0.1" />
              </div>
              <div>
                <Label htmlFor="system-cost">System Cost</Label>
                <div className="relative">
                  <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="system-cost" type="number" min="0" step="0.01" className="pl-8" />
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="subsidy-program">Subsidy Program</Label>
              <Select>
                <SelectTrigger id="subsidy-program">
                  <SelectValue placeholder="Select program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="federal-itc">Federal ITC</SelectItem>
                  <SelectItem value="ny-sun">NY-Sun Incentive</SelectItem>
                  <SelectItem value="colorado-reap">Colorado REAP</SelectItem>
                  <SelectItem value="arizona-solar">Arizona Solar Initiative</SelectItem>
                  <SelectItem value="california-sgip">California SGIP</SelectItem>
                  <SelectItem value="illinois-shines">Illinois Shines</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="subsidy-amount">Estimated Subsidy Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="subsidy-amount" type="number" min="0" step="0.01" className="pl-8" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Calculated based on program rules and system details</p>
            </div>
            
            <div>
              <Label>Required Documents</Label>
              <div className="space-y-2 mt-2">
                <div>
                  <Label htmlFor="doc-contract" className="text-xs font-normal flex justify-between">
                    <span>Installation Contract</span>
                    <span className="text-muted-foreground">Required</span>
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input id="doc-contract" type="file" className="flex-1 text-xs" />
                    <Button variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="doc-specs" className="text-xs font-normal flex justify-between">
                    <span>System Specifications</span>
                    <span className="text-muted-foreground">Required</span>
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input id="doc-specs" type="file" className="flex-1 text-xs" />
                    <Button variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="doc-payment" className="text-xs font-normal flex justify-between">
                    <span>Proof of Payment</span>
                    <span className="text-muted-foreground">Required</span>
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input id="doc-payment" type="file" className="flex-1 text-xs" />
                    <Button variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="doc-interconnection" className="text-xs font-normal flex justify-between">
                    <span>Utility Interconnection</span>
                    <span className="text-muted-foreground">Required</span>
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input id="doc-interconnection" type="file" className="flex-1 text-xs" />
                    <Button variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Additional information about this claim" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewClaimDialogOpen(false)}>Cancel</Button>
            <Button className="flex items-center gap-1">
              <Send className="h-4 w-4" /> Submit Claim
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Claim Details Dialog */}
      <Dialog open={isClaimDetailsDialogOpen} onOpenChange={setIsClaimDetailsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedClaim && (
            <>
              <DialogHeader>
                <div className="flex justify-between items-center">
                  <DialogTitle>Subsidy Claim {selectedClaim.id}</DialogTitle>
                  {getStatusBadge(selectedClaim.status)}
                </div>
                <DialogDescription>
                  Submitted on {formatDate(selectedClaim.submissionDate)}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Customer Information</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Name:</span>
                        <p>{selectedClaim.customerName}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Email:</span>
                        <p>{selectedClaim.customerEmail}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Phone:</span>
                        <p>{selectedClaim.customerPhone}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Installation Address:</span>
                        <p>{selectedClaim.installationAddress}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">System Information</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">System Size:</span>
                        <p>{selectedClaim.systemSize} kW</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">System Cost:</span>
                        <p>{formatCurrency(selectedClaim.systemCost)}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Subsidy Program:</span>
                        <p>{getProgramBadge(selectedClaim.subsidyProgram)}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Subsidy Amount:</span>
                        <p className="font-medium">{formatCurrency(selectedClaim.subsidyAmount)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Documents</h3>
                    <div className="space-y-2">
                      {selectedClaim.documents.map((doc: any, index: number) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-muted rounded-md">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{doc.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {getDocumentStatusBadge(doc.status)}
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {selectedClaim.notes && (
                    <div>
                      <h3 className="text-sm font-medium mb-2">Notes</h3>
                      <p className="text-sm p-2 bg-muted rounded-md">{selectedClaim.notes}</p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Claim Status</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Status:</span>
                        <span>{getStatusBadge(selectedClaim.status)}</span>
                      </div>
                      
                      {selectedClaim.approvalDate && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Approval Date:</span>
                          <span className="text-sm">{formatDate(selectedClaim.approvalDate)}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Payment Status:</span>
                        <span>{getPaymentStatusBadge(selectedClaim.paymentStatus)}</span>
                      </div>
                      
                      {selectedClaim.paymentDate && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Payment Date:</span>
                          <span className="text-sm">{formatDate(selectedClaim.paymentDate)}</span>
                        </div>
                      )}
                      
                      {selectedClaim.assignedTo && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Assigned To:</span>
                          <span className="text-sm">{selectedClaim.assignedTo}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Claim Timeline</h3>
                    <div className="space-y-3">
                      {selectedClaim.timeline.map((event: any, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="mt-0.5">
                            <History className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">{event.action}</div>
                            <div className="text-xs text-muted-foreground">
                              {formatDate(event.date)} by {event.user}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {selectedClaim.status === 'submitted' && (
                    <div className="border-t pt-4 mt-2">
                      <h3 className="text-sm font-medium mb-2">Actions</h3>
                      <div className="space-y-2">
                        <Button className="w-full flex items-center gap-1">
                          <User className="h-4 w-4" />
                          Assign to Me
                        </Button>
                        <Button className="w-full flex items-center gap-1" variant="outline">
                          <ArrowRight className="h-4 w-4" />
                          Move to Review
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {selectedClaim.status === 'in review' && (
                    <div className="border-t pt-4 mt-2">
                      <h3 className="text-sm font-medium mb-2">Actions</h3>
                      <div className="space-y-2">
                        <Button className="w-full flex items-center gap-1" variant="outline">
                          <FileWarning className="h-4 w-4" />
                          Request Documents
                        </Button>
                        <div className="grid grid-cols-2 gap-2">
                          <Button className="flex items-center gap-1" variant="outline">
                            <XCircle className="h-4 w-4" />
                            Reject
                          </Button>
                          <Button className="flex items-center gap-1">
                            <CheckCircle2 className="h-4 w-4" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {selectedClaim.status === 'approved' && selectedClaim.paymentStatus === 'pending' && (
                    <div className="border-t pt-4 mt-2">
                      <h3 className="text-sm font-medium mb-2">Actions</h3>
                      <Button className="w-full flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        Process Payment
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              <DialogFooter>
                <div className="flex justify-between w-full">
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                    <Button variant="outline" className="flex items-center gap-1">
                      <Printer className="h-4 w-4" />
                      Print
                    </Button>
                  </div>
                  <Button variant="outline" onClick={() => setIsClaimDetailsDialogOpen(false)}>
                    Close
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}