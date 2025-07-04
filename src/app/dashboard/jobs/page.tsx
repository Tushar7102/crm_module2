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
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Filter, Plus, MoreHorizontal, Download, Calendar, Clock, CheckCircle2, XCircle, AlertCircle, User, ArrowUpRight, BarChart3, Printer, FileText, Upload, Building2, Users, Tag, ClipboardList, History, Eye, Pencil, Trash2, ArrowRight, ExternalLink, Tool, Wrench, HardHat, MapPin, Phone, Mail, Home, Truck, Hammer, Clipboard, CheckSquare, CalendarRange, CalendarClock, AlertTriangle, Play, Edit, Activity, Send, MoreVertical } from 'lucide-react';

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewJobDialogOpen, setIsNewJobDialogOpen] = useState(false);
  const [isJobDetailsDialogOpen, setIsJobDetailsDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  
  // Mock data for installation jobs
  const jobs = [
    {
      id: 'JOB-2023-0001',
      title: 'Residential Solar Installation',
      customerName: 'John Smith',
      customerEmail: 'john.smith@example.com',
      customerPhone: '(555) 123-4567',
      address: '123 Solar Ave, Sunnyville, CA 94123',
      systemSize: 8.5,
      status: 'completed',
      priority: 'medium',
      assignedTo: ['Michael Rodriguez', 'David Chen'],
      scheduledDate: '2023-07-15T09:00:00',
      completedDate: '2023-07-15T16:30:00',
      estimatedHours: 8,
      actualHours: 7.5,
      materials: [
        { name: 'Solar Panels (400W)', quantity: 22, status: 'used' },
        { name: 'Inverter (8kW)', quantity: 1, status: 'used' },
        { name: 'Mounting Hardware', quantity: 1, status: 'used' },
        { name: 'Electrical Wiring Kit', quantity: 1, status: 'used' }
      ],
      checklist: [
        { task: 'Site assessment', completed: true, completedBy: 'Michael Rodriguez', completedAt: '2023-07-15T09:30:00' },
        { task: 'Roof preparation', completed: true, completedBy: 'David Chen', completedAt: '2023-07-15T10:45:00' },
        { task: 'Mounting installation', completed: true, completedBy: 'Michael Rodriguez', completedAt: '2023-07-15T12:30:00' },
        { task: 'Panel installation', completed: true, completedBy: 'David Chen', completedAt: '2023-07-15T14:15:00' },
        { task: 'Inverter installation', completed: true, completedBy: 'Michael Rodriguez', completedAt: '2023-07-15T15:00:00' },
        { task: 'System testing', completed: true, completedBy: 'David Chen', completedAt: '2023-07-15T16:00:00' },
        { task: 'Customer walkthrough', completed: true, completedBy: 'Michael Rodriguez', completedAt: '2023-07-15T16:30:00' }
      ],
      notes: 'Installation completed successfully. Customer very satisfied with the work.',
      timeline: [
        { date: '2023-07-01T10:30:00', action: 'Job created', user: 'Sarah Johnson' },
        { date: '2023-07-02T14:20:00', action: 'Scheduled for July 15', user: 'Sarah Johnson' },
        { date: '2023-07-15T09:00:00', action: 'Installation started', user: 'Michael Rodriguez' },
        { date: '2023-07-15T16:30:00', action: 'Installation completed', user: 'Michael Rodriguez' },
        { date: '2023-07-16T09:15:00', action: 'Final inspection passed', user: 'Lisa Wong' }
      ]
    },
    {
      id: 'JOB-2023-0002',
      title: 'Commercial Solar Carport',
      customerName: 'Greentech Industries',
      customerEmail: 'facilities@greentech.com',
      customerPhone: '(555) 234-5678',
      address: '456 Business Park, Ecotown, NY 10001',
      systemSize: 50.0,
      status: 'in progress',
      priority: 'high',
      assignedTo: ['Michael Rodriguez', 'David Chen', 'Lisa Wong', 'Robert Taylor'],
      scheduledDate: '2023-08-10T08:00:00',
      completedDate: null,
      estimatedHours: 40,
      actualHours: 16,
      materials: [
        { name: 'Solar Panels (500W)', quantity: 100, status: 'in use' },
        { name: 'Inverters (25kW)', quantity: 2, status: 'in use' },
        { name: 'Carport Mounting Structure', quantity: 1, status: 'in use' },
        { name: 'Electrical Wiring Kit', quantity: 2, status: 'in use' },
        { name: 'Monitoring System', quantity: 1, status: 'pending' }
      ],
      checklist: [
        { task: 'Site assessment', completed: true, completedBy: 'Michael Rodriguez', completedAt: '2023-08-10T09:00:00' },
        { task: 'Foundation preparation', completed: true, completedBy: 'Robert Taylor', completedAt: '2023-08-11T16:00:00' },
        { task: 'Carport structure installation', completed: true, completedBy: 'David Chen', completedAt: '2023-08-12T17:30:00' },
        { task: 'Panel mounting', completed: true, completedBy: 'Lisa Wong', completedAt: '2023-08-13T15:45:00' },
        { task: 'Electrical wiring', completed: false, completedBy: null, completedAt: null },
        { task: 'Inverter installation', completed: false, completedBy: null, completedAt: null },
        { task: 'System testing', completed: false, completedBy: null, completedAt: null },
        { task: 'Monitoring setup', completed: false, completedBy: null, completedAt: null },
        { task: 'Final inspection', completed: false, completedBy: null, completedAt: null },
        { task: 'Customer walkthrough', completed: false, completedBy: null, completedAt: null }
      ],
      notes: 'Large commercial installation. Day 4 of estimated 10-day project. Currently on schedule.',
      timeline: [
        { date: '2023-07-20T11:15:00', action: 'Job created', user: 'Sarah Johnson' },
        { date: '2023-07-25T09:30:00', action: 'Materials ordered', user: 'Sarah Johnson' },
        { date: '2023-08-05T14:00:00', action: 'Pre-installation meeting', user: 'Michael Rodriguez' },
        { date: '2023-08-10T08:00:00', action: 'Installation started', user: 'Michael Rodriguez' },
        { date: '2023-08-13T17:00:00', action: 'Phase 1 completed', user: 'Lisa Wong' }
      ]
    },
    {
      id: 'JOB-2023-0003',
      title: 'Battery Backup Installation',
      customerName: 'Emily Davis',
      customerEmail: 'emily.davis@example.com',
      customerPhone: '(555) 345-6789',
      address: '789 Green St, Ecotown, NY 10001',
      systemSize: 13.5, // kWh battery capacity
      status: 'scheduled',
      priority: 'medium',
      assignedTo: ['David Chen'],
      scheduledDate: '2023-08-20T10:00:00',
      completedDate: null,
      estimatedHours: 6,
      actualHours: 0,
      materials: [
        { name: 'Battery System (13.5kWh)', quantity: 1, status: 'allocated' },
        { name: 'Backup Gateway', quantity: 1, status: 'allocated' },
        { name: 'Electrical Components', quantity: 1, status: 'allocated' }
      ],
      checklist: [
        { task: 'Site assessment', completed: true, completedBy: 'David Chen', completedAt: '2023-08-05T14:30:00' },
        { task: 'Electrical panel inspection', completed: true, completedBy: 'David Chen', completedAt: '2023-08-05T15:00:00' },
        { task: 'Battery installation', completed: false, completedBy: null, completedAt: null },
        { task: 'Gateway installation', completed: false, completedBy: null, completedAt: null },
        { task: 'System configuration', completed: false, completedBy: null, completedAt: null },
        { task: 'System testing', completed: false, completedBy: null, completedAt: null },
        { task: 'Customer training', completed: false, completedBy: null, completedAt: null }
      ],
      notes: 'Customer already has solar panels installed. This job is to add battery backup capability.',
      timeline: [
        { date: '2023-08-01T13:45:00', action: 'Job created', user: 'Sarah Johnson' },
        { date: '2023-08-05T14:30:00', action: 'Site assessment completed', user: 'David Chen' },
        { date: '2023-08-06T09:15:00', action: 'Scheduled for August 20', user: 'Sarah Johnson' }
      ]
    },
    {
      id: 'JOB-2023-0004',
      title: 'Solar Panel Maintenance',
      customerName: 'Robert Miller',
      customerEmail: 'robert.miller@example.com',
      customerPhone: '(555) 456-7890',
      address: '101 Mountain View Dr, Boulder, CO 80301',
      systemSize: 7.2,
      status: 'scheduled',
      priority: 'low',
      assignedTo: ['Lisa Wong'],
      scheduledDate: '2023-08-25T13:00:00',
      completedDate: null,
      estimatedHours: 3,
      actualHours: 0,
      materials: [
        { name: 'Cleaning Supplies', quantity: 1, status: 'allocated' },
        { name: 'Replacement Microinverter', quantity: 1, status: 'allocated' }
      ],
      checklist: [
        { task: 'Panel cleaning', completed: false, completedBy: null, completedAt: null },
        { task: 'System performance check', completed: false, completedBy: null, completedAt: null },
        { task: 'Microinverter replacement', completed: false, completedBy: null, completedAt: null },
        { task: 'Connection inspection', completed: false, completedBy: null, completedAt: null }
      ],
      notes: 'Annual maintenance plus replacement of one faulty microinverter identified during remote monitoring.',
      timeline: [
        { date: '2023-08-10T10:20:00', action: 'Job created', user: 'Sarah Johnson' },
        { date: '2023-08-10T15:45:00', action: 'Scheduled for August 25', user: 'Sarah Johnson' }
      ]
    },
    {
      id: 'JOB-2023-0005',
      title: 'System Upgrade - Additional Panels',
      customerName: 'Jennifer Lee',
      customerEmail: 'jennifer.lee@example.com',
      customerPhone: '(555) 567-8901',
      address: '333 Coastal Hwy, San Diego, CA 92101',
      systemSize: 4.0, // Additional capacity
      status: 'pending approval',
      priority: 'medium',
      assignedTo: [],
      scheduledDate: null,
      completedDate: null,
      estimatedHours: 5,
      actualHours: 0,
      materials: [
        { name: 'Solar Panels (400W)', quantity: 10, status: 'pending' },
        { name: 'Mounting Hardware', quantity: 1, status: 'pending' },
        { name: 'Electrical Components', quantity: 1, status: 'pending' }
      ],
      checklist: [
        { task: 'Site assessment', completed: true, completedBy: 'Michael Rodriguez', completedAt: '2023-08-12T11:30:00' },
        { task: 'System design', completed: true, completedBy: 'Michael Rodriguez', completedAt: '2023-08-13T14:00:00' },
        { task: 'Customer approval', completed: false, completedBy: null, completedAt: null },
        { task: 'Permit application', completed: false, completedBy: null, completedAt: null },
        { task: 'Installation', completed: false, completedBy: null, completedAt: null },
        { task: 'System integration', completed: false, completedBy: null, completedAt: null },
        { task: 'Testing', completed: false, completedBy: null, completedAt: null }
      ],
      notes: 'Customer wants to expand existing 9.2kW system with additional 4.0kW capacity. Awaiting final customer approval of quote.',
      timeline: [
        { date: '2023-08-10T09:30:00', action: 'Job created', user: 'Sarah Johnson' },
        { date: '2023-08-12T11:30:00', action: 'Site assessment completed', user: 'Michael Rodriguez' },
        { date: '2023-08-13T14:00:00', action: 'System design completed', user: 'Michael Rodriguez' },
        { date: '2023-08-14T10:15:00', action: 'Quote sent to customer', user: 'Sarah Johnson' }
      ]
    },
    {
      id: 'JOB-2023-0006',
      title: 'Emergency Repair - Storm Damage',
      customerName: 'David Wilson',
      customerEmail: 'david.wilson@example.com',
      customerPhone: '(555) 678-9012',
      address: '222 Desert Sun Way, Phoenix, AZ 85001',
      systemSize: 12.4,
      status: 'completed',
      priority: 'urgent',
      assignedTo: ['Robert Taylor'],
      scheduledDate: '2023-08-05T08:00:00',
      completedDate: '2023-08-05T11:45:00',
      estimatedHours: 4,
      actualHours: 3.75,
      materials: [
        { name: 'Replacement Panels (400W)', quantity: 3, status: 'used' },
        { name: 'Mounting Hardware', quantity: 1, status: 'used' },
        { name: 'Electrical Components', quantity: 1, status: 'used' }
      ],
      checklist: [
        { task: 'Damage assessment', completed: true, completedBy: 'Robert Taylor', completedAt: '2023-08-05T08:30:00' },
        { task: 'Remove damaged panels', completed: true, completedBy: 'Robert Taylor', completedAt: '2023-08-05T09:15:00' },
        { task: 'Install replacement panels', completed: true, completedBy: 'Robert Taylor', completedAt: '2023-08-05T10:30:00' },
        { task: 'System testing', completed: true, completedBy: 'Robert Taylor', completedAt: '2023-08-05T11:15:00' },
        { task: 'Customer walkthrough', completed: true, completedBy: 'Robert Taylor', completedAt: '2023-08-05T11:45:00' }
      ],
      notes: 'Emergency repair after hail storm damaged 3 panels. System now functioning at 100% capacity again.',
      timeline: [
        { date: '2023-08-04T16:20:00', action: 'Emergency job created', user: 'Sarah Johnson' },
        { date: '2023-08-04T16:30:00', action: 'Scheduled for next day', user: 'Sarah Johnson' },
        { date: '2023-08-05T08:00:00', action: 'Repair started', user: 'Robert Taylor' },
        { date: '2023-08-05T11:45:00', action: 'Repair completed', user: 'Robert Taylor' }
      ]
    },
    {
      id: 'JOB-2023-0007',
      title: 'Solar + Battery Installation',
      customerName: 'Patricia Martinez',
      customerEmail: 'patricia.martinez@example.com',
      customerPhone: '(555) 789-0123',
      address: '555 Maple Ave, Austin, TX 78701',
      systemSize: 11.5, // 11.5kW solar + 13.5kWh battery
      status: 'pending approval',
      priority: 'high',
      assignedTo: [],
      scheduledDate: null,
      completedDate: null,
      estimatedHours: 16,
      actualHours: 0,
      materials: [
        { name: 'Solar Panels (400W)', quantity: 29, status: 'pending' },
        { name: 'Inverter (10kW)', quantity: 1, status: 'pending' },
        { name: 'Battery System (13.5kWh)', quantity: 1, status: 'pending' },
        { name: 'Mounting Hardware', quantity: 1, status: 'pending' },
        { name: 'Electrical Components', quantity: 1, status: 'pending' }
      ],
      checklist: [
        { task: 'Site assessment', completed: true, completedBy: 'Michael Rodriguez', completedAt: '2023-08-08T10:30:00' },
        { task: 'System design', completed: true, completedBy: 'Michael Rodriguez', completedAt: '2023-08-09T15:45:00' },
        { task: 'Customer approval', completed: false, completedBy: null, completedAt: null },
        { task: 'Permit application', completed: false, completedBy: null, completedAt: null },
        { task: 'Installation', completed: false, completedBy: null, completedAt: null },
        { task: 'System testing', completed: false, completedBy: null, completedAt: null },
        { task: 'Utility interconnection', completed: false, completedBy: null, completedAt: null },
        { task: 'Customer training', completed: false, completedBy: null, completedAt: null }
      ],
      notes: 'New construction project. Customer wants both solar and battery backup from the start.',
      timeline: [
        { date: '2023-08-01T13:20:00', action: 'Job created', user: 'Sarah Johnson' },
        { date: '2023-08-08T10:30:00', action: 'Site assessment completed', user: 'Michael Rodriguez' },
        { date: '2023-08-09T15:45:00', action: 'System design completed', user: 'Michael Rodriguez' },
        { date: '2023-08-10T09:00:00', action: 'Quote sent to customer', user: 'Sarah Johnson' }
      ]
    },
    {
      id: 'JOB-2023-0008',
      title: 'Inverter Replacement',
      customerName: 'Thomas Brown',
      customerEmail: 'thomas.brown@example.com',
      customerPhone: '(555) 890-1234',
      address: '777 Oak Street, Chicago, IL 60601',
      systemSize: 6.8,
      status: 'in progress',
      priority: 'medium',
      assignedTo: ['Lisa Wong'],
      scheduledDate: '2023-08-15T09:00:00',
      completedDate: null,
      estimatedHours: 4,
      actualHours: 2,
      materials: [
        { name: 'Replacement Inverter (7kW)', quantity: 1, status: 'in use' },
        { name: 'Electrical Components', quantity: 1, status: 'in use' }
      ],
      checklist: [
        { task: 'System shutdown', completed: true, completedBy: 'Lisa Wong', completedAt: '2023-08-15T09:15:00' },
        { task: 'Remove old inverter', completed: true, completedBy: 'Lisa Wong', completedAt: '2023-08-15T09:45:00' },
        { task: 'Install new inverter', completed: true, completedBy: 'Lisa Wong', completedAt: '2023-08-15T10:30:00' },
        { task: 'System testing', completed: false, completedBy: null, completedAt: null },
        { task: 'Customer walkthrough', completed: false, completedBy: null, completedAt: null }
      ],
      notes: 'Replacing failed inverter that is no longer under manufacturer warranty.',
      timeline: [
        { date: '2023-08-12T11:30:00', action: 'Job created', user: 'Sarah Johnson' },
        { date: '2023-08-12T14:45:00', action: 'Scheduled for August 15', user: 'Sarah Johnson' },
        { date: '2023-08-15T09:00:00', action: 'Replacement started', user: 'Lisa Wong' },
        { date: '2023-08-15T10:30:00', action: 'New inverter installed', user: 'Lisa Wong' }
      ]
    }
  ];

  // Filter jobs based on active tab and search query
  const filteredJobs = jobs.filter(job => {
    // Filter by tab
    if (activeTab === 'scheduled' && job.status !== 'scheduled') return false;
    if (activeTab === 'in-progress' && job.status !== 'in progress') return false;
    if (activeTab === 'completed' && job.status !== 'completed') return false;
    if (activeTab === 'pending' && job.status !== 'pending approval') return false;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        job.id.toLowerCase().includes(query) ||
        job.title.toLowerCase().includes(query) ||
        job.customerName.toLowerCase().includes(query) ||
        job.customerEmail.toLowerCase().includes(query) ||
        job.address.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      case 'in progress':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">In Progress</Badge>;
      case 'scheduled':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Scheduled</Badge>;
      case 'pending approval':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Pending Approval</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Urgent</Badge>;
      case 'high':
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">High</Badge>;
      case 'medium':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Low</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  const handleOpenJobDetails = (job: any) => {
    setSelectedJob(job);
    setIsJobDetailsDialogOpen(true);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not scheduled';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const getJobProgress = (job: any) => {
    if (job.status === 'completed') return 100;
    if (job.status === 'pending approval') return 10;
    
    // For in progress jobs, calculate based on checklist
    if (job.status === 'in progress' && job.checklist.length > 0) {
      const completedTasks = job.checklist.filter((item: any) => item.completed).length;
      return Math.round((completedTasks / job.checklist.length) * 100);
    }
    
    if (job.status === 'scheduled') return 25;
    
    return 0;
  };

  const calculateTotalJobs = () => {
    return jobs.length;
  };

  const calculateCompletedJobs = () => {
    return jobs.filter(job => job.status === 'completed').length;
  };

  const calculateInProgressJobs = () => {
    return jobs.filter(job => job.status === 'in progress').length;
  };

  const calculateScheduledJobs = () => {
    return jobs.filter(job => job.status === 'scheduled').length;
  };

  const calculatePendingJobs = () => {
    return jobs.filter(job => job.status === 'pending approval').length;
  };

  const calculateTotalHours = () => {
    return jobs.reduce((sum, job) => sum + (job.status === 'completed' ? job.actualHours : job.estimatedHours), 0);
  };

  const calculateAssignedTechnicians = () => {
    const technicians = new Set();
    jobs.forEach(job => {
      if (job.status === 'in progress' || job.status === 'scheduled') {
        job.assignedTo.forEach((tech: string) => technicians.add(tech));
      }
    });
    return technicians.size;
  };

  const getUpcomingJobs = () => {
    return jobs
      .filter(job => job.status === 'scheduled')
      .sort((a, b) => new Date(a.scheduledDate || '').getTime() - new Date(b.scheduledDate || '').getTime())
      .slice(0, 3);
  };

  const getRecentActivity = () => {
    return jobs
      .flatMap(job => 
        job.timeline.map(event => ({
          ...event,
          jobId: job.id,
          jobTitle: job.title
        }))
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Installation Jobs</h1>
        <Button onClick={() => setIsNewJobDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> New Job
        </Button>
      </div>
      
      {/* New Job Dialog */}
      <Dialog open={isNewJobDialogOpen} onOpenChange={setIsNewJobDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create New Installation Job</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new installation job.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="job-title">Job Title</Label>
                <Input id="job-title" placeholder="Residential Solar Installation" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="system-type">System Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select system type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solar">Solar PV</SelectItem>
                    <SelectItem value="battery">Battery Storage</SelectItem>
                    <SelectItem value="solar-battery">Solar + Battery</SelectItem>
                    <SelectItem value="commercial">Commercial Solar</SelectItem>
                    <SelectItem value="carport">Solar Carport</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="system-size">System Size</Label>
                <div className="flex gap-2">
                  <Input id="system-size" type="number" placeholder="10" />
                  <Select defaultValue="kw">
                    <SelectTrigger className="w-[80px]">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kw">kW</SelectItem>
                      <SelectItem value="kwh">kWh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="scheduled-date">Scheduled Date</Label>
                <Input id="scheduled-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estimated-hours">Estimated Hours</Label>
                <Input id="estimated-hours" type="number" placeholder="8" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customer-name">Customer Name</Label>
                <Input id="customer-name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer-email">Customer Email</Label>
                <Input id="customer-email" type="email" placeholder="john.doe@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer-phone">Customer Phone</Label>
                <Input id="customer-phone" placeholder="(555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="installation-address">Installation Address</Label>
                <Textarea id="installation-address" placeholder="123 Solar Street, Sunnyville, CA 12345" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="assigned-technicians">Assigned Technicians</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select technicians" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech1">Alex Johnson</SelectItem>
                    <SelectItem value="tech2">Maria Garcia</SelectItem>
                    <SelectItem value="tech3">David Smith</SelectItem>
                    <SelectItem value="tech4">Sarah Williams</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Additional information about the installation..." />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewJobDialogOpen(false)}>Cancel</Button>
            <Button>Create Job</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Job Details Dialog */}
      {selectedJob && (
        <Dialog open={isJobDetailsDialogOpen} onOpenChange={setIsJobDetailsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl">{selectedJob.title}</DialogTitle>
                <Badge variant={selectedJob.status === 'completed' ? 'success' : 
                  selectedJob.status === 'in-progress' ? 'default' : 
                  selectedJob.status === 'scheduled' ? 'secondary' : 'outline'}>
                  {selectedJob.status.charAt(0).toUpperCase() + selectedJob.status.slice(1)}
                </Badge>
              </div>
              <DialogDescription>
                Job ID: {selectedJob.id} | Created on {formatDate(selectedJob.createdAt)}
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="details">
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="materials">Materials</TabsTrigger>
                <TabsTrigger value="checklist">Checklist</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Customer Information</h3>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Name:</span>
                            <span className="text-sm font-medium">{selectedJob.customerName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Email:</span>
                            <span className="text-sm">{selectedJob.customerEmail}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Phone:</span>
                            <span className="text-sm">{selectedJob.customerPhone}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Address:</span>
                            <span className="text-sm">{selectedJob.address}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">System Information</h3>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">System Type:</span>
                            <span className="text-sm font-medium">{selectedJob.systemType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">System Size:</span>
                            <span className="text-sm">{selectedJob.systemSize} {selectedJob.title.toLowerCase().includes('battery') ? 'kWh' : 'kW'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Scheduled Date:</span>
                            <span className="text-sm">{formatDate(selectedJob.scheduledDate)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Estimated Hours:</span>
                            <span className="text-sm">{selectedJob.estimatedHours} hrs</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Actual Hours:</span>
                            <span className="text-sm">{selectedJob.actualHours || 'N/A'} {selectedJob.actualHours ? 'hrs' : ''}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Assigned Personnel</h3>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-3">
                          {selectedJob.assignedTo.map((tech, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={`/avatars/${index + 1}.png`} alt={tech} />
                                  <AvatarFallback>{tech.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="text-sm font-medium">{tech}</div>
                                  <div className="text-xs text-muted-foreground">{['Lead Installer', 'Electrician', 'Helper', 'Project Manager'][index % 4]}</div>
                                </div>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {['On Site', 'En Route', 'Scheduled', 'Completed'][index % 4]}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Job Progress</h3>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Overall Progress</span>
                              <span className="text-sm font-medium">{getJobProgress(selectedJob)}%</span>
                            </div>
                            <Progress value={getJobProgress(selectedJob)} className="h-2" />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <div className={`h-2 w-2 rounded-full ${selectedJob.status === 'completed' || selectedJob.status === 'in-progress' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                <span className="text-sm">Site Assessment</span>
                              </div>
                              <Badge variant={selectedJob.status === 'completed' || selectedJob.status === 'in-progress' ? 'success' : 'outline'} className="text-xs">
                                {selectedJob.status === 'completed' || selectedJob.status === 'in-progress' ? 'Completed' : 'Pending'}
                              </Badge>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <div className={`h-2 w-2 rounded-full ${selectedJob.status === 'completed' || selectedJob.status === 'in-progress' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                <span className="text-sm">Equipment Delivery</span>
                              </div>
                              <Badge variant={selectedJob.status === 'completed' || selectedJob.status === 'in-progress' ? 'success' : 'outline'} className="text-xs">
                                {selectedJob.status === 'completed' || selectedJob.status === 'in-progress' ? 'Completed' : 'Pending'}
                              </Badge>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <div className={`h-2 w-2 rounded-full ${selectedJob.status === 'completed' ? 'bg-green-500' : selectedJob.status === 'in-progress' ? 'bg-amber-500' : 'bg-gray-300'}`}></div>
                                <span className="text-sm">Installation</span>
                              </div>
                              <Badge variant={selectedJob.status === 'completed' ? 'success' : selectedJob.status === 'in-progress' ? 'warning' : 'outline'} className="text-xs">
                                {selectedJob.status === 'completed' ? 'Completed' : selectedJob.status === 'in-progress' ? 'In Progress' : 'Pending'}
                              </Badge>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <div className={`h-2 w-2 rounded-full ${selectedJob.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                <span className="text-sm">Inspection</span>
                              </div>
                              <Badge variant={selectedJob.status === 'completed' ? 'success' : 'outline'} className="text-xs">
                                {selectedJob.status === 'completed' ? 'Completed' : 'Pending'}
                              </Badge>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <div className={`h-2 w-2 rounded-full ${selectedJob.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                <span className="text-sm">System Activation</span>
                              </div>
                              <Badge variant={selectedJob.status === 'completed' ? 'success' : 'outline'} className="text-xs">
                                {selectedJob.status === 'completed' ? 'Completed' : 'Pending'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="materials" className="space-y-4 pt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Required Materials</h3>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-3 w-3" /> Add Material
                  </Button>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedJob.materials.map((material, index) => (
                      <TableRow key={index}>
                        <TableCell>{material.name}</TableCell>
                        <TableCell>{material.quantity} {material.unit}</TableCell>
                        <TableCell>
                          <Badge variant={material.status === 'delivered' ? 'success' : 
                            material.status === 'ordered' ? 'warning' : 'outline'}>
                            {material.status.charAt(0).toUpperCase() + material.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{material.notes || '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="checklist" className="space-y-4 pt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Installation Checklist</h3>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-3 w-3" /> Add Item
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {selectedJob.checklist.map((item, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 border rounded-md">
                      <Checkbox id={`checklist-${index}`} checked={item.completed} />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor={`checklist-${index}`}
                          className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${item.completed ? 'line-through text-muted-foreground' : ''}`}
                        >
                          {item.task}
                        </label>
                        {item.notes && (
                          <p className="text-xs text-muted-foreground">{item.notes}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="notes" className="space-y-4 pt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Job Notes</h3>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-3 w-3" /> Add Note
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/avatars/1.png" alt="Note Author" />
                            <AvatarFallback>SJ</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">System Note</span>
                              <span className="text-xs text-muted-foreground">{formatDateTime(selectedJob.timeline[0]?.date)}</span>
                            </div>
                            <p className="text-sm mt-1">{selectedJob.notes}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="pt-4">
                  <Textarea placeholder="Add a note about this job..." className="min-h-[100px]" />
                  <div className="flex justify-end mt-2">
                    <Button>
                      <Send className="mr-2 h-4 w-4" /> Add Note
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="timeline" className="space-y-4 pt-4">
                <h3 className="text-sm font-medium">Job Timeline</h3>
                
                <div className="space-y-4">
                  {selectedJob.timeline.map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          {event.action.includes('created') ? (
                            <FileText className="h-4 w-4 text-primary" />
                          ) : event.action.includes('updated') ? (
                            <Edit className="h-4 w-4 text-primary" />
                          ) : event.action.includes('completed') ? (
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          ) : event.action.includes('scheduled') ? (
                            <Calendar className="h-4 w-4 text-primary" />
                          ) : (
                            <Activity className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        {index < selectedJob.timeline.length - 1 && (
                          <div className="w-px h-full bg-border" />
                        )}
                      </div>
                      <div className="space-y-1 pb-4">
                        <div className="text-sm font-medium">{event.action}</div>
                        <div className="text-xs text-muted-foreground">{formatDateTime(event.date)} by {event.user}</div>
                        {event.notes && <div className="text-sm mt-1 text-muted-foreground">{event.notes}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex justify-start gap-2">
                {selectedJob.status !== 'completed' && (
                  <Button variant="outline" className="gap-1">
                    <Calendar className="h-4 w-4" /> Reschedule
                  </Button>
                )}
                <Button variant="outline" className="gap-1 text-destructive border-destructive/20 hover:bg-destructive/10">
                  <AlertTriangle className="h-4 w-4" /> Report Issue
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsJobDetailsDialogOpen(false)}>Close</Button>
                {selectedJob.status === 'scheduled' && (
                  <Button className="gap-1">
                    <Play className="h-4 w-4" /> Start Job
                  </Button>
                )}
                {selectedJob.status === 'in-progress' && (
                  <Button className="gap-1">
                    <CheckCircle2 className="h-4 w-4" /> Complete Job
                  </Button>
                )}
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search jobs..." 
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
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Installation Jobs</CardTitle>
          <CardDescription>
            {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredJobs.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>System Size</TableHead>
                  <TableHead>Scheduled Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.id}</TableCell>
                    <TableCell>{job.title}</TableCell>
                    <TableCell>
                      <div>
                        <div>{job.customerName}</div>
                        <div className="text-xs text-muted-foreground">{job.customerEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>{job.systemSize} {job.title.toLowerCase().includes('battery') ? 'kWh' : 'kW'}</TableCell>
                    <TableCell>{formatDate(job.scheduledDate)}</TableCell>
                    <TableCell>
                      {getStatusBadge(job.status)}
                    </TableCell>
                    <TableCell>
                      {getPriorityBadge(job.priority)}
                    </TableCell>
                    <TableCell>
                      <div className="w-[100px]">
                        <Progress value={getJobProgress(job)} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenJobDetails(job)}>
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
              <Wrench className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No jobs found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Jobs Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Jobs</span>
                <span className="font-medium">{calculateTotalJobs()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Scheduled</span>
                <span className="font-medium">{calculateScheduledJobs()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">In Progress</span>
                <span className="font-medium">{calculateInProgressJobs()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Completed</span>
                <span className="font-medium text-green-600">{calculateCompletedJobs()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Pending Approval</span>
                <span className="font-medium text-amber-600">{calculatePendingJobs()}</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Hours</span>
                  <span className="font-medium">{calculateTotalHours()} hrs</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Assigned Technicians</span>
                  <span className="font-medium">{calculateAssignedTechnicians()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getUpcomingJobs().length > 0 ? (
                getUpcomingJobs().map((job, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="mt-0.5">
                      <CalendarClock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{job.title}</div>
                      <div className="text-xs">{job.customerName}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatDate(job.scheduledDate)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  <p className="text-sm">No upcoming jobs scheduled</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getRecentActivity().map((event, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="mt-0.5">
                    <History className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="text-sm">
                      <span className="font-medium">{event.action}</span> - {event.jobId}
                    </div>
                    <div className="text-xs">{event.jobTitle}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatDateTime(event.date)} by {event.user}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}