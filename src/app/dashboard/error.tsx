'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[50vh] p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Something went wrong!</h2>
          <p className="text-muted-foreground">
            We encountered an error while loading this page.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <div className="p-4 mt-4 bg-destructive/10 text-destructive rounded-md text-left overflow-auto">
              <p className="font-mono text-sm">{error.message}</p>
            </div>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Button onClick={() => reset()}>Try again</Button>
          <Button variant="outline" onClick={() => window.location.href = '/dashboard'}>
            Go to dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}