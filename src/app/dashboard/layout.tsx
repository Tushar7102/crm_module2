'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Toaster } from 'sonner';
import { useAuth } from '@/contexts/auth-context';
import { useTheme } from '@/contexts/theme-context';
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Package,
  LifeBuoy,
  LogOut,
  Menu,
  X,
  Phone,
  FileCheck,
  Warehouse,
  Receipt,
  Wrench,
  Coins,
  ShieldCheck,
  Sun,
  Moon,
  Laptop,
  ChevronRight
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const navigation = [
  // Core CRM
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Leads', href: '/dashboard/leads', icon: Users },
  { name: 'Opportunities', href: '/dashboard/opportunities', icon: FileText },

  // Tele-Communication
  { name: 'Call Center', href: '/dashboard/call-center', icon: Phone },
  { name: 'Campaigns', href: '/dashboard/campaigns', icon: Users },

  // Documentation & Compliance
  { name: 'Documents', href: '/dashboard/documents', icon: FileCheck },
  { name: 'Approvals', href: '/dashboard/approvals', icon: ShieldCheck },

  // Warehouse & Inventory
  { name: 'Inventory', href: '/dashboard/inventory', icon: Package },
  { name: 'Warehouse', href: '/dashboard/warehouse', icon: Warehouse },

  // Accounts & Finance
  { name: 'Invoices', href: '/dashboard/invoices', icon: Receipt },
  { name: 'Payments', href: '/dashboard/payments', icon: Coins },

  // Service & Installation
  { name: 'Service Tickets', href: '/dashboard/service-tickets', icon: LifeBuoy },
  { name: 'Jobs', href: '/dashboard/jobs', icon: Wrench },

  // Subsidy Department
  { name: 'Subsidy Claims', href: '/dashboard/subsidy-claims', icon: FileText },

  // Admin & Settings
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex min-h-screen flex-col">
      <Toaster position="top-right" />

      {/* Mobile sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="fixed left-4 top-4 z-40 rounded-full hover:bg-primary/10 hover:text-primary transition-all"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0 border-none">
          <nav className="flex flex-col h-full bg-background/95 backdrop-blur-sm border-r border-border/30">
            <div className="flex h-16 items-center px-6 border-b border-border/30">
              <h2 className="text-lg font-semibold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                CRM System
              </h2>
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto rounded-full hover:bg-primary/10 hover:text-primary transition-all"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex flex-col gap-1 p-4">
              {navigation.map((item) => {
                const isActive =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-primary/10 text-primary shadow-sm'
                        : 'text-muted-foreground hover:text-primary hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon
                        className={`h-4 w-4 ${isActive ? 'text-primary' : ''}`}
                      />
                      {item.name}
                    </div>
                    {isActive && <ChevronRight className="h-4 w-4 text-primary/70" />}
                  </Link>
                );
              })}
            </div>

            <div className="mt-auto p-4 border-t border-border/30">
              <button
                onClick={() => {
                  logout();
                  setIsSidebarOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <LogOut className="h-4 w-4" />
                  Logout
                </div>
              </button>
            </div>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-border/30 bg-background/95 backdrop-blur-sm shadow-md">
          <div className="flex flex-shrink-0 items-center px-6 py-5 mb-2 border-b border-border/30">
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              CRM System
            </h1>
          </div>
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg mb-1 transition-all ${
                    isActive
                      ? 'bg-primary/10 text-primary shadow-sm'
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-primary'
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon
                      className={`mr-3 h-4.5 w-4.5 flex-shrink-0 ${
                        isActive
                          ? 'text-primary'
                          : 'text-muted-foreground group-hover:text-primary'
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </div>
                  {isActive && <ChevronRight className="h-4 w-4 text-primary/70" />}
                </Link>
              );
            })}
          </nav>
          <div className="p-5 border-t border-border/30">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-center gap-2 p-1 bg-muted/30 border border-border/50 rounded-lg shadow-sm mx-auto">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 rounded-md ${
                    theme === 'light' ? 'bg-primary/10 text-primary shadow-sm' : ''
                  } hover:bg-primary/10 hover:text-primary transition-all`}
                  onClick={() => setTheme('light')}
                  title="Light Mode"
                >
                  <Sun className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 rounded-md ${
                    theme === 'dark' ? 'bg-primary/10 text-primary shadow-sm' : ''
                  } hover:bg-primary/10 hover:text-primary transition-all`}
                  onClick={() => setTheme('dark')}
                  title="Dark Mode"
                >
                  <Moon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 rounded-md ${
                    theme === 'system' ? 'bg-primary/10 text-primary shadow-sm' : ''
                  } hover:bg-primary/10 hover:text-primary transition-all`}
                  onClick={() => setTheme('system')}
                  title="System Default"
                >
                  <Laptop className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center p-3 bg-muted/30 border border-border/50 rounded-lg shadow-sm transition-all hover:bg-primary/5">
                <Avatar className="border-2 border-primary/20 shadow-sm">
                  <AvatarImage
                    src={user?.avatar || '/avatar-placeholder.png'}
                    alt={user?.name || 'User'}
                  />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {user?.name?.[0] || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="text-sm font-medium transition-colors group-hover:text-primary">
                    {user?.name || 'User'}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-muted-foreground hover:text-primary p-0 h-auto transition-colors"
                    onClick={logout}
                  >
                    <LogOut className="h-3 w-3 mr-1" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Mobile header */}
        <div className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between bg-background/95 backdrop-blur-sm border-b border-border/30 shadow-sm md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="px-4 rounded-full hover:bg-primary/10 hover:text-primary transition-all"
            onClick={() => setIsSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            CRM System
          </h1>
          <div className="flex items-center gap-3 pr-4">
            <div className="flex items-center gap-1 border border-border/50 rounded-md p-1 shadow-sm">
              <Button
                variant="ghost"
                size="icon"
                className={`h-7 w-7 rounded-md ${
                  theme === 'light' ? 'bg-primary/10 text-primary' : ''
                } hover:bg-primary/10 hover:text-primary transition-all`}
                onClick={() => setTheme('light')}
                title="Light Mode"
              >
                <Sun className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-7 w-7 rounded-md ${
                  theme === 'dark' ? 'bg-primary/10 text-primary' : ''
                } hover:bg-primary/10 hover:text-primary transition-all`}
                onClick={() => setTheme('dark')}
                title="Dark Mode"
              >
                <Moon className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-7 w-7 rounded-md ${
                  theme === 'system' ? 'bg-primary/10 text-primary' : ''
                } hover:bg-primary/10 hover:text-primary transition-all`}
                onClick={() => setTheme('system')}
                title="System Default"
              >
                <Laptop className="h-4 w-4" />
              </Button>
            </div>
            <Avatar className="h-8 w-8 border-2 border-border/50 shadow-sm">
              <AvatarImage src="/avatar-placeholder.png" alt="User" />
              <AvatarFallback className="bg-primary/10 text-primary">U</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <main className="flex-1 overflow-auto bg-background/50 py-6 px-4 sm:px-6 md:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
