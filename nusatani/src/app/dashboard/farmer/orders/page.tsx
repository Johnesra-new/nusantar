'use client';

import { useState } from 'react';
import { Package, CheckCircle2, XCircle, Clock, ChevronLeft, Eye } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import StatusBadge from '@/components/ui/StatusBadge';
import { useOrderStore, useAuthStore, useNotificationStore } from '@/store';
import { formatRupiah } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { OrderStatus } from '@/types';

export default function FarmerOrdersPage() {
  const { orders, updateOrderStatus } = useOrderStore();
  const { userId } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [rejectModal, setRejectModal] = useState<string | null>(null);

  const myOrders = orders.filter((o) => o.items.some((item) => item.farmerId === userId));

  const filtered = filterStatus === 'all'
    ? myOrders
    : myOrders.filter((o) => o.status === filterStatus);

  const handleConfirm = (orderId: string) => {
    updateOrderStatus(orderId, 'confirmed');
    addNotification({
      id: `n_${Date.now()}`,
      message: `Pesanan ${orderId} telah dikonfirmasi dan akan segera dikemas`,
      type: 'order',
      read: false,
      createdAt: new Date().toISOString(),
      targetRole: 'buyer',
    });
  };

  const handlePack = (orderId: string) => {
    updateOrderStatus(orderId, 'packed');
    addNotification({
      id: `n_${Date.now()}`,
      message: `Pesanan ${orderId} sudah dikemas dan siap diambil kurir`,
      type: 'delivery',
      read: false,
      createdAt: new Date().toISOString(),
      targetRole: 'logistics',
    });
  };

  const handleReject = (orderId: string) => {
    updateOrderStatus(orderId, 'cancelled');
    setRejectModal(null);
    addNotification({
      id: `n_${Date.now()}`,
      message: `Pesanan ${orderId} telah ditolak oleh petani`,
      type: 'order',
      read: false,
      createdAt: new Date().toISOString(),
      targetRole: 'buyer',
    });
  };

  const statusFilters = [
    { value: 'all', label: 'Semua', count: myOrders.length },
    { value: 'pending', label: 'Menunggu', count: myOrders.filter(o => o.status === 'pending').length },
    { value: 'confirmed', label: 'Dikonfirmasi', count: myOrders.filter(o => o.status === 'confirmed').length },
    { value: 'packed', label: 'Dikemas', count: myOrders.filter(o => o.status === 'packed').length },
    { value: 'delivered', label: 'Selesai', count: myOrders.filter(o => o.status === 'delivered').length },
    { value: 'cancelled', label: 'Ditolak', count: myOrders.filter(o => o.status === 'cancelled').length },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <CartDrawer />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Link href="/dashboard" className="text-sm text-gray-400 hover:text-forest transition flex items-center gap-1 mb-4">
          <ChevronLeft className="w-4 h-4" /> Kembali ke Dashboard
        </Link>

        <h1 className="text-h1 text-charcoal mb-2">Order Masuk</h1>
        <p className="text-gray-500 text-sm mb-6">Kelola pesanan dari pembeli.</p>

        {/* Status Filter */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
          {statusFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilterStatus(f.value)}
              className={cn(
                'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-all',
                filterStatus === f.value
                  ? 'bg-forest text-cream border-forest'
                  : 'bg-white text-charcoal border-sage hover:border-forest'
              )}
            >
              {f.label}
              <span className="font-mono text-xs bg-white/20 px-1.5 py-0.5 rounded-full">{f.count}</span>
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="card p-12 text-center text-gray-400">
              <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium text-charcoal">Tidak ada order</p>
            </div>
          ) : (
            filtered.map((order) => (
              <div key={order.id} className="card p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-sage rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-forest" />
                    </div>
                    <div>
                      <div className="font-mono font-bold text-charcoal">{order.id}</div>
                      <div className="text-xs text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                  <StatusBadge status={order.status} />
                </div>

                {/* Items */}
                <div className="space-y-2 mb-4">
                  {order.items.filter(i => i.farmerId === userId).map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-cream rounded-lg text-sm">
                      <div>
                        <div className="font-medium text-charcoal">{item.productName}</div>
                        <div className="text-xs text-gray-400">{item.quantity} × Rp {formatRupiah(item.unitPrice)}</div>
                      </div>
                      <span className="font-mono font-semibold text-forest">
                        Rp {formatRupiah(item.quantity * item.unitPrice)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total + Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-sage">
                  <div className="font-mono font-bold text-forest">
                    Total: Rp {formatRupiah(order.totalPrice)}
                  </div>
                  <div className="flex gap-2">
                    {order.status === 'pending' && (
                      <>
                        <button onClick={() => setRejectModal(order.id)} className="px-3 py-1.5 text-sm border border-terracotta text-terracotta hover:bg-terracotta/10 rounded-lg transition">
                          Tolak
                        </button>
                        <button onClick={() => handleConfirm(order.id)} className="px-3 py-1.5 text-sm bg-forest text-cream hover:bg-forest-light rounded-lg transition">
                          Konfirmasi
                        </button>
                      </>
                    )}
                    {order.status === 'confirmed' && (
                      <button onClick={() => handlePack(order.id)} className="px-3 py-1.5 text-sm bg-amber text-white hover:bg-amber-dark rounded-lg transition flex items-center gap-1">
                        <Package className="w-3 h-3" /> Tandai Dikemas
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Reject Modal */}
        {rejectModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/60 backdrop-blur-sm animate-fade-in" onClick={() => setRejectModal(null)}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6 animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
              <div className="w-12 h-12 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-6 h-6 text-terracotta" />
              </div>
              <h3 className="text-lg font-bold text-charcoal text-center mb-2">Tolak Order?</h3>
              <p className="text-sm text-gray-500 text-center mb-6">Pembeli akan diberitahu bahwa order ini ditolak.</p>
              <div className="flex gap-3">
                <button onClick={() => setRejectModal(null)} className="btn-ghost border border-sage flex-1">Batal</button>
                <button onClick={() => handleReject(rejectModal)} className="bg-terracotta hover:bg-terracotta-light text-white font-semibold px-6 py-2.5 rounded-lg transition flex-1">Tolak Order</button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
