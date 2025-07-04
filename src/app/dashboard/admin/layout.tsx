'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            <Link 
              href="/dashboard/admin/users"
              className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${pathname.includes('/dashboard/admin/users') ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
            >
              Users
            </Link>
            <Link 
              href="/dashboard/admin/roles"
              className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${pathname.includes('/dashboard/admin/roles') ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
            >
              Roles & Permissions
            </Link>
            <Link 
              href="/dashboard/admin/settings"
              className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${pathname.includes('/dashboard/admin/settings') ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
            >
              System Settings
            </Link>
          </nav>
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}