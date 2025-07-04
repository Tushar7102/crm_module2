'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Something went wrong!</h1>
          <p className="text-muted-foreground">
            We apologize for the inconvenience. Please try again later.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <div className="p-4 mt-4 bg-destructive/10 text-destructive rounded-md text-left overflow-auto max-w-2xl">
              <p className="font-mono text-sm">{error.message}</p>
              {error.stack && (
                <pre className="mt-2 text-xs overflow-auto">
                  {error.stack}
                </pre>
              )}
            </div>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Button onClick={() => reset()}>Try again</Button>
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            Go back home
          </Button>
        </div>
      </div>
    </div>
  );
}