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
import { CheckCircle2, XCircle, Clock, FileText, FileCheck, Filter, Search, Eye, ThumbsUp, ThumbsDown, MessageSquare, AlertCircle, PenLine } from 'lucide-react';

export default function ApprovalsPage() {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [selectedApproval, setSelectedApproval] = useState<any>(null);
  
  // Mock data for approvals
  const approvals = [
    { 
      id: 1, 
      documentName: 'Customer Contract - John Doe', 
      documentType: 'Contract',
      requestedBy: {
        name: 'Sarah Johnson',
        avatar: '/avatars/sarah.jpg',
        department: 'Sales'
      },
      requestDate: '2023-07-12T10:30:00',
      dueDate: '2023-07-14T17:00:00',
      status: 'pending',
      priority: 'high',
      notes: 'Please review and approve this customer contract for our new solar installation project.',
      approvers: [
        { name: 'Michael Brown', status: 'approved', date: '2023-07-12T14:15:00' },
        { name: 'Current User', status: 'pending', date: null },
        { name: 'Jessica Lee', status: 'pending', date: null }
      ]
    },
    { 
      id: 2, 
      documentName: 'Installation Checklist - Project #1234', 
      documentType: 'Checklist',
      requestedBy: {
        name: 'Mike Williams',
        avatar: '/avatars/mike.jpg',
        department: 'Installation'
      },
      requestDate: '2023-07-11T15:45:00',
      dueDate: '2023-07-13T17:00:00',
      status: 'pending',
      priority: 'medium',
      notes: 'Installation completed, please review the checklist and approve.',
      approvers: [
        { name: 'Robert Chen', status: 'approved', date: '2023-07-12T09:30:00' },
        { name: 'Current User', status: 'pending', date: null }
      ]
    },
    { 
      id: 3, 
      documentName: 'Subsidy Claim - ABC123', 
      documentType: 'Claim',
      requestedBy: {
        name: 'Emily Davis',
        avatar: '/avatars/emily.jpg',
        department: 'Subsidy'
      },
      requestDate: '2023-07-10T11:20:00',
      dueDate: '2023-07-12T17:00:00',
      status: 'pending',
      priority: 'high',
      notes: 'Subsidy claim for government rebate program. All documentation has been verified.',
      approvers: [
        { name: 'Current User', status: 'pending', date: null }
      ]
    },
    { 
      id: 4, 
      documentName: 'Invoice #INV-2023-0568', 
      documentType: 'Invoice',
      requestedBy: {
        name: 'Robert Chen',
        avatar: '/avatars/robert.jpg',
        department: 'Finance'
      },
      requestDate: '2023-07-05T09:15:00',
      dueDate: '2023-07-07T17:00:00',
      status: 'approved',
      priority: 'medium',
      notes: 'Monthly invoice for customer payment.',
      approvers: [
        { name: 'Current User', status: 'approved', date: '2023-07-06T10:45:00' }
      ]
    },
    { 
      id: 5, 
      documentName: 'Site Survey Report - 123 Main St', 
      documentType: 'Report',
      requestedBy: {
        name: 'James Wilson',
        avatar: '/avatars/james.jpg',
        department: 'Survey'
      },
      requestDate: '2023-07-08T14:30:00',
      dueDate: '2023-07-10T17:00:00',
      status: 'rejected',
      priority: 'medium',
      notes: 'Site survey report for new installation.',
      approvers: [
        { name: 'Current User', status: 'rejected', date: '2023-07-09T11:20:00' }
      ],
      rejectionReason: 'Missing critical measurements and roof assessment. Please revise and resubmit.'
    },
  ];

  // Filter approvals based on active tab and search query
  const filteredApprovals = approvals.filter(approval => {
    // Filter by tab
    if (activeTab === 'pending' && approval.status !== 'pending') return false;
    if (activeTab === 'approved' && approval.status !== 'approved') return false;
    if (activeTab === 'rejected' && approval.status !== 'rejected') return false;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        approval.documentName.toLowerCase().includes(query) ||
        approval.documentType.toLowerCase().includes(query) ||
        approval.requestedBy.name.toLowerCase().includes(query) ||
        approval.requestedBy.department.toLowerCase().includes(query)
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

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="outline" className="border-red-200 text-red-800 bg-red-50">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="border-amber-200 text-amber-800 bg-amber-50">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="border-green-200 text-green-800 bg-green-50">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getDocumentTypeIcon = (type: string) => {
    switch (type) {
      case 'Contract':
        return <FileCheck className="h-4 w-4 text-blue-500" />;
      case 'Checklist':
        return <FileText className="h-4 w-4 text-amber-500" />;
      case 'Claim':
        return <FileText className="h-4 w-4 text-purple-500" />;
      case 'Invoice':
        return <FileText className="h-4 w-4 text-green-500" />;
      case 'Report':
        return <FileText className="h-4 w-4 text-indigo-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const handleOpenReviewDialog = (approval: any) => {
    setSelectedApproval(approval);
    setIsReviewDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Approval Workflows</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search approvals..." 
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
          <Tabs defaultValue="pending" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="pending" className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Pending
              </TabsTrigger>
              <TabsTrigger value="approved" className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" />
                Approved
              </TabsTrigger>
              <TabsTrigger value="rejected" className="flex items-center gap-1">
                <XCircle className="h-4 w-4" />
                Rejected
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Approval Requests</CardTitle>
          <CardDescription>
            {filteredApprovals.length} request{filteredApprovals.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredApprovals.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Requested By</TableHead>
                  <TableHead>Date Requested</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApprovals.map((approval) => (
                  <TableRow key={approval.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getDocumentTypeIcon(approval.documentType)}
                        <div>
                          <div className="font-medium">{approval.documentName}</div>
                          <div className="text-xs text-muted-foreground">{approval.documentType}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={approval.requestedBy.avatar} />
                          <AvatarFallback>{approval.requestedBy.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm">{approval.requestedBy.name}</div>
                          <div className="text-xs text-muted-foreground">{approval.requestedBy.department}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{formatDate(approval.requestDate)}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {formatDate(approval.dueDate)}
                        {isOverdue(approval.dueDate) && approval.status === 'pending' && (
                          <div className="text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Overdue
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getPriorityBadge(approval.priority)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(approval.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenReviewDialog(approval)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        {approval.status === 'pending' && (
                          <>
                            <Button variant="ghost" size="icon" className="text-green-600" onClick={() => handleOpenReviewDialog(approval)}>
                              <ThumbsUp className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-600" onClick={() => handleOpenReviewDialog(approval)}>
                              <ThumbsDown className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {activeTab === 'pending' ? (
                <>
                  <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No pending approvals</p>
                  <p className="text-sm">You're all caught up!</p>
                </>
              ) : activeTab === 'approved' ? (
                <>
                  <CheckCircle2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No approved documents found</p>
                </>
              ) : (
                <>
                  <XCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No rejected documents found</p>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approval Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Requests</span>
                <span className="font-medium">{approvals.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Pending</span>
                <span className="font-medium">{approvals.filter(a => a.status === 'pending').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Approved</span>
                <span className="font-medium">{approvals.filter(a => a.status === 'approved').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Rejected</span>
                <span className="font-medium">{approvals.filter(a => a.status === 'rejected').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Overdue</span>
                <span className="font-medium text-red-500">
                  {approvals.filter(a => a.status === 'pending' && isOverdue(a.dueDate)).length}
                </span>
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
              <div className="flex items-start gap-2">
                <div className="bg-green-100 p-1 rounded-full">
                  <CheckCircle2 className="h-3 w-3 text-green-600" />
                </div>
                <div className="text-sm">
                  <p>You approved <span className="font-medium">Invoice #INV-2023-0568</span></p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-red-100 p-1 rounded-full">
                  <XCircle className="h-3 w-3 text-red-600" />
                </div>
                <div className="text-sm">
                  <p>You rejected <span className="font-medium">Site Survey Report</span></p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-blue-100 p-1 rounded-full">
                  <MessageSquare className="h-3 w-3 text-blue-600" />
                </div>
                <div className="text-sm">
                  <p><span className="font-medium">Michael Brown</span> commented on <span className="font-medium">Customer Contract</span></p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-green-100 p-1 rounded-full">
                  <CheckCircle2 className="h-3 w-3 text-green-600" />
                </div>
                <div className="text-sm">
                  <p>You approved <span className="font-medium">Vendor Agreement</span></p>
                  <p className="text-xs text-muted-foreground">1 week ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approval Workflow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 w-6 h-6 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm">Document Submitted</span>
                </div>
                <div className="h-px w-4 bg-muted"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 w-6 h-6 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm">Initial Review</span>
                </div>
                <div className="h-px w-4 bg-muted"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-amber-100 w-6 h-6 rounded-full flex items-center justify-center">
                    <Clock className="h-4 w-4 text-amber-600" />
                  </div>
                  <span className="text-sm font-medium">Your Approval</span>
                </div>
                <div className="h-px w-4 bg-muted"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center">
                    <Clock className="h-4 w-4 text-gray-400" />
                  </div>
                  <span className="text-sm text-muted-foreground">Final Approval</span>
                </div>
                <div className="h-px w-4 bg-muted"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-gray-400" />
                  </div>
                  <span className="text-sm text-muted-foreground">Document Finalized</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="max-w-3xl">
          {selectedApproval && (
            <>
              <DialogHeader>
                <DialogTitle>Review Document</DialogTitle>
                <DialogDescription>
                  Review and approve or reject this document.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Document</h3>
                    <div className="flex items-center gap-2">
                      {getDocumentTypeIcon(selectedApproval.documentType)}
                      <div>
                        <div className="font-medium">{selectedApproval.documentName}</div>
                        <div className="text-xs text-muted-foreground">{selectedApproval.documentType}</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Requested By</h3>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={selectedApproval.requestedBy.avatar} />
                        <AvatarFallback>{selectedApproval.requestedBy.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm">{selectedApproval.requestedBy.name}</div>
                        <div className="text-xs text-muted-foreground">{selectedApproval.requestedBy.department}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Date Requested</h3>
                    <p className="text-sm">{formatDate(selectedApproval.requestDate)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Due Date</h3>
                    <p className="text-sm">
                      {formatDate(selectedApproval.dueDate)}
                      {isOverdue(selectedApproval.dueDate) && selectedApproval.status === 'pending' && (
                        <span className="text-xs text-red-500 ml-2 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          Overdue
                        </span>
                      )}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Priority</h3>
                    <div>{getPriorityBadge(selectedApproval.priority)}</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Notes</h3>
                  <p className="text-sm p-3 bg-muted rounded-md">{selectedApproval.notes}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Approval Workflow</h3>
                  <div className="space-y-2 mt-2">
                    {selectedApproval.approvers.map((approver: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>{approver.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{approver.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {approver.status === 'approved' && (
                            <Badge className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3" />
                              Approved
                            </Badge>
                          )}
                          {approver.status === 'rejected' && (
                            <Badge className="bg-red-100 text-red-800 border-red-200 flex items-center gap-1">
                              <XCircle className="h-3 w-3" />
                              Rejected
                            </Badge>
                          )}
                          {approver.status === 'pending' && (
                            <Badge className="bg-amber-100 text-amber-800 border-amber-200 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Pending
                            </Badge>
                          )}
                          {approver.date && <span className="text-xs text-muted-foreground">{new Date(approver.date).toLocaleString()}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {selectedApproval.status === 'rejected' && selectedApproval.rejectionReason && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Rejection Reason</h3>
                    <p className="text-sm p-3 bg-red-50 text-red-800 rounded-md border border-red-200">{selectedApproval.rejectionReason}</p>
                  </div>
                )}
                
                {selectedApproval.status === 'pending' && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Your Comments</h3>
                    <textarea 
                      className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Add your comments here..."
                    ></textarea>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    View Document
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <PenLine className="h-4 w-4" />
                    E-Sign
                  </Button>
                </div>
              </div>
              <DialogFooter>
                {selectedApproval.status === 'pending' ? (
                  <>
                    <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>Cancel</Button>
                    <Button variant="destructive" className="flex items-center gap-1">
                      <ThumbsDown className="h-4 w-4" />
                      Reject
                    </Button>
                    <Button className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      Approve
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>Close</Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}