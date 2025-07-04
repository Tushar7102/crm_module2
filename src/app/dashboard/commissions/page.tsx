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
import { Percent, Search, Filter, Plus, MoreHorizontal, Download, Send, DollarSign, Calendar, Clock, CheckCircle2, XCircle, AlertCircle, CreditCard, User, ArrowUpRight, BarChart3, Printer, FileText, Upload, Building2, Users, Tag, Calculator } from 'lucide-react';

export default function CommissionsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewCommissionDialogOpen, setIsNewCommissionDialogOpen] = useState(false);
  const [isCommissionDetailsDialogOpen, setIsCommissionDetailsDialogOpen] = useState(false);
  const [selectedCommission, setSelectedCommission] = useState<any>(null);
  
  // Mock data for commissions
  const commissions = [
    { 
      id: 'COM-2023-0001',
      employeeName: 'Robert Chen',
      employeeEmail: 'robert.chen@example.com',
      department: 'Sales',
      role: 'Sales Executive',
      amount: 2025.00,
      percentage: 1.5,
      baseAmount: 135000.00,
      period: 'July 2023',
      startDate: '2023-07-01T00:00:00',
      endDate: '2023-07-31T23:59:59',
      status: 'paid',
      paymentDate: '2023-08-05T10:30:00',
      relatedDeals: [
        { id: 'DEAL-2023-0045', customerName: 'John Smith', amount: 45000.00, date: '2023-07-10T09:30:00' },
        { id: 'DEAL-2023-0048', customerName: 'Michael Johnson', amount: 90000.00, date: '2023-07-15T14:20:00' }
      ],
      notes: 'Commission for July 2023 sales targets exceeded by 15%'
    },
    { 
      id: 'COM-2023-0002',
      employeeName: 'Priya Sharma',
      employeeEmail: 'priya.sharma@example.com',
      department: 'Sales',
      role: 'Sales Executive',
      amount: 1800.00,
      percentage: 1.5,
      baseAmount: 120000.00,
      period: 'July 2023',
      startDate: '2023-07-01T00:00:00',
      endDate: '2023-07-31T23:59:59',
      status: 'paid',
      paymentDate: '2023-08-05T10:30:00',
      relatedDeals: [
        { id: 'DEAL-2023-0046', customerName: 'Jane Doe', amount: 30000.00, date: '2023-07-12T11:45:00' },
        { id: 'DEAL-2023-0050', customerName: 'Emily Davis', amount: 45000.00, date: '2023-07-18T13:20:00' },
        { id: 'DEAL-2023-0052', customerName: 'David Wilson', amount: 45000.00, date: '2023-07-25T15:10:00' }
      ],
      notes: 'Commission for July 2023 sales targets met'
    },
    { 
      id: 'COM-2023-0003',
      employeeName: 'Amit Patel',
      employeeEmail: 'amit.patel@example.com',
      department: 'Sales',
      role: 'Senior Sales Executive',
      amount: 3600.00,
      percentage: 2.0,
      baseAmount: 180000.00,
      period: 'July 2023',
      startDate: '2023-07-01T00:00:00',
      endDate: '2023-07-31T23:59:59',
      status: 'paid',
      paymentDate: '2023-08-05T10:30:00',
      relatedDeals: [
        { id: 'DEAL-2023-0047', customerName: 'Sarah Thompson', amount: 75000.00, date: '2023-07-14T10:15:00' },
        { id: 'DEAL-2023-0051', customerName: 'James Brown', amount: 105000.00, date: '2023-07-22T09:45:00' }
      ],
      notes: 'Commission for July 2023 sales targets exceeded by 20%'
    },
    { 
      id: 'COM-2023-0004',
      employeeName: 'Sarah Johnson',
      employeeEmail: 'sarah.johnson@example.com',
      department: 'Sales',
      role: 'Sales Manager',
      amount: 2250.00,
      percentage: 0.5,
      baseAmount: 450000.00,
      period: 'July 2023',
      startDate: '2023-07-01T00:00:00',
      endDate: '2023-07-31T23:59:59',
      status: 'paid',
      paymentDate: '2023-08-05T10:30:00',
      relatedDeals: [
        { id: 'DEAL-2023-0045', customerName: 'John Smith', amount: 45000.00, date: '2023-07-10T09:30:00' },
        { id: 'DEAL-2023-0046', customerName: 'Jane Doe', amount: 30000.00, date: '2023-07-12T11:45:00' },
        { id: 'DEAL-2023-0047', customerName: 'Sarah Thompson', amount: 75000.00, date: '2023-07-14T10:15:00' },
        { id: 'DEAL-2023-0048', customerName: 'Michael Johnson', amount: 90000.00, date: '2023-07-15T14:20:00' },
        { id: 'DEAL-2023-0050', customerName: 'Emily Davis', amount: 45000.00, date: '2023-07-18T13:20:00' },
        { id: 'DEAL-2023-0051', customerName: 'James Brown', amount: 105000.00, date: '2023-07-22T09:45:00' },
        { id: 'DEAL-2023-0052', customerName: 'David Wilson', amount: 45000.00, date: '2023-07-25T15:10:00' },
        { id: 'DEAL-2023-0053', customerName: 'Lisa Anderson', amount: 15000.00, date: '2023-07-28T11:30:00' }
      ],
      notes: 'Team commission for July 2023'
    },
    { 
      id: 'COM-2023-0005',
      employeeName: 'Robert Chen',
      employeeEmail: 'robert.chen@example.com',
      department: 'Sales',
      role: 'Sales Executive',
      amount: 1950.00,
      percentage: 1.5,
      baseAmount: 130000.00,
      period: 'August 2023',
      startDate: '2023-08-01T00:00:00',
      endDate: '2023-08-31T23:59:59',
      status: 'pending',
      paymentDate: null,
      relatedDeals: [
        { id: 'DEAL-2023-0055', customerName: 'Thomas Wright', amount: 50000.00, date: '2023-08-05T10:30:00' },
        { id: 'DEAL-2023-0058', customerName: 'Jennifer Lee', amount: 80000.00, date: '2023-08-12T14:45:00' }
      ],
      notes: 'Commission for August 2023 sales'
    },
    { 
      id: 'COM-2023-0006',
      employeeName: 'Priya Sharma',
      employeeEmail: 'priya.sharma@example.com',
      department: 'Sales',
      role: 'Sales Executive',
      amount: 1650.00,
      percentage: 1.5,
      baseAmount: 110000.00,
      period: 'August 2023',
      startDate: '2023-08-01T00:00:00',
      endDate: '2023-08-31T23:59:59',
      status: 'pending',
      paymentDate: null,
      relatedDeals: [
        { id: 'DEAL-2023-0056', customerName: 'Robert Miller', amount: 35000.00, date: '2023-08-08T09:15:00' },
        { id: 'DEAL-2023-0059', customerName: 'Susan Clark', amount: 40000.00, date: '2023-08-15T11:30:00' },
        { id: 'DEAL-2023-0062', customerName: 'Kevin Taylor', amount: 35000.00, date: '2023-08-22T13:45:00' }
      ],
      notes: 'Commission for August 2023 sales'
    },
    { 
      id: 'COM-2023-0007',
      employeeName: 'Amit Patel',
      employeeEmail: 'amit.patel@example.com',
      department: 'Sales',
      role: 'Senior Sales Executive',
      amount: 3400.00,
      percentage: 2.0,
      baseAmount: 170000.00,
      period: 'August 2023',
      startDate: '2023-08-01T00:00:00',
      endDate: '2023-08-31T23:59:59',
      status: 'pending',
      paymentDate: null,
      relatedDeals: [
        { id: 'DEAL-2023-0057', customerName: 'Patricia Martinez', amount: 65000.00, date: '2023-08-10T15:20:00' },
        { id: 'DEAL-2023-0061', customerName: 'Daniel White', amount: 105000.00, date: '2023-08-20T10:45:00' }
      ],
      notes: 'Commission for August 2023 sales'
    },
    { 
      id: 'COM-2023-0008',
      employeeName: 'Sarah Johnson',
      employeeEmail: 'sarah.johnson@example.com',
      department: 'Sales',
      role: 'Sales Manager',
      amount: 2050.00,
      percentage: 0.5,
      baseAmount: 410000.00,
      period: 'August 2023',
      startDate: '2023-08-01T00:00:00',
      endDate: '2023-08-31T23:59:59',
      status: 'pending',
      paymentDate: null,
      relatedDeals: [
        { id: 'DEAL-2023-0055', customerName: 'Thomas Wright', amount: 50000.00, date: '2023-08-05T10:30:00' },
        { id: 'DEAL-2023-0056', customerName: 'Robert Miller', amount: 35000.00, date: '2023-08-08T09:15:00' },
        { id: 'DEAL-2023-0057', customerName: 'Patricia Martinez', amount: 65000.00, date: '2023-08-10T15:20:00' },
        { id: 'DEAL-2023-0058', customerName: 'Jennifer Lee', amount: 80000.00, date: '2023-08-12T14:45:00' },
        { id: 'DEAL-2023-0059', customerName: 'Susan Clark', amount: 40000.00, date: '2023-08-15T11:30:00' },
        { id: 'DEAL-2023-0061', customerName: 'Daniel White', amount: 105000.00, date: '2023-08-20T10:45:00' },
        { id: 'DEAL-2023-0062', customerName: 'Kevin Taylor', amount: 35000.00, date: '2023-08-22T13:45:00' }
      ],
      notes: 'Team commission for August 2023'
    },
  ];

  // Filter commissions based on active tab and search query
  const filteredCommissions = commissions.filter(commission => {
    // Filter by tab
    if (activeTab === 'pending' && commission.status !== 'pending') return false;
    if (activeTab === 'paid' && commission.status !== 'paid') return false;
    if (activeTab === 'july' && commission.period !== 'July 2023') return false;
    if (activeTab === 'august' && commission.period !== 'August 2023') return false;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        commission.id.toLowerCase().includes(query) ||
        commission.employeeName.toLowerCase().includes(query) ||
        commission.employeeEmail.toLowerCase().includes(query) ||
        commission.department.toLowerCase().includes(query) ||
        commission.role.toLowerCase().includes(query) ||
        commission.period.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    const roleColors: Record<string, { bg: string, text: string, border: string }> = {
      'Sales Executive': { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-200' },
      'Senior Sales Executive': { bg: 'bg-indigo-50', text: 'text-indigo-800', border: 'border-indigo-200' },
      'Sales Manager': { bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-200' },
    };
    
    const colors = roleColors[role] || { bg: 'bg-gray-50', text: 'text-gray-800', border: 'border-gray-200' };
    
    return (
      <Badge variant="outline" className={`${colors.bg} ${colors.text} ${colors.border}`}>
        {role}
      </Badge>
    );
  };

  const handleOpenCommissionDetails = (commission: any) => {
    setSelectedCommission(commission);
    setIsCommissionDetailsDialogOpen(true);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage.toFixed(1)}%`;
  };

  const calculateTotalCommissions = () => {
    return commissions.reduce((sum, commission) => sum + commission.amount, 0);
  };

  const calculatePendingCommissions = () => {
    return commissions
      .filter(commission => commission.status === 'pending')
      .reduce((sum, commission) => sum + commission.amount, 0);
  };

  const calculateCommissionsByEmployee = () => {
    const employeeTotals: Record<string, number> = {};
    
    commissions.forEach(commission => {
      if (!employeeTotals[commission.employeeName]) {
        employeeTotals[commission.employeeName] = 0;
      }
      employeeTotals[commission.employeeName] += commission.amount;
    });
    
    return employeeTotals;
  };

  const calculateCommissionsByPeriod = () => {
    const periodTotals: Record<string, number> = {};
    
    commissions.forEach(commission => {
      if (!periodTotals[commission.period]) {
        periodTotals[commission.period] = 0;
      }
      periodTotals[commission.period] += commission.amount;
    });
    
    return periodTotals;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Commissions</h1>
        <Button onClick={() => setIsNewCommissionDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Calculate Commission
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search commissions..." 
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
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="july">July</TabsTrigger>
              <TabsTrigger value="august">August</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Commission List</CardTitle>
          <CardDescription>
            {filteredCommissions.length} commission{filteredCommissions.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredCommissions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Base Amount</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCommissions.map((commission) => (
                  <TableRow key={commission.id}>
                    <TableCell className="font-medium">{commission.id}</TableCell>
                    <TableCell>
                      <div>
                        <div>{commission.employeeName}</div>
                        <div className="text-xs text-muted-foreground">{commission.employeeEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(commission.role)}</TableCell>
                    <TableCell>{commission.period}</TableCell>
                    <TableCell>{formatCurrency(commission.baseAmount)}</TableCell>
                    <TableCell>{formatPercentage(commission.percentage)}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(commission.amount)}</TableCell>
                    <TableCell>
                      {getStatusBadge(commission.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenCommissionDetails(commission)}>
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
              <Percent className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No commissions found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Commission Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Commissions</span>
                <span className="font-medium">{commissions.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Pending</span>
                <span className="font-medium">{commissions.filter(c => c.status === 'pending').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Paid</span>
                <span className="font-medium text-green-600">{commissions.filter(c => c.status === 'paid').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">July 2023</span>
                <span className="font-medium">{commissions.filter(c => c.period === 'July 2023').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">August 2023</span>
                <span className="font-medium">{commissions.filter(c => c.period === 'August 2023').length}</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Amount</span>
                  <span className="font-medium">{formatCurrency(calculateTotalCommissions())}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Pending Amount</span>
                  <span className="font-medium text-amber-600">{formatCurrency(calculatePendingCommissions())}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Commissions by Employee</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(calculateCommissionsByEmployee())
                .sort((a, b) => b[1] - a[1])
                .map(([employee, total], index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{employee}</span>
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
            <CardTitle className="text-sm font-medium">Commissions by Period</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(calculateCommissionsByPeriod())
                .sort((a, b) => {
                  // Sort by date (most recent first)
                  const dateA = new Date(a[0].split(' ')[0] + ' 1, ' + a[0].split(' ')[1]);
                  const dateB = new Date(b[0].split(' ')[0] + ' 1, ' + b[0].split(' ')[1]);
                  return dateB.getTime() - dateA.getTime();
                })
                .map(([period, total], index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{period}</span>
                    </div>
                    <span className="font-medium">{formatCurrency(total)}</span>
                  </div>
                ))
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Commission Dialog */}
      <Dialog open={isNewCommissionDialogOpen} onOpenChange={setIsNewCommissionDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Calculate Commission</DialogTitle>
            <DialogDescription>
              Calculate commission for an employee based on sales performance.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="employee">Employee</Label>
              <Select>
                <SelectTrigger id="employee">
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="robert">Robert Chen</SelectItem>
                  <SelectItem value="priya">Priya Sharma</SelectItem>
                  <SelectItem value="amit">Amit Patel</SelectItem>
                  <SelectItem value="sarah">Sarah Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="role">Role</Label>
              <Select>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales-exec">Sales Executive</SelectItem>
                  <SelectItem value="senior-sales-exec">Senior Sales Executive</SelectItem>
                  <SelectItem value="sales-manager">Sales Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="period">Commission Period</Label>
              <Select>
                <SelectTrigger id="period">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="july-2023">July 2023</SelectItem>
                  <SelectItem value="august-2023">August 2023</SelectItem>
                  <SelectItem value="september-2023">September 2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-date">Start Date</Label>
                <Input id="start-date" type="date" />
              </div>
              <div>
                <Label htmlFor="end-date">End Date</Label>
                <Input id="end-date" type="date" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="base-amount">Base Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="base-amount" type="number" min="0" step="0.01" className="pl-8" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Total sales amount for the period</p>
            </div>
            
            <div>
              <Label htmlFor="commission-rate">Commission Rate (%)</Label>
              <div className="relative">
                <Percent className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="commission-rate" type="number" min="0" step="0.1" className="pl-8" />
              </div>
            </div>
            
            <div className="border-t pt-4 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Calculated Commission:</span>
                <span className="font-medium text-lg">$0.00</span>
              </div>
            </div>
            
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Additional notes about this commission" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewCommissionDialogOpen(false)}>Cancel</Button>
            <Button className="flex items-center gap-1">
              <Calculator className="h-4 w-4" /> Calculate & Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Commission Details Dialog */}
      <Dialog open={isCommissionDetailsDialogOpen} onOpenChange={setIsCommissionDetailsDialogOpen}>
        <DialogContent className="max-w-lg">
          {selectedCommission && (
            <>
              <DialogHeader>
                <div className="flex justify-between items-center">
                  <DialogTitle>Commission {selectedCommission.id}</DialogTitle>
                  {getStatusBadge(selectedCommission.status)}
                </div>
                <DialogDescription>
                  {selectedCommission.employeeName} - {selectedCommission.period}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Role:</span>
                  <span>{getRoleBadge(selectedCommission.role)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Department:</span>
                  <span className="text-sm">{selectedCommission.department}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Period:</span>
                  <span className="text-sm">{formatDate(selectedCommission.startDate)} to {formatDate(selectedCommission.endDate)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Base Amount:</span>
                  <span className="font-medium">{formatCurrency(selectedCommission.baseAmount)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Commission Rate:</span>
                  <span className="font-medium">{formatPercentage(selectedCommission.percentage)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Commission Amount:</span>
                  <span className="font-medium text-green-600">{formatCurrency(selectedCommission.amount)}</span>
                </div>
                
                {selectedCommission.paymentDate && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Payment Date:</span>
                    <span className="text-sm">{formatDate(selectedCommission.paymentDate)}</span>
                  </div>
                )}
                
                {selectedCommission.notes && (
                  <div>
                    <span className="text-sm font-medium">Notes:</span>
                    <p className="text-sm mt-1 p-2 bg-muted rounded-md">{selectedCommission.notes}</p>
                  </div>
                )}
                
                <div className="border-t pt-4 mt-2">
                  <h3 className="text-sm font-medium mb-2">Related Deals</h3>
                  <div className="max-h-40 overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Deal ID</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedCommission.relatedDeals.map((deal: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell className="text-xs">{deal.id}</TableCell>
                            <TableCell className="text-xs">{deal.customerName}</TableCell>
                            <TableCell className="text-xs">{formatCurrency(deal.amount)}</TableCell>
                            <TableCell className="text-xs">{formatDate(deal.date)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                
                {selectedCommission.status === 'pending' && (
                  <div className="border-t pt-4 mt-2">
                    <h3 className="text-sm font-medium mb-2">Payment Actions</h3>
                    <Button className="w-full flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      Mark as Paid
                    </Button>
                  </div>
                )}
              </div>
              <DialogFooter>
                <div className="flex justify-between w-full">
                  <Button variant="outline" className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    Export Details
                  </Button>
                  <Button variant="outline" onClick={() => setIsCommissionDetailsDialogOpen(false)}>
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