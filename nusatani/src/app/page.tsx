'use client';

import { Search, MapPin, ArrowRight, ShieldCheck, Truck, TrendingUp, Users, Leaf, ChevronRight, Star, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import ProductCard from '@/components/features/ProductCard';
import PriceTicker from '@/components/features/PriceTicker';
import StatsCard from '@/components/features/StatsCard';
import { dummyProducts, dummyPriceReferences, categories, dummyDashboardStats } from '@/lib/data';
import { formatRupiah } from '@/lib/utils';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <PriceTicker prices={dummyPriceReferences} />
      <CartDrawer />

      {/* ==============================
          HERO SECTION
      ============================== */}
      <header className="bg-forest text-cream relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(200,102,10,0.3) 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, rgba(234,240,220,0.2) 0%, transparent 40%)`,
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber/20 text-amber text-xs font-bold rounded-full mb-6 uppercase tracking-wider">
                <Leaf className="w-3 h-3" />
                Platform Agrikultur Terpadu
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Dari Ladang,
                <br />
                <span className="text-amber">Langsung</span> ke
                <br />
                Meja Anda.
              </h1>
              <p className="text-cream/70 text-lg mb-8 max-w-lg leading-relaxed">
                Beli hasil bumi segar langsung dari petani terverifikasi. 
                Transparan harganya, terjamin kualitasnya, dan bantu sejahterakan 
                petani lokal Indonesia.
              </p>

              {/* Search Bar */}
              <div className="bg-white p-1.5 rounded-xl shadow-2xl flex flex-col sm:flex-row gap-1.5 max-w-xl">
                <div className="flex-grow flex items-center px-4 bg-cream rounded-lg">
                  <Search className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Cari beras, cabai, tomat..."
                    className="w-full py-3 outline-none text-charcoal placeholder-gray-400 font-sans bg-transparent"
                  />
                </div>
                <div className="hidden sm:flex items-center px-4 bg-cream rounded-lg min-w-[140px]">
                  <MapPin className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                  <select className="w-full py-3 outline-none text-charcoal bg-transparent font-sans appearance-none text-sm">
                    <option>Semua Lokasi</option>
                    <option>Jawa Barat</option>
                    <option>Jawa Tengah</option>
                    <option>Jawa Timur</option>
                  </select>
                </div>
                <Link href="/marketplace" className="btn-secondary whitespace-nowrap flex items-center justify-center gap-2 !rounded-lg">
                  Cari Produk
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 mt-8 text-cream/50 text-sm">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber" /> 892 Petani Terverifikasi
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-amber" /> 3.240+ Pengguna Aktif
                </span>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="hidden md:block relative">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber/20 to-transparent rounded-full blur-3xl" />
                {/* Stat Cards floating */}
                <div className="absolute top-8 left-0 bg-white/95 backdrop-blur p-3 rounded-xl shadow-lg text-charcoal animate-fade-in-up z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-mono font-bold text-sm">+25%</div>
                      <div className="text-[10px] text-gray-400">Pendapatan Petani</div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-12 right-0 bg-white/95 backdrop-blur p-3 rounded-xl shadow-lg text-charcoal animate-fade-in-up z-10" style={{ animationDelay: '200ms' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-amber/10 rounded-lg flex items-center justify-center">
                      <Truck className="w-4 h-4 text-amber" />
                    </div>
                    <div>
                      <div className="font-mono font-bold text-sm">12.450</div>
                      <div className="text-[10px] text-gray-400">Transaksi Berhasil</div>
                    </div>
                  </div>
                </div>
                {/* Center Image */}
                <div className="absolute inset-12 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
                  <img
                    src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80"
                    alt="Petani Indonesia"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ==============================
          CATEGORIES
      ============================== */}
      <section className="py-12 bg-white border-b border-sage">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-h3 text-charcoal font-bold">Kategori Komoditas</h2>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {categories.map((cat, i) => (
              <Link
                key={cat.name}
                href="/marketplace"
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-sage hover:border-forest hover:bg-sage transition group"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span className="text-xs font-medium text-charcoal text-center">{cat.name}</span>
                <span className="text-[10px] text-gray-400 font-mono">{cat.count} produk</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================
          PRODUK TERBARU
      ============================== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-h2 text-charcoal mb-1">🌾 Panen Hari Ini</h2>
              <p className="text-gray-500 text-sm">Produk segar yang baru saja ditambahkan oleh petani.</p>
            </div>
            <Link href="/marketplace" className="text-forest hover:text-amber font-semibold text-sm transition flex items-center gap-1">
              Lihat Semua <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dummyProducts.slice(0, 4).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ==============================
          KENAPA NUSATANI
      ============================== */}
      <section className="py-16 bg-sage">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-charcoal mb-3">Kenapa NusaTani?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Kami membangun jembatan langsung antara petani dan pembeli — tanpa perantara yang tidak perlu.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <ShieldCheck className="w-6 h-6" />,
                title: 'Petani Terverifikasi',
                desc: 'Setiap petani melalui proses verifikasi KTP dan foto lahan. Badge "Terverifikasi" menjamin keaslian.',
                color: 'bg-forest text-cream',
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: 'Harga Transparan',
                desc: 'Harga referensi pasar dari Kementan ditampilkan langsung. Anda tahu persis berapa yang petani terima.',
                color: 'bg-amber text-white',
              },
              {
                icon: <Truck className="w-6 h-6" />,
                title: 'Logistik Terpantau',
                desc: 'Status pengiriman real-time dari kebun sampai pintu rumah Anda. Tidak ada lagi barang "hilang".',
                color: 'bg-charcoal text-cream',
              },
            ].map((item, i) => (
              <div key={i} className="card p-8 text-center hover:-translate-y-1 transition-transform duration-300">
                <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-5`}>
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg text-charcoal mb-3">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================
          PRODUK LAINNYA
      ============================== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-h2 text-charcoal mb-1">🛒 Produk Populer</h2>
              <p className="text-gray-500 text-sm">Paling banyak dipesan minggu ini.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dummyProducts.slice(4, 8).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ==============================
          STATISTIK PLATFORM
      ============================== */}
      <section className="py-16 bg-forest text-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-h2 mb-3">Dampak NusaTani</h2>
            <p className="text-cream/60 max-w-lg mx-auto text-sm">
              Angka-angka yang membuktikan bahwa rantai distribusi yang lebih pendek membawa manfaat nyata.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard label="Total Transaksi" value={formatRupiah(dummyDashboardStats.totalTransactions)} icon={<ShoppingBag className="w-5 h-5 text-forest" />} accentColor="bg-sage" change="+12%" changePositive index={0} />
            <StatsCard label="Petani Terverifikasi" value={String(dummyDashboardStats.verifiedFarmers)} icon={<ShieldCheck className="w-5 h-5 text-amber" />} accentColor="bg-amber/10" change="+8%" changePositive index={1} />
            <StatsCard label="Pengguna Aktif" value={formatRupiah(dummyDashboardStats.activeUsers)} icon={<Users className="w-5 h-5 text-emerald-600" />} accentColor="bg-emerald-50" change="+15%" changePositive index={2} />
            <StatsCard label="GMV Platform" value={`Rp ${(dummyDashboardStats.gmv / 1000000000).toFixed(1)}M`} icon={<TrendingUp className="w-5 h-5 text-terracotta" />} accentColor="bg-terracotta/10" change="+22%" changePositive index={3} />
          </div>
        </div>
      </section>

      {/* ==============================
          CTA FINAL
      ============================== */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-h1 text-charcoal mb-4">
            Siap Bergabung dengan
            <span className="text-gradient"> NusaTani</span>?
          </h2>
          <p className="text-gray-500 text-lg mb-8 max-w-2xl mx-auto">
            Baik sebagai petani yang ingin menjangkau lebih banyak pembeli, atau konsumen yang ingin 
            mendukung petani lokal — NusaTani menyambut Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/marketplace" className="btn-primary text-lg !px-8 !py-3 flex items-center justify-center gap-2">
              <Leaf className="w-5 h-5" />
              Mulai Belanja
            </Link>
            <button className="btn-outline text-lg !px-8 !py-3">
              Daftar Sebagai Petani
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
