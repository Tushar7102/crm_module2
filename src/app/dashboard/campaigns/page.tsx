'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Megaphone, Users, Phone, FileText, BarChart, Calendar, PlusCircle, Edit, Trash2, CheckCircle2 } from 'lucide-react';

export default function CampaignsPage() {
  const [activeTab, setActiveTab] = useState('active');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  // Mock data for campaigns
  const activeCampaigns = [
    { 
      id: 1, 
      name: 'Summer Solar Promotion', 
      type: 'Outbound', 
      status: 'In Progress', 
      startDate: '2023-06-01', 
      endDate: '2023-08-31',
      target: 500,
      completed: 320,
      conversion: 15.6,
      assignedTo: 'Sales Team A'
    },
    { 
      id: 2, 
      name: 'Energy Efficiency Webinar', 
      type: 'Event', 
      status: 'In Progress', 
      startDate: '2023-07-15', 
      endDate: '2023-07-15',
      target: 200,
      completed: 175,
      conversion: 22.3,
      assignedTo: 'Marketing Team'
    },
    { 
      id: 3, 
      name: 'Customer Satisfaction Survey', 
      type: 'Survey', 
      status: 'In Progress', 
      startDate: '2023-07-01', 
      endDate: '2023-07-31',
      target: 300,
      completed: 98,
      conversion: 32.7,
      assignedTo: 'Customer Service Team'
    },
  ];

  const completedCampaigns = [
    { 
      id: 4, 
      name: 'Spring Referral Program', 
      type: 'Referral', 
      status: 'Completed', 
      startDate: '2023-03-01', 
      endDate: '2023-05-31',
      target: 400,
      completed: 400,
      conversion: 18.5,
      assignedTo: 'Sales Team B'
    },
    { 
      id: 5, 
      name: 'New Product Launch', 
      type: 'Outbound', 
      status: 'Completed', 
      startDate: '2023-04-15', 
      endDate: '2023-06-15',
      target: 600,
      completed: 580,
      conversion: 12.8,
      assignedTo: 'Sales Team A'
    },
  ];

  const draftCampaigns = [
    { 
      id: 6, 
      name: 'Fall Energy Savings', 
      type: 'Outbound', 
      status: 'Draft', 
      startDate: '2023-09-01', 
      endDate: '2023-11-30',
      target: 450,
      completed: 0,
      conversion: 0,
      assignedTo: 'Unassigned'
    },
    { 
      id: 7, 
      name: 'Holiday Special Offer', 
      type: 'Email', 
      status: 'Draft', 
      startDate: '2023-12-01', 
      endDate: '2023-12-31',
      target: 1000,
      completed: 0,
      conversion: 0,
      assignedTo: 'Marketing Team'
    },
  ];

  // Mock data for templates
  const templates = [
    { id: 1, name: 'Initial Contact Script', type: 'Call Script', usage: 245, lastUpdated: '2023-06-15' },
    { id: 2, name: 'Follow-up Email', type: 'Email', usage: 189, lastUpdated: '2023-06-20' },
    { id: 3, name: 'Appointment Confirmation', type: 'SMS', usage: 312, lastUpdated: '2023-05-30' },
    { id: 4, name: 'Product Demonstration', type: 'Call Script', usage: 156, lastUpdated: '2023-07-01' },
    { id: 5, name: 'Customer Feedback Request', type: 'Email', usage: 98, lastUpdated: '2023-07-05' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'In Progress':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">In Progress</Badge>;
      case 'Completed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      case 'Draft':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Draft</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Outbound':
        return <Badge variant="outline" className="border-blue-200 text-blue-800">Outbound</Badge>;
      case 'Event':
        return <Badge variant="outline" className="border-purple-200 text-purple-800">Event</Badge>;
      case 'Survey':
        return <Badge variant="outline" className="border-green-200 text-green-800">Survey</Badge>;
      case 'Referral':
        return <Badge variant="outline" className="border-amber-200 text-amber-800">Referral</Badge>;
      case 'Email':
        return <Badge variant="outline" className="border-indigo-200 text-indigo-800">Email</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const renderCampaignTable = (campaigns: any[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Campaign Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Timeline</TableHead>
          <TableHead>Progress</TableHead>
          <TableHead>Conversion</TableHead>
          <TableHead>Assigned To</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {campaigns.map((campaign) => (
          <TableRow key={campaign.id}>
            <TableCell className="font-medium">{campaign.name}</TableCell>
            <TableCell>{getTypeBadge(campaign.type)}</TableCell>
            <TableCell>{getStatusBadge(campaign.status)}</TableCell>
            <TableCell>
              <div className="text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Start: {new Date(campaign.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>End: {new Date(campaign.endDate).toLocaleDateString()}</span>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>{campaign.completed} / {campaign.target}</span>
                  <span>{Math.round((campaign.completed / campaign.target) * 100)}%</span>
                </div>
                <Progress value={(campaign.completed / campaign.target) * 100} />
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <span className="font-medium">{campaign.conversion}%</span>
                {campaign.conversion > 20 ? (
                  <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700 text-xs">High</Badge>
                ) : campaign.conversion > 10 ? (
                  <Badge variant="outline" className="bg-amber-50 border-amber-200 text-amber-700 text-xs">Medium</Badge>
                ) : campaign.conversion > 0 ? (
                  <Badge variant="outline" className="bg-red-50 border-red-200 text-red-700 text-xs">Low</Badge>
                ) : null}
              </div>
            </TableCell>
            <TableCell>{campaign.assignedTo}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                {campaign.status !== 'Completed' && (
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Campaign Management</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Create Campaign
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new marketing campaign.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Campaign Name</Label>
                <Input id="name" placeholder="Enter campaign name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="type">Campaign Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="outbound">Outbound</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="survey">Survey</SelectItem>
                      <SelectItem value="referral">Referral</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue="draft">
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" type="date" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="target">Target Count</Label>
                  <Input id="target" type="number" placeholder="0" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="assignedTo">Assigned To</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales_a">Sales Team A</SelectItem>
                      <SelectItem value="sales_b">Sales Team B</SelectItem>
                      <SelectItem value="marketing">Marketing Team</SelectItem>
                      <SelectItem value="customer_service">Customer Service Team</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <textarea 
                  id="description" 
                  className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter campaign description"
                ></textarea>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsCreateDialogOpen(false)}>Create Campaign</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="active" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active" className="flex items-center gap-2">
            <Megaphone className="h-4 w-4" />
            Active Campaigns
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Completed
          </TabsTrigger>
          <TabsTrigger value="draft" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Drafts
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Campaigns</CardTitle>
              <CardDescription>Currently running marketing campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              {activeCampaigns.length > 0 ? (
                renderCampaignTable(activeCampaigns)
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Megaphone className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No active campaigns</p>
                  <p className="text-sm">Create a new campaign to get started</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Campaigns</CardTitle>
              <CardDescription>Finished marketing campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              {completedCampaigns.length > 0 ? (
                renderCampaignTable(completedCampaigns)
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No completed campaigns</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="draft" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Draft Campaigns</CardTitle>
              <CardDescription>Campaigns in preparation</CardDescription>
            </CardHeader>
            <CardContent>
              {draftCampaigns.length > 0 ? (
                renderCampaignTable(draftCampaigns)
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No draft campaigns</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Communication Templates</CardTitle>
                  <CardDescription>Reusable templates for campaigns</CardDescription>
                </div>
                <Button size="sm">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Template
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Usage Count</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {templates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">{template.name}</TableCell>
                      <TableCell>
                        {template.type === 'Call Script' && (
                          <Badge variant="outline" className="border-blue-200 text-blue-800">Call Script</Badge>
                        )}
                        {template.type === 'Email' && (
                          <Badge variant="outline" className="border-indigo-200 text-indigo-800">Email</Badge>
                        )}
                        {template.type === 'SMS' && (
                          <Badge variant="outline" className="border-green-200 text-green-800">SMS</Badge>
                        )}
                      </TableCell>
                      <TableCell>{template.usage} times</TableCell>
                      <TableCell>{new Date(template.lastUpdated).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeCampaigns.length + completedCampaigns.length + draftCampaigns.length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {activeCampaigns.length} active, {completedCampaigns.length} completed, {draftCampaigns.length} drafts
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18.2%</div>
                <p className="text-xs text-green-600 mt-1">+2.1% from last quarter</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Contacts Reached</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,573</div>
                <p className="text-xs text-muted-foreground mt-1">Across all active campaigns</p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
              <CardDescription>Conversion rates by campaign type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-lg">
                <div className="text-center text-muted-foreground">
                  <BarChart className="h-8 w-8 mx-auto mb-2" />
                  <p>Campaign performance chart would be displayed here</p>
                  <p className="text-sm">Showing conversion rates and engagement metrics</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}