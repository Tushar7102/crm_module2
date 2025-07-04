import React from 'react';
import { Toaster } from '@/components/ui/sonner';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Branding and information */}
      <div className="hidden md:flex md:w-1/2 bg-primary p-8 text-white flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">CRM System</h1>
          <p className="text-primary-foreground/80">Manage your business relationships efficiently</p>
        </div>
        <img src="/mobile.png" alt="images" width={350} />
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Features</h2>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckIcon className="h-5 w-5" />
                <span>Lead and opportunity management</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-5 w-5" />
                <span>Service ticket tracking</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-5 w-5" />
                <span>Inventory management</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-5 w-5" />
                <span>Comprehensive analytics</span>
              </li>
            </ul>
          </div>
          
          <div className="text-sm text-primary-foreground/70">
            &copy; {new Date().getFullYear()} CRM System. All rights reserved.
          </div>
        </div>
      </div>
      
      {/* Right side - Auth forms */}
      <div className="flex-1 flex flex-col">
        <div className="md:hidden flex items-center justify-center p-4 bg-primary text-white">
          <h1 className="text-xl font-bold">CRM System</h1>
        </div>
        
        <main className="flex-1 flex items-center justify-center p-4">
          {children}
        </main>
        
        <Toaster position="top-right" />
      </div>
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}