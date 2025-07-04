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
import { FileText, Search, Filter, Plus, MoreHorizontal, Download, Send, DollarSign, Calendar, Clock, CheckCircle2, XCircle, AlertCircle, CreditCard, User, ArrowUpRight, BarChart3, Printer } from 'lucide-react';

export default function InvoicesPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewInvoiceDialogOpen, setIsNewInvoiceDialogOpen] = useState(false);
  const [isInvoiceDetailsDialogOpen, setIsInvoiceDetailsDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  
  // Mock data for invoices
  const invoices = [
    { 
      id: 'INV-2023-0568',
      customerName: 'John Smith',
      customerEmail: 'john.smith@example.com',
      amount: 12500.00,
      tax: 1000.00,
      total: 13500.00,
      date: '2023-07-10T09:30:00',
      dueDate: '2023-07-25T23:59:59',
      status: 'paid',
      paymentDate: '2023-07-15T14:20:00',
      paymentMethod: 'credit_card',
      items: [
        { description: 'Solar Panel Installation - 5kW System', quantity: 1, unitPrice: 10000.00, total: 10000.00 },
        { description: 'Battery Backup System - 10kWh', quantity: 1, unitPrice: 2500.00, total: 2500.00 }
      ],
      notes: 'Thank you for your business!',
      createdBy: 'Sarah Johnson'
    },
    { 
      id: 'INV-2023-0569',
      customerName: 'Jane Doe',
      customerEmail: 'jane.doe@example.com',
      amount: 8000.00,
      tax: 640.00,
      total: 8640.00,
      date: '2023-07-12T11:45:00',
      dueDate: '2023-07-27T23:59:59',
      status: 'pending',
      paymentDate: null,
      paymentMethod: null,
      items: [
        { description: 'Solar Panel Installation - 3kW System', quantity: 1, unitPrice: 6000.00, total: 6000.00 },
        { description: 'Inverter - 3kW', quantity: 1, unitPrice: 2000.00, total: 2000.00 }
      ],
      notes: 'Net 15 payment terms',
      createdBy: 'Robert Chen'
    },
    { 
      id: 'INV-2023-0570',
      customerName: 'Michael Johnson',
      customerEmail: 'michael.johnson@example.com',
      amount: 15000.00,
      tax: 1200.00,
      total: 16200.00,
      date: '2023-07-15T10:15:00',
      dueDate: '2023-07-30T23:59:59',
      status: 'pending',
      paymentDate: null,
      paymentMethod: null,
      items: [
        { description: 'Solar Panel Installation - 7kW System', quantity: 1, unitPrice: 14000.00, total: 14000.00 },
        { description: 'Monitoring System', quantity: 1, unitPrice: 1000.00, total: 1000.00 }
      ],
      notes: 'Net 15 payment terms',
      createdBy: 'Sarah Johnson'
    },
    { 
      id: 'INV-2023-0571',
      customerName: 'Emily Davis',
      customerEmail: 'emily.davis@example.com',
      amount: 9500.00,
      tax: 760.00,
      total: 10260.00,
      date: '2023-07-05T14:30:00',
      dueDate: '2023-07-20T23:59:59',
      status: 'overdue',
      paymentDate: null,
      paymentMethod: null,
      items: [
        { description: 'Solar Panel Installation - 4kW System', quantity: 1, unitPrice: 8000.00, total: 8000.00 },
        { description: 'Mounting Hardware', quantity: 1, unitPrice: 1500.00, total: 1500.00 }
      ],
      notes: 'Second reminder sent on July 22',
      createdBy: 'Robert Chen'
    },
    { 
      id: 'INV-2023-0572',
      customerName: 'David Wilson',
      customerEmail: 'david.wilson@example.com',
      amount: 11000.00,
      tax: 880.00,
      total: 11880.00,
      date: '2023-07-08T09:00:00',
      dueDate: '2023-07-23T23:59:59',
      status: 'paid',
      paymentDate: '2023-07-20T16:45:00',
      paymentMethod: 'bank_transfer',
      items: [
        { description: 'Solar Panel Installation - 5kW System', quantity: 1, unitPrice: 10000.00, total: 10000.00 },
        { description: 'Electrical Upgrades', quantity: 1, unitPrice: 1000.00, total: 1000.00 }
      ],
      notes: 'Thank you for your business!',
      createdBy: 'Sarah Johnson'
    },
    { 
      id: 'INV-2023-0573',
      customerName: 'Sarah Thompson',
      customerEmail: 'sarah.thompson@example.com',
      amount: 7500.00,
      tax: 600.00,
      total: 8100.00,
      date: '2023-07-18T13:20:00',
      dueDate: '2023-08-02T23:59:59',
      status: 'draft',
      paymentDate: null,
      paymentMethod: null,
      items: [
        { description: 'Solar Panel Installation - 3kW System', quantity: 1, unitPrice: 6000.00, total: 6000.00 },
        { description: 'Electrical Work', quantity: 1, unitPrice: 1500.00, total: 1500.00 }
      ],
      notes: 'Draft - pending final review',
      createdBy: 'Robert Chen'
    },
    { 
      id: 'INV-2023-0574',
      customerName: 'James Brown',
      customerEmail: 'james.brown@example.com',
      amount: 13500.00,
      tax: 1080.00,
      total: 14580.00,
      date: '2023-07-20T10:45:00',
      dueDate: '2023-08-04T23:59:59',
      status: 'pending',
      paymentDate: null,
      paymentMethod: null,
      items: [
        { description: 'Solar Panel Installation - 6kW System', quantity: 1, unitPrice: 12000.00, total: 12000.00 },
        { description: 'Monitoring System', quantity: 1, unitPrice: 1000.00, total: 1000.00 },
        { description: 'Extended Warranty', quantity: 1, unitPrice: 500.00, total: 500.00 }
      ],
      notes: 'Net 15 payment terms',
      createdBy: 'Sarah Johnson'
    },
  ];

  // Filter invoices based on active tab and search query
  const filteredInvoices = invoices.filter(invoice => {
    // Filter by tab
    if (activeTab === 'draft' && invoice.status !== 'draft') return false;
    if (activeTab === 'pending' && invoice.status !== 'pending') return false;
    if (activeTab === 'paid' && invoice.status !== 'paid') return false;
    if (activeTab === 'overdue' && invoice.status !== 'overdue') return false;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        invoice.id.toLowerCase().includes(query) ||
        invoice.customerName.toLowerCase().includes(query) ||
        invoice.customerEmail.toLowerCase().includes(query)
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
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Overdue</Badge>;
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Draft</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPaymentMethodBadge = (method: string | null) => {
    if (!method) return null;
    
    switch (method) {
      case 'credit_card':
        return <Badge variant="outline" className="border-blue-200 text-blue-800 bg-blue-50">Credit Card</Badge>;
      case 'bank_transfer':
        return <Badge variant="outline" className="border-purple-200 text-purple-800 bg-purple-50">Bank Transfer</Badge>;
      case 'cash':
        return <Badge variant="outline" className="border-green-200 text-green-800 bg-green-50">Cash</Badge>;
      case 'check':
        return <Badge variant="outline" className="border-amber-200 text-amber-800 bg-amber-50">Check</Badge>;
      default:
        return <Badge variant="outline">{method}</Badge>;
    }
  };

  const handleOpenInvoiceDetails = (invoice: any) => {
    setSelectedInvoice(invoice);
    setIsInvoiceDetailsDialogOpen(true);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  const calculateTotalRevenue = () => {
    return invoices
      .filter(invoice => invoice.status === 'paid')
      .reduce((sum, invoice) => sum + invoice.total, 0);
  };

  const calculatePendingRevenue = () => {
    return invoices
      .filter(invoice => invoice.status === 'pending' || invoice.status === 'overdue')
      .reduce((sum, invoice) => sum + invoice.total, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Invoices</h1>
        <Button onClick={() => setIsNewInvoiceDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> New Invoice
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search invoices..." 
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
              <TabsTrigger value="draft">Draft</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="overdue">Overdue</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoice List</CardTitle>
          <CardDescription>
            {filteredInvoices.length} invoice{filteredInvoices.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredInvoices.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>
                      <div>
                        <div>{invoice.customerName}</div>
                        <div className="text-xs text-muted-foreground">{invoice.customerEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(invoice.total)}</TableCell>
                    <TableCell>{formatDate(invoice.date)}</TableCell>
                    <TableCell>
                      <div>
                        {formatDate(invoice.dueDate)}
                        {invoice.status === 'pending' && isOverdue(invoice.dueDate) && (
                          <div className="text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Overdue
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(invoice.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenInvoiceDetails(invoice)}>
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
              <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No invoices found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Invoice Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Invoices</span>
                <span className="font-medium">{invoices.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Draft</span>
                <span className="font-medium">{invoices.filter(i => i.status === 'draft').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Pending</span>
                <span className="font-medium">{invoices.filter(i => i.status === 'pending').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Paid</span>
                <span className="font-medium text-green-600">{invoices.filter(i => i.status === 'paid').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Overdue</span>
                <span className="font-medium text-red-600">{invoices.filter(i => i.status === 'overdue').length}</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Revenue</span>
                  <span className="font-medium text-green-600">{formatCurrency(calculateTotalRevenue())}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Pending Revenue</span>
                  <span className="font-medium text-amber-600">{formatCurrency(calculatePendingRevenue())}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recent Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoices
                .filter(invoice => invoice.status === 'paid')
                .sort((a, b) => new Date(b.paymentDate!).getTime() - new Date(a.paymentDate!).getTime())
                .slice(0, 4)
                .map((invoice, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="bg-green-100 p-1 rounded-full">
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                    </div>
                    <div className="text-sm flex-1">
                      <div className="flex justify-between">
                        <p>
                          <span className="font-medium">{invoice.customerName}</span> paid {' '}
                          <span className="font-medium">{formatCurrency(invoice.total)}</span>
                        </p>
                        <span className="text-xs text-muted-foreground">{formatDate(invoice.paymentDate)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <CreditCard className="h-3 w-3" />
                        {invoice.paymentMethod === 'credit_card' ? 'Credit Card' : 
                         invoice.paymentMethod === 'bank_transfer' ? 'Bank Transfer' : 
                         invoice.paymentMethod === 'cash' ? 'Cash' : 'Check'}
                      </div>
                    </div>
                  </div>
                ))
              }
              {invoices.filter(invoice => invoice.status === 'paid').length === 0 && (
                <div className="text-center py-4 text-muted-foreground">
                  <p className="text-sm">No payments recorded yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoices
                .filter(invoice => invoice.status === 'pending')
                .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                .slice(0, 4)
                .map((invoice, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className={`p-1 rounded-full ${isOverdue(invoice.dueDate) ? 'bg-red-100' : 'bg-amber-100'}`}>
                      {isOverdue(invoice.dueDate) ? (
                        <AlertCircle className="h-3 w-3 text-red-600" />
                      ) : (
                        <Clock className="h-3 w-3 text-amber-600" />
                      )}
                    </div>
                    <div className="text-sm flex-1">
                      <div className="flex justify-between">
                        <p>
                          <span className="font-medium">{invoice.customerName}</span> {' '}
                          <span className="font-medium">{formatCurrency(invoice.total)}</span>
                        </p>
                        <span className={`text-xs ${isOverdue(invoice.dueDate) ? 'text-red-500' : 'text-muted-foreground'}`}>
                          Due {formatDate(invoice.dueDate)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        Invoice {invoice.id}
                      </div>
                    </div>
                  </div>
                ))
              }
              {invoices.filter(invoice => invoice.status === 'pending').length === 0 && (
                <div className="text-center py-4 text-muted-foreground">
                  <p className="text-sm">No upcoming payments</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Invoice Dialog */}
      <Dialog open={isNewInvoiceDialogOpen} onOpenChange={setIsNewInvoiceDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create New Invoice</DialogTitle>
            <DialogDescription>
              Create a new invoice for a customer.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customer">Customer</Label>
                <Select>
                  <SelectTrigger id="customer">
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john">John Smith</SelectItem>
                    <SelectItem value="jane">Jane Doe</SelectItem>
                    <SelectItem value="michael">Michael Johnson</SelectItem>
                    <SelectItem value="emily">Emily Davis</SelectItem>
                    <SelectItem value="david">David Wilson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="invoice-date">Invoice Date</Label>
                <Input id="invoice-date" type="date" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="due-date">Due Date</Label>
                <Input id="due-date" type="date" />
              </div>
              <div>
                <Label htmlFor="invoice-number">Invoice Number</Label>
                <Input id="invoice-number" placeholder="INV-2023-XXXX" />
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">Invoice Items</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-6">
                    <Label htmlFor="item-description">Description</Label>
                    <Input id="item-description" placeholder="Item description" />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="item-quantity">Quantity</Label>
                    <Input id="item-quantity" type="number" min="1" />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="item-price">Unit Price</Label>
                    <Input id="item-price" type="number" min="0" step="0.01" />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="item-total">Total</Label>
                    <Input id="item-total" type="number" disabled />
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Add Item
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Input id="notes" placeholder="Additional notes for the customer" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Subtotal:</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Tax (8%):</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-sm font-medium">Total:</span>
                  <span className="font-medium">$0.00</span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewInvoiceDialogOpen(false)}>Cancel</Button>
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" /> Save as Draft
            </Button>
            <Button>
              <Send className="mr-2 h-4 w-4" /> Create & Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Invoice Details Dialog */}
      <Dialog open={isInvoiceDetailsDialogOpen} onOpenChange={setIsInvoiceDetailsDialogOpen}>
        <DialogContent className="max-w-4xl">
          {selectedInvoice && (
            <>
              <DialogHeader>
                <div className="flex justify-between items-center">
                  <DialogTitle>Invoice {selectedInvoice.id}</DialogTitle>
                  {getStatusBadge(selectedInvoice.status)}
                </div>
                <DialogDescription>
                  Created on {formatDate(selectedInvoice.date)} by {selectedInvoice.createdBy}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Bill To</h3>
                    <div>
                      <div className="font-medium">{selectedInvoice.customerName}</div>
                      <div className="text-sm">{selectedInvoice.customerEmail}</div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Invoice Date:</span>
                      <span className="text-sm">{formatDate(selectedInvoice.date)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Due Date:</span>
                      <span className="text-sm">{formatDate(selectedInvoice.dueDate)}</span>
                    </div>
                    {selectedInvoice.status === 'paid' && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Payment Date:</span>
                        <span className="text-sm">{formatDate(selectedInvoice.paymentDate)}</span>
                      </div>
                    )}
                    {selectedInvoice.paymentMethod && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Payment Method:</span>
                        <span className="text-sm">
                          {getPaymentMethodBadge(selectedInvoice.paymentMethod)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Unit Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedInvoice.items.map((item: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{item.description}</TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
                          <TableCell className="text-right">{formatCurrency(item.total)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="flex justify-end">
                  <div className="w-1/3 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Subtotal:</span>
                      <span className="font-medium">{formatCurrency(selectedInvoice.amount)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Tax:</span>
                      <span className="font-medium">{formatCurrency(selectedInvoice.tax)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-sm font-medium">Total:</span>
                      <span className="font-medium">{formatCurrency(selectedInvoice.total)}</span>
                    </div>
                  </div>
                </div>
                
                {selectedInvoice.notes && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Notes</h3>
                    <p className="text-sm p-3 bg-muted rounded-md">{selectedInvoice.notes}</p>
                  </div>
                )}
                
                {selectedInvoice.status === 'pending' && (
                  <div className="border-t pt-4">
                    <h3 className="text-sm font-medium mb-2">Record Payment</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="payment-date">Payment Date</Label>
                        <Input id="payment-date" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="payment-method">Payment Method</Label>
                        <Select>
                          <SelectTrigger id="payment-method">
                            <SelectValue placeholder="Select method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="credit_card">Credit Card</SelectItem>
                            <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                            <SelectItem value="cash">Cash</SelectItem>
                            <SelectItem value="check">Check</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="payment-amount">Amount</Label>
                        <Input id="payment-amount" type="number" value={selectedInvoice.total} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter>
                <div className="flex justify-between w-full">
                  <div>
                    <Button variant="outline" className="flex items-center gap-1 mr-2">
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                    <Button variant="outline" className="flex items-center gap-1">
                      <Printer className="h-4 w-4" />
                      Print
                    </Button>
                  </div>
                  <div>
                    {selectedInvoice.status === 'pending' && (
                      <Button className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        Record Payment
                      </Button>
                    )}
                    {selectedInvoice.status === 'draft' && (
                      <Button className="flex items-center gap-1">
                        <Send className="h-4 w-4" />
                        Finalize & Send
                      </Button>
                    )}
                    <Button variant="outline" onClick={() => setIsInvoiceDetailsDialogOpen(false)} className="ml-2">
                      Close
                    </Button>
                  </div>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}