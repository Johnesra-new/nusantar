'use client';

import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore, useUIStore } from '@/store';
import { formatRupiah } from '@/lib/utils';
import Link from 'next/link';

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCartStore();
  const { cartDrawerOpen, closeCartDrawer } = useUIStore();

  if (!cartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] flex justify-end" onClick={closeCartDrawer}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm animate-fade-in" />

      {/* Drawer */}
      <div
        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sage">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-forest" />
            <h2 className="font-bold text-lg text-charcoal">Keranjang Belanja</h2>
            <span className="badge bg-sage text-forest font-mono text-xs">{items.length}</span>
          </div>
          <button onClick={closeCartDrawer} className="p-2 hover:bg-sage rounded-lg transition">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <ShoppingBag className="w-16 h-16 mb-4 opacity-30" />
              <p className="font-medium text-charcoal">Keranjang kosong</p>
              <p className="text-sm mt-1">Yuk mulai belanja dari petani!</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-3 p-3 rounded-xl bg-cream border border-sage">
                {/* Image */}
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-sage flex-shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-charcoal truncate">{item.product.name}</h4>
                  <p className="text-xs text-gray-400 mt-0.5">{item.product.farmerName}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-mono font-bold text-forest text-sm">
                      Rp {formatRupiah(item.product.price * item.quantity)}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 bg-white border border-sage rounded-md flex items-center justify-center hover:bg-sage transition"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center font-mono text-sm font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 bg-white border border-sage rounded-md flex items-center justify-center hover:bg-sage transition"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="w-7 h-7 ml-1 text-terracotta hover:bg-terracotta/10 rounded-md flex items-center justify-center transition"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-sage p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Total</span>
              <span className="font-mono font-bold text-xl text-forest">
                Rp {formatRupiah(totalPrice())}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCartDrawer}
              className="btn-primary w-full text-center block"
            >
              Checkout Sekarang
            </Link>
            <button onClick={clearCart} className="w-full text-center text-xs text-gray-400 hover:text-terracotta transition">
              Kosongkan Keranjang
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
