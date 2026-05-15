'use client';

import { CheckCircle2, Star, MapPin, Plus, ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { formatRupiah } from '@/lib/utils';
import { useCartStore } from '@/store';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  const savings = product.marketPrice
    ? Math.round(((product.marketPrice - product.price) / product.marketPrice) * 100)
    : 0;

  return (
    <div
      className="card overflow-hidden flex flex-col group cursor-pointer animate-fade-in-up opacity-0"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
    >
      {/* Image */}
      <Link href={`/product/${product.id}`} className="relative h-48 overflow-hidden bg-sage">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Verified Badge */}
        {product.farmerVerified && (
          <div className="absolute top-2 left-2 badge-verified shadow-sm">
            <CheckCircle2 className="w-3 h-3" />
            Terverifikasi
          </div>
        )}
        {/* Savings Badge */}
        {savings > 0 && (
          <div className="absolute top-2 right-2 bg-amber text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
            Hemat {savings}%
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <Link href={`/product/${product.id}`} className="font-semibold text-base text-charcoal hover:text-forest transition line-clamp-1">
            {product.name}
          </Link>
          <span className="flex items-center text-xs text-amber font-semibold gap-0.5 flex-shrink-0 ml-2">
            <Star className="w-3 h-3 fill-amber" />
            {product.rating}
          </span>
        </div>

        <div className="flex items-center text-caption text-gray-400 mb-3 gap-1">
          <MapPin className="w-3 h-3" />
          <span className="truncate">{product.farmerName} · {product.farmerLocation}</span>
        </div>

        <div className="mt-auto">
          <div className="text-caption text-gray-400 mb-0.5">Harga Petani</div>
          <div className="flex justify-between items-end">
            <div>
              <span className="font-mono font-bold text-xl text-forest">
                Rp {formatRupiah(product.price)}
              </span>
              <span className="text-sm text-gray-400 ml-1">/ {product.unit}</span>
            </div>
            <button
              onClick={(e) => { e.preventDefault(); addItem(product); }}
              className="w-10 h-10 bg-sage hover:bg-forest hover:text-white text-forest rounded-lg flex items-center justify-center transition-all duration-200 active:scale-90"
              title="Tambah ke keranjang"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          {product.marketPrice && (
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs bg-amber/10 text-amber px-2 py-0.5 rounded font-medium">
                Harga Pasar: Rp {formatRupiah(product.marketPrice)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
