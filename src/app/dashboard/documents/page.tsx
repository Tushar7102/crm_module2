'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
import DocumentService, { Document, DocumentFormData } from '@/services/document-service';
import { toast } from 'sonner';

export default function DocumentsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState<Partial<DocumentFormData>>({
    name: '',
    type: '',
    category: '',
    tags: [],
    description: '',
    expiresAt: '',
    relatedTo: {
      entityType: 'Customer',
      entityId: ''
    }
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Fetch documents from API
  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        const status = activeTab !== 'all' ? activeTab : undefined;
        const filters = {
          status: status as any,
          searchTerm: searchQuery || undefined,
        };
        const docs = await DocumentService.getDocuments(filters);
        setDocuments(docs);
      } catch (error) {
        console.error('Error fetching documents:', error);
        toast.error('Failed to load documents');
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [activeTab, searchQuery]);

  // Filter documents based on active tab and search query
  const filteredDocuments = documents.filter(doc => {
    // Filter by tab
    if (activeTab === 'approved' && doc.status !== 'approved') return false;
    if (activeTab === 'pending' && doc.status !== 'pending') return false;
    if (activeTab === 'rejected' && doc.status !== 'rejected') return false;
    
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

  const getDocumentTypeIcon = (type: string) => {
    switch (type) {
      case 'contract':
      case 'customer_agreement':
        return <FileCheck className="h-4 w-4 text-blue-500" />;
      case 'checklist':
      case 'installation_report':
        return <FileText className="h-4 w-4 text-amber-500" />;
      case 'certificate':
      case 'warranty_certificate':
        return <FileCheck className="h-4 w-4 text-green-500" />;
      case 'invoice':
        return <FileText className="h-4 w-4 text-purple-500" />;
      case 'report':
      case 'site_survey':
        return <FileText className="h-4 w-4 text-indigo-500" />;
      case 'policy':
      case 'government_approval':
        return <FileText className="h-4 w-4 text-gray-500" />;
      case 'form':
      case 'subsidy_application':
        return <FileText className="h-4 w-4 text-teal-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    
    // Special handling for relatedTo.entityId
    if (id === 'entityId') {
      setFormData(prev => ({
        ...prev,
        relatedTo: {
          ...prev.relatedTo,
          entityId: value
        }
      }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    // Special handling for relatedTo.entityType
    if (id === 'entityType') {
      setFormData(prev => ({
        ...prev,
        relatedTo: {
          ...prev.relatedTo,
          entityType: value
        }
      }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsString = e.target.value;
    const tagsArray = tagsString.split(',').map(tag => tag.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, tags: tagsArray }));
  };

  const handleUploadDocument = async () => {
    if (!selectedFile) {
      toast.error('Please select a file to upload');
      return;
    }

    if (!formData.name || !formData.type || !formData.category) {
      toast.error('Please fill all required fields');
      return;
    }
    
    // Make entityId optional now
    // if (!formData.relatedTo.entityId) {
    //   toast.error('Please enter an Entity ID');
    //   return;
    // }

    try {
      // Ensure relatedTo is properly set
      const relatedTo = {
        entityType: formData.relatedTo?.entityType || 'Customer',
        entityId: formData.relatedTo?.entityId || ''
      };
      
      console.log('Uploading document with relatedTo:', relatedTo);
      console.log('File details:', {
        name: selectedFile.name,
        type: selectedFile.type,
        size: selectedFile.size,
      });
      
      const documentData: DocumentFormData = {
        name: formData.name,
        type: formData.type,
        category: formData.category,
        file: selectedFile,
        tags: formData.tags,
        expiresAt: formData.expiresAt,
        relatedTo: relatedTo,
        metadata: formData.description ? { description: formData.description } : undefined
      };

      setIsUploading(true);
      await DocumentService.uploadDocument(documentData);
      setIsUploading(false);
      
      toast.success('Document uploaded successfully');
      
      // Reset form and close dialog
      setFormData({
        name: '',
        type: '',
        category: '',
        tags: [],
        description: '',
        expiresAt: '',
        relatedTo: {
          entityType: 'Customer',
          entityId: ''
        }
      });
      setSelectedFile(null);
      setIsUploadDialogOpen(false);
      
      // Refresh documents list
      const docs = await DocumentService.getDocuments();
      setDocuments(docs);
    } catch (error: any) {
      setIsUploading(false);
      console.error('Error uploading document:', error);
      toast.error(error.message || 'Failed to upload document. Please try again.');
    }
  };

  const handleDeleteDocument = async (id: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      try {
        await DocumentService.deleteDocument(id);
        // Remove document from state
        setDocuments(prev => prev.filter(doc => doc.id !== id));
      } catch (error) {
        console.error('Error deleting document:', error);
      }
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
                <Input id="file" type="file" onChange={handleFileChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Document Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter document name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="type">Document Type</Label>
                  <Select value={formData.type} onValueChange={(value) => handleSelectChange('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer_agreement">Customer Agreement</SelectItem>
                      <SelectItem value="invoice">Invoice</SelectItem>
                      <SelectItem value="quotation">Quotation</SelectItem>
                      <SelectItem value="subsidy_application">Subsidy Application</SelectItem>
                      <SelectItem value="technical_specification">Technical Specification</SelectItem>
                      <SelectItem value="site_survey">Site Survey</SelectItem>
                      <SelectItem value="installation_report">Installation Report</SelectItem>
                      <SelectItem value="warranty_certificate">Warranty Certificate</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleSelectChange('category', value)}>
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
                <Input 
                  id="expiresAt" 
                  type="date" 
                  value={formData.expiresAt || ''} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input 
                  id="tags" 
                  placeholder="contract, residential, etc." 
                  value={formData.tags.join(', ')}
                  onChange={handleTagsChange} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <textarea 
                  id="description" 
                  className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter document description"
                  value={formData.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="entityType">Related To (Type)</Label>
                  <Select 
                    value={formData.relatedTo.entityType} 
                    onValueChange={(value) => handleSelectChange('entityType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select entity type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Customer">Customer</SelectItem>
                      <SelectItem value="SalesLead">Sales Lead</SelectItem>
                      <SelectItem value="Opportunity">Opportunity</SelectItem>
                      <SelectItem value="ServiceTicket">Service Ticket</SelectItem>
                      <SelectItem value="Project">Project</SelectItem>
                      <SelectItem value="InventoryItem">Inventory Item</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="entityId">Entity ID</Label>
                  <Input 
                    id="entityId" 
                    placeholder="Enter entity ID" 
                    value={formData.relatedTo.entityId} 
                    onChange={handleInputChange} 
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)} disabled={isUploading}>Cancel</Button>
              <Button onClick={handleUploadDocument} disabled={isUploading}>
                {isUploading ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground"></span>
                    Uploading...
                  </>
                ) : (
                  'Upload Document'
                )}
              </Button>
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
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Loading documents...</p>
            </div>
          ) : filteredDocuments.length > 0 ? (
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
                        <span 
                          className="font-medium hover:text-blue-600 hover:underline cursor-pointer"
                          onClick={() => router.push(`/dashboard/documents/${doc.id}`)}
                        >
                          {doc.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{doc.type}</TableCell>
                    <TableCell>{doc.category}</TableCell>
                    <TableCell>{getStatusBadge(doc.status)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{new Date(doc.uploadedAt).toLocaleDateString()}</div>
                        <div className="text-xs text-muted-foreground">by {doc.uploadedBy}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {doc.expiresAt ? (
                        <div className="text-sm">
                          {new Date(doc.expiresAt).toLocaleDateString()}
                          {new Date(doc.expiresAt) < new Date() && (
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
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteDocument(doc.id)}
                        >
                          <FileX className="h-4 w-4 text-red-500" />
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
              {/* This would be fetched from an activity log API */}
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
                <span className="font-medium">{documents.filter(d => d.status === 'approved').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Pending</span>
                <span className="font-medium">{documents.filter(d => d.status === 'pending').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Rejected</span>
                <span className="font-medium">{documents.filter(d => d.status === 'rejected').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Expiring Soon (30 days)</span>
                <span className="font-medium">
                  {documents.filter(d => {
                    if (!d.expiresAt) return false;
                    const expiryDate = new Date(d.expiresAt);
                    const thirtyDaysFromNow = new Date();
                    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
                    return expiryDate <= thirtyDaysFromNow && expiryDate >= new Date();
                  }).length}
                </span>
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