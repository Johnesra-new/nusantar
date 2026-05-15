'use client';

import { use } from 'react';
import { CheckCircle2, MapPin, Calendar, Star, ShoppingBag, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import ProductCard from '@/components/features/ProductCard';
import { useProductStore, useReviewStore } from '@/store';
import { dummyUsers } from '@/lib/data';

export default function FarmerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { products } = useProductStore();
  const { reviews } = useReviewStore();

  const farmer = dummyUsers.find((u) => u.id === id);
  const farmerProducts = products.filter((p) => p.farmerId === id && p.status === 'active');
  const farmerReviews = reviews.filter((r) =>
    farmerProducts.some((p) => p.id === r.productId)
  );
  const avgRating = farmerReviews.length > 0
    ? (farmerReviews.reduce((s, r) => s + r.rating, 0) / farmerReviews.length).toFixed(1)
    : '–';

  if (!farmer) {
    return (
      <div className="min-h-screen flex flex-col bg-cream">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-400">Petani tidak ditemukan.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <CartDrawer />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Link href="/marketplace" className="text-sm text-gray-400 hover:text-forest transition flex items-center gap-1 mb-6">
          <ChevronLeft className="w-4 h-4" /> Kembali ke Pasar Tani
        </Link>

        {/* Profile Header */}
        <div className="card p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-24 h-24 bg-forest rounded-2xl flex items-center justify-center text-cream text-3xl font-bold flex-shrink-0">
              {farmer.name[0]}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <h1 className="text-h2 text-charcoal">{farmer.name}</h1>
                {farmer.isVerified && (
                  <span className="badge-verified text-xs">
                    <CheckCircle2 className="w-3 h-3" /> Terverifikasi
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-gray-500 mt-2">
                {farmer.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-forest" /> {farmer.location}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-forest" /> Bergabung sejak {new Date(farmer.createdAt).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                </span>
              </div>

              {/* Stats Row */}
              <div className="flex gap-6 mt-4 justify-center sm:justify-start">
                <div className="text-center">
                  <div className="font-mono font-bold text-xl text-charcoal">{farmerProducts.length}</div>
                  <div className="text-xs text-gray-400">Produk</div>
                </div>
                <div className="text-center">
                  <div className="font-mono font-bold text-xl text-amber flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 fill-amber" /> {avgRating}
                  </div>
                  <div className="text-xs text-gray-400">{farmerReviews.length} ulasan</div>
                </div>
                <div className="text-center">
                  <div className="font-mono font-bold text-xl text-charcoal">
                    <ShoppingBag className="w-5 h-5 inline" />
                  </div>
                  <div className="text-xs text-gray-400">Aktif</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <h2 className="text-h3 text-charcoal mb-4">Produk dari {farmer.name}</h2>
        {farmerProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {farmerProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="card p-12 text-center text-gray-400">
            <p>Belum ada produk dari petani ini.</p>
          </div>
        )}

        {/* Reviews */}
        {farmerReviews.length > 0 && (
          <div className="mt-12">
            <h2 className="text-h3 text-charcoal mb-4">Ulasan Pembeli</h2>
            <div className="space-y-3">
              {farmerReviews.map((review) => (
                <div key={review.id} className="card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-forest rounded-full flex items-center justify-center text-cream text-xs font-bold">
                        {review.buyerName[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{review.buyerName}</div>
                        <div className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString('id-ID')}</div>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber text-amber" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
