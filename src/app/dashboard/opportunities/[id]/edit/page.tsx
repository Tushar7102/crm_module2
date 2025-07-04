'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { ArrowLeft, Loader2, Plus, Trash2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Product {
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice?: number;
  description?: string;
}

interface Competitor {
  name: string;
  strengths?: string;
  weaknesses?: string;
  pricing?: number;
}

interface SystemDetails {
  capacity?: number;
  panelType?: string;
  inverterType?: string;
  batteryIncluded?: boolean;
  batteryCapacity?: number;
  mountingType?: string;
  roofType?: string;
  additionalRequirements?: string;
}

interface CustomerAddress {
  street?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

interface Opportunity {
  id: string;
  name: string;
  value: number;
  stage: string;
  closeDate: string;
  probability: number;
  leadSource: string;
  assignedTo: string;
  customerId?: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  customerAddress?: CustomerAddress;
  products?: Product[];
  systemDetails?: SystemDetails;
  competitors?: Competitor[];
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  customerId: z.string().optional(),
  customerName: z.string().min(2, { message: 'Customer name must be at least 2 characters' }),
  customerPhone: z.string().min(10, { message: 'Phone number must be at least 10 characters' }).optional(),
  customerEmail: z.string().email({ message: 'Invalid email address' }).optional(),
  customerAddress: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    pincode: z.string().optional(),
  }).optional(),
  value: z.coerce.number().min(1, { message: 'Value must be greater than 0' }),
  stage: z.string(),
  probability: z.coerce.number().min(0).max(100, { message: 'Probability must be between 0 and 100' }),
  closeDate: z.string(),
  leadSource: z.string(),
  notes: z.string().optional(),
  products: z.array(
    z.object({
      name: z.string().min(1, { message: 'Product name is required' }),
      quantity: z.coerce.number().min(1, { message: 'Quantity must be at least 1' }),
      unitPrice: z.coerce.number().min(0, { message: 'Unit price must be at least 0' }),
      description: z.string().optional(),
    })
  ).optional(),
  systemDetails: z.object({
    capacity: z.coerce.number().optional(),
    panelType: z.string().optional(),
    inverterType: z.string().optional(),
    batteryIncluded: z.boolean().optional(),
    batteryCapacity: z.coerce.number().optional(),
    mountingType: z.string().optional(),
    roofType: z.string().optional(),
    additionalRequirements: z.string().optional(),
  }).optional(),
  competitors: z.array(
    z.object({
      name: z.string().min(1, { message: 'Competitor name is required' }),
      strengths: z.string().optional(),
      weaknesses: z.string().optional(),
      pricing: z.coerce.number().optional(),
    })
  ).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditOpportunityPage({ params }: { params: { id: string | string[] } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Convert params.id to string and ensure it's not an array
  const opportunityId = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : undefined;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      customerName: '',
      customerId: '',
      customerPhone: '',
      customerEmail: '',
      customerAddress: {
        street: '',
        city: '',
        state: '',
        pincode: '',
      },
      value: 0,
      stage: 'qualification',
      probability: 50,
      closeDate: new Date().toISOString().split('T')[0],
      leadSource: 'website',
      notes: '',
      products: [],
      systemDetails: {
        capacity: 0,
        panelType: '',
        inverterType: '',
        batteryIncluded: false,
        batteryCapacity: 0,
        mountingType: '',
        roofType: '',
        additionalRequirements: '',
      },
      competitors: [],
    },
  });

  useEffect(() => {
    fetchOpportunity();
  }, [opportunityId]);

  const fetchOpportunity = async () => {
    if (!opportunityId) {
      console.error('Invalid opportunity ID');
      toast.error('Invalid opportunity ID');
      router.push('/dashboard/opportunities');
      return;
    }
    
    try {
      setLoading(true);
      // Get the authentication token
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5000/api/opportunities/${opportunityId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch opportunity');
      }
      
      const opportunity = await response.json();
      
      // Format the date to YYYY-MM-DD for the date input
      const formattedDate = opportunity.closeDate 
        ? new Date(opportunity.closeDate).toISOString().split('T')[0] 
        : new Date().toISOString().split('T')[0];
      
      // Extract customer details
      const customerDetails = opportunity.customer || {};
      
      form.reset({
        name: opportunity.title || '',
        customerName: customerDetails.name || '',
        customerId: opportunity.leadId || '',
        customerPhone: customerDetails.phone || '',
        customerEmail: customerDetails.email || '',
        customerAddress: {
          street: customerDetails.address?.street || '',
          city: customerDetails.address?.city || '',
          state: customerDetails.address?.state || '',
          pincode: customerDetails.address?.pincode || '',
        },
        value: opportunity.value || 0,
        stage: opportunity.stage || 'qualification',
        probability: opportunity.probability || 50,
        closeDate: formattedDate,
        leadSource: opportunity.leadSource || 'website',
        notes: opportunity.notes || '',
        products: opportunity.products || [],
        systemDetails: opportunity.systemDetails || {
          capacity: 0,
          panelType: '',
          inverterType: '',
          batteryIncluded: false,
          batteryCapacity: 0,
          mountingType: '',
          roofType: '',
          additionalRequirements: '',
        },
        competitors: opportunity.competitors || [],
      });
    } catch (error) {
      console.error('Error fetching opportunity:', error);
      toast.error('Failed to load opportunity details');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (!opportunityId) {
      console.error('Invalid opportunity ID');
      toast.error('Invalid opportunity ID');
      return;
    }
    
    try {
      setSubmitting(true);
      // Get the authentication token
      const token = localStorage.getItem('token');
      
      console.log('Updating opportunity with ID:', opportunityId);
      
      // Prepare the data for the API
      const apiData = {
        name: data.name,
        value: data.value,
        stage: data.stage,
        probability: data.probability,
        expectedCloseDate: data.closeDate,
        description: data.notes,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerEmail: data.customerEmail,
        customerAddress: data.customerAddress,
        products: data.products?.map(product => ({
          ...product,
          totalPrice: product.quantity * product.unitPrice
        })),
        systemDetails: data.systemDetails,
        competitors: data.competitors
      };
      
      const response = await fetch(`http://localhost:5000/api/opportunities/${opportunityId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(apiData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update opportunity');
      }
      
      toast.success('Opportunity updated successfully');
      router.push(`/dashboard/opportunities/${params.id}`);
    } catch (error) {
      console.error('Error updating opportunity:', error);
      toast.error('Failed to update opportunity');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading opportunity details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => router.push(`/dashboard/opportunities/${params.id}`)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Edit Opportunity</h2>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Opportunity Details</CardTitle>
          <CardDescription>
            Update the information for this opportunity.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="customer">Customer Details</TabsTrigger>
                  <TabsTrigger value="products">Products</TabsTrigger>
                  <TabsTrigger value="additional">Additional Info</TabsTrigger>
                </TabsList>
                
                {/* Basic Info Tab */}
                <TabsContent value="basic" className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Opportunity Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Residential Solar Installation" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="customerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Customer Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe or Company Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="value"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Value ($)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="10000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="probability"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Probability (%)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="50" min="0" max="100" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="closeDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Close Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="stage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stage</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select stage" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="initial">Initial</SelectItem>
                              <SelectItem value="qualification">Qualification</SelectItem>
                              <SelectItem value="needs_analysis">Needs Analysis</SelectItem>
                              <SelectItem value="proposal">Proposal</SelectItem>
                              <SelectItem value="negotiation">Negotiation</SelectItem>
                              <SelectItem value="closed_won">Closed Won</SelectItem>
                              <SelectItem value="closed_lost">Closed Lost</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="leadSource"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lead Source</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select lead source" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="website">Website</SelectItem>
                              <SelectItem value="referral">Referral</SelectItem>
                              <SelectItem value="email_campaign">Email Campaign</SelectItem>
                              <SelectItem value="cold_call">Cold Call</SelectItem>
                              <SelectItem value="trade_show">Trade Show</SelectItem>
                              <SelectItem value="social_media">Social Media</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Add any additional notes about this opportunity" 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                
                {/* Customer Details Tab */}
                <TabsContent value="customer" className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="customerPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Customer Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 (555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="customerEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Customer Email</FormLabel>
                          <FormControl>
                            <Input placeholder="customer@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <h3 className="text-lg font-medium mt-4">Customer Address</h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="customerAddress.street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="customerAddress.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="New York" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="customerAddress.state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="NY" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="customerAddress.pincode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input placeholder="10001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
                
                {/* Products Tab */}
                <TabsContent value="products" className="space-y-4 pt-4">
                  {form.watch('products')?.map((_, index) => (
                    <div key={index} className="border rounded-md p-4 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-medium">Product {index + 1}</h3>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const currentProducts = form.getValues('products') || [];
                            form.setValue('products', currentProducts.filter((_, i) => i !== index));
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name={`products.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Product Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Solar Panel Kit" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`products.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Input placeholder="Premium solar panel kit" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-2">
                        <FormField
                          control={form.control}
                          name={`products.${index}.quantity`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Quantity</FormLabel>
                              <FormControl>
                                <Input type="number" min="1" placeholder="1" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`products.${index}.unitPrice`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Unit Price ($)</FormLabel>
                              <FormControl>
                                <Input type="number" min="0" placeholder="1000" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const currentProducts = form.getValues('products') || [];
                      form.setValue('products', [
                        ...currentProducts,
                        { name: '', quantity: 1, unitPrice: 0, description: '' }
                      ]);
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                  </Button>
                </TabsContent>
                
                {/* Additional Info Tab */}
                <TabsContent value="additional" className="space-y-4 pt-4">
                  {/* System Details Section */}
                  <div className="border rounded-md p-4 mb-4">
                    <h3 className="text-lg font-medium mb-4">System Details</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="systemDetails.capacity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>System Capacity (kW)</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" step="0.1" placeholder="5.5" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="systemDetails.panelType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Panel Type</FormLabel>
                            <FormControl>
                              <Input placeholder="Monocrystalline" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-2">
                      <FormField
                        control={form.control}
                        name="systemDetails.inverterType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Inverter Type</FormLabel>
                            <FormControl>
                              <Input placeholder="String Inverter" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="systemDetails.batteryIncluded"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                Battery Included
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-2">
                      <FormField
                        control={form.control}
                        name="systemDetails.batteryCapacity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Battery Capacity (kWh)</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" step="0.1" placeholder="10" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="systemDetails.mountingType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mounting Type</FormLabel>
                            <FormControl>
                              <Input placeholder="Roof Mount" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-2">
                      <FormField
                        control={form.control}
                        name="systemDetails.roofType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Roof Type</FormLabel>
                            <FormControl>
                              <Input placeholder="Asphalt Shingle" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="systemDetails.additionalRequirements"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Requirements</FormLabel>
                            <FormControl>
                              <Input placeholder="Special mounting hardware" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  {/* Competitors Section */}
                  <div className="border rounded-md p-4 mb-4">
                    <h3 className="text-lg font-medium mb-2">Competitors</h3>
                    {form.watch('competitors')?.map((_, index) => (
                      <div key={index} className="border rounded-md p-4 mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Competitor {index + 1}</h4>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const currentCompetitors = form.getValues('competitors') || [];
                              form.setValue('competitors', currentCompetitors.filter((_, i) => i !== index));
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <FormField
                            control={form.control}
                            name={`competitors.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Competitor Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Competitor Inc." {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`competitors.${index}.pricing`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Pricing ($)</FormLabel>
                                <FormControl>
                                  <Input type="number" min="0" placeholder="9500" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-2">
                          <FormField
                            control={form.control}
                            name={`competitors.${index}.strengths`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Strengths</FormLabel>
                                <FormControl>
                                  <Input placeholder="Lower price point" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`competitors.${index}.weaknesses`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Weaknesses</FormLabel>
                                <FormControl>
                                  <Input placeholder="Lower quality components" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const currentCompetitors = form.getValues('competitors') || [];
                        form.setValue('competitors', [
                          ...currentCompetitors,
                          { name: '', strengths: '', weaknesses: '', pricing: 0 }
                        ]);
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Competitor
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end space-x-2 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(`/dashboard/opportunities/${params.id}`)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}