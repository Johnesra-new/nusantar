'use client';

import { useState } from 'react';
import { Search, MapPin, SlidersHorizontal, ChevronDown, Grid3X3, List, X } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import ProductCard from '@/components/features/ProductCard';
import PriceTicker from '@/components/features/PriceTicker';
import { dummyProducts, dummyPriceReferences, categories } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [sortBy, setSortBy] = useState('terbaru');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = dummyProducts.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.farmerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = selectedCategory === 'Semua' || p.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'termurah') return a.price - b.price;
    if (sortBy === 'termahal') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <PriceTicker prices={dummyPriceReferences} />
      <CartDrawer />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-h1 text-charcoal mb-2">Pasar Tani</h1>
          <p className="text-gray-500">Temukan hasil bumi segar langsung dari petani seluruh Indonesia.</p>
        </div>

        {/* Search + Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari komoditas atau petani..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input !pl-12"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-charcoal">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input !w-auto min-w-[150px] appearance-none"
            >
              <option value="terbaru">Terbaru</option>
              <option value="termurah">Harga Terendah</option>
              <option value="termahal">Harga Tertinggi</option>
              <option value="rating">Rating Tertinggi</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                'btn-ghost flex items-center gap-2 border border-sage',
                showFilters && 'bg-sage border-forest'
              )}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>

        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={cn(
                'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-all',
                selectedCategory === cat.name
                  ? 'bg-forest text-cream border-forest'
                  : 'bg-white text-charcoal border-sage hover:border-forest'
              )}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-400">
            Menampilkan <span className="font-semibold text-charcoal">{sorted.length}</span> produk
          </p>
        </div>

        {/* Product Grid */}
        {sorted.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sorted.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="text-6xl mb-4">🌿</div>
            <h3 className="text-lg font-semibold text-charcoal mb-2">Tidak ada produk ditemukan</h3>
            <p className="text-sm text-gray-400 mb-4">Coba ubah filter atau kata kunci pencarian Anda.</p>
            <button onClick={() => { setSearchQuery(''); setSelectedCategory('Semua'); }} className="btn-outline text-sm">
              Reset Filter
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
