'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Plus, Package, ArrowUpDown, MoreVertical } from 'lucide-react';

export default function WarehousePage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for warehouse items
  const warehouseItems = [
    { id: 'WH001', name: 'Solar Panel 400W', category: 'Panels', quantity: 120, location: 'Rack A-1', status: 'In Stock' },
    { id: 'WH002', name: 'Inverter 5kW', category: 'Inverters', quantity: 45, location: 'Rack B-3', status: 'In Stock' },
    { id: 'WH003', name: 'Mounting Brackets', category: 'Accessories', quantity: 230, location: 'Rack C-2', status: 'In Stock' },
    { id: 'WH004', name: 'Battery 10kWh', category: 'Batteries', quantity: 18, location: 'Rack D-1', status: 'Low Stock' },
    { id: 'WH005', name: 'DC Cables', category: 'Cables', quantity: 500, location: 'Rack E-4', status: 'In Stock' },
    { id: 'WH006', name: 'AC Cables', category: 'Cables', quantity: 350, location: 'Rack E-5', status: 'In Stock' },
    { id: 'WH007', name: 'Junction Boxes', category: 'Accessories', quantity: 75, location: 'Rack C-3', status: 'In Stock' },
    { id: 'WH008', name: 'Charge Controllers', category: 'Electronics', quantity: 5, location: 'Rack B-4', status: 'Low Stock' },
  ];

  // Filter items based on search query
  const filteredItems = warehouseItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Warehouse Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Item
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search items..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Items</TabsTrigger>
          <TabsTrigger value="in-stock">In Stock</TabsTrigger>
          <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
          <TabsTrigger value="out-of-stock">Out of Stock</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Warehouse Inventory</CardTitle>
              <CardDescription>Manage your warehouse items, stock levels, and locations.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={item.status === 'In Stock' ? 'default' : 
                                  item.status === 'Low Stock' ? 'warning' : 'destructive'}
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">Showing {filteredItems.length} of {warehouseItems.length} items</div>
              <Button variant="outline" size="sm">
                Export
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Other tab contents would be similar but with filtered data */}
        <TabsContent value="in-stock" className="space-y-4">
          {/* Similar card with filtered data */}
        </TabsContent>
        <TabsContent value="low-stock" className="space-y-4">
          {/* Similar card with filtered data */}
        </TabsContent>
        <TabsContent value="out-of-stock" className="space-y-4">
          {/* Similar card with filtered data */}
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{warehouseItems.length}</div>
            <p className="text-xs text-muted-foreground">Across {new Set(warehouseItems.map(item => item.category)).size} categories</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{warehouseItems.filter(item => item.status === 'Low Stock').length}</div>
            <p className="text-xs text-muted-foreground">Items that need reordering</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quantity</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{warehouseItems.reduce((sum, item) => sum + item.quantity, 0)}</div>
            <p className="text-xs text-muted-foreground">Items in inventory</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}