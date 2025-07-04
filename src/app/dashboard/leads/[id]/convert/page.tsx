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
import { ArrowLeft, Loader2 } from 'lucide-react';

// Import the Lead type from the types directory
import { Lead } from '@/types';

// Extend the Lead interface if needed for this component
interface ExtendedLead extends Lead {
  // Add any additional properties needed for this component
}

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  clientName: z.string().min(2, { message: 'Customer name must be at least 2 characters' }),
  value: z.coerce.number().min(1, { message: 'Value must be greater than 0' }),
  stage: z.string(),
  probability: z.coerce.number().min(0).max(100, { message: 'Probability must be between 0 and 100' }),
  expectedCloseDate: z.string(),
  description: z.string().optional(),
  products: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ConvertLeadPage({ params }: { params: { id: string } }) {
  console.log('Convert page loaded with params:', params);
  const router = useRouter();
  const [lead, setLead] = useState<ExtendedLead | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      clientName: '',
      value: 0,
      stage: 'qualification',
      probability: 50,
      expectedCloseDate: new Date().toISOString().split('T')[0],
      description: '',
      products: [],
    },
  });

  useEffect(() => {
    if (params.id) {
      // Clean the ID parameter to ensure it doesn't have any extra characters
      const cleanId = params.id.trim();
      console.log('Clean ID for fetching:', cleanId);
      fetchLead(cleanId);
    }
  }, [params.id]);

  const fetchLead = async (cleanId?: string) => {
    try {
      setLoading(true);
      // Use the cleaned ID if provided, otherwise use params.id
      const idToUse = cleanId || params.id;
      console.log('Fetching lead with ID:', idToUse);
      const response = await fetch(`/api/leads/${idToUse}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API error response:', errorData);
        throw new Error(errorData.error || 'Failed to fetch lead');
      }
      
      const data = await response.json();
      console.log('Lead data received:', data);
      setLead(data);
      
      // Pre-fill the form with lead data
      form.setValue('name', `${data.name} Opportunity`);
      form.setValue('clientName', data.name);
    } catch (error) {
      console.error('Error fetching lead:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to load lead details');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      setSubmitting(true);
      // Clean the ID parameter to ensure it doesn't have any extra characters
      const cleanId = params.id.trim();
      console.log('Converting lead with ID:', cleanId);
      
      // Make sure the data has all required fields for the server
      const formattedData = {
        ...data,
        // Ensure numeric values are properly formatted
        value: parseFloat(data.value.toString()),
        probability: parseFloat(data.probability.toString()),
        // Make sure we have a valid date
        expectedCloseDate: data.expectedCloseDate || new Date().toISOString().split('T')[0],
        // Add lead email and phone if available
        leadEmail: lead?.email,
        leadPhone: lead?.phone
      };
      
      console.log('Sending formatted data:', formattedData);
      
      const response = await fetch(`/api/leads/${cleanId}/convert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API error response:', errorData);
        throw new Error(errorData.error || 'Failed to convert lead to opportunity');
      }
      
      const result = await response.json();
      console.log('Conversion result:', result);
      toast.success('Lead converted to opportunity successfully');
      
      // Redirect to the opportunities list instead of a specific opportunity
      router.push('/dashboard/opportunities');
      // Force a hard navigation to ensure the page reloads completely
      window.location.href = '/dashboard/opportunities';
    } catch (error) {
      console.error('Error converting lead:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to convert lead to opportunity');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading lead details...</p>
        </div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center">
        <p className="text-xl">Lead not found</p>
        <Button 
          variant="outline" 
          className="mt-4" 
          onClick={() => router.push('/dashboard/leads')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Leads
        </Button>
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
            onClick={() => router.push(`/dashboard/leads/${params.id}`)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Convert Lead to Opportunity</h2>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lead Information</CardTitle>
          <CardDescription>
            Converting lead: {lead.name} ({lead.email})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  name="clientName"
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
                  name="expectedCloseDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expected Close Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="stage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Initial Stage</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select stage" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="prospecting">Prospecting</SelectItem>
                        <SelectItem value="qualification">Qualification</SelectItem>
                        <SelectItem value="proposal">Proposal</SelectItem>
                        <SelectItem value="negotiation">Negotiation</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Add details about this opportunity" 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(`/dashboard/leads/${params.id}`)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    'Convert to Opportunity'
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