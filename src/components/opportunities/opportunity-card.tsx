'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, ArrowUpRight } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface OpportunityCardProps {
  opportunity: {
    id: string;
    name: string;
    clientName: string;
    value: number;
    stage: string;
    probability: number;
    expectedCloseDate: string;
    createdAt: string;
  };
  onDelete?: (id: string) => void;
  onRefresh?: () => void;
}

export default function OpportunityCard({ opportunity, onDelete, onRefresh }: OpportunityCardProps) {
  const router = useRouter();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const getStageColor = (stage: string) => {
    const stageColors: Record<string, string> = {
      prospecting: 'bg-indigo-700 hover:bg-indigo-800',
      qualification: 'bg-cyan-700 hover:bg-cyan-800',
      proposal: 'bg-yellow-700 hover:bg-yellow-800',
      negotiation: 'bg-pink-700 hover:bg-pink-800',
      closedWon: 'bg-green-700 hover:bg-green-800',
      closedLost: 'bg-red-700 hover:bg-red-800',
    };

    return stageColors[stage] || 'bg-gray-700 hover:bg-gray-800';
  };

  const formatStage = (stage: string) => {
    return stage
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .replace(/([a-z])([A-Z])/g, '$1 $2');
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this opportunity?')) {
      return;
    }
    
    if (!opportunity.id) {
      console.error('Invalid opportunity ID:', opportunity.id);
      toast.error('Invalid opportunity ID');
      return;
    }

    try {
      console.log('Deleting opportunity with ID:', opportunity.id);
      
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/opportunities/${opportunity.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete opportunity');
      }

      toast.success('Opportunity deleted successfully');
      if (onDelete) {
        onDelete(opportunity.id);
      }
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.error('Error deleting opportunity:', error);
      toast.error('Failed to delete opportunity');
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold">{opportunity.name}</CardTitle>
            <CardDescription>{opportunity.clientName}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push(`/dashboard/opportunities/${opportunity.id}`)}>
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push(`/dashboard/opportunities/${opportunity.id}/edit`)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Value:</span>
            <span className="font-semibold">{formatCurrency(opportunity.value)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Probability:</span>
            <span className="font-semibold">{opportunity.probability}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Close Date:</span>
            <span className="font-semibold">{formatDate(opportunity.expectedCloseDate)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Created:</span>
            <span className="text-sm">{formatDate(opportunity.createdAt)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between items-center">
        <Badge className={`${getStageColor(opportunity.stage)}`}>
          {formatStage(opportunity.stage)}
        </Badge>
        <Button 
          variant="ghost" 
          size="sm" 
          asChild
          className="text-primary hover:text-primary/80"
        >
          <Link href={`/dashboard/opportunities/${opportunity.id}`}>
            <ArrowUpRight className="h-4 w-4 mr-1" />
            Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}