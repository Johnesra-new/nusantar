'use client';

import { Heart, ChevronLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import ProductCard from '@/components/features/ProductCard';
import { useWishlistStore, useProductStore } from '@/store';

export default function WishlistPage() {
  const { wishlistIds } = useWishlistStore();
  const { products } = useProductStore();

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <CartDrawer />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Link href="/marketplace" className="text-sm text-gray-400 hover:text-forest transition flex items-center gap-1 mb-6">
          <ChevronLeft className="w-4 h-4" /> Kembali ke Pasar Tani
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-7 h-7 text-terracotta fill-terracotta" />
          <div>
            <h1 className="text-h1 text-charcoal">Wishlist Saya</h1>
            <p className="text-gray-500 text-sm">{wishlistProducts.length} produk disimpan</p>
          </div>
        </div>

        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="card p-16 text-center">
            <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-charcoal mb-2">Wishlist Kosong</h3>
            <p className="text-sm text-gray-400 mb-6">Tekan ikon ❤️ di produk untuk menyimpan ke wishlist.</p>
            <Link href="/marketplace" className="btn-primary inline-flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" /> Jelajahi Produk
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
