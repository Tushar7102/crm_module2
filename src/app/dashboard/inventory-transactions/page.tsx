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
import { ArrowDownUp, ArrowUp, ArrowDown, Package, Warehouse, Search, Filter, Plus, FileText, Truck, ShoppingCart, MoreHorizontal, Calendar, Clock, User, MapPin } from 'lucide-react';

export default function InventoryTransactionsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewTransactionDialogOpen, setIsNewTransactionDialogOpen] = useState(false);
  const [isTransactionDetailsDialogOpen, setIsTransactionDetailsDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  
  // Mock data for inventory transactions
  const transactions = [
    { 
      id: 'TRX-001',
      type: 'stock-in',
      date: '2023-07-15T10:30:00',
      itemName: 'Solar Panel - 400W Monocrystalline',
      itemSku: 'SP-400W-MONO',
      quantity: 50,
      locationFrom: 'Supplier: SunTech Industries',
      locationTo: 'Main Warehouse - Zone A',
      reference: 'PO-2023-0125',
      status: 'completed',
      createdBy: {
        name: 'Robert Chen',
        avatar: '/avatars/robert.jpg',
        department: 'Procurement'
      },
      notes: 'Regular stock replenishment from supplier.'
    },
    { 
      id: 'TRX-002',
      type: 'stock-out',
      date: '2023-07-14T14:45:00',
      itemName: 'Inverter - 5kW Hybrid',
      itemSku: 'INV-5KW-HYB',
      quantity: 1,
      locationFrom: 'Main Warehouse - Zone B',
      locationTo: 'Customer: John Smith (Order #ORD-2023-0568)',
      reference: 'ORD-2023-0568',
      status: 'completed',
      createdBy: {
        name: 'Emily Davis',
        avatar: '/avatars/emily.jpg',
        department: 'Fulfillment'
      },
      notes: 'Customer order fulfillment.'
    },
    { 
      id: 'TRX-003',
      type: 'transfer',
      date: '2023-07-13T11:20:00',
      itemName: 'Battery - 10kWh Lithium',
      itemSku: 'BAT-10KWH-LI',
      quantity: 10,
      locationFrom: 'Main Warehouse - Zone C',
      locationTo: 'North Branch Warehouse',
      reference: 'TRF-2023-0042',
      status: 'completed',
      createdBy: {
        name: 'Michael Brown',
        avatar: '/avatars/michael.jpg',
        department: 'Warehouse'
      },
      notes: 'Stock transfer to branch location for upcoming installations.'
    },
    { 
      id: 'TRX-004',
      type: 'adjustment',
      date: '2023-07-12T09:15:00',
      itemName: 'Mounting Brackets - Standard',
      itemSku: 'MB-STD-001',
      quantity: -5,
      locationFrom: 'Main Warehouse - Zone A',
      locationTo: 'N/A',
      reference: 'ADJ-2023-0018',
      status: 'completed',
      createdBy: {
        name: 'Sarah Johnson',
        avatar: '/avatars/sarah.jpg',
        department: 'Inventory Control'
      },
      notes: 'Inventory adjustment after physical count. Found 5 damaged units.'
    },
    { 
      id: 'TRX-005',
      type: 'stock-in',
      date: '2023-07-11T15:30:00',
      itemName: 'Solar Panel - 350W Polycrystalline',
      itemSku: 'SP-350W-POLY',
      quantity: 30,
      locationFrom: 'Supplier: EcoSolar Ltd',
      locationTo: 'Main Warehouse - Zone A',
      reference: 'PO-2023-0122',
      status: 'completed',
      createdBy: {
        name: 'Robert Chen',
        avatar: '/avatars/robert.jpg',
        department: 'Procurement'
      },
      notes: 'Regular stock replenishment from supplier.'
    },
    { 
      id: 'TRX-006',
      type: 'stock-out',
      date: '2023-07-10T13:45:00',
      itemName: 'Inverter - 3kW Standard',
      itemSku: 'INV-3KW-STD',
      quantity: 2,
      locationFrom: 'Main Warehouse - Zone B',
      locationTo: 'Installation Team #3',
      reference: 'JOB-2023-0095',
      status: 'completed',
      createdBy: {
        name: 'James Wilson',
        avatar: '/avatars/james.jpg',
        department: 'Installation'
      },
      notes: 'Equipment for installation job #JOB-2023-0095.'
    },
    { 
      id: 'TRX-007',
      type: 'stock-in',
      date: '2023-07-16T09:30:00',
      itemName: 'DC Cables - 6mm² (100m roll)',
      itemSku: 'DC-CABLE-6MM',
      quantity: 15,
      locationFrom: 'Supplier: WireTech Solutions',
      locationTo: 'Main Warehouse - Zone D',
      reference: 'PO-2023-0128',
      status: 'pending',
      createdBy: {
        name: 'Robert Chen',
        avatar: '/avatars/robert.jpg',
        department: 'Procurement'
      },
      notes: 'Scheduled delivery from supplier. Awaiting arrival.'
    },
  ];

  // Filter transactions based on active tab and search query
  const filteredTransactions = transactions.filter(transaction => {
    // Filter by tab
    if (activeTab === 'stock-in' && transaction.type !== 'stock-in') return false;
    if (activeTab === 'stock-out' && transaction.type !== 'stock-out') return false;
    if (activeTab === 'transfers' && transaction.type !== 'transfer') return false;
    if (activeTab === 'adjustments' && transaction.type !== 'adjustment') return false;
    if (activeTab === 'pending' && transaction.status !== 'pending') return false;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        transaction.id.toLowerCase().includes(query) ||
        transaction.itemName.toLowerCase().includes(query) ||
        transaction.itemSku.toLowerCase().includes(query) ||
        transaction.reference.toLowerCase().includes(query) ||
        transaction.locationFrom.toLowerCase().includes(query) ||
        transaction.locationTo.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const getTransactionTypeIcon = (type: string) => {
    switch (type) {
      case 'stock-in':
        return <ArrowDown className="h-4 w-4 text-green-500" />;
      case 'stock-out':
        return <ArrowUp className="h-4 w-4 text-red-500" />;
      case 'transfer':
        return <ArrowDownUp className="h-4 w-4 text-blue-500" />;
      case 'adjustment':
        return <FileText className="h-4 w-4 text-amber-500" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getTransactionTypeBadge = (type: string) => {
    switch (type) {
      case 'stock-in':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Stock In</Badge>;
      case 'stock-out':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Stock Out</Badge>;
      case 'transfer':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Transfer</Badge>;
      case 'adjustment':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Adjustment</Badge>;
      default:
        return <Badge>{type}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="outline" className="border-green-200 text-green-800 bg-green-50">Completed</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-amber-200 text-amber-800 bg-amber-50">Pending</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="border-red-200 text-red-800 bg-red-50">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleOpenTransactionDetails = (transaction: any) => {
    setSelectedTransaction(transaction);
    setIsTransactionDetailsDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Inventory Transactions</h1>
        <Button onClick={() => setIsNewTransactionDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> New Transaction
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search transactions..." 
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
              <TabsTrigger value="stock-in" className="flex items-center gap-1">
                <ArrowDown className="h-3 w-3" />
                In
              </TabsTrigger>
              <TabsTrigger value="stock-out" className="flex items-center gap-1">
                <ArrowUp className="h-3 w-3" />
                Out
              </TabsTrigger>
              <TabsTrigger value="transfers" className="flex items-center gap-1">
                <ArrowDownUp className="h-3 w-3" />
                Transfer
              </TabsTrigger>
              <TabsTrigger value="adjustments">
                Adjust
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredTransactions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTransactionTypeIcon(transaction.type)}
                        {getTransactionTypeBadge(transaction.type)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{transaction.itemName}</div>
                        <div className="text-xs text-muted-foreground">{transaction.itemSku}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={transaction.quantity < 0 ? 'text-red-600' : ''}>
                        {transaction.quantity > 0 ? '+' : ''}{transaction.quantity}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[150px] truncate" title={transaction.locationFrom}>
                        {transaction.locationFrom}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[150px] truncate" title={transaction.locationTo}>
                        {transaction.locationTo}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(transaction.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenTransactionDetails(transaction)}>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No transactions found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Transaction Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Transactions</span>
                <span className="font-medium">{transactions.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Stock In</span>
                <span className="font-medium text-green-600">{transactions.filter(t => t.type === 'stock-in').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Stock Out</span>
                <span className="font-medium text-red-600">{transactions.filter(t => t.type === 'stock-out').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Transfers</span>
                <span className="font-medium text-blue-600">{transactions.filter(t => t.type === 'transfer').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Adjustments</span>
                <span className="font-medium text-amber-600">{transactions.filter(t => t.type === 'adjustment').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Pending</span>
                <span className="font-medium">{transactions.filter(t => t.status === 'pending').length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.slice(0, 4).map((transaction, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className={`p-1 rounded-full ${
                    transaction.type === 'stock-in' ? 'bg-green-100' : 
                    transaction.type === 'stock-out' ? 'bg-red-100' : 
                    transaction.type === 'transfer' ? 'bg-blue-100' : 'bg-amber-100'
                  }`}>
                    {getTransactionTypeIcon(transaction.type)}
                  </div>
                  <div className="text-sm">
                    <p>
                      <span className="font-medium">{transaction.createdBy.name}</span> {' '}
                      {transaction.type === 'stock-in' ? 'received' : 
                       transaction.type === 'stock-out' ? 'issued' : 
                       transaction.type === 'transfer' ? 'transferred' : 'adjusted'} {' '}
                      <span className="font-medium">{Math.abs(transaction.quantity)}x {transaction.itemName}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Warehouse Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded-md border">
                <div className="flex items-center gap-2">
                  <Warehouse className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Main Warehouse</span>
                </div>
                <Badge>4 Zones</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded-md border">
                <div className="flex items-center gap-2">
                  <Warehouse className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium">North Branch</span>
                </div>
                <Badge>2 Zones</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded-md border">
                <div className="flex items-center gap-2">
                  <Warehouse className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-medium">South Branch</span>
                </div>
                <Badge>2 Zones</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded-md border">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Installation Vehicles</span>
                </div>
                <Badge>5 Units</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded-md border">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium">Suppliers</span>
                </div>
                <Badge>8 Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Transaction Dialog */}
      <Dialog open={isNewTransactionDialogOpen} onOpenChange={setIsNewTransactionDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>New Inventory Transaction</DialogTitle>
            <DialogDescription>
              Create a new inventory transaction record.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="transaction-type">Transaction Type</Label>
              <Select>
                <SelectTrigger id="transaction-type">
                  <SelectValue placeholder="Select transaction type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stock-in">Stock In</SelectItem>
                  <SelectItem value="stock-out">Stock Out</SelectItem>
                  <SelectItem value="transfer">Transfer</SelectItem>
                  <SelectItem value="adjustment">Adjustment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="item">Item</Label>
              <Select>
                <SelectTrigger id="item">
                  <SelectValue placeholder="Select item" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sp-400w">Solar Panel - 400W Monocrystalline</SelectItem>
                  <SelectItem value="inv-5kw">Inverter - 5kW Hybrid</SelectItem>
                  <SelectItem value="bat-10kwh">Battery - 10kWh Lithium</SelectItem>
                  <SelectItem value="mb-std">Mounting Brackets - Standard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input id="quantity" type="number" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="from-location">From Location</Label>
              <Select>
                <SelectTrigger id="from-location">
                  <SelectValue placeholder="Select source location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main-a">Main Warehouse - Zone A</SelectItem>
                  <SelectItem value="main-b">Main Warehouse - Zone B</SelectItem>
                  <SelectItem value="main-c">Main Warehouse - Zone C</SelectItem>
                  <SelectItem value="north">North Branch Warehouse</SelectItem>
                  <SelectItem value="supplier">Supplier</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="to-location">To Location</Label>
              <Select>
                <SelectTrigger id="to-location">
                  <SelectValue placeholder="Select destination location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main-a">Main Warehouse - Zone A</SelectItem>
                  <SelectItem value="main-b">Main Warehouse - Zone B</SelectItem>
                  <SelectItem value="main-c">Main Warehouse - Zone C</SelectItem>
                  <SelectItem value="north">North Branch Warehouse</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="installation">Installation Team</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="reference">Reference</Label>
              <Input id="reference" placeholder="PO/Order/Job number" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Input id="notes" placeholder="Additional information" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewTransactionDialogOpen(false)}>Cancel</Button>
            <Button>Create Transaction</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Transaction Details Dialog */}
      <Dialog open={isTransactionDetailsDialogOpen} onOpenChange={setIsTransactionDetailsDialogOpen}>
        <DialogContent className="max-w-3xl">
          {selectedTransaction && (
            <>
              <DialogHeader>
                <DialogTitle>Transaction Details</DialogTitle>
                <DialogDescription>
                  Transaction ID: {selectedTransaction.id}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {getTransactionTypeIcon(selectedTransaction.type)}
                    {getTransactionTypeBadge(selectedTransaction.type)}
                  </div>
                  {getStatusBadge(selectedTransaction.status)}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Item</h3>
                    <div>
                      <div className="font-medium">{selectedTransaction.itemName}</div>
                      <div className="text-xs text-muted-foreground">{selectedTransaction.itemSku}</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Quantity</h3>
                    <p className={`font-medium ${selectedTransaction.quantity < 0 ? 'text-red-600' : ''}`}>
                      {selectedTransaction.quantity > 0 ? '+' : ''}{selectedTransaction.quantity}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">From Location</h3>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <p>{selectedTransaction.locationFrom}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">To Location</h3>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <p>{selectedTransaction.locationTo}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Date & Time</h3>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <p>{formatDate(selectedTransaction.date)}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Reference</h3>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <p>{selectedTransaction.reference}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Created By</h3>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={selectedTransaction.createdBy.avatar} />
                        <AvatarFallback>{selectedTransaction.createdBy.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm">{selectedTransaction.createdBy.name}</div>
                        <div className="text-xs text-muted-foreground">{selectedTransaction.createdBy.department}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Notes</h3>
                  <p className="text-sm p-3 bg-muted rounded-md">{selectedTransaction.notes}</p>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium mb-2">Transaction Timeline</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="bg-blue-100 p-1 rounded-full">
                        <Clock className="h-3 w-3 text-blue-600" />
                      </div>
                      <div className="text-sm">
                        <p>Transaction created</p>
                        <p className="text-xs text-muted-foreground">{formatDate(selectedTransaction.date)}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="bg-green-100 p-1 rounded-full">
                        <User className="h-3 w-3 text-green-600" />
                      </div>
                      <div className="text-sm">
                        <p>Processed by {selectedTransaction.createdBy.name}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(new Date(new Date(selectedTransaction.date).getTime() + 5 * 60000).toString())}</p>
                      </div>
                    </div>
                    {selectedTransaction.status === 'completed' && (
                      <div className="flex items-start gap-2">
                        <div className="bg-green-100 p-1 rounded-full">
                          <CheckCircle2 className="h-3 w-3 text-green-600" />
                        </div>
                        <div className="text-sm">
                          <p>Transaction completed</p>
                          <p className="text-xs text-muted-foreground">{formatDate(new Date(new Date(selectedTransaction.date).getTime() + 10 * 60000).toString())}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsTransactionDetailsDialogOpen(false)}>Close</Button>
                <Button variant="outline" className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  Print Record
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}