'use client';

import { useState } from 'react';
import {
  ShieldCheck, Upload, MapPin, Wheat, Camera, CheckCircle2, Clock, XCircle, ChevronLeft,
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import { cn } from '@/lib/utils';

type VerificationStatus = 'not_submitted' | 'pending' | 'verified' | 'rejected';

export default function FarmerVerificationPage() {
  const [status, setStatus] = useState<VerificationStatus>('not_submitted');
  const [ktpPreview, setKtpPreview] = useState<string>('');
  const [lahanPreviews, setLahanPreviews] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    alamat: '',
    luasLahan: '',
    komoditas: [] as string[],
  });

  const komoditasOptions = ['Padi', 'Cabai', 'Bawang Merah', 'Tomat', 'Jagung', 'Kentang', 'Kacang Tanah', 'Sayuran Lain'];

  const handleKtpUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setKtpPreview(URL.createObjectURL(file));
  };

  const handleLahanUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPreviews = Array.from(files).map((f) => URL.createObjectURL(f));
      setLahanPreviews((prev) => [...prev, ...newPreviews].slice(0, 4));
    }
  };

  const toggleKomoditas = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      komoditas: prev.komoditas.includes(item)
        ? prev.komoditas.filter((k) => k !== item)
        : [...prev.komoditas, item],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ktpPreview || lahanPreviews.length === 0 || !formData.alamat) return;
    setStatus('pending');
  };

  const statusConfig = {
    not_submitted: { label: 'Belum Diajukan', color: 'text-gray-500 bg-gray-100', icon: <ShieldCheck className="w-5 h-5" /> },
    pending: { label: 'Menunggu Review', color: 'text-amber bg-amber/10', icon: <Clock className="w-5 h-5" /> },
    verified: { label: 'Terverifikasi', color: 'text-emerald-700 bg-emerald-100', icon: <CheckCircle2 className="w-5 h-5" /> },
    rejected: { label: 'Ditolak', color: 'text-terracotta bg-terracotta/10', icon: <XCircle className="w-5 h-5" /> },
  };

  const s = statusConfig[status];

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <CartDrawer />

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Link href="/dashboard" className="text-sm text-gray-400 hover:text-forest transition flex items-center gap-1 mb-6">
          <ChevronLeft className="w-4 h-4" /> Kembali ke Dashboard
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <ShieldCheck className="w-7 h-7 text-forest" />
          <div>
            <h1 className="text-h1 text-charcoal">Verifikasi Petani</h1>
            <p className="text-gray-500 text-sm">Verifikasi identitas untuk mendapat badge terpercaya.</p>
          </div>
        </div>

        {/* Status Banner */}
        <div className={cn('card p-4 flex items-center gap-3 mb-8', s.color)}>
          {s.icon}
          <div>
            <div className="font-semibold text-sm">Status: {s.label}</div>
            {status === 'pending' && <p className="text-xs opacity-70">Tim kami sedang meninjau pengajuan Anda (1×24 jam)</p>}
            {status === 'verified' && <p className="text-xs opacity-70">Selamat! Profil Anda sudah terverifikasi.</p>}
            {status === 'rejected' && <p className="text-xs opacity-70">Silakan ajukan ulang dengan dokumen yang valid.</p>}
          </div>
        </div>

        {(status === 'not_submitted' || status === 'rejected') && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* KTP Upload */}
            <div className="card p-5">
              <h3 className="font-semibold text-charcoal mb-3 flex items-center gap-2">
                <Camera className="w-4 h-4 text-forest" /> Foto KTP
              </h3>
              <div className="flex items-center gap-4">
                {ktpPreview && (
                  <div className="w-32 h-20 rounded-lg overflow-hidden bg-sage border border-sage">
                    <img src={ktpPreview} alt="KTP" className="w-full h-full object-cover" />
                  </div>
                )}
                <label className="flex-1 border-2 border-dashed border-sage hover:border-forest rounded-lg p-6 text-center cursor-pointer transition">
                  <input type="file" accept="image/*" className="hidden" onChange={handleKtpUpload} />
                  <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Upload foto KTP</p>
                </label>
              </div>
            </div>

            {/* Lahan Photos */}
            <div className="card p-5">
              <h3 className="font-semibold text-charcoal mb-3 flex items-center gap-2">
                <Camera className="w-4 h-4 text-forest" /> Foto Lahan (maks 4)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                {lahanPreviews.map((src, i) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden bg-sage border border-sage">
                    <img src={src} alt={`Lahan ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
                {lahanPreviews.length < 4 && (
                  <label className="aspect-square border-2 border-dashed border-sage hover:border-forest rounded-lg flex flex-col items-center justify-center cursor-pointer transition">
                    <input type="file" accept="image/*" multiple className="hidden" onChange={handleLahanUpload} />
                    <Upload className="w-5 h-5 text-gray-400 mb-1" />
                    <span className="text-xs text-gray-400">Tambah</span>
                  </label>
                )}
              </div>
            </div>

            {/* Address & Area */}
            <div className="card p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">
                  <MapPin className="w-4 h-4 inline mr-1" /> Alamat Lahan *
                </label>
                <textarea rows={2} required value={formData.alamat}
                  onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                  placeholder="Jl. Sawah No. 1, Desa Sukamaju..." className="input resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Luas Lahan (hektar)</label>
                <input type="number" step="0.1" value={formData.luasLahan}
                  onChange={(e) => setFormData({ ...formData, luasLahan: e.target.value })}
                  placeholder="1.5" className="input font-mono max-w-[200px]" />
              </div>
            </div>

            {/* Komoditas */}
            <div className="card p-5">
              <h3 className="font-semibold text-charcoal mb-3 flex items-center gap-2">
                <Wheat className="w-4 h-4 text-forest" /> Komoditas Utama
              </h3>
              <div className="flex flex-wrap gap-2">
                {komoditasOptions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleKomoditas(item)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-sm border transition',
                      formData.komoditas.includes(item)
                        ? 'bg-forest text-cream border-forest'
                        : 'bg-white text-charcoal border-sage hover:border-forest'
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
              <ShieldCheck className="w-5 h-5" /> Ajukan Verifikasi
            </button>
          </form>
        )}

        {status === 'pending' && (
          <div className="card p-12 text-center">
            <Clock className="w-16 h-16 text-amber mx-auto mb-4 animate-pulse-soft" />
            <h3 className="text-lg font-semibold text-charcoal mb-2">Pengajuan Sedang Ditinjau</h3>
            <p className="text-sm text-gray-400 max-w-md mx-auto">
              Tim NusaTani sedang meninjau dokumen Anda. Proses verifikasi biasanya memakan waktu 1×24 jam kerja.
            </p>
            <button onClick={() => setStatus('verified')} className="btn-outline mt-6 text-sm">
              (Demo: Setujui Verifikasi)
            </button>
          </div>
        )}

        {status === 'verified' && (
          <div className="card p-12 text-center">
            <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-charcoal mb-2">Anda Sudah Terverifikasi! 🎉</h3>
            <p className="text-sm text-gray-400 max-w-md mx-auto">
              Badge "Petani Terverifikasi" kini tampil di profil dan semua produk Anda.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
