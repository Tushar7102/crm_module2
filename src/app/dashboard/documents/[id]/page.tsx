'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, FileCheck, Download, Eye, ArrowLeft, Edit, Save, Trash2, Clock, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import DocumentService, { Document } from '@/services/document-service';
import { toast } from 'sonner';

export default function DocumentDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<Document>>({
    name: '',
    type: '',
    category: '',
    tags: [],
    status: '',
  });

  useEffect(() => {
    const fetchDocument = async () => {
      setLoading(true);
      try {
        const doc = await DocumentService.getDocument(params.id);
        if (doc) {
          setDocument(doc);
          setEditData({
            name: doc.name,
            type: doc.type,
            category: doc.category,
            tags: doc.tags,
            status: doc.status,
            expiresAt: doc.expiresAt,
          });
        }
      } catch (error) {
        console.error('Error fetching document:', error);
        toast.error('Failed to load document');
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [params.id]);

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
        return <FileCheck className="h-5 w-5 text-blue-500" />;
      case 'checklist':
      case 'installation_report':
        return <FileText className="h-5 w-5 text-amber-500" />;
      case 'certificate':
      case 'warranty_certificate':
        return <FileCheck className="h-5 w-5 text-green-500" />;
      case 'invoice':
        return <FileText className="h-5 w-5 text-purple-500" />;
      case 'report':
      case 'site_survey':
        return <FileText className="h-5 w-5 text-indigo-500" />;
      case 'policy':
      case 'government_approval':
        return <FileText className="h-5 w-5 text-gray-500" />;
      case 'form':
      case 'subsidy_application':
        return <FileText className="h-5 w-5 text-teal-500" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setEditData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setEditData(prev => ({ ...prev, [id]: value }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsString = e.target.value;
    const tagsArray = tagsString.split(',').map(tag => tag.trim()).filter(Boolean);
    setEditData(prev => ({ ...prev, tags: tagsArray }));
  };

  const handleSaveChanges = async () => {
    if (!document) return;

    try {
      const updatedDoc = await DocumentService.updateDocument(document.id, editData);
      if (updatedDoc) {
        setDocument(updatedDoc);
        setIsEditing(false);
        toast.success('Document updated successfully');
      }
    } catch (error) {
      console.error('Error updating document:', error);
      toast.error('Failed to update document');
    }
  };

  const handleDeleteDocument = async () => {
    if (!document) return;

    if (confirm('Are you sure you want to delete this document? This action cannot be undone.')) {
      try {
        const success = await DocumentService.deleteDocument(document.id);
        if (success) {
          toast.success('Document deleted successfully');
          router.push('/dashboard/documents');
        }
      } catch (error) {
        console.error('Error deleting document:', error);
        toast.error('Failed to delete document');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <p className="text-muted-foreground">Loading document...</p>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
        <p className="text-muted-foreground mb-4">Document not found</p>
        <Button onClick={() => router.push('/dashboard/documents')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Documents
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.push('/dashboard/documents')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Document Details</h1>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button onClick={handleSaveChanges}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="destructive" onClick={handleDeleteDocument}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            {getDocumentTypeIcon(document.type)}
            {isEditing ? (
              <Input 
                id="name" 
                value={editData.name} 
                onChange={handleInputChange} 
                className="text-xl font-semibold"
              />
            ) : (
              <CardTitle>{document.name}</CardTitle>
            )}
            {getStatusBadge(document.status)}
          </div>
          <CardDescription>
            Document #{document.id}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Document Type</h3>
                {isEditing ? (
                  <Select 
                    value={editData.type} 
                    onValueChange={(value) => handleSelectChange('type', value)}
                  >
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
                ) : (
                  <p className="text-base">{document.type}</p>
                )}
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Category</h3>
                {isEditing ? (
                  <Select 
                    value={editData.category} 
                    onValueChange={(value) => handleSelectChange('category', value)}
                  >
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
                ) : (
                  <p className="text-base">{document.category}</p>
                )}
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Status</h3>
                {isEditing ? (
                  <Select 
                    value={editData.status} 
                    onValueChange={(value) => handleSelectChange('status', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  getStatusBadge(document.status)
                )}
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Tags</h3>
                {isEditing ? (
                  <Input 
                    id="tags" 
                    value={editData.tags?.join(', ')} 
                    onChange={handleTagsChange} 
                    placeholder="Enter tags separated by commas"
                  />
                ) : (
                  <div className="flex flex-wrap gap-1">
                    {document.tags?.map((tag, index) => (
                      <Badge key={index} variant="outline">{tag}</Badge>
                    ))}
                    {(!document.tags || document.tags.length === 0) && (
                      <span className="text-muted-foreground text-sm">No tags</span>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Uploaded By</h3>
                <p className="text-base">{document.uploadedBy}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Upload Date</h3>
                <p className="text-base">{new Date(document.uploadedAt).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Expiry Date</h3>
                {isEditing ? (
                  <Input 
                    id="expiresAt" 
                    type="date" 
                    value={editData.expiresAt ? new Date(editData.expiresAt).toISOString().split('T')[0] : ''} 
                    onChange={handleInputChange} 
                  />
                ) : (
                  <p className="text-base">
                    {document.expiresAt ? (
                      <>
                        {new Date(document.expiresAt).toLocaleDateString()}
                        {new Date(document.expiresAt) < new Date() && (
                          <span className="text-red-500 flex items-center gap-1 mt-1">
                            <AlertCircle className="h-3 w-3" />
                            Expired
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-muted-foreground">No expiry date</span>
                    )}
                  </p>
                )}
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">File Details</h3>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>{document.mimeType}</span>
                  <span className="text-muted-foreground">({Math.round(document.fileSize / 1024)} KB)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium mb-2">Document Preview</h3>
            <div className="border rounded-md p-4 flex items-center justify-center min-h-[200px] bg-muted/50">
              {document.fileUrl ? (
                document.mimeType?.includes('image') ? (
                  <img 
                    src={document.fileUrl} 
                    alt={document.name} 
                    className="max-h-[400px] object-contain" 
                  />
                ) : document.mimeType?.includes('pdf') ? (
                  <div className="text-center">
                    <FileText className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">PDF Document</p>
                    <Button className="mt-2" onClick={() => window.open(document.fileUrl, '_blank')}>
                      <Eye className="h-4 w-4 mr-2" />
                      View PDF
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <FileText className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">{document.mimeType} file</p>
                    <Button className="mt-2" onClick={() => window.open(document.fileUrl, '_blank')}>
                      <Download className="h-4 w-4 mr-2" />
                      Download File
                    </Button>
                  </div>
                )
              ) : (
                <p className="text-muted-foreground">No preview available</p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline" onClick={() => router.push('/dashboard/documents')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Documents
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.open(document.fileUrl, '_blank')}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            {document.status === 'pending' && (
              <Button className="bg-green-600 hover:bg-green-700">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Approve Document
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}