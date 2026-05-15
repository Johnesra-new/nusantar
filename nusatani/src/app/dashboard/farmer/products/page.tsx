'use client';

import { useState, useEffect } from 'react';
import {
  Plus, Pencil, Trash2, Search, Package, Eye, EyeOff,
  AlertTriangle, ChevronLeft,
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import { useProductStore, useAuthStore } from '@/store';
import { formatRupiah } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { Product } from '@/types';
import { categories } from '@/lib/data';

export default function FarmerProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProductStore();
  const { userId, userName, isLoggedIn, currentRole } = useAuthStore();
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Form state
  const [formData, setFormData] = useState({
    name: '', category: 'Sayuran', description: '', price: '',
    stock: '', unit: 'kg', location: '', harvestDate: '',
  });

  const myProducts = products.filter((p) => p.farmerId === userId);
  const filteredProducts = myProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      name: '', category: 'Sayuran', description: '', price: '',
      stock: '', unit: 'kg', location: '', harvestDate: '',
    });
    setImagePreview('');
    setEditingProduct(null);
    setShowForm(false);
  };

  const openEditForm = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      description: product.description,
      price: String(product.price),
      stock: String(product.stock),
      unit: product.unit,
      location: product.farmerLocation,
      harvestDate: product.harvestDate || '',
    });
    setImagePreview(product.images[0] || '');
    setShowForm(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.stock) return;

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        price: Number(formData.price),
        stock: Number(formData.stock),
        unit: formData.unit,
        farmerLocation: formData.location,
        harvestDate: formData.harvestDate,
        images: imagePreview ? [imagePreview] : editingProduct.images,
      });
    } else {
      const newProduct: Product = {
        id: `p_${Date.now()}`,
        farmerId: userId,
        farmerName: userName,
        farmerLocation: formData.location,
        farmerVerified: true,
        name: formData.name,
        category: formData.category,
        description: formData.description,
        price: Number(formData.price),
        stock: Number(formData.stock),
        unit: formData.unit,
        images: imagePreview
          ? [imagePreview]
          : ['https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80'],
        rating: 0,
        reviewCount: 0,
        harvestDate: formData.harvestDate,
        status: 'active',
      };
      addProduct(newProduct);
    }
    resetForm();
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setDeleteConfirm(null);
  };

  const toggleStatus = (product: Product) => {
    const newStatus = product.status === 'active' ? 'draft' : 'active';
    updateProduct(product.id, { status: newStatus });
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <CartDrawer />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Link href="/dashboard" className="text-sm text-gray-400 hover:text-forest transition flex items-center gap-1 mb-4">
          <ChevronLeft className="w-4 h-4" /> Kembali ke Dashboard
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-h1 text-charcoal">Kelola Produk</h1>
            <p className="text-gray-500 text-sm mt-1">
              {myProducts.length} produk terdaftar · {myProducts.filter(p => p.status === 'active').length} aktif
            </p>
          </div>
          <button onClick={() => { resetForm(); setShowForm(true); }} className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" /> Tambah Produk
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text" placeholder="Cari produk Anda..." value={search}
            onChange={(e) => setSearch(e.target.value)} className="input !pl-12"
          />
        </div>

        {/* Product Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-sage/50 border-b border-sage">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-charcoal">Produk</th>
                  <th className="text-left px-4 py-3 font-semibold text-charcoal hidden sm:table-cell">Kategori</th>
                  <th className="text-right px-4 py-3 font-semibold text-charcoal">Harga</th>
                  <th className="text-right px-4 py-3 font-semibold text-charcoal">Stok</th>
                  <th className="text-center px-4 py-3 font-semibold text-charcoal">Status</th>
                  <th className="text-center px-4 py-3 font-semibold text-charcoal">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sage">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                      <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p className="font-medium text-charcoal">Belum ada produk</p>
                      <p className="text-sm mt-1">Mulai tambahkan produk pertama Anda!</p>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-sage/20 transition">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-sage flex-shrink-0">
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="font-semibold text-charcoal">{product.name}</div>
                            <div className="text-xs text-gray-400">{product.farmerLocation}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className="bg-sage px-2 py-0.5 rounded text-xs font-medium text-forest">{product.category}</span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-semibold text-forest">
                        Rp {formatRupiah(product.price)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className={cn(
                          'font-mono font-semibold',
                          product.stock < 10 ? 'text-terracotta' : 'text-charcoal'
                        )}>
                          {product.stock}
                        </span>
                        <span className="text-gray-400 ml-1">{product.unit}</span>
                        {product.stock < 10 && product.stock > 0 && (
                          <div className="flex items-center gap-1 text-xs text-terracotta mt-0.5 justify-end">
                            <AlertTriangle className="w-3 h-3" /> Hampir habis
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button onClick={() => toggleStatus(product)} className={cn(
                          'badge cursor-pointer',
                          product.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                          product.status === 'sold_out' ? 'bg-gray-100 text-gray-500' :
                          'bg-amber/10 text-amber'
                        )}>
                          {product.status === 'active' ? 'Aktif' : product.status === 'sold_out' ? 'Habis' : 'Nonaktif'}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-1">
                          <button onClick={() => openEditForm(product)} className="p-2 hover:bg-sage rounded-lg transition text-gray-400 hover:text-forest">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button onClick={() => setDeleteConfirm(product.id)} className="p-2 hover:bg-terracotta/10 rounded-lg transition text-gray-400 hover:text-terracotta">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Delete Confirmation */}
        {deleteConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/60 backdrop-blur-sm animate-fade-in" onClick={() => setDeleteConfirm(null)}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6 animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
              <div className="w-12 h-12 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-terracotta" />
              </div>
              <h3 className="text-lg font-bold text-charcoal text-center mb-2">Hapus Produk?</h3>
              <p className="text-sm text-gray-500 text-center mb-6">Tindakan ini tidak dapat dibatalkan. Produk akan dihapus secara permanen.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="btn-ghost border border-sage flex-1">Batal</button>
                <button onClick={() => handleDelete(deleteConfirm)} className="bg-terracotta hover:bg-terracotta-light text-white font-semibold px-6 py-2.5 rounded-lg transition flex-1">Hapus</button>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/60 backdrop-blur-sm animate-fade-in overflow-y-auto py-8" onClick={resetForm}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
              <div className="bg-forest p-5 rounded-t-2xl text-cream">
                <h2 className="text-lg font-bold">{editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}</h2>
                <p className="text-cream/70 text-sm">Isi detail produk di bawah ini</p>
              </div>
              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                {/* Image */}
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Foto Produk</label>
                  <div className="flex items-center gap-4">
                    {imagePreview && (
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-sage">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <label className="flex-1 border-2 border-dashed border-sage hover:border-forest rounded-lg p-4 text-center cursor-pointer transition">
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                      <p className="text-sm text-gray-400">Klik untuk upload foto</p>
                    </label>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Nama Produk *</label>
                  <input type="text" required value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Contoh: Beras Mentik Wangi" className="input" />
                </div>

                {/* Category + Unit */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1">Kategori</label>
                    <select value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="input appearance-none">
                      {categories.filter(c => c.name !== 'Semua').map(c => (
                        <option key={c.name} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1">Satuan</label>
                    <select value={formData.unit}
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                      className="input appearance-none">
                      <option value="kg">Kilogram (kg)</option>
                      <option value="ikat">Ikat</option>
                      <option value="buah">Buah</option>
                      <option value="liter">Liter</option>
                    </select>
                  </div>
                </div>

                {/* Price + Stock */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1">Harga (Rp) *</label>
                    <input type="number" required min="1" value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="13500" className="input font-mono" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1">Stok *</label>
                    <input type="number" required min="1" value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      placeholder="100" className="input font-mono" />
                  </div>
                </div>

                {/* Location + Harvest */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1">Lokasi Panen</label>
                    <input type="text" value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Klaten, Jawa Tengah" className="input" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1">Tanggal Panen</label>
                    <input type="date" value={formData.harvestDate}
                      onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                      className="input" />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Deskripsi</label>
                  <textarea rows={3} value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Deskripsikan produk Anda..." className="input resize-none" />
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={resetForm} className="btn-ghost border border-sage flex-1">Batal</button>
                  <button type="submit" className="btn-primary flex-1">
                    {editingProduct ? 'Simpan Perubahan' : 'Tambah Produk'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
