'use client';

import { useState } from 'react';
import { Star, MapPin, CheckCircle2, ShoppingCart, Minus, Plus, Truck, Shield, MessageSquare, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import { dummyProducts, dummyReviews, dummyPriceReferences } from '@/lib/data';
import { formatRupiah } from '@/lib/utils';
import { useCartStore } from '@/store';
import { use } from 'react';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = dummyProducts.find((p) => p.id === id) || dummyProducts[0];
  const reviews = dummyReviews.filter((r) => r.productId === product.id);
  const priceRef = dummyPriceReferences.find((p) => product.category.toLowerCase().includes(p.commodity.toLowerCase()));
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  const savings = product.marketPrice
    ? Math.round(((product.marketPrice - product.price) / product.marketPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product);
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <CartDrawer />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link href="/marketplace" className="hover:text-forest transition flex items-center gap-1">
            <ChevronLeft className="w-4 h-4" /> Pasar Tani
          </Link>
          <span>/</span>
          <span className="text-charcoal">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden bg-sage aspect-square">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.farmerVerified && (
              <div className="absolute top-4 left-4 badge-verified shadow-md">
                <CheckCircle2 className="w-4 h-4" /> Petani Terverifikasi
              </div>
            )}
            {savings > 0 && (
              <div className="absolute top-4 right-4 bg-amber text-white font-bold px-3 py-1.5 rounded-lg shadow-md text-sm">
                Hemat {savings}%
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <span className="bg-sage px-2 py-0.5 rounded text-xs font-medium text-forest">{product.category}</span>
              <span className="flex items-center gap-0.5 text-amber">
                <Star className="w-3.5 h-3.5 fill-amber" /> {product.rating}
              </span>
              <span>({product.reviewCount} ulasan)</span>
            </div>

            <h1 className="text-3xl font-bold text-charcoal mb-2">{product.name}</h1>

            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <MapPin className="w-4 h-4" />
              <span>{product.farmerName} · {product.farmerLocation}</span>
            </div>

            <p className="text-gray-500 leading-relaxed mb-6">{product.description}</p>

            {/* Price Section */}
            <div className="bg-sage rounded-xl p-5 mb-6">
              <div className="flex items-end gap-3 mb-2">
                <span className="font-mono font-bold text-3xl text-forest">
                  Rp {formatRupiah(product.price)}
                </span>
                <span className="text-gray-400 mb-1">/ {product.unit}</span>
              </div>
              {product.marketPrice && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-400 line-through font-mono">
                    Rp {formatRupiah(product.marketPrice)}
                  </span>
                  <span className="text-xs bg-amber/10 text-amber px-2 py-0.5 rounded font-semibold">
                    Harga Pasar (Kementan)
                  </span>
                </div>
              )}
              <div className="text-xs text-gray-400 mt-2">
                Stok tersedia: <span className="font-mono font-semibold text-charcoal">{product.stock} {product.unit}</span>
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-sage rounded-lg overflow-hidden">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-sage transition">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-mono font-semibold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-sage transition">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button onClick={handleAddToCart} className="btn-primary flex-1 flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Tambah ke Keranjang
              </button>
            </div>

            {/* Trust */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-sage text-sm">
                <Truck className="w-4 h-4 text-forest" />
                <span className="text-gray-500">Estimasi kirim 1-3 hari</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-sage text-sm">
                <Shield className="w-4 h-4 text-forest" />
                <span className="text-gray-500">Garansi produk segar</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mt-16">
          <h2 className="text-h2 text-charcoal mb-6 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-forest" />
            Ulasan Pembeli
          </h2>
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="card p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-forest rounded-full flex items-center justify-center text-cream text-xs font-bold">
                        {review.buyerName[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-charcoal">{review.buyerName}</div>
                        <div className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString('id-ID')}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber text-amber" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="card p-8 text-center text-gray-400">
              <p>Belum ada ulasan untuk produk ini.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
