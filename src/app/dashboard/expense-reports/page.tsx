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
import { Search, Filter, Plus, MoreHorizontal, Download, Send, DollarSign, Calendar, Clock, CheckCircle2, XCircle, AlertCircle, CreditCard, User, ArrowUpRight, BarChart3, Printer, FileText, Upload, Building2, Users, Tag, Receipt, FileSpreadsheet } from 'lucide-react';

export default function ExpenseReportsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewExpenseDialogOpen, setIsNewExpenseDialogOpen] = useState(false);
  const [isExpenseDetailsDialogOpen, setIsExpenseDetailsDialogOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<any>(null);
  
  // Mock data for expense reports
  const expenses = [
    { 
      id: 'EXP-2023-0001',
      employeeName: 'Robert Chen',
      employeeEmail: 'robert.chen@example.com',
      department: 'Sales',
      title: 'Client Meeting Expenses',
      amount: 125.75,
      date: '2023-07-15T10:30:00',
      category: 'Travel',
      status: 'approved',
      paymentStatus: 'reimbursed',
      paymentDate: '2023-07-20T14:30:00',
      approvedBy: 'Sarah Johnson',
      approvedDate: '2023-07-18T09:15:00',
      receiptUrl: '/receipts/exp-2023-0001.pdf',
      items: [
        { description: 'Taxi fare', amount: 45.50, category: 'Transportation' },
        { description: 'Lunch with client', amount: 80.25, category: 'Meals' }
      ],
      notes: 'Meeting with potential client to discuss solar panel installation options.'
    },
    { 
      id: 'EXP-2023-0002',
      employeeName: 'Priya Sharma',
      employeeEmail: 'priya.sharma@example.com',
      department: 'Sales',
      title: 'Trade Show Expenses',
      amount: 850.00,
      date: '2023-07-22T09:45:00',
      category: 'Marketing',
      status: 'approved',
      paymentStatus: 'reimbursed',
      paymentDate: '2023-07-28T11:20:00',
      approvedBy: 'Sarah Johnson',
      approvedDate: '2023-07-25T14:30:00',
      receiptUrl: '/receipts/exp-2023-0002.pdf',
      items: [
        { description: 'Booth rental fee', amount: 500.00, category: 'Marketing' },
        { description: 'Promotional materials', amount: 250.00, category: 'Marketing' },
        { description: 'Refreshments for visitors', amount: 100.00, category: 'Meals' }
      ],
      notes: 'Expenses for the Renewable Energy Trade Show.'
    },
    { 
      id: 'EXP-2023-0003',
      employeeName: 'Amit Patel',
      employeeEmail: 'amit.patel@example.com',
      department: 'Service & Installation',
      title: 'Tool Purchases',
      amount: 435.25,
      date: '2023-07-25T15:20:00',
      category: 'Equipment',
      status: 'approved',
      paymentStatus: 'reimbursed',
      paymentDate: '2023-07-30T10:15:00',
      approvedBy: 'Michael Rodriguez',
      approvedDate: '2023-07-27T11:45:00',
      receiptUrl: '/receipts/exp-2023-0003.pdf',
      items: [
        { description: 'Specialized solar panel mounting tools', amount: 325.75, category: 'Equipment' },
        { description: 'Safety harness replacement parts', amount: 109.50, category: 'Safety' }
      ],
      notes: 'Replacement tools needed for upcoming installation projects.'
    },
    { 
      id: 'EXP-2023-0004',
      employeeName: 'Lisa Wong',
      employeeEmail: 'lisa.wong@example.com',
      department: 'Admin & Shared Services',
      title: 'Office Supplies',
      amount: 215.30,
      date: '2023-07-28T13:10:00',
      category: 'Office',
      status: 'approved',
      paymentStatus: 'reimbursed',
      paymentDate: '2023-08-02T09:30:00',
      approvedBy: 'Michael Rodriguez',
      approvedDate: '2023-07-30T10:20:00',
      receiptUrl: '/receipts/exp-2023-0004.pdf',
      items: [
        { description: 'Printer paper and toner', amount: 145.80, category: 'Office' },
        { description: 'Filing supplies', amount: 69.50, category: 'Office' }
      ],
      notes: 'Monthly office supply replenishment.'
    },
    { 
      id: 'EXP-2023-0005',
      employeeName: 'Robert Chen',
      employeeEmail: 'robert.chen@example.com',
      department: 'Sales',
      title: 'Client Dinner',
      amount: 210.45,
      date: '2023-08-05T19:30:00',
      category: 'Meals',
      status: 'pending',
      paymentStatus: 'pending',
      paymentDate: null,
      approvedBy: null,
      approvedDate: null,
      receiptUrl: '/receipts/exp-2023-0005.pdf',
      items: [
        { description: 'Dinner with potential commercial client', amount: 210.45, category: 'Meals' }
      ],
      notes: 'Dinner meeting with ABC Corporation representatives to discuss large-scale solar installation.'
    },
    { 
      id: 'EXP-2023-0006',
      employeeName: 'Priya Sharma',
      employeeEmail: 'priya.sharma@example.com',
      department: 'Sales',
      title: 'Mileage Reimbursement',
      amount: 87.50,
      date: '2023-08-08T09:15:00',
      category: 'Travel',
      status: 'pending',
      paymentStatus: 'pending',
      paymentDate: null,
      approvedBy: null,
      approvedDate: null,
      receiptUrl: '/receipts/exp-2023-0006.pdf',
      items: [
        { description: 'Mileage for client visits (175 miles)', amount: 87.50, category: 'Transportation' }
      ],
      notes: 'Visited 3 potential residential clients for site assessments.'
    },
    { 
      id: 'EXP-2023-0007',
      employeeName: 'Amit Patel',
      employeeEmail: 'amit.patel@example.com',
      department: 'Service & Installation',
      title: 'Safety Equipment',
      amount: 345.75,
      date: '2023-08-10T11:30:00',
      category: 'Safety',
      status: 'pending',
      paymentStatus: 'pending',
      paymentDate: null,
      approvedBy: null,
      approvedDate: null,
      receiptUrl: '/receipts/exp-2023-0007.pdf',
      items: [
        { description: 'New safety helmets (3)', amount: 225.00, category: 'Safety' },
        { description: 'High-visibility vests (5)', amount: 120.75, category: 'Safety' }
      ],
      notes: 'Replacement safety equipment for installation team.'
    },
    { 
      id: 'EXP-2023-0008',
      employeeName: 'Lisa Wong',
      employeeEmail: 'lisa.wong@example.com',
      department: 'Admin & Shared Services',
      title: 'Software Subscription',
      amount: 299.99,
      date: '2023-08-12T14:45:00',
      category: 'Software',
      status: 'rejected',
      paymentStatus: 'not reimbursed',
      paymentDate: null,
      approvedBy: 'Michael Rodriguez',
      approvedDate: '2023-08-14T10:15:00',
      receiptUrl: '/receipts/exp-2023-0008.pdf',
      items: [
        { description: 'Annual subscription for design software', amount: 299.99, category: 'Software' }
      ],
      notes: 'Rejected: Please use IT procurement process for software purchases.'
    },
  ];

  // Filter expenses based on active tab and search query
  const filteredExpenses = expenses.filter(expense => {
    // Filter by tab
    if (activeTab === 'pending' && expense.status !== 'pending') return false;
    if (activeTab === 'approved' && expense.status !== 'approved') return false;
    if (activeTab === 'rejected' && expense.status !== 'rejected') return false;
    if (activeTab === 'reimbursed' && expense.paymentStatus !== 'reimbursed') return false;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        expense.id.toLowerCase().includes(query) ||
        expense.employeeName.toLowerCase().includes(query) ||
        expense.employeeEmail.toLowerCase().includes(query) ||
        expense.department.toLowerCase().includes(query) ||
        expense.title.toLowerCase().includes(query) ||
        expense.category.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Approved</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'reimbursed':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Reimbursed</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Pending</Badge>;
      case 'not reimbursed':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Not Reimbursed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getCategoryBadge = (category: string) => {
    const categoryColors: Record<string, { bg: string, text: string, border: string }> = {
      'Travel': { bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-200' },
      'Meals': { bg: 'bg-orange-50', text: 'text-orange-800', border: 'border-orange-200' },
      'Marketing': { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-200' },
      'Equipment': { bg: 'bg-indigo-50', text: 'text-indigo-800', border: 'border-indigo-200' },
      'Office': { bg: 'bg-gray-50', text: 'text-gray-800', border: 'border-gray-200' },
      'Software': { bg: 'bg-cyan-50', text: 'text-cyan-800', border: 'border-cyan-200' },
      'Safety': { bg: 'bg-red-50', text: 'text-red-800', border: 'border-red-200' },
      'Transportation': { bg: 'bg-green-50', text: 'text-green-800', border: 'border-green-200' },
    };
    
    const colors = categoryColors[category] || { bg: 'bg-gray-50', text: 'text-gray-800', border: 'border-gray-200' };
    
    return (
      <Badge variant="outline" className={`${colors.bg} ${colors.text} ${colors.border}`}>
        {category}
      </Badge>
    );
  };

  const handleOpenExpenseDetails = (expense: any) => {
    setSelectedExpense(expense);
    setIsExpenseDetailsDialogOpen(true);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const calculateTotalExpenses = () => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  const calculatePendingExpenses = () => {
    return expenses
      .filter(expense => expense.status === 'pending')
      .reduce((sum, expense) => sum + expense.amount, 0);
  };

  const calculateExpensesByDepartment = () => {
    const departmentTotals: Record<string, number> = {};
    
    expenses.forEach(expense => {
      if (!departmentTotals[expense.department]) {
        departmentTotals[expense.department] = 0;
      }
      departmentTotals[expense.department] += expense.amount;
    });
    
    return departmentTotals;
  };

  const calculateExpensesByCategory = () => {
    const categoryTotals: Record<string, number> = {};
    
    expenses.forEach(expense => {
      if (!categoryTotals[expense.category]) {
        categoryTotals[expense.category] = 0;
      }
      categoryTotals[expense.category] += expense.amount;
    });
    
    return categoryTotals;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Expense Reports</h1>
        <Button onClick={() => setIsNewExpenseDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Submit Expense
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search expenses..." 
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
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
              <TabsTrigger value="reimbursed">Reimbursed</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Expense List</CardTitle>
          <CardDescription>
            {filteredExpenses.length} expense{filteredExpenses.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredExpenses.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell className="font-medium">{expense.id}</TableCell>
                    <TableCell>
                      <div>
                        <div>{expense.employeeName}</div>
                        <div className="text-xs text-muted-foreground">{expense.department}</div>
                      </div>
                    </TableCell>
                    <TableCell>{expense.title}</TableCell>
                    <TableCell>{formatDate(expense.date)}</TableCell>
                    <TableCell>{getCategoryBadge(expense.category)}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(expense.amount)}</TableCell>
                    <TableCell>
                      {getStatusBadge(expense.status)}
                    </TableCell>
                    <TableCell>
                      {getPaymentStatusBadge(expense.paymentStatus)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenExpenseDetails(expense)}>
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
              <Receipt className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No expenses found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Expense Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Expenses</span>
                <span className="font-medium">{expenses.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Pending Approval</span>
                <span className="font-medium">{expenses.filter(e => e.status === 'pending').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Approved</span>
                <span className="font-medium text-green-600">{expenses.filter(e => e.status === 'approved').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Rejected</span>
                <span className="font-medium text-red-600">{expenses.filter(e => e.status === 'rejected').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Reimbursed</span>
                <span className="font-medium text-blue-600">{expenses.filter(e => e.paymentStatus === 'reimbursed').length}</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Amount</span>
                  <span className="font-medium">{formatCurrency(calculateTotalExpenses())}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Pending Amount</span>
                  <span className="font-medium text-amber-600">{formatCurrency(calculatePendingExpenses())}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Expenses by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(calculateExpensesByDepartment())
                .sort((a, b) => b[1] - a[1])
                .map(([department, total], index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{department}</span>
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
            <CardTitle className="text-sm font-medium">Expenses by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(calculateExpensesByCategory())
                .sort((a, b) => b[1] - a[1])
                .map(([category, total], index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{category}</span>
                    </div>
                    <span className="font-medium">{formatCurrency(total)}</span>
                  </div>
                ))
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Expense Dialog */}
      <Dialog open={isNewExpenseDialogOpen} onOpenChange={setIsNewExpenseDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Submit Expense</DialogTitle>
            <DialogDescription>
              Submit a new expense for approval and reimbursement.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="expense-title">Expense Title</Label>
              <Input id="expense-title" placeholder="Brief description of expense" />
            </div>
            
            <div>
              <Label htmlFor="expense-category">Category</Label>
              <Select>
                <SelectTrigger id="expense-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="meals">Meals</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="office">Office</SelectItem>
                  <SelectItem value="software">Software</SelectItem>
                  <SelectItem value="safety">Safety</SelectItem>
                  <SelectItem value="transportation">Transportation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="expense-date">Date of Expense</Label>
              <Input id="expense-date" type="date" />
            </div>
            
            <div>
              <Label htmlFor="expense-amount">Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="expense-amount" type="number" min="0" step="0.01" className="pl-8" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="expense-department">Department</Label>
              <Select>
                <SelectTrigger id="expense-department">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="service">Service & Installation</SelectItem>
                  <SelectItem value="admin">Admin & Shared Services</SelectItem>
                  <SelectItem value="warehouse">Warehouse & Inventory</SelectItem>
                  <SelectItem value="documentation">Documentation & Compliance</SelectItem>
                  <SelectItem value="telecom">Tele-Communication</SelectItem>
                  <SelectItem value="subsidy">Subsidy</SelectItem>
                  <SelectItem value="finance">Accounts & Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="expense-receipt">Upload Receipt</Label>
              <div className="flex items-center gap-2">
                <Input id="expense-receipt" type="file" className="flex-1" />
                <Button variant="outline" size="icon">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Upload receipt or invoice (PDF, JPG, PNG)</p>
            </div>
            
            <div>
              <Label htmlFor="expense-notes">Notes</Label>
              <Textarea id="expense-notes" placeholder="Additional details about this expense" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewExpenseDialogOpen(false)}>Cancel</Button>
            <Button className="flex items-center gap-1">
              <Send className="h-4 w-4" /> Submit for Approval
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Expense Details Dialog */}
      <Dialog open={isExpenseDetailsDialogOpen} onOpenChange={setIsExpenseDetailsDialogOpen}>
        <DialogContent className="max-w-lg">
          {selectedExpense && (
            <>
              <DialogHeader>
                <div className="flex justify-between items-center">
                  <DialogTitle>Expense {selectedExpense.id}</DialogTitle>
                  {getStatusBadge(selectedExpense.status)}
                </div>
                <DialogDescription>
                  {selectedExpense.title} - {formatDate(selectedExpense.date)}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Submitted By:</span>
                  <span className="text-sm">{selectedExpense.employeeName}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Department:</span>
                  <span className="text-sm">{selectedExpense.department}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Category:</span>
                  <span>{getCategoryBadge(selectedExpense.category)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Amount:</span>
                  <span className="font-medium">{formatCurrency(selectedExpense.amount)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Status:</span>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(selectedExpense.status)}
                    {selectedExpense.approvedBy && (
                      <span className="text-xs text-muted-foreground">
                        by {selectedExpense.approvedBy} on {formatDate(selectedExpense.approvedDate)}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Payment Status:</span>
                  <div className="flex items-center gap-2">
                    {getPaymentStatusBadge(selectedExpense.paymentStatus)}
                    {selectedExpense.paymentDate && (
                      <span className="text-xs text-muted-foreground">
                        on {formatDate(selectedExpense.paymentDate)}
                      </span>
                    )}
                  </div>
                </div>
                
                {selectedExpense.notes && (
                  <div>
                    <span className="text-sm font-medium">Notes:</span>
                    <p className="text-sm mt-1 p-2 bg-muted rounded-md">{selectedExpense.notes}</p>
                  </div>
                )}
                
                <div className="border-t pt-4 mt-2">
                  <h3 className="text-sm font-medium mb-2">Expense Items</h3>
                  <div className="max-h-40 overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Description</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedExpense.items.map((item: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell className="text-xs">{item.description}</TableCell>
                            <TableCell className="text-xs">{item.category}</TableCell>
                            <TableCell className="text-xs">{formatCurrency(item.amount)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Receipt:</span>
                  <Button variant="outline" size="sm" className="flex items-center gap-1 text-xs">
                    <FileText className="h-3 w-3" />
                    View Receipt
                  </Button>
                </div>
                
                {selectedExpense.status === 'pending' && (
                  <div className="border-t pt-4 mt-2">
                    <h3 className="text-sm font-medium mb-2">Approval Actions</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 flex items-center gap-1">
                        <XCircle className="h-4 w-4" />
                        Reject
                      </Button>
                      <Button className="flex-1 flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" />
                        Approve
                      </Button>
                    </div>
                  </div>
                )}
                
                {selectedExpense.status === 'approved' && selectedExpense.paymentStatus === 'pending' && (
                  <div className="border-t pt-4 mt-2">
                    <h3 className="text-sm font-medium mb-2">Payment Actions</h3>
                    <Button className="w-full flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      Mark as Reimbursed
                    </Button>
                  </div>
                )}
              </div>
              <DialogFooter>
                <div className="flex justify-between w-full">
                  <Button variant="outline" className="flex items-center gap-1">
                    <FileSpreadsheet className="h-4 w-4" />
                    Export Details
                  </Button>
                  <Button variant="outline" onClick={() => setIsExpenseDetailsDialogOpen(false)}>
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