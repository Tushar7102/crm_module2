'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
// import { AuthService } from '@/services/auth-service';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ForgotPasswordPage() {
  // const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (_data: FormValues) => {
    setIsLoading(true);
    try {
      // In a real application, you would call the password reset API
      // await AuthService.requestPasswordReset(data.email);
      
      // For now, we'll just simulate a successful request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setEmailSent(true);
      toast.success('Password reset instructions sent to your email');
    } catch (error) {
      console.error('Password reset error:', error);
      toast.error('Failed to send reset instructions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
          <CardDescription className="text-center">
            {emailSent 
              ? 'Check your email for reset instructions' 
              : 'Enter your email to receive password reset instructions'}
          </CardDescription>
        </CardHeader>
        {!emailSent ? (
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send reset instructions'}
                </Button>
              </form>
            </Form>
          </CardContent>
        ) : (
          <CardContent className="space-y-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md text-center">
              <p className="text-green-700 dark:text-green-300">
                We've sent password reset instructions to your email.
                Please check your inbox and spam folders.
              </p>
            </div>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => setEmailSent(false)}
            >
              Try another email
            </Button>
          </CardContent>
        )}
        <CardFooter className="flex justify-center">
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Remember your password?{' '}
            <Link href="/auth/login" className="font-medium text-primary hover:underline">
              Back to login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}