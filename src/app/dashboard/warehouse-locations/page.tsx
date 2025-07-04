'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Warehouse, Package, Search, Filter, Plus, Edit, Trash2, MoreHorizontal, MapPin, ArrowRight, CheckCircle2, AlertCircle, BarChart3, Truck, Users } from 'lucide-react';

export default function WarehouseLocationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewLocationDialogOpen, setIsNewLocationDialogOpen] = useState(false);
  const [isLocationDetailsDialogOpen, setIsLocationDetailsDialogOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  
  // Mock data for warehouse locations
  const locations = [
    { 
      id: 'LOC-001',
      name: 'Main Warehouse - Zone A',
      type: 'warehouse',
      address: '123 Industrial Park, Building 1, Zone A',
      city: 'Phoenix',
      state: 'AZ',
      zipCode: '85001',
      capacity: 5000,
      utilization: 78,
      manager: 'Michael Brown',
      status: 'active',
      itemCount: 42,
      lastInventoryDate: '2023-06-15T10:30:00',
      notes: 'Primary storage for solar panels and mounting hardware.',
      categories: ['Solar Panels', 'Mounting Hardware']
    },
    { 
      id: 'LOC-002',
      name: 'Main Warehouse - Zone B',
      type: 'warehouse',
      address: '123 Industrial Park, Building 1, Zone B',
      city: 'Phoenix',
      state: 'AZ',
      zipCode: '85001',
      capacity: 3000,
      utilization: 65,
      manager: 'Michael Brown',
      status: 'active',
      itemCount: 28,
      lastInventoryDate: '2023-06-15T10:30:00',
      notes: 'Storage for inverters, batteries, and electrical components.',
      categories: ['Inverters', 'Batteries', 'Electrical']
    },
    { 
      id: 'LOC-003',
      name: 'Main Warehouse - Zone C',
      type: 'warehouse',
      address: '123 Industrial Park, Building 1, Zone C',
      city: 'Phoenix',
      state: 'AZ',
      zipCode: '85001',
      capacity: 2000,
      utilization: 45,
      manager: 'Michael Brown',
      status: 'active',
      itemCount: 35,
      lastInventoryDate: '2023-06-15T10:30:00',
      notes: 'Storage for cables, connectors, and small parts.',
      categories: ['Cables', 'Connectors', 'Small Parts']
    },
    { 
      id: 'LOC-004',
      name: 'North Branch Warehouse',
      type: 'warehouse',
      address: '456 Commerce Way',
      city: 'Flagstaff',
      state: 'AZ',
      zipCode: '86001',
      capacity: 2500,
      utilization: 52,
      manager: 'Sarah Johnson',
      status: 'active',
      itemCount: 31,
      lastInventoryDate: '2023-06-10T09:15:00',
      notes: 'Branch warehouse serving northern region installations.',
      categories: ['Solar Panels', 'Inverters', 'Batteries', 'Mounting Hardware']
    },
    { 
      id: 'LOC-005',
      name: 'South Branch Warehouse',
      type: 'warehouse',
      address: '789 Desert Road',
      city: 'Tucson',
      state: 'AZ',
      zipCode: '85701',
      capacity: 2500,
      utilization: 48,
      manager: 'James Wilson',
      status: 'active',
      itemCount: 29,
      lastInventoryDate: '2023-06-12T11:45:00',
      notes: 'Branch warehouse serving southern region installations.',
      categories: ['Solar Panels', 'Inverters', 'Batteries', 'Mounting Hardware']
    },
    { 
      id: 'LOC-006',
      name: 'Installation Vehicle #1',
      type: 'vehicle',
      address: 'Mobile',
      city: 'Phoenix',
      state: 'AZ',
      zipCode: '85001',
      capacity: 200,
      utilization: 60,
      manager: 'Robert Chen',
      status: 'active',
      itemCount: 15,
      lastInventoryDate: '2023-07-01T08:30:00',
      notes: 'Installation team vehicle inventory.',
      categories: ['Tools', 'Small Parts', 'Cables']
    },
    { 
      id: 'LOC-007',
      name: 'Temporary Storage',
      type: 'storage',
      address: '123 Industrial Park, Building 2',
      city: 'Phoenix',
      state: 'AZ',
      zipCode: '85001',
      capacity: 1000,
      utilization: 90,
      manager: 'Emily Davis',
      status: 'maintenance',
      itemCount: 18,
      lastInventoryDate: '2023-06-20T14:20:00',
      notes: 'Temporary storage area. Currently undergoing maintenance.',
      categories: ['Overflow', 'Seasonal']
    },
  ];

  // Filter locations based on search query
  const filteredLocations = locations.filter(location => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        location.id.toLowerCase().includes(query) ||
        location.name.toLowerCase().includes(query) ||
        location.type.toLowerCase().includes(query) ||
        location.address.toLowerCase().includes(query) ||
        location.city.toLowerCase().includes(query) ||
        location.state.toLowerCase().includes(query) ||
        location.manager.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const getLocationTypeIcon = (type: string) => {
    switch (type) {
      case 'warehouse':
        return <Warehouse className="h-4 w-4 text-blue-500" />;
      case 'vehicle':
        return <Truck className="h-4 w-4 text-green-500" />;
      case 'storage':
        return <Package className="h-4 w-4 text-amber-500" />;
      default:
        return <Warehouse className="h-4 w-4" />;
    }
  };

  const getLocationTypeBadge = (type: string) => {
    switch (type) {
      case 'warehouse':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Warehouse</Badge>;
      case 'vehicle':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Vehicle</Badge>;
      case 'storage':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Storage</Badge>;
      default:
        return <Badge>{type}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="border-green-200 text-green-800 bg-green-50">Active</Badge>;
      case 'maintenance':
        return <Badge variant="outline" className="border-amber-200 text-amber-800 bg-amber-50">Maintenance</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="border-red-200 text-red-800 bg-red-50">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization < 50) return 'text-green-500';
    if (utilization < 80) return 'text-amber-500';
    return 'text-red-500';
  };

  const handleOpenLocationDetails = (location: any) => {
    setSelectedLocation(location);
    setIsLocationDetailsDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Warehouse Locations</h1>
        <Button onClick={() => setIsNewLocationDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> New Location
        </Button>
      </div>

      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search locations..." 
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Location Directory</CardTitle>
          <CardDescription>
            {filteredLocations.length} location{filteredLocations.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredLocations.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Utilization</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLocations.map((location) => (
                  <TableRow key={location.id}>
                    <TableCell className="font-medium">{location.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getLocationTypeIcon(location.type)}
                        <span>{location.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getLocationTypeBadge(location.type)}
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[200px] truncate" title={`${location.address}, ${location.city}, ${location.state} ${location.zipCode}`}>
                        {location.address}, {location.city}, {location.state}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${location.utilization < 50 ? 'bg-green-500' : location.utilization < 80 ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${location.utilization}%` }}
                          ></div>
                        </div>
                        <span className={getUtilizationColor(location.utilization)}>{location.utilization}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{location.itemCount}</TableCell>
                    <TableCell>
                      {getStatusBadge(location.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenLocationDetails(location)}>
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
              <Warehouse className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No locations found</p>
              <p className="text-sm">Try adjusting your search</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Location Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Locations</span>
                <span className="font-medium">{locations.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Warehouses</span>
                <span className="font-medium">{locations.filter(l => l.type === 'warehouse').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Vehicles</span>
                <span className="font-medium">{locations.filter(l => l.type === 'vehicle').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Storage Areas</span>
                <span className="font-medium">{locations.filter(l => l.type === 'storage').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Active</span>
                <span className="font-medium text-green-600">{locations.filter(l => l.status === 'active').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">In Maintenance</span>
                <span className="font-medium text-amber-600">{locations.filter(l => l.status === 'maintenance').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Capacity</span>
                <span className="font-medium">{locations.reduce((sum, loc) => sum + loc.capacity, 0).toLocaleString()} units</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Avg. Utilization</span>
                <span className="font-medium">
                  {Math.round(locations.reduce((sum, loc) => sum + loc.utilization, 0) / locations.length)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Capacity Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {locations.map((location, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm truncate" title={location.name}>{location.name}</span>
                    <span className={`text-xs ${getUtilizationColor(location.utilization)}`}>
                      {location.utilization}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${location.utilization < 50 ? 'bg-green-500' : location.utilization < 80 ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${location.utilization}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Location Managers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Array.from(new Set(locations.map(l => l.manager))).map((manager, index) => {
                const managerLocations = locations.filter(l => l.manager === manager);
                return (
                  <div key={index} className="flex items-center justify-between p-2 rounded-md border">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">{manager}</span>
                    </div>
                    <Badge>{managerLocations.length} location{managerLocations.length !== 1 ? 's' : ''}</Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Location Dialog */}
      <Dialog open={isNewLocationDialogOpen} onOpenChange={setIsNewLocationDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Location</DialogTitle>
            <DialogDescription>
              Create a new warehouse or storage location.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-1">
                <Label htmlFor="location-id">ID</Label>
                <Input id="location-id" placeholder="LOC-XXX" />
              </div>
              <div className="col-span-3">
                <Label htmlFor="location-name">Name</Label>
                <Input id="location-name" placeholder="Location name" />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="location-type">Location Type</Label>
              <Select>
                <SelectTrigger id="location-type">
                  <SelectValue placeholder="Select location type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="warehouse">Warehouse</SelectItem>
                  <SelectItem value="vehicle">Vehicle</SelectItem>
                  <SelectItem value="storage">Storage Area</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="Street address" />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input id="state" />
              </div>
              <div>
                <Label htmlFor="zip">ZIP Code</Label>
                <Input id="zip" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="capacity">Capacity</Label>
                <Input id="capacity" type="number" />
              </div>
              <div>
                <Label htmlFor="manager">Manager</Label>
                <Select>
                  <SelectTrigger id="manager">
                    <SelectValue placeholder="Select manager" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="michael">Michael Brown</SelectItem>
                    <SelectItem value="sarah">Sarah Johnson</SelectItem>
                    <SelectItem value="james">James Wilson</SelectItem>
                    <SelectItem value="emily">Emily Davis</SelectItem>
                    <SelectItem value="robert">Robert Chen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Input id="notes" placeholder="Additional information" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewLocationDialogOpen(false)}>Cancel</Button>
            <Button>Create Location</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Location Details Dialog */}
      <Dialog open={isLocationDetailsDialogOpen} onOpenChange={setIsLocationDetailsDialogOpen}>
        <DialogContent className="max-w-3xl">
          {selectedLocation && (
            <>
              <DialogHeader>
                <DialogTitle>Location Details</DialogTitle>
                <DialogDescription>
                  Location ID: {selectedLocation.id}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {getLocationTypeIcon(selectedLocation.type)}
                    <h2 className="text-xl font-semibold">{selectedLocation.name}</h2>
                  </div>
                  {getStatusBadge(selectedLocation.status)}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Location Type</h3>
                    <div className="flex items-center gap-2">
                      {getLocationTypeBadge(selectedLocation.type)}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Manager</h3>
                    <p className="font-medium">{selectedLocation.manager}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Address</h3>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <p>{selectedLocation.address}, {selectedLocation.city}, {selectedLocation.state} {selectedLocation.zipCode}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Capacity</h3>
                    <p className="font-medium">{selectedLocation.capacity.toLocaleString()} units</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Utilization</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${selectedLocation.utilization < 50 ? 'bg-green-500' : selectedLocation.utilization < 80 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${selectedLocation.utilization}%` }}
                        ></div>
                      </div>
                      <span className={getUtilizationColor(selectedLocation.utilization)}>{selectedLocation.utilization}%</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Item Count</h3>
                    <p className="font-medium">{selectedLocation.itemCount} items</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Categories Stored</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedLocation.categories.map((category: string, index: number) => (
                      <Badge key={index} variant="secondary">{category}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Notes</h3>
                  <p className="text-sm p-3 bg-muted rounded-md">{selectedLocation.notes}</p>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium mb-2">Location Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 rounded-md border">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Space Utilization</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${selectedLocation.utilization < 50 ? 'bg-green-500' : selectedLocation.utilization < 80 ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${selectedLocation.utilization}%` }}
                          ></div>
                        </div>
                        <span className={`text-xs ${getUtilizationColor(selectedLocation.utilization)}`}>
                          {selectedLocation.utilization}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 rounded-md border">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-purple-500" />
                        <span className="text-sm">Inventory Items</span>
                      </div>
                      <span className="text-sm font-medium">{selectedLocation.itemCount} items</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 rounded-md border">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Last Inventory Check</span>
                      </div>
                      <span className="text-sm">{formatDate(selectedLocation.lastInventoryDate)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsLocationDetailsDialogOpen(false)}>Close</Button>
                <Button variant="outline" className="flex items-center gap-1">
                  <ArrowRight className="h-4 w-4" />
                  View Inventory
                </Button>
                <Button className="flex items-center gap-1">
                  <Edit className="h-4 w-4" />
                  Edit Location
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}