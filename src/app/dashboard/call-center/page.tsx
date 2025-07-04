'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, PhoneCall, PhoneForwarded, PhoneIncoming, PhoneMissed, PhoneOff, User, Clock, Calendar } from 'lucide-react';

export default function CallCenterPage() {
  const [activeTab, setActiveTab] = useState('dialer');
  const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'ongoing' | 'ended'>('idle');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for recent calls
  const recentCalls = [
    { id: 1, name: 'John Doe', phone: '+1 (555) 123-4567', time: '10:30 AM', duration: '5:23', type: 'outgoing', status: 'completed' },
    { id: 2, name: 'Jane Smith', phone: '+1 (555) 987-6543', time: '9:15 AM', duration: '3:45', type: 'incoming', status: 'completed' },
    { id: 3, name: 'Unknown', phone: '+1 (555) 456-7890', time: 'Yesterday', duration: '0:00', type: 'missed', status: 'missed' },
    { id: 4, name: 'Mike Johnson', phone: '+1 (555) 789-0123', time: 'Yesterday', duration: '8:12', type: 'outgoing', status: 'completed' },
    { id: 5, name: 'Sarah Williams', phone: '+1 (555) 234-5678', time: '2 days ago', duration: '2:05', type: 'incoming', status: 'completed' },
  ];

  // Mock data for contacts
  const contacts = [
    { id: 1, name: 'John Doe', phone: '+1 (555) 123-4567', email: 'john.doe@example.com', type: 'Lead' },
    { id: 2, name: 'Jane Smith', phone: '+1 (555) 987-6543', email: 'jane.smith@example.com', type: 'Customer' },
    { id: 3, name: 'Mike Johnson', phone: '+1 (555) 789-0123', email: 'mike.j@example.com', type: 'Lead' },
    { id: 4, name: 'Sarah Williams', phone: '+1 (555) 234-5678', email: 'sarah.w@example.com', type: 'Customer' },
    { id: 5, name: 'Robert Brown', phone: '+1 (555) 345-6789', email: 'robert.b@example.com', type: 'Prospect' },
  ];

  // Mock data for scheduled calls
  const scheduledCalls = [
    { id: 1, name: 'John Doe', phone: '+1 (555) 123-4567', time: '2:30 PM', date: 'Today', notes: 'Follow up on solar panel installation quote' },
    { id: 2, name: 'Sarah Williams', phone: '+1 (555) 234-5678', time: '10:00 AM', date: 'Tomorrow', notes: 'Discuss financing options' },
    { id: 3, name: 'Robert Brown', phone: '+1 (555) 345-6789', time: '3:15 PM', date: 'Tomorrow', notes: 'Initial consultation for home assessment' },
  ];

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    contact.phone.includes(searchQuery) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCall = () => {
    setCallStatus('calling');
    // Simulate call connecting
    setTimeout(() => {
      setCallStatus('ongoing');
    }, 2000);
  };

  const handleEndCall = () => {
    setCallStatus('ended');
    // Reset after a delay
    setTimeout(() => {
      setCallStatus('idle');
    }, 1500);
  };

  const getCallIcon = (type: string, status: string) => {
    if (type === 'outgoing') return <PhoneForwarded className="h-4 w-4 text-blue-500" />;
    if (type === 'incoming' && status === 'completed') return <PhoneIncoming className="h-4 w-4 text-green-500" />;
    if (status === 'missed') return <PhoneMissed className="h-4 w-4 text-red-500" />;
    return <PhoneCall className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Call Center</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
            Available
          </Badge>
          <Select defaultValue="available">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="busy">Busy</SelectItem>
              <SelectItem value="away">Away</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="dialer" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="dialer" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Dialer
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Recent Calls
          </TabsTrigger>
          <TabsTrigger value="contacts" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Contacts
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Scheduled
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dialer" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Dialer</CardTitle>
                <CardDescription>Make outbound calls to leads and customers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex gap-2">
                    <Input id="phone" placeholder="Enter phone number" className="flex-1" />
                    <Button variant="outline" size="icon">
                      <User className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 my-6">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((num) => (
                    <Button key={num} variant="outline" className="h-12 text-lg">
                      {num}
                    </Button>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                {callStatus === 'idle' && (
                  <Button className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600" onClick={handleCall}>
                    <PhoneCall className="h-6 w-6" />
                  </Button>
                )}
                {callStatus === 'calling' && (
                  <Button className="w-16 h-16 rounded-full bg-blue-500 hover:bg-blue-600" disabled>
                    <Phone className="h-6 w-6 animate-pulse" />
                  </Button>
                )}
                {callStatus === 'ongoing' && (
                  <Button className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600" onClick={handleEndCall}>
                    <PhoneOff className="h-6 w-6" />
                  </Button>
                )}
                {callStatus === 'ended' && (
                  <Button className="w-16 h-16 rounded-full bg-gray-500 hover:bg-gray-600" disabled>
                    <PhoneOff className="h-6 w-6" />
                  </Button>
                )}
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Call Information</CardTitle>
                <CardDescription>Current call details and notes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {callStatus === 'idle' && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Phone className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No active call</p>
                    <p className="text-sm">Use the dialer to make a call</p>
                  </div>
                )}
                {callStatus === 'calling' && (
                  <div className="text-center py-8">
                    <Phone className="h-8 w-8 mx-auto mb-2 text-blue-500 animate-pulse" />
                    <p className="font-medium">Calling...</p>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                )}
                {callStatus === 'ongoing' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">John Doe</p>
                        <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="pt-2">
                      <p className="text-sm font-medium">Call Duration</p>
                      <p className="text-2xl font-mono">00:05</p>
                    </div>
                    <div>
                      <Label htmlFor="notes">Call Notes</Label>
                      <textarea 
                        id="notes" 
                        className="w-full min-h-[100px] p-2 border rounded-md mt-1"
                        placeholder="Add notes about this call..."
                      ></textarea>
                    </div>
                  </div>
                )}
                {callStatus === 'ended' && (
                  <div className="text-center py-8">
                    <PhoneOff className="h-8 w-8 mx-auto mb-2 text-red-500" />
                    <p className="font-medium">Call Ended</p>
                    <p className="text-sm text-muted-foreground">Duration: 00:05</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Calls</CardTitle>
              <CardDescription>History of your recent calls</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCalls.map((call) => (
                  <div key={call.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        {getCallIcon(call.type, call.status)}
                      </div>
                      <div>
                        <p className="font-medium">{call.name}</p>
                        <p className="text-sm text-muted-foreground">{call.phone}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{call.time}</p>
                      <p className="text-sm text-muted-foreground">{call.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contacts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contacts</CardTitle>
              <CardDescription>Search and manage your contacts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input 
                  placeholder="Search contacts..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline">Add Contact</Button>
              </div>
              
              <div className="space-y-2">
                {filteredContacts.length > 0 ? (
                  filteredContacts.map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-muted-foreground">{contact.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{contact.type}</Badge>
                        <Button size="icon" variant="ghost">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <User className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No contacts found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Calls</CardTitle>
              <CardDescription>Upcoming calls on your calendar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledCalls.map((call) => (
                  <div key={call.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{call.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{call.name}</p>
                        <p className="text-sm text-muted-foreground">{call.phone}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <p className="text-sm">{call.time}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <p className="text-sm text-muted-foreground">{call.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Schedule New Call</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}