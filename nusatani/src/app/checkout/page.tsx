'use client';

import { useState } from 'react';
import { CreditCard, Truck, MapPin, ChevronLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import { useCartStore } from '@/store';
import { formatRupiah } from '@/lib/utils';
import { cn } from '@/lib/utils';

const steps = [
  { id: 1, label: 'Review Keranjang' },
  { id: 2, label: 'Pilih Pengiriman' },
  { id: 3, label: 'Pembayaran' },
];

const shippingOptions = [
  { id: 'local', name: 'NusaTani Express', est: '1-2 hari', price: 15000, desc: 'Mitra logistik terdekat' },
  { id: 'regular', name: 'Kurir Regular', est: '3-5 hari', price: 10000, desc: 'Pengiriman hemat' },
  { id: 'instant', name: 'Same-Day Delivery', est: 'Hari ini', price: 35000, desc: 'Khusus area kota besar' },
];

const paymentMethods = [
  { id: 'qris', name: 'QRIS', icon: '📱' },
  { id: 'gopay', name: 'GoPay', icon: '💚' },
  { id: 'ovo', name: 'OVO', icon: '💜' },
  { id: 'dana', name: 'Dana', icon: '💙' },
  { id: 'bank', name: 'Transfer Bank', icon: '🏦' },
];

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [selectedShipping, setSelectedShipping] = useState('local');
  const [selectedPayment, setSelectedPayment] = useState('qris');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const shipping = shippingOptions.find((s) => s.id === selectedShipping)!;
  const grandTotal = totalPrice() + shipping.price;

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col bg-cream">
        <Navbar />
        <CartDrawer />
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center animate-fade-in-up max-w-md mx-auto px-4">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <h1 className="text-h2 text-charcoal mb-3">Pesanan Berhasil! 🎉</h1>
            <p className="text-gray-500 mb-2">Nomor Order: <span className="font-mono font-bold text-forest">ORD-2026-004</span></p>
            <p className="text-gray-400 text-sm mb-8">
              Pembayaran Anda sedang diproses. Petani akan segera menyiapkan pesanan Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/tracking" className="btn-primary flex items-center justify-center gap-2">
                <Truck className="w-4 h-4" /> Lacak Pesanan
              </Link>
              <Link href="/marketplace" className="btn-outline flex items-center justify-center gap-2">
                Belanja Lagi
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col bg-cream">
        <Navbar />
        <CartDrawer />
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-h3 text-charcoal mb-2">Keranjang Anda Kosong</h2>
            <p className="text-gray-400 mb-6">Yuk belanja dulu di Pasar Tani!</p>
            <Link href="/marketplace" className="btn-primary">Ke Pasar Tani</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <CartDrawer />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Link href="/marketplace" className="text-sm text-gray-400 hover:text-forest transition flex items-center gap-1 mb-6">
          <ChevronLeft className="w-4 h-4" /> Kembali belanja
        </Link>

        <h1 className="text-h1 text-charcoal mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="flex items-center mb-10">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <div className="flex items-center gap-2">
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                  step >= s.id ? 'bg-forest text-cream' : 'bg-sage text-gray-400'
                )}>
                  {step > s.id ? <CheckCircle2 className="w-4 h-4" /> : s.id}
                </div>
                <span className={cn(
                  'text-sm font-medium hidden sm:block',
                  step >= s.id ? 'text-charcoal' : 'text-gray-400'
                )}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={cn(
                  'flex-1 h-0.5 mx-4 rounded',
                  step > s.id ? 'bg-forest' : 'bg-sage'
                )} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel */}
          <div className="lg:col-span-2">
            {/* Step 1: Review */}
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <h2 className="text-h3 text-charcoal mb-4">Review Keranjang</h2>
                {items.map((item) => (
                  <div key={item.product.id} className="card p-4 flex gap-4">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-20 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-charcoal">{item.product.name}</h3>
                      <p className="text-xs text-gray-400">{item.product.farmerName} · {item.product.farmerLocation}</p>
                      <div className="flex justify-between items-end mt-2">
                        <span className="text-sm text-gray-400">{item.quantity} × Rp {formatRupiah(item.product.price)}</span>
                        <span className="font-mono font-bold text-forest">Rp {formatRupiah(item.product.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={() => setStep(2)} className="btn-primary w-full mt-4">
                  Lanjut ke Pengiriman
                </button>
              </div>
            )}

            {/* Step 2: Shipping */}
            {step === 2 && (
              <div className="space-y-4 animate-fade-in">
                <h2 className="text-h3 text-charcoal mb-4">Pilih Metode Pengiriman</h2>
                {shippingOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedShipping(opt.id)}
                    className={cn(
                      'card w-full p-5 flex items-center gap-4 text-left transition',
                      selectedShipping === opt.id && 'ring-2 ring-forest bg-sage/50'
                    )}
                  >
                    <div className="w-10 h-10 bg-sage rounded-lg flex items-center justify-center flex-shrink-0">
                      <Truck className="w-5 h-5 text-forest" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-charcoal">{opt.name}</div>
                      <div className="text-xs text-gray-400">{opt.desc} · Est. {opt.est}</div>
                    </div>
                    <div className="font-mono font-semibold text-forest text-sm">
                      Rp {formatRupiah(opt.price)}
                    </div>
                  </button>
                ))}
                <div className="flex gap-3 mt-4">
                  <button onClick={() => setStep(1)} className="btn-ghost border border-sage flex-1">Kembali</button>
                  <button onClick={() => setStep(3)} className="btn-primary flex-1">Lanjut ke Pembayaran</button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="space-y-4 animate-fade-in">
                <h2 className="text-h3 text-charcoal mb-4">Pilih Metode Pembayaran</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {paymentMethods.map((pm) => (
                    <button
                      key={pm.id}
                      onClick={() => setSelectedPayment(pm.id)}
                      className={cn(
                        'card p-4 text-center transition',
                        selectedPayment === pm.id && 'ring-2 ring-forest bg-sage/50'
                      )}
                    >
                      <div className="text-2xl mb-2">{pm.icon}</div>
                      <div className="text-sm font-medium text-charcoal">{pm.name}</div>
                    </button>
                  ))}
                </div>
                <div className="card p-4 bg-sage/30 mt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <ShieldCheck className="w-4 h-4 text-forest" />
                    Pembayaran diproses oleh <strong className="text-charcoal">Midtrans</strong> — aman dan terenkripsi.
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button onClick={() => setStep(2)} className="btn-ghost border border-sage flex-1">Kembali</button>
                  <button onClick={handlePlaceOrder} className="btn-secondary flex-1 flex items-center justify-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Bayar Rp {formatRupiah(grandTotal)}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel — Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h3 className="font-bold text-charcoal mb-4">Ringkasan Pesanan</h3>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-gray-500 truncate mr-2">{item.product.name} ×{item.quantity}</span>
                    <span className="font-mono text-charcoal flex-shrink-0">Rp {formatRupiah(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-sage pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="font-mono">Rp {formatRupiah(totalPrice())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Ongkir ({shipping.name})</span>
                  <span className="font-mono">Rp {formatRupiah(shipping.price)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-sage">
                  <span className="text-charcoal">Total</span>
                  <span className="font-mono text-forest">Rp {formatRupiah(grandTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
