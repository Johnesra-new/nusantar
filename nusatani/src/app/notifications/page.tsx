'use client';

import { Bell, CheckCheck, Package, Truck, Star, ShieldCheck, Info, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import { useNotificationStore, useAuthStore, Notification } from '@/store';
import { cn } from '@/lib/utils';

const typeIcons: Record<Notification['type'], React.ReactNode> = {
  order: <Package className="w-5 h-5 text-forest" />,
  delivery: <Truck className="w-5 h-5 text-amber" />,
  review: <Star className="w-5 h-5 text-amber fill-amber" />,
  system: <Info className="w-5 h-5 text-gray-400" />,
  verification: <ShieldCheck className="w-5 h-5 text-forest" />,
};

export default function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead, getByRole } = useNotificationStore();
  const { currentRole } = useAuthStore();

  const myNotifications = getByRole(currentRole);
  const unreadCount = myNotifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <CartDrawer />

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Link href="/dashboard" className="text-sm text-gray-400 hover:text-forest transition flex items-center gap-1 mb-6">
          <ChevronLeft className="w-4 h-4" /> Kembali ke Dashboard
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Bell className="w-7 h-7 text-forest" />
            <div>
              <h1 className="text-h1 text-charcoal">Notifikasi</h1>
              <p className="text-gray-500 text-sm">{unreadCount} belum dibaca</p>
            </div>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllAsRead} className="text-sm text-forest hover:text-amber transition flex items-center gap-1 font-medium">
              <CheckCheck className="w-4 h-4" /> Tandai Semua Dibaca
            </button>
          )}
        </div>

        <div className="space-y-2">
          {myNotifications.length === 0 ? (
            <div className="card p-12 text-center text-gray-400">
              <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium text-charcoal">Tidak ada notifikasi</p>
            </div>
          ) : (
            myNotifications.map((notif) => (
              <button
                key={notif.id}
                onClick={() => markAsRead(notif.id)}
                className={cn(
                  'card w-full p-4 flex items-start gap-3 text-left transition',
                  !notif.read && 'bg-sage/30 border-forest/20'
                )}
              >
                <div className="w-10 h-10 bg-sage rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  {typeIcons[notif.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn('text-sm leading-relaxed', !notif.read ? 'text-charcoal font-medium' : 'text-gray-500')}>
                    {notif.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(notif.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {!notif.read && (
                  <div className="w-2.5 h-2.5 bg-forest rounded-full flex-shrink-0 mt-2" />
                )}
              </button>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
