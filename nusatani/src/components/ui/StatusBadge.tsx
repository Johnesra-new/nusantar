'use client';

import { cn } from '@/lib/utils';
import { OrderStatus } from '@/types';
import { Package, Truck, CheckCircle2, Clock, XCircle, Box } from 'lucide-react';

interface StatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: React.ReactNode }> = {
  pending: {
    label: 'Menunggu',
    color: 'bg-gray-100 text-gray-500',
    icon: <Clock className="w-3 h-3" />,
  },
  confirmed: {
    label: 'Dikonfirmasi',
    color: 'bg-blue-50 text-blue-600',
    icon: <CheckCircle2 className="w-3 h-3" />,
  },
  packed: {
    label: 'Dikemas',
    color: 'bg-sage text-forest',
    icon: <Box className="w-3 h-3" />,
  },
  picked_up: {
    label: 'Diambil',
    color: 'bg-amber/10 text-amber',
    icon: <Package className="w-3 h-3" />,
  },
  in_transit: {
    label: 'Di Perjalanan',
    color: 'bg-amber/10 text-amber',
    icon: <Truck className="w-3 h-3" />,
  },
  delivered: {
    label: 'Terkirim',
    color: 'bg-emerald-100 text-emerald-700',
    icon: <CheckCircle2 className="w-3 h-3" />,
  },
  cancelled: {
    label: 'Dibatalkan',
    color: 'bg-terracotta/10 text-terracotta',
    icon: <XCircle className="w-3 h-3" />,
  },
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={cn('badge', config.color, className)}>
      {config.icon}
      {config.label}
    </span>
  );
}
