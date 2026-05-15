'use client';

import { useState } from 'react';
import { Search, Package, ChevronRight, MapPin, Phone, Clock } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import StatusBadge from '@/components/ui/StatusBadge';
import { dummyOrders } from '@/lib/data';
import { formatRupiah } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { OrderStatus } from '@/types';

const trackingSteps: { status: OrderStatus; label: string; desc: string }[] = [
  { status: 'confirmed', label: 'Dikonfirmasi', desc: 'Petani sudah menerima pesanan Anda' },
  { status: 'packed', label: 'Dikemas', desc: 'Produk sedang dikemas oleh petani' },
  { status: 'picked_up', label: 'Diambil Kurir', desc: 'Mitra logistik telah mengambil paket' },
  { status: 'in_transit', label: 'Di Perjalanan', desc: 'Paket sedang dalam perjalanan' },
  { status: 'delivered', label: 'Terkirim', desc: 'Paket telah sampai di tujuan' },
];

function getStepIndex(status: OrderStatus): number {
  const idx = trackingSteps.findIndex((s) => s.status === status);
  return idx >= 0 ? idx : -1;
}

export default function TrackingPage() {
  const [searchId, setSearchId] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(dummyOrders[0]);

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <CartDrawer />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <h1 className="text-h1 text-charcoal mb-2">Lacak Pesanan</h1>
        <p className="text-gray-500 mb-8">Pantau status pengiriman pesanan Anda secara real-time.</p>

        {/* Search */}
        <div className="flex gap-3 mb-8 max-w-lg">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Masukkan nomor order (mis: ORD-2026-001)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="input !pl-12"
            />
          </div>
          <button className="btn-primary">Lacak</button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order List */}
          <div className="lg:col-span-1 space-y-3">
            <h3 className="font-semibold text-charcoal mb-2">Pesanan Anda</h3>
            {dummyOrders.map((order) => (
              <button
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className={cn(
                  'card w-full p-4 text-left transition',
                  selectedOrder.id === order.id && 'ring-2 ring-forest bg-sage/30'
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-bold text-sm text-forest">{order.id}</span>
                  <StatusBadge status={order.status} />
                </div>
                <div className="text-xs text-gray-400">
                  {order.items.length} item · Rp {formatRupiah(order.totalPrice + order.shippingCost)}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {new Date(order.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              </button>
            ))}
          </div>

          {/* Tracking Detail */}
          <div className="lg:col-span-2">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-h3 text-charcoal flex items-center gap-2">
                    <Package className="w-5 h-5 text-forest" />
                    {selectedOrder.id}
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Dipesan {new Date(selectedOrder.createdAt).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <StatusBadge status={selectedOrder.status} />
              </div>

              {/* Tracking Timeline */}
              <div className="space-y-0 mb-8">
                {trackingSteps.map((tStep, i) => {
                  const currentIdx = getStepIndex(selectedOrder.status);
                  const isComplete = i <= currentIdx;
                  const isCurrent = i === currentIdx;
                  return (
                    <div key={tStep.status} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={cn(
                          'w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all',
                          isComplete
                            ? 'bg-forest border-forest'
                            : 'bg-white border-sage',
                          isCurrent && 'ring-4 ring-forest/20'
                        )} />
                        {i < trackingSteps.length - 1 && (
                          <div className={cn(
                            'w-0.5 h-12',
                            isComplete ? 'bg-forest' : 'bg-sage'
                          )} />
                        )}
                      </div>
                      <div className="pb-8">
                        <div className={cn(
                          'font-semibold text-sm',
                          isComplete ? 'text-charcoal' : 'text-gray-400'
                        )}>
                          {tStep.label}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">{tStep.desc}</div>
                        {isCurrent && (
                          <div className="mt-2 text-xs bg-amber/10 text-amber px-2 py-1 rounded inline-flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Status saat ini
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Items */}
              <h3 className="font-semibold text-charcoal mb-3">Detail Produk</h3>
              <div className="space-y-2">
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3 bg-cream rounded-lg">
                    <div>
                      <div className="font-medium text-sm text-charcoal">{item.productName}</div>
                      <div className="text-xs text-gray-400">{item.farmerName} · {item.quantity} × Rp {formatRupiah(item.unitPrice)}</div>
                    </div>
                    <span className="font-mono font-semibold text-forest text-sm">
                      Rp {formatRupiah(item.quantity * item.unitPrice)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
