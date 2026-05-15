'use client';

import { cn } from '@/lib/utils';

interface StatsCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  accentColor: string;
  change?: string;
  changePositive?: boolean;
  index?: number;
}

export default function StatsCard({ label, value, icon, accentColor, change, changePositive, index = 0 }: StatsCardProps) {
  return (
    <div
      className="stat-card animate-fade-in-up opacity-0"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', accentColor)}>
          {icon}
        </div>
        {change && (
          <span className={cn(
            'text-xs font-semibold px-2 py-0.5 rounded-full',
            changePositive ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-500'
          )}>
            {change}
          </span>
        )}
      </div>
      <div className="font-mono font-bold text-2xl text-charcoal animate-count-up">
        {value}
      </div>
      <div className="text-caption text-gray-400 mt-1">{label}</div>
      {/* Accent line */}
      <div className={cn('absolute bottom-0 left-0 right-0 h-1 rounded-b-xl', accentColor)} />
    </div>
  );
}
