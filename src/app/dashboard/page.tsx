'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export default function DashboardPage() {
  // Mock data for dashboard
  const stats = [
    { name: 'Total Leads', value: '120', change: '+5%', status: 'increase', icon: '📈' },
    { name: 'Open Opportunities', value: '42', change: '+12%', status: 'increase', icon: '🎯' },
    { name: 'Conversion Rate', value: '24%', change: '-2%', status: 'decrease', icon: '📊' },
    { name: 'Revenue (MTD)', value: '$48,500', change: '+8%', status: 'increase', icon: '💰' },
  ];

  const recentLeads = [
    { id: 1, name: 'John Smith', email: 'john@example.com', phone: '(555) 123-4567', status: 'New', date: '2023-06-28' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', phone: '(555) 234-5678', status: 'Contacted', date: '2023-06-27' },
    { id: 3, name: 'Michael Brown', email: 'michael@example.com', phone: '(555) 345-6789', status: 'Qualified', date: '2023-06-26' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', phone: '(555) 456-7890', status: 'New', date: '2023-06-25' },
  ];

  const upcomingTasks = [
    { id: 1, title: 'Follow up with John Smith', dueDate: '2023-06-30', priority: 'High' },
    { id: 2, title: 'Send proposal to ABC Corp', dueDate: '2023-07-02', priority: 'Medium' },
    { id: 3, title: 'Schedule demo with XYZ Inc', dueDate: '2023-07-05', priority: 'High' },
    { id: 4, title: 'Review Q2 sales performance', dueDate: '2023-07-10', priority: 'Low' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Dashboard</h1>
        <div className="flex items-center space-x-2 bg-card/50 px-4 py-2 rounded-full shadow-sm border border-border/40">
          <p className="text-sm font-medium">
            Welcome back, User
          </p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 h-11 rounded-xl bg-muted/50 p-1">
          <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">Overview</TabsTrigger>
          <TabsTrigger value="analytics" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">Analytics</TabsTrigger>
          <TabsTrigger value="reports" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">Reports</TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-card/50">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <span className="text-xl">{stat.icon}</span> {stat.name}
                  </CardTitle>
                  <Badge variant={stat.status === 'increase' ? 'default' : 'destructive'} className="px-2 py-1 rounded-full font-normal">
                    {stat.change}
                  </Badge>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="col-span-1 border-none shadow-md overflow-hidden">
              <CardHeader className="bg-card/50 border-b border-border/30">
                <CardTitle className="flex items-center gap-2 text-primary/90">
                  <span className="text-xl">👥</span> Recent Leads
                </CardTitle>
                <CardDescription>
                  Latest leads added to the system
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-5">
                  {recentLeads.map((lead) => (
                    <div key={lead.id} className="flex items-center justify-between border-b border-border/30 pb-3 hover:bg-muted/20 px-2 py-1 rounded-md transition-colors">
                      <div>
                        <p className="font-medium text-card-foreground/90">{lead.name}</p>
                        <p className="text-sm text-muted-foreground">{lead.email}</p>
                      </div>
                      <Badge variant={lead.status === 'New' ? 'default' : lead.status === 'Contacted' ? 'secondary' : 'outline'} className="rounded-full font-normal">
                        {lead.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1 border-none shadow-md overflow-hidden">
              <CardHeader className="bg-card/50 border-b border-border/30">
                <CardTitle className="flex items-center gap-2 text-primary/90">
                  <span className="text-xl">📋</span> Upcoming Tasks
                </CardTitle>
                <CardDescription>
                  Tasks that need your attention
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-5">
                  {upcomingTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between border-b border-border/30 pb-3 hover:bg-muted/20 px-2 py-1 rounded-md transition-colors">
                      <div>
                        <p className="font-medium text-card-foreground/90">{task.title}</p>
                        <p className="text-sm text-muted-foreground">Due: {task.dueDate}</p>
                      </div>
                      <Badge variant={task.priority === 'High' ? 'destructive' : task.priority === 'Medium' ? 'default' : 'outline'} className="rounded-full font-normal">
                        {task.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-6">
          <Card className="border-none shadow-md overflow-hidden">
            <CardHeader className="bg-card/50 border-b border-border/30">
              <CardTitle className="flex items-center gap-2 text-primary/90">
                <span className="text-xl">📊</span> Analytics
              </CardTitle>
              <CardDescription>
                View detailed analytics and performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-[300px] flex items-center justify-center border border-dashed rounded-xl bg-muted/30">
                <p className="text-muted-foreground flex items-center gap-2"><span className="text-xl">📈</span> Analytics charts will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-6">
          <Card className="border-none shadow-md overflow-hidden">
            <CardHeader className="bg-card/50 border-b border-border/30">
              <CardTitle className="flex items-center gap-2 text-primary/90">
                <span className="text-xl">📑</span> Reports
              </CardTitle>
              <CardDescription>
                Generate and view reports
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-[300px] flex items-center justify-center border border-dashed rounded-xl bg-muted/30">
                <p className="text-muted-foreground flex items-center gap-2"><span className="text-xl">📋</span> Reports will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-none shadow-md overflow-hidden">
            <CardHeader className="bg-card/50 border-b border-border/30">
              <CardTitle className="flex items-center gap-2 text-primary/90">
                <span className="text-xl">🔔</span> Notifications
              </CardTitle>
              <CardDescription>
                View your recent notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-[300px] flex items-center justify-center border border-dashed rounded-xl bg-muted/30">
                <p className="text-muted-foreground flex items-center gap-2"><span className="text-xl">📭</span> No new notifications</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}