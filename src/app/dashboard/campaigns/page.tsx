'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Megaphone, Users, Phone, FileText, BarChart, Calendar, PlusCircle, Edit, Trash2, CheckCircle2, Loader2 } from 'lucide-react';
import { TelecallerService } from '@/services/telecaller-service';
import { Campaign, Template } from '@/services/telecaller-service';
import { toast } from 'sonner';

export default function CampaignsPage() {
  const [activeTab, setActiveTab] = useState('active');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    type: 'cold_calling',
    description: '',
    status: 'draft',
    startDate: '',
    endDate: '',
    targetAudience: '',
    assignedTelecallers: []
  });

  // Fetch campaigns and templates
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const campaignsData = await TelecallerService.getCampaigns();
        setCampaigns(campaignsData);
        
        const templatesData = await TelecallerService.getTemplates();
        setTemplates(templatesData);
      } catch (error) {
        toast.error('Failed to fetch data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter campaigns by status
  const activeCampaigns = campaigns.filter(campaign => 
    campaign.status.toLowerCase() === 'active'
  );

  const completedCampaigns = campaigns.filter(campaign => 
    campaign.status.toLowerCase() === 'completed'
  );

  const draftCampaigns = campaigns.filter(campaign => 
    campaign.status.toLowerCase() === 'draft' || campaign.status.toLowerCase() === 'paused'
  );

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Handle form select changes
  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Create campaign
  const handleCreateCampaign = async () => {
    try {
      // Validate required fields
      if (!formData.name || !formData.type || !formData.startDate) {
        toast.error('Name, type, and start date are required');
        return;
      }

      // Map client-side form data to server-side expected format
      const campaignData = {
        name: formData.name,
        type: formData.type.toLowerCase(), // Ensure type matches server enum values
        description: formData.description,
        status: formData.status.toLowerCase(), // Ensure status matches server enum values
        startDate: formData.startDate,
        endDate: formData.endDate || undefined,
        targetAudience: formData.targetAudience
        // Removed assignedAgents as server expects assignedTelecallers with a different structure
      };

      console.log('Sending campaign data:', campaignData);
      
      await TelecallerService.createCampaign(campaignData);
      toast.success('Campaign created successfully');
      setIsCreateDialogOpen(false);
      
      // Refresh campaigns
      const campaignsData = await TelecallerService.getCampaigns();
      setCampaigns(campaignsData);
      
      // Reset form
      setFormData({
        name: '',
        type: 'cold_calling',
        description: '',
        status: 'draft',
        startDate: '',
        endDate: '',
        targetAudience: '',
        assignedTelecallers: []
      });
    } catch (error) {
      toast.error('Failed to create campaign. Please check console for details.');
      console.error(error);
    }
  };

  // Edit campaign
  const handleEditCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setFormData({
      name: campaign.name,
      type: campaign.type || 'cold_calling',
      description: campaign.description || '',
      status: campaign.status || 'draft',
      startDate: campaign.startDate ? new Date(campaign.startDate).toISOString().split('T')[0] : '',
      endDate: campaign.endDate ? new Date(campaign.endDate).toISOString().split('T')[0] : '',
      targetAudience: campaign.targetAudience || '',
      assignedAgents: campaign.assignedTelecallers || []
    });
    setIsEditDialogOpen(true);
  };

  // Update campaign
  const handleUpdateCampaign = async () => {
    if (!selectedCampaign) return;
    
    try {
      // Validate required fields
      if (!formData.name || !formData.type || !formData.startDate) {
        toast.error('Name, type, and start date are required');
        return;
      }

      // Map client-side form data to server-side expected format
      const campaignData = {
        name: formData.name,
        type: formData.type.toLowerCase(), // Ensure type matches server enum values
        description: formData.description,
        status: formData.status.toLowerCase(), // Ensure status matches server enum values
        startDate: formData.startDate,
        endDate: formData.endDate || undefined,
        targetAudience: formData.targetAudience
        // Only include fields that match the server model
      };

      console.log('Sending updated campaign data:', campaignData);
      
      await TelecallerService.updateCampaign(selectedCampaign.id, campaignData);
      toast.success('Campaign updated successfully');
      setIsEditDialogOpen(false);
      
      // Refresh campaigns
      const campaignsData = await TelecallerService.getCampaigns();
      setCampaigns(campaignsData);
    } catch (error) {
      console.error('Error updating campaign:', error);
      toast.error('Failed to update campaign. Please check console for details.');
    }
  };

  // Delete campaign
  const handleDeleteClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCampaign = async () => {
    if (!selectedCampaign) return;
    
    try {
      await TelecallerService.deleteCampaign(selectedCampaign.id);
      toast.success('Campaign deleted successfully');
      setIsDeleteDialogOpen(false);
      
      // Refresh campaigns
      const campaignsData = await TelecallerService.getCampaigns();
      setCampaigns(campaignsData);
    } catch (error) {
      toast.error('Failed to delete campaign');
      console.error(error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Active</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Draft</Badge>;
      case 'paused':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Paused</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type.toLowerCase()) {
      case 'cold_calling':
        return <Badge variant="outline" className="border-blue-200 text-blue-800">Cold Calling</Badge>;
      case 'follow_up':
        return <Badge variant="outline" className="border-indigo-200 text-indigo-800">Follow Up</Badge>;
      case 'lead_nurturing':
        return <Badge variant="outline" className="border-green-200 text-green-800">Lead Nurturing</Badge>;
      case 'promotional':
        return <Badge variant="outline" className="border-amber-200 text-amber-800">Promotional</Badge>;
      case 'event':
        return <Badge variant="outline" className="border-purple-200 text-purple-800">Event</Badge>;
      case 'other':
        return <Badge variant="outline" className="border-gray-200 text-gray-800">Other</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const renderCampaignTable = (campaigns: Campaign[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Campaign Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Timeline</TableHead>
          <TableHead>Progress</TableHead>
          <TableHead>Assigned To</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {campaigns.map((campaign) => (
          <TableRow key={campaign.id}>
            <TableCell className="font-medium">{campaign.name}</TableCell>
            <TableCell>{getTypeBadge(campaign.type || '')}</TableCell>
            <TableCell>{getStatusBadge(campaign.status)}</TableCell>
            <TableCell>
              <div className="text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Start: {new Date(campaign.startDate).toLocaleDateString()}</span>
                </div>
                {campaign.endDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>End: {new Date(campaign.endDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </TableCell>
            <TableCell>
              <div className="space-y-1">
                {campaign.metrics?.target && campaign.metrics?.completed ? (
                  <>
                    <div className="flex justify-between text-xs">
                      <span>{campaign.metrics.completed} / {campaign.metrics.target}</span>
                      <span>{Math.round((campaign.metrics.completed / campaign.metrics.target) * 100)}%</span>
                    </div>
                    <Progress value={(campaign.metrics.completed / campaign.metrics.target) * 100} />
                  </>
                ) : (
                  <span className="text-xs text-muted-foreground">No progress data</span>
                )}
              </div>
            </TableCell>
            <TableCell>
              {campaign.assignedTelecallers?.length ? (
                campaign.assignedTelecallers.join(', ')
              ) : (
                <span className="text-xs text-muted-foreground">Unassigned</span>
              )}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleEditCampaign(campaign)}>
                  <Edit className="h-4 w-4" />
                </Button>
                {campaign.status.toLowerCase() !== 'completed' && (
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(campaign)}>
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
        {loading ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </Button>
        ) : (
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
                  <Input 
                    id="name" 
                    placeholder="Enter campaign name" 
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="type">Campaign Type</Label>
                    <Select value={formData.type} onValueChange={(value) => handleSelectChange('type', value)}>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cold_calling">Cold Calling</SelectItem>
                        <SelectItem value="follow_up">Follow Up</SelectItem>
                        <SelectItem value="lead_nurturing">Lead Nurturing</SelectItem>
                        <SelectItem value="promotional">Promotional</SelectItem>
                        <SelectItem value="event">Event</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleSelectChange('status', value)}>
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input 
                      id="startDate" 
                      type="date" 
                      value={formData.startDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input 
                      id="endDate" 
                      type="date" 
                      value={formData.endDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <Input 
                    id="targetAudience" 
                    placeholder="Describe target audience" 
                    value={formData.targetAudience}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Enter campaign description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateCampaign}>Create Campaign</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
      
      {/* Edit Campaign Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Campaign</DialogTitle>
            <DialogDescription>
              Update the campaign details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Campaign Name</Label>
              <Input 
                id="name" 
                placeholder="Enter campaign name" 
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Campaign Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleSelectChange('type', value)}>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cold_calling">Cold Calling</SelectItem>
                        <SelectItem value="follow_up">Follow Up</SelectItem>
                        <SelectItem value="lead_nurturing">Lead Nurturing</SelectItem>
                        <SelectItem value="promotional">Promotional</SelectItem>
                        <SelectItem value="event">Event</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleSelectChange('status', value)}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input 
                  id="startDate" 
                  type="date" 
                  value={formData.startDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input 
                  id="endDate" 
                  type="date" 
                  value={formData.endDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="targetAudience">Target Audience</Label>
              <Input 
                id="targetAudience" 
                placeholder="Describe target audience" 
                value={formData.targetAudience}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Enter campaign description"
                value={formData.description}
                onChange={handleInputChange}
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateCampaign}>Update Campaign</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Campaign Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Campaign</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this campaign? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteCampaign}>Delete Campaign</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : activeCampaigns.length > 0 ? (
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
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : completedCampaigns.length > 0 ? (
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
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : draftCampaigns.length > 0 ? (
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
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : templates.length > 0 ? (
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
                          {template.type === 'call_script' && (
                            <Badge variant="outline" className="border-blue-200 text-blue-800">Call Script</Badge>
                          )}
                          {template.type === 'email' && (
                            <Badge variant="outline" className="border-indigo-200 text-indigo-800">Email</Badge>
                          )}
                          {template.type === 'sms' && (
                            <Badge variant="outline" className="border-green-200 text-green-800">SMS</Badge>
                          )}
                        </TableCell>
                        <TableCell>{template.usageCount || 0} times</TableCell>
                        <TableCell>{template.updatedAt ? new Date(template.updatedAt).toLocaleDateString() : 'N/A'}</TableCell>
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
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No templates found</p>
                  <p className="text-sm">Create a new template to get started</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{campaigns.length}</div>
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
                    <div className="text-2xl font-bold">-</div>
                    <p className="text-xs text-muted-foreground mt-1">No data available</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Contacts Reached</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">-</div>
                    <p className="text-xs text-muted-foreground mt-1">No data available</p>
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
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}