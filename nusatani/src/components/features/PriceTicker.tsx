'use client';

import { TrendingDown, TrendingUp, Minus as TrendNeutral, Info } from 'lucide-react';
import { PriceReference } from '@/types';
import { formatRupiah } from '@/lib/utils';

interface PriceTickerProps {
  prices: PriceReference[];
}

export default function PriceTicker({ prices }: PriceTickerProps) {
  return (
    <div className="bg-charcoal text-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-xs text-cream/50 flex-shrink-0">
          <Info className="w-3 h-3" />
          <span className="font-medium">Harga Hari Ini</span>
        </div>
        <div className="overflow-hidden relative">
          <div className="flex gap-6 animate-[scroll_30s_linear_infinite] whitespace-nowrap">
            {[...prices, ...prices].map((p, i) => (
              <div key={`${p.id}-${i}`} className="flex items-center gap-2 text-xs">
                <span className="text-cream/70">{p.commodity}</span>
                <span className="font-mono font-semibold text-cream">
                  Rp {formatRupiah(p.price)}
                </span>
                <span className="text-emerald-400 flex items-center gap-0.5">
                  <TrendingDown className="w-3 h-3" />
                </span>
                <span className="text-cream/20">|</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
