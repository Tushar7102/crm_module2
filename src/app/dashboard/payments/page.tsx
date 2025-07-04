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
import { DollarSign, Search, Filter, Plus, MoreHorizontal, Download, ArrowDown, ArrowUp, Calendar, Clock, CheckCircle2, XCircle, AlertCircle, CreditCard, User, ArrowUpRight, BarChart3, Printer, FileText, Send, ArrowDownUp } from 'lucide-react';

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewPaymentDialogOpen, setIsNewPaymentDialogOpen] = useState(false);
  const [isPaymentDetailsDialogOpen, setIsPaymentDetailsDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  
  // Mock data for payments
  const payments = [
    { 
      id: 'PMT-2023-0568',
      type: 'received',
      customerName: 'John Smith',
      customerEmail: 'john.smith@example.com',
      amount: 13500.00,
      date: '2023-07-15T14:20:00',
      method: 'credit_card',
      status: 'completed',
      invoiceId: 'INV-2023-0568',
      notes: 'Payment for solar panel installation',
      processedBy: 'Sarah Johnson',
      transactionId: 'txn_1234567890'
    },
    { 
      id: 'PMT-2023-0572',
      type: 'received',
      customerName: 'David Wilson',
      customerEmail: 'david.wilson@example.com',
      amount: 11880.00,
      date: '2023-07-20T16:45:00',
      method: 'bank_transfer',
      status: 'completed',
      invoiceId: 'INV-2023-0572',
      notes: 'Payment for solar panel installation',
      processedBy: 'Sarah Johnson',
      transactionId: 'txn_0987654321'
    },
    { 
      id: 'PMT-2023-0575',
      type: 'received',
      customerName: 'Michael Johnson',
      customerEmail: 'michael.johnson@example.com',
      amount: 16200.00,
      date: '2023-07-28T09:15:00',
      method: 'credit_card',
      status: 'pending',
      invoiceId: 'INV-2023-0570',
      notes: 'Payment processing',
      processedBy: null,
      transactionId: 'txn_2468101214'
    },
    { 
      id: 'PMT-2023-0576',
      type: 'made',
      customerName: 'Solar Panels Supplier Inc.',
      customerEmail: 'accounts@solarpanelssupplier.com',
      amount: 45000.00,
      date: '2023-07-05T11:30:00',
      method: 'bank_transfer',
      status: 'completed',
      invoiceId: 'SUP-INV-2023-1234',
      notes: 'Payment for bulk order of solar panels',
      processedBy: 'Robert Chen',
      transactionId: 'txn_3579246801'
    },
    { 
      id: 'PMT-2023-0577',
      type: 'made',
      customerName: 'Inverter Technologies Ltd.',
      customerEmail: 'billing@invertertech.com',
      amount: 12500.00,
      date: '2023-07-10T13:45:00',
      method: 'bank_transfer',
      status: 'completed',
      invoiceId: 'SUP-INV-2023-5678',
      notes: 'Payment for inverters',
      processedBy: 'Robert Chen',
      transactionId: 'txn_1357924680'
    },
    { 
      id: 'PMT-2023-0578',
      type: 'made',
      customerName: 'Battery Storage Solutions',
      customerEmail: 'accounts@batterystorage.com',
      amount: 18000.00,
      date: '2023-07-18T10:20:00',
      method: 'bank_transfer',
      status: 'failed',
      invoiceId: 'SUP-INV-2023-9012',
      notes: 'Payment failed due to insufficient funds',
      processedBy: 'Robert Chen',
      transactionId: 'txn_2468013579'
    },
    { 
      id: 'PMT-2023-0579',
      type: 'received',
      customerName: 'Jane Doe',
      customerEmail: 'jane.doe@example.com',
      amount: 8640.00,
      date: '2023-07-25T15:10:00',
      method: 'check',
      status: 'pending',
      invoiceId: 'INV-2023-0569',
      notes: 'Check received, waiting for clearance',
      processedBy: 'Sarah Johnson',
      transactionId: null
    },
    { 
      id: 'PMT-2023-0580',
      type: 'made',
      customerName: 'Mounting Hardware Co.',
      customerEmail: 'finance@mountinghardware.com',
      amount: 7500.00,
      date: '2023-07-22T09:30:00',
      method: 'credit_card',
      status: 'completed',
      invoiceId: 'SUP-INV-2023-3456',
      notes: 'Payment for mounting hardware',
      processedBy: 'Robert Chen',
      transactionId: 'txn_1234509876'
    },
  ];

  // Filter payments based on active tab and search query
  const filteredPayments = payments.filter(payment => {
    // Filter by tab
    if (activeTab === 'received' && payment.type !== 'received') return false;
    if (activeTab === 'made' && payment.type !== 'made') return false;
    if (activeTab === 'pending' && payment.status !== 'pending') return false;
    if (activeTab === 'completed' && payment.status !== 'completed') return false;
    if (activeTab === 'failed' && payment.status !== 'failed') return false;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        payment.id.toLowerCase().includes(query) ||
        payment.customerName.toLowerCase().includes(query) ||
        payment.customerEmail.toLowerCase().includes(query) ||
        payment.invoiceId.toLowerCase().includes(query) ||
        (payment.transactionId && payment.transactionId.toLowerCase().includes(query))
      );
    }
    
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'received':
        return <Badge variant="outline" className="border-green-200 text-green-800 bg-green-50 flex items-center gap-1"><ArrowDown className="h-3 w-3" /> Received</Badge>;
      case 'made':
        return <Badge variant="outline" className="border-blue-200 text-blue-800 bg-blue-50 flex items-center gap-1"><ArrowUp className="h-3 w-3" /> Made</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
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

  const handleOpenPaymentDetails = (payment: any) => {
    setSelectedPayment(payment);
    setIsPaymentDetailsDialogOpen(true);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const calculateTotalReceived = () => {
    return payments
      .filter(payment => payment.type === 'received' && payment.status === 'completed')
      .reduce((sum, payment) => sum + payment.amount, 0);
  };

  const calculateTotalPaid = () => {
    return payments
      .filter(payment => payment.type === 'made' && payment.status === 'completed')
      .reduce((sum, payment) => sum + payment.amount, 0);
  };

  const calculatePendingAmount = () => {
    return payments
      .filter(payment => payment.status === 'pending')
      .reduce((sum, payment) => sum + payment.amount, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
        <Button onClick={() => setIsNewPaymentDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Record Payment
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search payments..." 
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
            <TabsList className="grid grid-cols-6 w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="received">Received</TabsTrigger>
              <TabsTrigger value="made">Made</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="failed">Failed</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment List</CardTitle>
          <CardDescription>
            {filteredPayments.length} payment{filteredPayments.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredPayments.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Customer/Vendor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.id}</TableCell>
                    <TableCell>{getTypeBadge(payment.type)}</TableCell>
                    <TableCell>
                      <div>
                        <div>{payment.customerName}</div>
                        <div className="text-xs text-muted-foreground">{payment.customerEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(payment.amount)}</TableCell>
                    <TableCell>{formatDate(payment.date)}</TableCell>
                    <TableCell>
                      {getPaymentMethodBadge(payment.method)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(payment.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenPaymentDetails(payment)}>
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
              <DollarSign className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No payments found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Payment Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Payments</span>
                <span className="font-medium">{payments.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Received</span>
                <span className="font-medium">{payments.filter(p => p.type === 'received').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Made</span>
                <span className="font-medium">{payments.filter(p => p.type === 'made').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Pending</span>
                <span className="font-medium text-amber-600">{payments.filter(p => p.status === 'pending').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Failed</span>
                <span className="font-medium text-red-600">{payments.filter(p => p.status === 'failed').length}</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Received</span>
                  <span className="font-medium text-green-600">{formatCurrency(calculateTotalReceived())}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Paid</span>
                  <span className="font-medium text-blue-600">{formatCurrency(calculateTotalPaid())}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Pending Amount</span>
                  <span className="font-medium text-amber-600">{formatCurrency(calculatePendingAmount())}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recent Received Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payments
                .filter(payment => payment.type === 'received' && payment.status === 'completed')
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 4)
                .map((payment, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="bg-green-100 p-1 rounded-full">
                      <ArrowDown className="h-3 w-3 text-green-600" />
                    </div>
                    <div className="text-sm flex-1">
                      <div className="flex justify-between">
                        <p>
                          <span className="font-medium">{payment.customerName}</span> paid {' '}
                          <span className="font-medium">{formatCurrency(payment.amount)}</span>
                        </p>
                        <span className="text-xs text-muted-foreground">{formatDate(payment.date)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <FileText className="h-3 w-3" />
                        Invoice {payment.invoiceId}
                      </div>
                    </div>
                  </div>
                ))
              }
              {payments.filter(payment => payment.type === 'received' && payment.status === 'completed').length === 0 && (
                <div className="text-center py-4 text-muted-foreground">
                  <p className="text-sm">No received payments recorded yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recent Made Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payments
                .filter(payment => payment.type === 'made' && payment.status === 'completed')
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 4)
                .map((payment, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="bg-blue-100 p-1 rounded-full">
                      <ArrowUp className="h-3 w-3 text-blue-600" />
                    </div>
                    <div className="text-sm flex-1">
                      <div className="flex justify-between">
                        <p>
                          Paid <span className="font-medium">{formatCurrency(payment.amount)}</span> to {' '}
                          <span className="font-medium">{payment.customerName}</span>
                        </p>
                        <span className="text-xs text-muted-foreground">{formatDate(payment.date)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <FileText className="h-3 w-3" />
                        Invoice {payment.invoiceId}
                      </div>
                    </div>
                  </div>
                ))
              }
              {payments.filter(payment => payment.type === 'made' && payment.status === 'completed').length === 0 && (
                <div className="text-center py-4 text-muted-foreground">
                  <p className="text-sm">No made payments recorded yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Payment Dialog */}
      <Dialog open={isNewPaymentDialogOpen} onOpenChange={setIsNewPaymentDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Record Payment</DialogTitle>
            <DialogDescription>
              Record a new payment received or made.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="payment-type">Payment Type</Label>
              <Select>
                <SelectTrigger id="payment-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="received">Payment Received</SelectItem>
                  <SelectItem value="made">Payment Made</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="customer">Customer/Vendor</Label>
              <Select>
                <SelectTrigger id="customer">
                  <SelectValue placeholder="Select customer or vendor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john">John Smith</SelectItem>
                  <SelectItem value="jane">Jane Doe</SelectItem>
                  <SelectItem value="michael">Michael Johnson</SelectItem>
                  <SelectItem value="solar">Solar Panels Supplier Inc.</SelectItem>
                  <SelectItem value="inverter">Inverter Technologies Ltd.</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="invoice">Related Invoice</Label>
              <Select>
                <SelectTrigger id="invoice">
                  <SelectValue placeholder="Select invoice" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inv-0568">INV-2023-0568 - $13,500.00</SelectItem>
                  <SelectItem value="inv-0569">INV-2023-0569 - $8,640.00</SelectItem>
                  <SelectItem value="inv-0570">INV-2023-0570 - $16,200.00</SelectItem>
                  <SelectItem value="sup-1234">SUP-INV-2023-1234 - $45,000.00</SelectItem>
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
              <Label htmlFor="notes">Notes</Label>
              <Input id="notes" placeholder="Additional notes about this payment" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewPaymentDialogOpen(false)}>Cancel</Button>
            <Button>
              <CheckCircle2 className="mr-2 h-4 w-4" /> Record Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Details Dialog */}
      <Dialog open={isPaymentDetailsDialogOpen} onOpenChange={setIsPaymentDetailsDialogOpen}>
        <DialogContent className="max-w-md">
          {selectedPayment && (
            <>
              <DialogHeader>
                <div className="flex justify-between items-center">
                  <DialogTitle>Payment {selectedPayment.id}</DialogTitle>
                  {getStatusBadge(selectedPayment.status)}
                </div>
                <DialogDescription>
                  {selectedPayment.type === 'received' ? 'Received from' : 'Made to'} {selectedPayment.customerName}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Type:</span>
                  <span>{getTypeBadge(selectedPayment.type)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Amount:</span>
                  <span className="font-medium">{formatCurrency(selectedPayment.amount)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Date:</span>
                  <span>{formatDate(selectedPayment.date)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Method:</span>
                  <span>{getPaymentMethodBadge(selectedPayment.method)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Invoice:</span>
                  <span className="text-sm">{selectedPayment.invoiceId}</span>
                </div>
                
                {selectedPayment.transactionId && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Transaction ID:</span>
                    <span className="text-sm">{selectedPayment.transactionId}</span>
                  </div>
                )}
                
                {selectedPayment.processedBy && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Processed By:</span>
                    <span className="text-sm">{selectedPayment.processedBy}</span>
                  </div>
                )}
                
                {selectedPayment.notes && (
                  <div>
                    <span className="text-sm font-medium">Notes:</span>
                    <p className="text-sm mt-1 p-2 bg-muted rounded-md">{selectedPayment.notes}</p>
                  </div>
                )}
                
                {selectedPayment.status === 'pending' && (
                  <div className="border-t pt-4 mt-2">
                    <h3 className="text-sm font-medium mb-2">Update Payment Status</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="flex items-center gap-1">
                        <XCircle className="h-4 w-4 text-red-500" />
                        Mark as Failed
                      </Button>
                      <Button className="flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" />
                        Mark as Completed
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter>
                <div className="flex justify-between w-full">
                  <Button variant="outline" className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    Download Receipt
                  </Button>
                  <Button variant="outline" onClick={() => setIsPaymentDetailsDialogOpen(false)}>
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