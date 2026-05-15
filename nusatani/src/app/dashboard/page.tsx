'use client';

import { useState } from 'react';
import {
  BarChart3,
  Users,
  ShoppingBag,
  TrendingUp,
  ShieldCheck,
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  Download,
  Filter,
  Search,
  ChevronRight,
  AlertCircle,
  Truck,
  Leaf,
  Eye,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import StatsCard from '@/components/features/StatsCard';
import StatusBadge from '@/components/ui/StatusBadge';
import { dummyDashboardStats, dummyOrders, dummyUsers, dummyPriceReferences, dummyProducts } from '@/lib/data';
import { formatRupiah } from '@/lib/utils';
import { useAuthStore } from '@/store';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const { currentRole } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <CartDrawer />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-h1 text-charcoal">Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">
              {currentRole === 'farmer' && 'Kelola produk dan pantau order masuk Anda.'}
              {currentRole === 'buyer' && 'Pantau pesanan dan riwayat belanja Anda.'}
              {currentRole === 'logistics' && 'Kelola pengiriman dan rute harian Anda.'}
              {currentRole === 'admin' && 'Monitor platform NusaTani secara keseluruhan.'}
            </p>
          </div>
          <div className="flex gap-2">
            <button className="btn-ghost border border-sage flex items-center gap-2 text-sm">
              <Download className="w-4 h-4" /> Export
            </button>
            <button className="btn-ghost border border-sage flex items-center gap-2 text-sm">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {currentRole === 'admin' && (
            <>
              <StatsCard
                label="Total Transaksi"
                value={formatRupiah(dummyDashboardStats.totalTransactions)}
                icon={<ShoppingBag className="w-5 h-5 text-forest" />}
                accentColor="bg-forest/10"
                change="+12%"
                changePositive
                index={0}
              />
              <StatsCard
                label="Petani Terverifikasi"
                value={String(dummyDashboardStats.verifiedFarmers)}
                icon={<ShieldCheck className="w-5 h-5 text-amber" />}
                accentColor="bg-amber/10"
                change="+8%"
                changePositive
                index={1}
              />
              <StatsCard
                label="Pengguna Aktif"
                value={formatRupiah(dummyDashboardStats.activeUsers)}
                icon={<Users className="w-5 h-5 text-emerald-600" />}
                accentColor="bg-emerald-50"
                change="+15%"
                changePositive
                index={2}
              />
              <StatsCard
                label="GMV Platform"
                value={`Rp ${(dummyDashboardStats.gmv / 1000000000).toFixed(1)}M`}
                icon={<TrendingUp className="w-5 h-5 text-terracotta" />}
                accentColor="bg-terracotta/10"
                change="+22%"
                changePositive
                index={3}
              />
            </>
          )}
          {currentRole === 'farmer' && (
            <>
              <StatsCard label="Produk Aktif" value="5" icon={<Package className="w-5 h-5 text-forest" />} accentColor="bg-forest/10" index={0} />
              <StatsCard label="Order Masuk" value="12" icon={<ShoppingBag className="w-5 h-5 text-amber" />} accentColor="bg-amber/10" change="+3 hari ini" changePositive index={1} />
              <StatsCard label="Pendapatan Bulan Ini" value="Rp 4.250.000" icon={<TrendingUp className="w-5 h-5 text-emerald-600" />} accentColor="bg-emerald-50" change="+25%" changePositive index={2} />
              <StatsCard label="Rating" value="4.8 / 5.0" icon={<CheckCircle2 className="w-5 h-5 text-terracotta" />} accentColor="bg-terracotta/10" index={3} />
            </>
          )}
          {currentRole === 'logistics' && (
            <>
              <StatsCard label="Order Hari Ini" value="8" icon={<Package className="w-5 h-5 text-forest" />} accentColor="bg-forest/10" index={0} />
              <StatsCard label="Selesai Dikirim" value="5" icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />} accentColor="bg-emerald-50" change="62.5%" changePositive index={1} />
              <StatsCard label="Dalam Perjalanan" value="3" icon={<Truck className="w-5 h-5 text-amber" />} accentColor="bg-amber/10" index={2} />
              <StatsCard label="Pendapatan Hari Ini" value="Rp 180.000" icon={<TrendingUp className="w-5 h-5 text-terracotta" />} accentColor="bg-terracotta/10" index={3} />
            </>
          )}
          {currentRole === 'buyer' && (
            <>
              <StatsCard label="Total Pesanan" value="15" icon={<ShoppingBag className="w-5 h-5 text-forest" />} accentColor="bg-forest/10" index={0} />
              <StatsCard label="Sedang Dikirim" value="2" icon={<Truck className="w-5 h-5 text-amber" />} accentColor="bg-amber/10" index={1} />
              <StatsCard label="Selesai" value="12" icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />} accentColor="bg-emerald-50" index={2} />
              <StatsCard label="Total Belanja" value="Rp 2.150.000" icon={<TrendingUp className="w-5 h-5 text-terracotta" />} accentColor="bg-terracotta/10" index={3} />
            </>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="p-5 border-b border-sage flex items-center justify-between">
                <h3 className="font-bold text-charcoal">
                  {currentRole === 'admin' ? 'Transaksi Terbaru' : 'Order Terbaru'}
                </h3>
                <button className="text-sm text-forest hover:text-amber transition font-medium flex items-center gap-1">
                  Lihat Semua <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="divide-y divide-sage">
                {dummyOrders.map((order) => (
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
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Monitor (Admin) */}
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

            {/* Pending Verifications (Admin) */}
            {currentRole === 'admin' && (
              <div className="card">
                <div className="p-5 border-b border-sage">
                  <h3 className="font-bold text-charcoal flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber" />
                    Verifikasi Menunggu
                    <span className="bg-amber text-white text-xs font-mono px-2 py-0.5 rounded-full">{dummyDashboardStats.pendingVerifications}</span>
                  </h3>
                </div>
                <div className="divide-y divide-sage">
                  {dummyUsers.filter((u) => !u.isVerified).map((user) => (
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

            {/* Quick Actions (Farmer) */}
            {currentRole === 'farmer' && (
              <div className="card p-5">
                <h3 className="font-bold text-charcoal mb-4">Aksi Cepat</h3>
                <div className="space-y-2">
                  <button className="btn-primary w-full flex items-center justify-center gap-2">
                    <Leaf className="w-4 h-4" /> Buat Listing Baru
                  </button>
                  <button className="btn-outline w-full flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" /> Lihat Produk Saya
                  </button>
                </div>
              </div>
            )}

            {/* Quick Actions (Logistics) */}
            {currentRole === 'logistics' && (
              <div className="card p-5">
                <h3 className="font-bold text-charcoal mb-4">Order Siap Ambil</h3>
                <div className="space-y-3">
                  {dummyOrders.filter(o => o.status === 'packed').map((order) => (
                    <div key={order.id} className="p-3 bg-amber/5 rounded-lg border border-amber/20">
                      <div className="font-mono font-semibold text-sm text-charcoal mb-1">{order.id}</div>
                      <div className="text-xs text-gray-400 mb-2">{order.items.map(i => i.farmerName).join(', ')}</div>
                      <button className="btn-secondary w-full text-xs !py-1.5">
                        Ambil Order
                      </button>
                    </div>
                  ))}
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
