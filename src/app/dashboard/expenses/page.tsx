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
import { Receipt, Search, Filter, Plus, MoreHorizontal, Download, Send, DollarSign, Calendar, Clock, CheckCircle2, XCircle, AlertCircle, CreditCard, User, ArrowUpRight, BarChart3, Printer, FileText, Upload, Building2, Users, Tag } from 'lucide-react';

export default function ExpensesPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewExpenseDialogOpen, setIsNewExpenseDialogOpen] = useState(false);
  const [isExpenseDetailsDialogOpen, setIsExpenseDetailsDialogOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<any>(null);
  
  // Mock data for expenses
  const expenses = [
    { 
      id: 'EXP-2023-0001',
      employeeName: 'Robert Chen',
      employeeEmail: 'robert.chen@example.com',
      department: 'Sales',
      category: 'Travel',
      amount: 450.75,
      date: '2023-07-10T09:30:00',
      status: 'approved',
      approvedBy: 'Sarah Johnson',
      approvedDate: '2023-07-12T14:20:00',
      paymentStatus: 'reimbursed',
      paymentDate: '2023-07-15T10:30:00',
      description: 'Client visit to Mumbai - flight tickets',
      receiptUrl: '/receipts/exp-0001.pdf',
      tags: ['client-visit', 'sales-trip']
    },
    { 
      id: 'EXP-2023-0002',
      employeeName: 'Robert Chen',
      employeeEmail: 'robert.chen@example.com',
      department: 'Sales',
      category: 'Accommodation',
      amount: 850.00,
      date: '2023-07-10T10:15:00',
      status: 'approved',
      approvedBy: 'Sarah Johnson',
      approvedDate: '2023-07-12T14:25:00',
      paymentStatus: 'reimbursed',
      paymentDate: '2023-07-15T10:30:00',
      description: 'Hotel stay in Mumbai - 2 nights',
      receiptUrl: '/receipts/exp-0002.pdf',
      tags: ['client-visit', 'sales-trip']
    },
    { 
      id: 'EXP-2023-0003',
      employeeName: 'Sarah Johnson',
      employeeEmail: 'sarah.johnson@example.com',
      department: 'Operations',
      category: 'Office Supplies',
      amount: 125.50,
      date: '2023-07-15T11:45:00',
      status: 'approved',
      approvedBy: 'Michael Director',
      approvedDate: '2023-07-16T09:20:00',
      paymentStatus: 'reimbursed',
      paymentDate: '2023-07-18T14:30:00',
      description: 'Printer cartridges and paper supplies',
      receiptUrl: '/receipts/exp-0003.pdf',
      tags: ['office', 'supplies']
    },
    { 
      id: 'EXP-2023-0004',
      employeeName: 'Priya Sharma',
      employeeEmail: 'priya.sharma@example.com',
      department: 'Installation',
      category: 'Tools',
      amount: 350.25,
      date: '2023-07-18T13:30:00',
      status: 'pending',
      approvedBy: null,
      approvedDate: null,
      paymentStatus: 'pending',
      paymentDate: null,
      description: 'Replacement tools for installation team',
      receiptUrl: '/receipts/exp-0004.pdf',
      tags: ['installation', 'tools']
    },
    { 
      id: 'EXP-2023-0005',
      employeeName: 'David Wilson',
      employeeEmail: 'david.wilson@example.com',
      department: 'Marketing',
      category: 'Advertising',
      amount: 1200.00,
      date: '2023-07-20T10:00:00',
      status: 'approved',
      approvedBy: 'Michael Director',
      approvedDate: '2023-07-21T11:15:00',
      paymentStatus: 'pending',
      paymentDate: null,
      description: 'Facebook and Google ads for July campaign',
      receiptUrl: '/receipts/exp-0005.pdf',
      tags: ['marketing', 'digital']
    },
    { 
      id: 'EXP-2023-0006',
      employeeName: 'Amit Patel',
      employeeEmail: 'amit.patel@example.com',
      department: 'Tele-Communication',
      category: 'Software',
      amount: 750.00,
      date: '2023-07-22T09:45:00',
      status: 'rejected',
      approvedBy: 'Sarah Johnson',
      approvedDate: '2023-07-23T14:30:00',
      paymentStatus: 'not-reimbursed',
      paymentDate: null,
      description: 'CRM software subscription - rejected as duplicate payment',
      receiptUrl: '/receipts/exp-0006.pdf',
      tags: ['software', 'subscription']
    },
    { 
      id: 'EXP-2023-0007',
      employeeName: 'Emily Davis',
      employeeEmail: 'emily.davis@example.com',
      department: 'Documentation',
      category: 'Training',
      amount: 500.00,
      date: '2023-07-25T13:20:00',
      status: 'pending',
      approvedBy: null,
      approvedDate: null,
      paymentStatus: 'pending',
      paymentDate: null,
      description: 'Online course on document management systems',
      receiptUrl: '/receipts/exp-0007.pdf',
      tags: ['training', 'education']
    },
    { 
      id: 'EXP-2023-0008',
      employeeName: 'John Smith',
      employeeEmail: 'john.smith@example.com',
      department: 'Warehouse',
      category: 'Maintenance',
      amount: 275.50,
      date: '2023-07-26T11:10:00',
      status: 'pending',
      approvedBy: null,
      approvedDate: null,
      paymentStatus: 'pending',
      paymentDate: null,
      description: 'Warehouse shelving repairs',
      receiptUrl: '/receipts/exp-0008.pdf',
      tags: ['warehouse', 'maintenance']
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
        expense.category.toLowerCase().includes(query) ||
        expense.description.toLowerCase().includes(query)
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
        return <Badge variant="outline" className="border-green-200 text-green-800 bg-green-50">Reimbursed</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-amber-200 text-amber-800 bg-amber-50">Pending</Badge>;
      case 'not-reimbursed':
        return <Badge variant="outline" className="border-red-200 text-red-800 bg-red-50">Not Reimbursed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getCategoryBadge = (category: string) => {
    const categoryColors: Record<string, { bg: string, text: string, border: string }> = {
      'Travel': { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-200' },
      'Accommodation': { bg: 'bg-indigo-50', text: 'text-indigo-800', border: 'border-indigo-200' },
      'Office Supplies': { bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-200' },
      'Tools': { bg: 'bg-orange-50', text: 'text-orange-800', border: 'border-orange-200' },
      'Advertising': { bg: 'bg-pink-50', text: 'text-pink-800', border: 'border-pink-200' },
      'Software': { bg: 'bg-cyan-50', text: 'text-cyan-800', border: 'border-cyan-200' },
      'Training': { bg: 'bg-teal-50', text: 'text-teal-800', border: 'border-teal-200' },
      'Maintenance': { bg: 'bg-gray-50', text: 'text-gray-800', border: 'border-gray-200' },
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

  const calculatePendingReimbursements = () => {
    return expenses
      .filter(expense => expense.status === 'approved' && expense.paymentStatus === 'pending')
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
        <h1 className="text-2xl font-bold tracking-tight">Expenses</h1>
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
                  <TableHead>Department</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
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
                        <div className="text-xs text-muted-foreground">{expense.employeeEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>{expense.department}</TableCell>
                    <TableCell>{getCategoryBadge(expense.category)}</TableCell>
                    <TableCell>{formatCurrency(expense.amount)}</TableCell>
                    <TableCell>{formatDate(expense.date)}</TableCell>
                    <TableCell>
                      {getStatusBadge(expense.status)}
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
                <span className="font-medium text-green-600">{expenses.filter(e => e.paymentStatus === 'reimbursed').length}</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Amount</span>
                  <span className="font-medium">{formatCurrency(calculateTotalExpenses())}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Pending Reimbursements</span>
                  <span className="font-medium text-amber-600">{formatCurrency(calculatePendingReimbursements())}</span>
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
            <DialogTitle>Submit New Expense</DialogTitle>
            <DialogDescription>
              Submit a new expense for approval and reimbursement.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="expense-category">Expense Category</Label>
              <Select>
                <SelectTrigger id="expense-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="accommodation">Accommodation</SelectItem>
                  <SelectItem value="office-supplies">Office Supplies</SelectItem>
                  <SelectItem value="tools">Tools</SelectItem>
                  <SelectItem value="advertising">Advertising</SelectItem>
                  <SelectItem value="software">Software</SelectItem>
                  <SelectItem value="training">Training</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="amount" type="number" min="0" step="0.01" className="pl-8" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="expense-date">Date of Expense</Label>
              <Input id="expense-date" type="date" />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Provide details about this expense" />
            </div>
            
            <div>
              <Label htmlFor="department">Department</Label>
              <Select>
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="installation">Installation</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="tele-communication">Tele-Communication</SelectItem>
                  <SelectItem value="documentation">Documentation</SelectItem>
                  <SelectItem value="warehouse">Warehouse</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="receipt">Upload Receipt</Label>
              <div className="flex items-center gap-2">
                <Input id="receipt" type="file" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Upload receipt image or PDF (max 5MB)</p>
            </div>
            
            <div>
              <Label htmlFor="tags">Tags (Optional)</Label>
              <Input id="tags" placeholder="Enter tags separated by commas" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewExpenseDialogOpen(false)}>Cancel</Button>
            <Button>
              <Send className="mr-2 h-4 w-4" /> Submit for Approval
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Expense Details Dialog */}
      <Dialog open={isExpenseDetailsDialogOpen} onOpenChange={setIsExpenseDetailsDialogOpen}>
        <DialogContent className="max-w-md">
          {selectedExpense && (
            <>
              <DialogHeader>
                <div className="flex justify-between items-center">
                  <DialogTitle>Expense {selectedExpense.id}</DialogTitle>
                  {getStatusBadge(selectedExpense.status)}
                </div>
                <DialogDescription>
                  Submitted by {selectedExpense.employeeName} on {formatDate(selectedExpense.date)}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Amount:</span>
                  <span className="font-medium">{formatCurrency(selectedExpense.amount)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Category:</span>
                  <span>{getCategoryBadge(selectedExpense.category)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Department:</span>
                  <span className="text-sm">{selectedExpense.department}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Payment Status:</span>
                  <span>{getPaymentStatusBadge(selectedExpense.paymentStatus)}</span>
                </div>
                
                {selectedExpense.approvedBy && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Approved By:</span>
                    <span className="text-sm">{selectedExpense.approvedBy} on {formatDate(selectedExpense.approvedDate)}</span>
                  </div>
                )}
                
                {selectedExpense.paymentDate && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Reimbursed On:</span>
                    <span className="text-sm">{formatDate(selectedExpense.paymentDate)}</span>
                  </div>
                )}
                
                <div>
                  <span className="text-sm font-medium">Description:</span>
                  <p className="text-sm mt-1 p-2 bg-muted rounded-md">{selectedExpense.description}</p>
                </div>
                
                {selectedExpense.tags && selectedExpense.tags.length > 0 && (
                  <div>
                    <span className="text-sm font-medium">Tags:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedExpense.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Receipt:</span>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Download className="h-3 w-3" />
                    View Receipt
                  </Button>
                </div>
                
                {selectedExpense.status === 'pending' && (
                  <div className="border-t pt-4 mt-2">
                    <h3 className="text-sm font-medium mb-2">Approval Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="flex items-center gap-1">
                        <XCircle className="h-4 w-4 text-red-500" />
                        Reject
                      </Button>
                      <Button className="flex items-center gap-1">
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
                <Button variant="outline" onClick={() => setIsExpenseDetailsDialogOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}