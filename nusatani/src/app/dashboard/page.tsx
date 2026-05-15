'use client';

import {
  BarChart3, Users, ShoppingBag, TrendingUp, ShieldCheck,
  Package, CheckCircle2, XCircle, Download, Filter,
  ChevronRight, AlertCircle, Truck, Leaf, Eye, Bell,
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import StatsCard from '@/components/features/StatsCard';
import StatusBadge from '@/components/ui/StatusBadge';
import { dummyPriceReferences, dummyUsers } from '@/lib/data';
import { formatRupiah } from '@/lib/utils';
import {
  useAuthStore, useOrderStore, useProductStore,
  useNotificationStore,
} from '@/store';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const { currentRole, userName } = useAuthStore();
  const { orders } = useOrderStore();
  const { products } = useProductStore();
  const { getUnreadCount } = useNotificationStore();

  const unread = getUnreadCount(currentRole);

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <CartDrawer />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-h1 text-charcoal">Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">
              Selamat datang{userName ? `, ${userName}` : ''}!{' '}
              {currentRole === 'farmer' && 'Kelola produk dan pantau order masuk Anda.'}
              {currentRole === 'buyer' && 'Pantau pesanan dan riwayat belanja Anda.'}
              {currentRole === 'logistics' && 'Kelola pengiriman dan rute harian Anda.'}
              {currentRole === 'admin' && 'Monitor platform NusaTani secara keseluruhan.'}
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/notifications" className="btn-ghost border border-sage flex items-center gap-2 text-sm relative">
              <Bell className="w-4 h-4" /> Notifikasi
              {unread > 0 && (
                <span className="absolute -top-1 -right-1 bg-terracotta text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {unread}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {currentRole === 'admin' && (
            <>
              <StatsCard label="Total Order" value={String(orders.length)} icon={<ShoppingBag className="w-5 h-5 text-forest" />} accentColor="bg-forest/10" change={`${orders.filter(o => o.status === 'pending').length} menunggu`} changePositive index={0} />
              <StatsCard label="Petani Terverifikasi" value={String(dummyUsers.filter(u => u.role === 'farmer' && u.isVerified).length)} icon={<ShieldCheck className="w-5 h-5 text-amber" />} accentColor="bg-amber/10" index={1} />
              <StatsCard label="Total Produk" value={String(products.length)} icon={<Package className="w-5 h-5 text-emerald-600" />} accentColor="bg-emerald-50" index={2} />
              <StatsCard label="GMV Platform" value={`Rp ${formatRupiah(orders.reduce((s, o) => s + o.totalPrice, 0))}`} icon={<TrendingUp className="w-5 h-5 text-terracotta" />} accentColor="bg-terracotta/10" index={3} />
            </>
          )}
          {currentRole === 'farmer' && (
            <>
              <StatsCard label="Produk Aktif" value={String(products.filter(p => p.status === 'active').length)} icon={<Package className="w-5 h-5 text-forest" />} accentColor="bg-forest/10" index={0} />
              <StatsCard label="Order Masuk" value={String(orders.filter(o => o.status === 'pending').length)} icon={<ShoppingBag className="w-5 h-5 text-amber" />} accentColor="bg-amber/10" change="Menunggu konfirmasi" changePositive index={1} />
              <StatsCard label="Order Selesai" value={String(orders.filter(o => o.status === 'delivered').length)} icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />} accentColor="bg-emerald-50" index={2} />
              <StatsCard label="Pendapatan" value={`Rp ${formatRupiah(orders.filter(o => o.status === 'delivered').reduce((s, o) => s + o.totalPrice, 0))}`} icon={<TrendingUp className="w-5 h-5 text-terracotta" />} accentColor="bg-terracotta/10" index={3} />
            </>
          )}
          {currentRole === 'logistics' && (
            <>
              <StatsCard label="Order Hari Ini" value={String(orders.length)} icon={<Package className="w-5 h-5 text-forest" />} accentColor="bg-forest/10" index={0} />
              <StatsCard label="Selesai Dikirim" value={String(orders.filter(o => o.status === 'delivered').length)} icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />} accentColor="bg-emerald-50" index={1} />
              <StatsCard label="Siap Diambil" value={String(orders.filter(o => o.status === 'packed').length)} icon={<Truck className="w-5 h-5 text-amber" />} accentColor="bg-amber/10" index={2} />
              <StatsCard label="Dalam Perjalanan" value={String(orders.filter(o => o.status === 'in_transit').length)} icon={<TrendingUp className="w-5 h-5 text-terracotta" />} accentColor="bg-terracotta/10" index={3} />
            </>
          )}
          {currentRole === 'buyer' && (
            <>
              <StatsCard label="Total Pesanan" value={String(orders.length)} icon={<ShoppingBag className="w-5 h-5 text-forest" />} accentColor="bg-forest/10" index={0} />
              <StatsCard label="Sedang Dikirim" value={String(orders.filter(o => ['packed', 'picked_up', 'in_transit'].includes(o.status)).length)} icon={<Truck className="w-5 h-5 text-amber" />} accentColor="bg-amber/10" index={1} />
              <StatsCard label="Selesai" value={String(orders.filter(o => o.status === 'delivered').length)} icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />} accentColor="bg-emerald-50" index={2} />
              <StatsCard label="Total Belanja" value={`Rp ${formatRupiah(orders.reduce((s, o) => s + o.totalPrice + o.shippingCost, 0))}`} icon={<TrendingUp className="w-5 h-5 text-terracotta" />} accentColor="bg-terracotta/10" index={3} />
            </>
          )}
        </div>

        {/* Quick Actions for each role */}
        {currentRole === 'farmer' && (
          <div className="grid sm:grid-cols-3 gap-3 mb-8">
            <Link href="/dashboard/farmer/products" className="card p-4 hover:ring-2 hover:ring-forest transition flex items-center gap-3">
              <div className="w-10 h-10 bg-forest/10 rounded-lg flex items-center justify-center"><Leaf className="w-5 h-5 text-forest" /></div>
              <div><div className="font-semibold text-sm text-charcoal">Kelola Produk</div><div className="text-xs text-gray-400">Tambah, edit, hapus listing</div></div>
              <ChevronRight className="w-4 h-4 text-gray-300 ml-auto" />
            </Link>
            <Link href="/dashboard/farmer/orders" className="card p-4 hover:ring-2 hover:ring-forest transition flex items-center gap-3">
              <div className="w-10 h-10 bg-amber/10 rounded-lg flex items-center justify-center"><Package className="w-5 h-5 text-amber" /></div>
              <div><div className="font-semibold text-sm text-charcoal">Order Masuk</div><div className="text-xs text-gray-400">Konfirmasi & proses order</div></div>
              <ChevronRight className="w-4 h-4 text-gray-300 ml-auto" />
            </Link>
            <Link href="/dashboard/farmer/verification" className="card p-4 hover:ring-2 hover:ring-forest transition flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center"><ShieldCheck className="w-5 h-5 text-emerald-600" /></div>
              <div><div className="font-semibold text-sm text-charcoal">Verifikasi</div><div className="text-xs text-gray-400">Ajukan verifikasi akun</div></div>
              <ChevronRight className="w-4 h-4 text-gray-300 ml-auto" />
            </Link>
          </div>
        )}

        {currentRole === 'buyer' && (
          <div className="grid sm:grid-cols-3 gap-3 mb-8">
            <Link href="/marketplace" className="card p-4 hover:ring-2 hover:ring-forest transition flex items-center gap-3">
              <div className="w-10 h-10 bg-forest/10 rounded-lg flex items-center justify-center"><ShoppingBag className="w-5 h-5 text-forest" /></div>
              <div><div className="font-semibold text-sm text-charcoal">Pasar Tani</div><div className="text-xs text-gray-400">Belanja produk segar</div></div>
              <ChevronRight className="w-4 h-4 text-gray-300 ml-auto" />
            </Link>
            <Link href="/tracking" className="card p-4 hover:ring-2 hover:ring-forest transition flex items-center gap-3">
              <div className="w-10 h-10 bg-amber/10 rounded-lg flex items-center justify-center"><Truck className="w-5 h-5 text-amber" /></div>
              <div><div className="font-semibold text-sm text-charcoal">Lacak Pesanan</div><div className="text-xs text-gray-400">Pantau status pengiriman</div></div>
              <ChevronRight className="w-4 h-4 text-gray-300 ml-auto" />
            </Link>
            <Link href="/wishlist" className="card p-4 hover:ring-2 hover:ring-forest transition flex items-center gap-3">
              <div className="w-10 h-10 bg-terracotta/10 rounded-lg flex items-center justify-center"><Eye className="w-5 h-5 text-terracotta" /></div>
              <div><div className="font-semibold text-sm text-charcoal">Wishlist</div><div className="text-xs text-gray-400">Produk favorit Anda</div></div>
              <ChevronRight className="w-4 h-4 text-gray-300 ml-auto" />
            </Link>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="p-5 border-b border-sage flex items-center justify-between">
                <h3 className="font-bold text-charcoal">Order Terbaru</h3>
                <Link href="/tracking" className="text-sm text-forest hover:text-amber transition font-medium flex items-center gap-1">
                  Lihat Semua <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="divide-y divide-sage">
                {orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="p-4 hover:bg-sage/30 transition flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-sage rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-forest" />
                      </div>
                      <div>
                        <div className="font-mono font-semibold text-sm text-charcoal">{order.id}</div>
                        <div className="text-xs text-gray-400">
                          {order.items.length} item · {new Date(order.createdAt).toLocaleDateString('id-ID')}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-mono font-semibold text-sm text-charcoal hidden sm:block">
                        Rp {formatRupiah(order.totalPrice)}
                      </span>
                      <StatusBadge status={order.status} />
                    </div>
                  </div>
                ))}
                {orders.length === 0 && (
                  <div className="p-8 text-center text-gray-400 text-sm">Belum ada order.</div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Monitor */}
            {(currentRole === 'admin' || currentRole === 'farmer') && (
              <div className="card">
                <div className="p-5 border-b border-sage">
                  <h3 className="font-bold text-charcoal flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-forest" />
                    Harga Komoditas Hari Ini
                  </h3>
                </div>
                <div className="p-4 space-y-3">
                  {dummyPriceReferences.map((pr) => (
                    <div key={pr.id} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm text-charcoal">{pr.commodity}</div>
                        <div className="text-xs text-gray-400">{pr.region}</div>
                      </div>
                      <span className="font-mono font-semibold text-forest text-sm">
                        Rp {formatRupiah(pr.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Admin Verifications */}
            {currentRole === 'admin' && (
              <div className="card">
                <div className="p-5 border-b border-sage">
                  <h3 className="font-bold text-charcoal flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber" />
                    Verifikasi Menunggu
                  </h3>
                </div>
                <div className="divide-y divide-sage">
                  {dummyUsers.filter((u) => !u.isVerified && u.role === 'farmer').map((user) => (
                    <div key={user.id} className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-sage rounded-full flex items-center justify-center text-xs font-bold text-forest">
                          {user.name[0]}
                        </div>
                        <div>
                          <div className="font-medium text-sm text-charcoal">{user.name}</div>
                          <div className="text-xs text-gray-400">{user.location}</div>
                        </div>
                      </div>
                      <div className="flex gap-1.5">
                        <button className="w-8 h-8 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center transition">
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg flex items-center justify-center transition">
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Logistics Pickup */}
            {currentRole === 'logistics' && (
              <div className="card p-5">
                <h3 className="font-bold text-charcoal mb-4">Order Siap Ambil</h3>
                <div className="space-y-3">
                  {orders.filter(o => o.status === 'packed').map((order) => (
                    <div key={order.id} className="p-3 bg-amber/5 rounded-lg border border-amber/20">
                      <div className="font-mono font-semibold text-sm text-charcoal mb-1">{order.id}</div>
                      <div className="text-xs text-gray-400 mb-2">{order.items.map(i => i.farmerName).join(', ')}</div>
                      <Link href="/tracking" className="btn-secondary w-full text-xs !py-1.5 inline-flex items-center justify-center">
                        Ambil Order
                      </Link>
                    </div>
                  ))}
                  {orders.filter(o => o.status === 'packed').length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-4">Tidak ada order siap ambil saat ini.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
