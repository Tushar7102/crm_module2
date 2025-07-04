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
import { FileText, FilePlus, FileCheck, Clock, Calendar, Download, Eye, PlusCircle, Search, Filter, FileX, Upload, CheckCircle2, AlertCircle } from 'lucide-react';

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  
  // Mock data for documents
  const documents = [
    { 
      id: 1, 
      name: 'Customer Contract - John Doe', 
      type: 'Contract', 
      category: 'Customer',
      status: 'Approved',
      uploadedBy: 'Sarah Johnson',
      uploadDate: '2023-07-10',
      expiryDate: '2024-07-10',
      size: '1.2 MB',
      version: '1.0',
      tags: ['contract', 'residential']
    },
    { 
      id: 2, 
      name: 'Installation Checklist - Project #1234', 
      type: 'Checklist', 
      category: 'Installation',
      status: 'Pending Approval',
      uploadedBy: 'Mike Williams',
      uploadDate: '2023-07-12',
      expiryDate: null,
      size: '450 KB',
      version: '1.0',
      tags: ['installation', 'checklist']
    },
    { 
      id: 3, 
      name: 'Warranty Certificate - Solar Panels', 
      type: 'Certificate', 
      category: 'Product',
      status: 'Approved',
      uploadedBy: 'Emily Davis',
      uploadDate: '2023-06-28',
      expiryDate: '2033-06-28',
      size: '890 KB',
      version: '1.0',
      tags: ['warranty', 'product']
    },
    { 
      id: 4, 
      name: 'Invoice #INV-2023-0568', 
      type: 'Invoice', 
      category: 'Finance',
      status: 'Approved',
      uploadedBy: 'Robert Chen',
      uploadDate: '2023-07-05',
      expiryDate: null,
      size: '320 KB',
      version: '1.0',
      tags: ['invoice', 'payment']
    },
    { 
      id: 5, 
      name: 'Site Survey Report - 123 Main St', 
      type: 'Report', 
      category: 'Survey',
      status: 'Rejected',
      uploadedBy: 'James Wilson',
      uploadDate: '2023-07-08',
      expiryDate: null,
      size: '4.5 MB',
      version: '1.0',
      tags: ['survey', 'site']
    },
    { 
      id: 6, 
      name: 'Employee Handbook 2023', 
      type: 'Policy', 
      category: 'HR',
      status: 'Approved',
      uploadedBy: 'Admin',
      uploadDate: '2023-01-15',
      expiryDate: '2023-12-31',
      size: '2.8 MB',
      version: '3.2',
      tags: ['policy', 'hr']
    },
    { 
      id: 7, 
      name: 'Subsidy Application Form', 
      type: 'Form', 
      category: 'Subsidy',
      status: 'Approved',
      uploadedBy: 'Admin',
      uploadDate: '2023-05-20',
      expiryDate: null,
      size: '550 KB',
      version: '2.1',
      tags: ['subsidy', 'form']
    },
  ];

  // Filter documents based on active tab and search query
  const filteredDocuments = documents.filter(doc => {
    // Filter by tab
    if (activeTab === 'approved' && doc.status !== 'Approved') return false;
    if (activeTab === 'pending' && doc.status !== 'Pending Approval') return false;
    if (activeTab === 'rejected' && doc.status !== 'Rejected') return false;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        doc.name.toLowerCase().includes(query) ||
        doc.type.toLowerCase().includes(query) ||
        doc.category.toLowerCase().includes(query) ||
        (doc.tags && doc.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }
    
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Approved</Badge>;
      case 'Pending Approval':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Pending Approval</Badge>;
      case 'Rejected':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getDocumentTypeIcon = (type: string) => {
    switch (type) {
      case 'Contract':
        return <FileCheck className="h-4 w-4 text-blue-500" />;
      case 'Checklist':
        return <FileText className="h-4 w-4 text-amber-500" />;
      case 'Certificate':
        return <FileCheck className="h-4 w-4 text-green-500" />;
      case 'Invoice':
        return <FileText className="h-4 w-4 text-purple-500" />;
      case 'Report':
        return <FileText className="h-4 w-4 text-indigo-500" />;
      case 'Policy':
        return <FileText className="h-4 w-4 text-gray-500" />;
      case 'Form':
        return <FileText className="h-4 w-4 text-teal-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Document Management</h1>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload New Document</DialogTitle>
              <DialogDescription>
                Upload a document and add relevant metadata.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="file">Document File</Label>
                <Input id="file" type="file" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Document Name</Label>
                <Input id="name" placeholder="Enter document name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="type">Document Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="checklist">Checklist</SelectItem>
                      <SelectItem value="certificate">Certificate</SelectItem>
                      <SelectItem value="invoice">Invoice</SelectItem>
                      <SelectItem value="report">Report</SelectItem>
                      <SelectItem value="policy">Policy</SelectItem>
                      <SelectItem value="form">Form</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="installation">Installation</SelectItem>
                      <SelectItem value="product">Product</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="survey">Survey</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="subsidy">Subsidy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="expiryDate">Expiry Date (if applicable)</Label>
                <Input id="expiryDate" type="date" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input id="tags" placeholder="contract, residential, etc." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <textarea 
                  id="description" 
                  className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter document description"
                ></textarea>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsUploadDialogOpen(false)}>Upload Document</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search documents..." 
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
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
          <CardDescription>
            {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredDocuments.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Uploaded</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getDocumentTypeIcon(doc.type)}
                        <span className="font-medium">{doc.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{doc.type}</TableCell>
                    <TableCell>{doc.category}</TableCell>
                    <TableCell>{getStatusBadge(doc.status)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{new Date(doc.uploadDate).toLocaleDateString()}</div>
                        <div className="text-xs text-muted-foreground">by {doc.uploadedBy}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {doc.expiryDate ? (
                        <div className="text-sm">
                          {new Date(doc.expiryDate).toLocaleDateString()}
                          {new Date(doc.expiryDate) < new Date() && (
                            <div className="text-xs text-red-500 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              Expired
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">N/A</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <FileX className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No documents found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <div className="bg-green-100 p-1 rounded-full">
                  <Upload className="h-3 w-3 text-green-600" />
                </div>
                <div className="text-sm">
                  <p><span className="font-medium">Mike Williams</span> uploaded <span className="font-medium">Installation Checklist</span></p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-amber-100 p-1 rounded-full">
                  <Clock className="h-3 w-3 text-amber-600" />
                </div>
                <div className="text-sm">
                  <p><span className="font-medium">Sarah Johnson</span> requested approval for <span className="font-medium">Customer Contract</span></p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-green-100 p-1 rounded-full">
                  <CheckCircle2 className="h-3 w-3 text-green-600" />
                </div>
                <div className="text-sm">
                  <p><span className="font-medium">Admin</span> approved <span className="font-medium">Invoice #INV-2023-0568</span></p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-red-100 p-1 rounded-full">
                  <FileX className="h-3 w-3 text-red-600" />
                </div>
                <div className="text-sm">
                  <p><span className="font-medium">Admin</span> rejected <span className="font-medium">Site Survey Report</span></p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Document Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Documents</span>
                <span className="font-medium">{documents.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Approved</span>
                <span className="font-medium">{documents.filter(d => d.status === 'Approved').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Pending Approval</span>
                <span className="font-medium">{documents.filter(d => d.status === 'Pending Approval').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Rejected</span>
                <span className="font-medium">{documents.filter(d => d.status === 'Rejected').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Expiring Soon (30 days)</span>
                <span className="font-medium">2</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <FilePlus className="h-4 w-4 mr-2" />
                Create Document Template
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Eye className="h-4 w-4 mr-2" />
                View Pending Approvals
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Batch Download
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertCircle className="h-4 w-4 mr-2" />
                View Expiring Documents
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}