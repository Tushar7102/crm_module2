'use client';

import { useState } from 'react';
import {
  Calendar,
  Clock,
  Filter,
  Plus,
  Search,
  MoreHorizontal,
  CheckCircle2,
  AlertTriangle,
  Clock4,
  CalendarClock,
  Wrench,
  History,
  ClipboardList,
  FileText,
  RotateCcw,
  Send,
  Tool,
  User,
  MapPin,
  Phone,
  Mail,
  Home,
  Building,
  Repeat,
  AlertCircle,
  CheckCircle,
  X,
  Edit,
  Trash2,
  ArrowUpDown,
  ChevronDown,
  MoreVertical,
  Clipboard,
  ClipboardCheck,
  Bell,
  BellRing,
  CalendarDays,
  CalendarRange,
  Settings,
  Cog,
  Users,
  UserPlus,
  Loader2,
  RefreshCw,
  Play,
  Pause,
  Activity
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

export default function MaintenancePage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewMaintenanceDialogOpen, setIsNewMaintenanceDialogOpen] = useState(false);
  const [isMaintenanceDetailsDialogOpen, setIsMaintenanceDetailsDialogOpen] = useState(false);
  const [selectedMaintenance, setSelectedMaintenance] = useState(null);

  // Mock data for maintenance schedules
  const maintenanceSchedules = [
    {
      id: 'MS-1001',
      title: 'Annual System Inspection',
      customerName: 'Robert Johnson',
      customerEmail: 'robert.j@example.com',
      customerPhone: '(555) 234-5678',
      address: '789 Maple Avenue, Springfield, IL 62701',
      systemType: 'Residential Solar PV',
      systemSize: 8.5,
      installationDate: '2022-03-15',
      scheduledDate: '2023-09-15',
      status: 'scheduled',
      priority: 'medium',
      frequency: 'annual',
      assignedTechnicians: ['David Smith', 'Maria Garcia'],
      estimatedHours: 3,
      actualHours: null,
      lastMaintenance: '2022-09-10',
      notes: [
        {
          author: 'System',
          date: '2023-08-01T10:30:00',
          content: 'Maintenance automatically scheduled based on annual cycle.'
        },
        {
          author: 'Sarah Williams',
          date: '2023-08-02T14:15:00',
          content: 'Customer confirmed availability for September 15th.'
        }
      ],
      checklist: [
        { task: 'Inspect module mounting', completed: false, notes: null },
        { task: 'Check inverter operation', completed: false, notes: null },
        { task: 'Test monitoring system', completed: false, notes: null },
        { task: 'Clean solar panels', completed: false, notes: null },
        { task: 'Inspect electrical connections', completed: false, notes: null },
        { task: 'Check for shading issues', completed: false, notes: null },
      ],
      timeline: [
        { action: 'Maintenance scheduled', date: '2023-08-01T10:30:00', user: 'System', notes: 'Automatically scheduled' },
        { action: 'Customer notified', date: '2023-08-01T10:35:00', user: 'System', notes: 'Email notification sent' },
        { action: 'Customer confirmed', date: '2023-08-02T14:15:00', user: 'Sarah Williams', notes: 'Via phone call' },
        { action: 'Technicians assigned', date: '2023-08-05T09:20:00', user: 'Michael Brown', notes: 'David Smith and Maria Garcia assigned' },
      ],
      createdAt: '2023-08-01T10:30:00'
    },
    {
      id: 'MS-1002',
      title: 'Inverter Firmware Update',
      customerName: 'Jennifer Lee',
      customerEmail: 'jennifer.lee@example.com',
      customerPhone: '(555) 876-5432',
      address: '456 Oak Street, Riverside, CA 92501',
      systemType: 'Solar + Battery',
      systemSize: 10.2,
      installationDate: '2021-11-20',
      scheduledDate: '2023-09-05',
      status: 'scheduled',
      priority: 'high',
      frequency: 'as-needed',
      assignedTechnicians: ['Alex Johnson'],
      estimatedHours: 2,
      actualHours: null,
      lastMaintenance: '2023-03-12',
      notes: [
        {
          author: 'Technical Support',
          date: '2023-08-10T11:20:00',
          content: 'Critical firmware update required for all SolarEdge inverters in this model range.'
        },
        {
          author: 'Alex Johnson',
          date: '2023-08-11T09:45:00',
          content: 'Will need to bring laptop with latest firmware package. System will be offline for approximately 30 minutes during update.'
        }
      ],
      checklist: [
        { task: 'Backup current settings', completed: false, notes: null },
        { task: 'Download latest firmware', completed: true, notes: 'Version 3.5.2 downloaded' },
        { task: 'Update inverter firmware', completed: false, notes: null },
        { task: 'Verify system operation post-update', completed: false, notes: null },
        { task: 'Update customer documentation', completed: false, notes: null },
      ],
      timeline: [
        { action: 'Firmware update notification received', date: '2023-08-10T11:20:00', user: 'Technical Support', notes: 'From manufacturer' },
        { action: 'Maintenance scheduled', date: '2023-08-10T14:30:00', user: 'Michael Brown', notes: 'Prioritized as high importance' },
        { action: 'Customer notified', date: '2023-08-10T15:00:00', user: 'System', notes: 'Email notification sent' },
        { action: 'Customer confirmed', date: '2023-08-11T09:00:00', user: 'Jennifer Lee', notes: 'Via customer portal' },
        { action: 'Technician assigned', date: '2023-08-11T09:30:00', user: 'Michael Brown', notes: 'Alex Johnson assigned' },
      ],
      createdAt: '2023-08-10T11:20:00'
    },
    {
      id: 'MS-1003',
      title: 'Battery System Check',
      customerName: 'Michael Thompson',
      customerEmail: 'm.thompson@example.com',
      customerPhone: '(555) 345-6789',
      address: '123 Pine Lane, Boulder, CO 80301',
      systemType: 'Battery Storage',
      systemSize: 13.5,
      installationDate: '2022-06-10',
      scheduledDate: '2023-08-28',
      status: 'in-progress',
      priority: 'medium',
      frequency: 'semi-annual',
      assignedTechnicians: ['Sarah Williams', 'David Smith'],
      estimatedHours: 2.5,
      actualHours: 1.5,
      lastMaintenance: '2023-02-15',
      notes: [
        {
          author: 'Customer',
          date: '2023-08-15T16:40:00',
          content: 'Noticed battery not holding charge as long as it used to.'
        },
        {
          author: 'Sarah Williams',
          date: '2023-08-16T10:20:00',
          content: 'Will perform full diagnostic on battery system and check for capacity degradation.'
        },
        {
          author: 'Sarah Williams',
          date: '2023-08-28T14:30:00',
          content: 'Initial tests show battery at 92% of rated capacity, which is within normal range. Continuing with full diagnostic.'
        }
      ],
      checklist: [
        { task: 'Visual inspection of battery system', completed: true, notes: 'No physical damage observed' },
        { task: 'Check battery connections', completed: true, notes: 'All connections secure' },
        { task: 'Test battery capacity', completed: true, notes: '92% of rated capacity' },
        { task: 'Check battery temperature', completed: true, notes: 'Normal operating temperature' },
        { task: 'Verify battery management system', completed: false, notes: null },
        { task: 'Test backup functionality', completed: false, notes: null },
      ],
      timeline: [
        { action: 'Customer reported issue', date: '2023-08-15T16:40:00', user: 'Michael Thompson', notes: 'Via customer portal' },
        { action: 'Maintenance scheduled', date: '2023-08-16T09:00:00', user: 'Michael Brown', notes: 'Combined with regular semi-annual check' },
        { action: 'Customer notified', date: '2023-08-16T09:15:00', user: 'System', notes: 'Email notification sent' },
        { action: 'Technicians assigned', date: '2023-08-16T10:00:00', user: 'Michael Brown', notes: 'Sarah Williams and David Smith assigned' },
        { action: 'Maintenance started', date: '2023-08-28T13:00:00', user: 'Sarah Williams', notes: 'Technicians arrived on site' },
        { action: 'Initial diagnosis complete', date: '2023-08-28T14:30:00', user: 'Sarah Williams', notes: 'Battery at 92% capacity' },
      ],
      createdAt: '2023-08-15T16:40:00'
    },
    {
      id: 'MS-1004',
      title: 'Post-Storm System Inspection',
      customerName: 'Emily Wilson',
      customerEmail: 'e.wilson@example.com',
      customerPhone: '(555) 987-6543',
      address: '567 Birch Road, Tampa, FL 33601',
      systemType: 'Residential Solar PV',
      systemSize: 7.8,
      installationDate: '2021-05-18',
      scheduledDate: '2023-08-20',
      status: 'completed',
      priority: 'urgent',
      frequency: 'as-needed',
      assignedTechnicians: ['Maria Garcia'],
      estimatedHours: 2,
      actualHours: 2.5,
      lastMaintenance: '2023-05-10',
      notes: [
        {
          author: 'Customer',
          date: '2023-08-18T08:15:00',
          content: 'Hurricane warning in our area yesterday. System seems to be working but would like it checked for safety.'
        },
        {
          author: 'Dispatch',
          date: '2023-08-18T09:30:00',
          content: 'Prioritized as urgent due to potential safety concerns after storm.'
        },
        {
          author: 'Maria Garcia',
          date: '2023-08-20T16:45:00',
          content: 'Completed inspection. Found and secured two loose mounting brackets on the north side of the array. System otherwise in good condition.'
        }
      ],
      checklist: [
        { task: 'Inspect for physical damage', completed: true, notes: 'Two loose mounting brackets found and secured' },
        { task: 'Check roof penetrations', completed: true, notes: 'All penetrations secure and waterproof' },
        { task: 'Verify system performance', completed: true, notes: 'System producing at expected levels' },
        { task: 'Inspect electrical components', completed: true, notes: 'No water ingress or damage to electrical components' },
        { task: 'Check for debris on panels', completed: true, notes: 'Removed small branches and leaves from array' },
      ],
      timeline: [
        { action: 'Customer requested inspection', date: '2023-08-18T08:15:00', user: 'Emily Wilson', notes: 'Via phone call' },
        { action: 'Maintenance scheduled', date: '2023-08-18T09:30:00', user: 'Dispatch', notes: 'Urgent priority assigned' },
        { action: 'Customer notified', date: '2023-08-18T09:45:00', user: 'System', notes: 'Email notification sent' },
        { action: 'Technician assigned', date: '2023-08-18T10:00:00', user: 'Michael Brown', notes: 'Maria Garcia assigned' },
        { action: 'Maintenance started', date: '2023-08-20T14:00:00', user: 'Maria Garcia', notes: 'Technician arrived on site' },
        { action: 'Maintenance completed', date: '2023-08-20T16:45:00', user: 'Maria Garcia', notes: 'Repairs made to mounting brackets' },
        { action: 'Report submitted', date: '2023-08-20T17:30:00', user: 'Maria Garcia', notes: 'Full inspection report uploaded to system' },
      ],
      createdAt: '2023-08-18T08:15:00'
    },
    {
      id: 'MS-1005',
      title: 'Quarterly System Check',
      customerName: 'Daniel Brown',
      customerEmail: 'd.brown@example.com',
      customerPhone: '(555) 456-7890',
      address: '890 Cedar Street, Austin, TX 78701',
      systemType: 'Commercial Solar',
      systemSize: 50.0,
      installationDate: '2022-01-05',
      scheduledDate: '2023-09-10',
      status: 'scheduled',
      priority: 'medium',
      frequency: 'quarterly',
      assignedTechnicians: ['Alex Johnson', 'David Smith', 'Sarah Williams'],
      estimatedHours: 6,
      actualHours: null,
      lastMaintenance: '2023-06-12',
      notes: [
        {
          author: 'System',
          date: '2023-08-12T08:00:00',
          content: 'Quarterly maintenance automatically scheduled.'
        },
        {
          author: 'Operations Manager',
          date: '2023-08-13T11:20:00',
          content: 'This is a large commercial system. Please allocate a full team and ensure all safety protocols are followed for roof access.'
        }
      ],
      checklist: [
        { task: 'Inspect all 180 modules', completed: false, notes: null },
        { task: 'Check all 5 inverters', completed: false, notes: null },
        { task: 'Test monitoring system', completed: false, notes: null },
        { task: 'Inspect roof mounting system', completed: false, notes: null },
        { task: 'Check electrical connections', completed: false, notes: null },
        { task: 'Verify system performance', completed: false, notes: null },
        { task: 'Clean critical modules if needed', completed: false, notes: null },
      ],
      timeline: [
        { action: 'Maintenance scheduled', date: '2023-08-12T08:00:00', user: 'System', notes: 'Automatically scheduled' },
        { action: 'Customer notified', date: '2023-08-12T08:15:00', user: 'System', notes: 'Email notification sent' },
        { action: 'Customer confirmed', date: '2023-08-12T14:30:00', user: 'Daniel Brown', notes: 'Via email' },
        { action: 'Team assigned', date: '2023-08-13T11:20:00', user: 'Operations Manager', notes: 'Three technicians assigned due to system size' },
      ],
      createdAt: '2023-08-12T08:00:00'
    },
    {
      id: 'MS-1006',
      title: 'System Performance Troubleshooting',
      customerName: 'Sophia Martinez',
      customerEmail: 's.martinez@example.com',
      customerPhone: '(555) 234-5678',
      address: '123 Elm Street, Portland, OR 97201',
      systemType: 'Residential Solar PV',
      systemSize: 6.4,
      installationDate: '2022-09-30',
      scheduledDate: '2023-08-25',
      status: 'pending',
      priority: 'high',
      frequency: 'as-needed',
      assignedTechnicians: ['David Smith'],
      estimatedHours: 3,
      actualHours: null,
      lastMaintenance: '2023-03-15',
      notes: [
        {
          author: 'Monitoring Team',
          date: '2023-08-17T13:45:00',
          content: 'System showing 25% decrease in performance over the last week. No weather-related explanation.'
        },
        {
          author: 'Customer',
          date: '2023-08-18T10:20:00',
          content: 'Noticed our electric bill is higher than expected this month.'
        }
      ],
      checklist: [
        { task: 'Analyze performance data', completed: false, notes: null },
        { task: 'Check inverter error codes', completed: false, notes: null },
        { task: 'Inspect for shading issues', completed: false, notes: null },
        { task: 'Test panel output', completed: false, notes: null },
        { task: 'Check string connections', completed: false, notes: null },
        { task: 'Verify monitoring accuracy', completed: false, notes: null },
      ],
      timeline: [
        { action: 'Performance issue detected', date: '2023-08-17T13:45:00', user: 'Monitoring Team', notes: 'Via automated alert' },
        { action: 'Customer reported high bill', date: '2023-08-18T10:20:00', user: 'Sophia Martinez', notes: 'Via customer portal' },
        { action: 'Maintenance scheduled', date: '2023-08-18T11:00:00', user: 'Michael Brown', notes: 'High priority assigned' },
        { action: 'Customer notified', date: '2023-08-18T11:15:00', user: 'System', notes: 'Email notification sent' },
        { action: 'Technician assigned', date: '2023-08-18T14:30:00', user: 'Michael Brown', notes: 'David Smith assigned' },
        { action: 'Customer approval pending', date: '2023-08-19T09:00:00', user: 'System', notes: 'Awaiting customer confirmation of appointment' },
      ],
      createdAt: '2023-08-17T13:45:00'
    }
  ];

  // Filter maintenance schedules based on active tab and search query
  const filteredMaintenanceSchedules = maintenanceSchedules.filter(maintenance => {
    // Filter by tab
    if (activeTab !== 'all' && maintenance.status !== activeTab) {
      return false;
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        maintenance.id.toLowerCase().includes(query) ||
        maintenance.title.toLowerCase().includes(query) ||
        maintenance.customerName.toLowerCase().includes(query) ||
        maintenance.customerEmail.toLowerCase().includes(query) ||
        maintenance.address.toLowerCase().includes(query)
      );
    }

    return true;
  });

  // Helper functions
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatDateTime = (dateTimeString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateTimeString).toLocaleDateString(undefined, options);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="secondary">{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
      case 'in-progress':
        return <Badge>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
      case 'completed':
        return <Badge variant="success">{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
      case 'pending':
        return <Badge variant="outline">{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
      default:
        return <Badge variant="outline">{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'low':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">{priority.charAt(0).toUpperCase() + priority.slice(1)}</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">{priority.charAt(0).toUpperCase() + priority.slice(1)}</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">{priority.charAt(0).toUpperCase() + priority.slice(1)}</Badge>;
      case 'urgent':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">{priority.charAt(0).toUpperCase() + priority.slice(1)}</Badge>;
      default:
        return <Badge variant="outline">{priority.charAt(0).toUpperCase() + priority.slice(1)}</Badge>;
    }
  };

  const handleOpenMaintenanceDetails = (maintenance) => {
    setSelectedMaintenance(maintenance);
    setIsMaintenanceDetailsDialogOpen(true);
  };

  const getMaintenanceProgress = (maintenance) => {
    if (maintenance.status === 'completed') return 100;
    if (maintenance.status === 'pending') return 0;
    
    const completedItems = maintenance.checklist.filter(item => item.completed).length;
    const totalItems = maintenance.checklist.length;
    
    return Math.round((completedItems / totalItems) * 100);
  };

  // Calculate summary statistics
  const calculateTotalMaintenances = () => maintenanceSchedules.length;
  const calculateScheduledMaintenances = () => maintenanceSchedules.filter(m => m.status === 'scheduled').length;
  const calculateInProgressMaintenances = () => maintenanceSchedules.filter(m => m.status === 'in-progress').length;
  const calculateCompletedMaintenances = () => maintenanceSchedules.filter(m => m.status === 'completed').length;
  const calculatePendingMaintenances = () => maintenanceSchedules.filter(m => m.status === 'pending').length;

  const getUpcomingMaintenances = () => {
    return maintenanceSchedules
      .filter(m => m.status === 'scheduled')
      .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())
      .slice(0, 3);
  };

  const getRecentActivity = () => {
    return maintenanceSchedules
      .flatMap(maintenance => 
        maintenance.timeline.map(event => ({
          ...event,
          maintenanceId: maintenance.id,
          maintenanceTitle: maintenance.title
        }))
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Maintenance Schedule</h1>
        <Button onClick={() => setIsNewMaintenanceDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> New Maintenance
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search maintenance schedules..." 
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
          <CardTitle>Maintenance Schedule</CardTitle>
          <CardDescription>
            {filteredMaintenanceSchedules.length} maintenance{filteredMaintenanceSchedules.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredMaintenanceSchedules.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>System Type</TableHead>
                  <TableHead>Scheduled Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMaintenanceSchedules.map((maintenance) => (
                  <TableRow key={maintenance.id}>
                    <TableCell className="font-medium">{maintenance.id}</TableCell>
                    <TableCell>{maintenance.title}</TableCell>
                    <TableCell>
                      <div>
                        <div>{maintenance.customerName}</div>
                        <div className="text-xs text-muted-foreground">{maintenance.customerEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>{maintenance.systemType}</TableCell>
                    <TableCell>{formatDate(maintenance.scheduledDate)}</TableCell>
                    <TableCell>
                      {getStatusBadge(maintenance.status)}
                    </TableCell>
                    <TableCell>
                      {getPriorityBadge(maintenance.priority)}
                    </TableCell>
                    <TableCell>
                      <div className="w-[100px]">
                        <Progress value={getMaintenanceProgress(maintenance)} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenMaintenanceDetails(maintenance)}>
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
              <p>No maintenance schedules found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Maintenance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Maintenances</span>
                <span className="font-medium">{calculateTotalMaintenances()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Scheduled</span>
                <span className="font-medium">{calculateScheduledMaintenances()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">In Progress</span>
                <span className="font-medium">{calculateInProgressMaintenances()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Completed</span>
                <span className="font-medium text-green-600">{calculateCompletedMaintenances()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Pending Approval</span>
                <span className="font-medium text-amber-600">{calculatePendingMaintenances()}</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Maintenance by Type</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-muted-foreground">Annual</span>
                  <span className="text-xs">{maintenanceSchedules.filter(m => m.frequency === 'annual').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Semi-Annual</span>
                  <span className="text-xs">{maintenanceSchedules.filter(m => m.frequency === 'semi-annual').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Quarterly</span>
                  <span className="text-xs">{maintenanceSchedules.filter(m => m.frequency === 'quarterly').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">As Needed</span>
                  <span className="text-xs">{maintenanceSchedules.filter(m => m.frequency === 'as-needed').length}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getUpcomingMaintenances().length > 0 ? (
                getUpcomingMaintenances().map((maintenance, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="mt-0.5">
                      <CalendarClock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{maintenance.title}</div>
                      <div className="text-xs">{maintenance.customerName}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatDate(maintenance.scheduledDate)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  <p className="text-sm">No upcoming maintenance scheduled</p>
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
                      <span className="font-medium">{event.action}</span> - {event.maintenanceId}
                    </div>
                    <div className="text-xs">{event.maintenanceTitle}</div>
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

      {/* New Maintenance Dialog */}
      <Dialog open={isNewMaintenanceDialogOpen} onOpenChange={setIsNewMaintenanceDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Schedule New Maintenance</DialogTitle>
            <DialogDescription>
              Fill in the details to schedule a new maintenance visit.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="maintenance-title">Maintenance Title</Label>
                <Input id="maintenance-title" placeholder="Annual System Inspection" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maintenance-type">Maintenance Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select maintenance type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inspection">System Inspection</SelectItem>
                    <SelectItem value="cleaning">Panel Cleaning</SelectItem>
                    <SelectItem value="repair">Repair</SelectItem>
                    <SelectItem value="upgrade">System Upgrade</SelectItem>
                    <SelectItem value="firmware">Firmware Update</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="one-time">One-time</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="semi-annual">Semi-Annual</SelectItem>
                    <SelectItem value="annual">Annual</SelectItem>
                    <SelectItem value="as-needed">As Needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="scheduled-date">Scheduled Date</Label>
                <Input id="scheduled-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estimated-hours">Estimated Hours</Label>
                <Input id="estimated-hours" type="number" placeholder="2" />
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
                <Label htmlFor="customer">Customer</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer1">Robert Johnson</SelectItem>
                    <SelectItem value="customer2">Jennifer Lee</SelectItem>
                    <SelectItem value="customer3">Michael Thompson</SelectItem>
                    <SelectItem value="customer4">Emily Wilson</SelectItem>
                    <SelectItem value="customer5">Daniel Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="system-type">System Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select system type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solar">Residential Solar PV</SelectItem>
                    <SelectItem value="battery">Battery Storage</SelectItem>
                    <SelectItem value="solar-battery">Solar + Battery</SelectItem>
                    <SelectItem value="commercial">Commercial Solar</SelectItem>
                  </SelectContent>
                </Select>
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
                <Label htmlFor="checklist-template">Checklist Template</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="annual-inspection">Annual Inspection</SelectItem>
                    <SelectItem value="battery-check">Battery System Check</SelectItem>
                    <SelectItem value="panel-cleaning">Panel Cleaning</SelectItem>
                    <SelectItem value="inverter-maintenance">Inverter Maintenance</SelectItem>
                    <SelectItem value="post-storm">Post-Storm Inspection</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Additional information about the maintenance..." />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewMaintenanceDialogOpen(false)}>Cancel</Button>
            <Button>Schedule Maintenance</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Maintenance Details Dialog */}
      {selectedMaintenance && (
        <Dialog open={isMaintenanceDetailsDialogOpen} onOpenChange={setIsMaintenanceDetailsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl">{selectedMaintenance.title}</DialogTitle>
                <Badge variant={selectedMaintenance.status === 'completed' ? 'success' : 
                  selectedMaintenance.status === 'in-progress' ? 'default' : 
                  selectedMaintenance.status === 'scheduled' ? 'secondary' : 'outline'}>
                  {selectedMaintenance.status.charAt(0).toUpperCase() + selectedMaintenance.status.slice(1)}
                </Badge>
              </div>
              <DialogDescription>
                Maintenance ID: {selectedMaintenance.id} | Created on {formatDate(selectedMaintenance.createdAt)}
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="details">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="details">Details</TabsTrigger>
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
                            <span className="text-sm font-medium">{selectedMaintenance.customerName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Email:</span>
                            <span className="text-sm">{selectedMaintenance.customerEmail}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Phone:</span>
                            <span className="text-sm">{selectedMaintenance.customerPhone}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Address:</span>
                            <span className="text-sm">{selectedMaintenance.address}</span>
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
                            <span className="text-sm font-medium">{selectedMaintenance.systemType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">System Size:</span>
                            <span className="text-sm">{selectedMaintenance.systemSize} {selectedMaintenance.systemType.toLowerCase().includes('battery') ? 'kWh' : 'kW'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Installation Date:</span>
                            <span className="text-sm">{formatDate(selectedMaintenance.installationDate)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Last Maintenance:</span>
                            <span className="text-sm">{formatDate(selectedMaintenance.lastMaintenance)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Maintenance Details</h3>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Scheduled Date:</span>
                            <span className="text-sm">{formatDate(selectedMaintenance.scheduledDate)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Frequency:</span>
                            <span className="text-sm">{selectedMaintenance.frequency.charAt(0).toUpperCase() + selectedMaintenance.frequency.slice(1)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Priority:</span>
                            <span className="text-sm">{selectedMaintenance.priority.charAt(0).toUpperCase() + selectedMaintenance.priority.slice(1)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Estimated Hours:</span>
                            <span className="text-sm">{selectedMaintenance.estimatedHours} hrs</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Actual Hours:</span>
                            <span className="text-sm">{selectedMaintenance.actualHours || 'N/A'} {selectedMaintenance.actualHours ? 'hrs' : ''}</span>
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
                          {selectedMaintenance.assignedTechnicians.map((tech, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={`/avatars/${index + 1}.png`} alt={tech} />
                                  <AvatarFallback>{tech.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="text-sm font-medium">{tech}</div>
                                  <div className="text-xs text-muted-foreground">{['Lead Technician', 'Maintenance Specialist', 'Helper', 'Inspector'][index % 4]}</div>
                                </div>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {['Assigned', 'En Route', 'On Site', 'Completed'][index % 4]}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="checklist" className="space-y-4 pt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Maintenance Checklist</h3>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-3 w-3" /> Add Item
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {selectedMaintenance.checklist.map((item, index) => (
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
                
                <div className="pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium">Checklist Progress</h3>
                    <span className="text-sm font-medium">{getMaintenanceProgress(selectedMaintenance)}%</span>
                  </div>
                  <Progress value={getMaintenanceProgress(selectedMaintenance)} className="h-2" />
                </div>
              </TabsContent>
              
              <TabsContent value="notes" className="space-y-4 pt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Maintenance Notes</h3>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-3 w-3" /> Add Note
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {selectedMaintenance.notes.map((note, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={`/avatars/${index + 1}.png`} alt={note.author} />
                              <AvatarFallback>{note.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{note.author}</span>
                                <span className="text-xs text-muted-foreground">{formatDateTime(note.date)}</span>
                              </div>
                              <p className="text-sm mt-1">{note.content}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="pt-4">
                  <Textarea placeholder="Add a note about this maintenance..." className="min-h-[100px]" />
                  <div className="flex justify-end mt-2">
                    <Button>
                      <Send className="mr-2 h-4 w-4" /> Add Note
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="timeline" className="space-y-4 pt-4">
                <h3 className="text-sm font-medium">Maintenance Timeline</h3>
                
                <div className="space-y-4">
                  {selectedMaintenance.timeline.map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          {event.action.includes('scheduled') ? (
                            <Calendar className="h-4 w-4 text-primary" />
                          ) : event.action.includes('notified') ? (
                            <Bell className="h-4 w-4 text-primary" />
                          ) : event.action.includes('confirmed') ? (
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          ) : event.action.includes('assigned') ? (
                            <Users className="h-4 w-4 text-primary" />
                          ) : event.action.includes('started') ? (
                            <Play className="h-4 w-4 text-primary" />
                          ) : event.action.includes('completed') ? (
                            <CheckCircle className="h-4 w-4 text-primary" />
                          ) : event.action.includes('reported') ? (
                            <FileText className="h-4 w-4 text-primary" />
                          ) : (
                            <Activity className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        {index < selectedMaintenance.timeline.length - 1 && (
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
                {selectedMaintenance.status !== 'completed' && (
                  <Button variant="outline" className="gap-1">
                    <Calendar className="h-4 w-4" /> Reschedule
                  </Button>
                )}
                <Button variant="outline" className="gap-1 text-destructive border-destructive/20 hover:bg-destructive/10">
                  <AlertTriangle className="h-4 w-4" /> Report Issue
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsMaintenanceDetailsDialogOpen(false)}>Close</Button>
                {selectedMaintenance.status === 'scheduled' && (
                  <Button className="gap-1">
                    <Play className="h-4 w-4" /> Start Maintenance
                  </Button>
                )}
                {selectedMaintenance.status === 'in-progress' && (
                  <Button className="gap-1">
                    <CheckCircle2 className="h-4 w-4" /> Complete Maintenance
                  </Button>
                )}
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}