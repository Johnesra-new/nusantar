import { Product, Order, PriceReference, DashboardStats, Review, User } from '@/types';

// ========================================
// Dummy Data — Produk
// ========================================
export const dummyProducts: Product[] = [
  {
    id: 'p1',
    farmerId: 'f1',
    farmerName: 'Pak Suroyo',
    farmerLocation: 'Klaten, Jawa Tengah',
    farmerVerified: true,
    name: 'Beras Mentik Wangi',
    category: 'Beras & Serealia',
    description: 'Beras premium dari sawah organik Klaten. Wangi alami tanpa pewangi buatan, pulen dan lembut saat dimasak.',
    price: 13500,
    marketPrice: 15000,
    stock: 500,
    unit: 'kg',
    images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80'],
    rating: 4.8,
    reviewCount: 124,
    harvestDate: '2026-05-10',
    status: 'active',
  },
  {
    id: 'p2',
    farmerId: 'f2',
    farmerName: 'Kelompok Tani Makmur',
    farmerLocation: 'Garut, Jawa Barat',
    farmerVerified: true,
    name: 'Cabai Merah Keriting',
    category: 'Sayuran',
    description: 'Cabai merah keriting segar panen pagi. Pedas merata, cocok untuk sambal dan masakan sehari-hari.',
    price: 45000,
    marketPrice: 60000,
    stock: 200,
    unit: 'kg',
    images: ['https://images.unsplash.com/photo-1588252303782-cb80119c2f85?auto=format&fit=crop&w=800&q=80'],
    rating: 4.9,
    reviewCount: 89,
    harvestDate: '2026-05-14',
    status: 'active',
  },
  {
    id: 'p3',
    farmerId: 'f3',
    farmerName: 'Bu Ningsih',
    farmerLocation: 'Bandung, Jawa Barat',
    farmerVerified: false,
    name: 'Tomat Sayur Segar',
    category: 'Sayuran',
    description: 'Tomat sayur berkualitas dari dataran tinggi Bandung. Segar, tidak berair, tahan lama.',
    price: 8000,
    marketPrice: 12000,
    stock: 300,
    unit: 'kg',
    images: ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80'],
    rating: 4.6,
    reviewCount: 56,
    harvestDate: '2026-05-13',
    status: 'active',
  },
  {
    id: 'p4',
    farmerId: 'f4',
    farmerName: 'Koperasi Tani Jaya',
    farmerLocation: 'Brebes, Jawa Tengah',
    farmerVerified: true,
    name: 'Bawang Merah Brebes',
    category: 'Bumbu & Rempah',
    description: 'Bawang merah khas Brebes. Aroma kuat, ukuran seragam, cocok untuk bumbu dasar masakan Nusantara.',
    price: 25000,
    marketPrice: 32000,
    stock: 400,
    unit: 'kg',
    images: ['https://images.unsplash.com/photo-1615486171448-4fdcb38271ee?auto=format&fit=crop&w=800&q=80'],
    rating: 5.0,
    reviewCount: 210,
    harvestDate: '2026-05-12',
    status: 'active',
  },
  {
    id: 'p5',
    farmerId: 'f5',
    farmerName: 'Pak Darmo',
    farmerLocation: 'Malang, Jawa Timur',
    farmerVerified: true,
    name: 'Jagung Manis Pipilan',
    category: 'Beras & Serealia',
    description: 'Jagung manis varietas unggulan dari Malang. Manis alami, bisa langsung rebus atau untuk masakan.',
    price: 9500,
    marketPrice: 14000,
    stock: 150,
    unit: 'kg',
    images: ['https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80'],
    rating: 4.7,
    reviewCount: 67,
    harvestDate: '2026-05-14',
    status: 'active',
  },
  {
    id: 'p6',
    farmerId: 'f6',
    farmerName: 'Ibu Sri Lestari',
    farmerLocation: 'Wonosobo, Jawa Tengah',
    farmerVerified: true,
    name: 'Kentang Dieng Premium',
    category: 'Sayuran',
    description: 'Kentang dari dataran tinggi Dieng, tekstur lembut dan rasa gurih alami. Cocok untuk sup dan perkedel.',
    price: 15000,
    marketPrice: 20000,
    stock: 350,
    unit: 'kg',
    images: ['https://images.unsplash.com/photo-1518977676601-b53f82ber630?auto=format&fit=crop&w=800&q=80'],
    rating: 4.8,
    reviewCount: 95,
    harvestDate: '2026-05-11',
    status: 'active',
  },
  {
    id: 'p7',
    farmerId: 'f1',
    farmerName: 'Pak Suroyo',
    farmerLocation: 'Klaten, Jawa Tengah',
    farmerVerified: true,
    name: 'Beras Merah Organik',
    category: 'Beras & Serealia',
    description: 'Beras merah organik dari Klaten. Kaya serat dan nutrisi, cocok untuk diet sehat.',
    price: 18000,
    marketPrice: 24000,
    stock: 200,
    unit: 'kg',
    images: ['https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=800&q=80'],
    rating: 4.9,
    reviewCount: 78,
    harvestDate: '2026-05-09',
    status: 'active',
  },
  {
    id: 'p8',
    farmerId: 'f7',
    farmerName: 'Pak Bambang',
    farmerLocation: 'Kediri, Jawa Timur',
    farmerVerified: false,
    name: 'Kacang Tanah Segar',
    category: 'Kacang-kacangan',
    description: 'Kacang tanah segar langsung dari ladang. Ukuran besar, belum dikupas, cocok untuk bumbu atau camilan.',
    price: 22000,
    marketPrice: 28000,
    stock: 120,
    unit: 'kg',
    images: ['https://images.unsplash.com/photo-1567892320421-1c657571ea4a?auto=format&fit=crop&w=800&q=80'],
    rating: 4.5,
    reviewCount: 33,
    harvestDate: '2026-05-13',
    status: 'active',
  },
];

// ========================================
// Dummy Data — Harga Referensi
// ========================================
export const dummyPriceReferences: PriceReference[] = [
  { id: 'pr1', commodity: 'Beras', price: 14500, region: 'Nasional', source: 'Kementan', date: '2026-05-15' },
  { id: 'pr2', commodity: 'Cabai Merah', price: 58000, region: 'Jawa Barat', source: 'Kementan', date: '2026-05-15' },
  { id: 'pr3', commodity: 'Bawang Merah', price: 30000, region: 'Jawa Tengah', source: 'Kementan', date: '2026-05-15' },
  { id: 'pr4', commodity: 'Tomat', price: 11000, region: 'Nasional', source: 'Kementan', date: '2026-05-15' },
  { id: 'pr5', commodity: 'Jagung', price: 13000, region: 'Jawa Timur', source: 'Kementan', date: '2026-05-15' },
  { id: 'pr6', commodity: 'Kentang', price: 19000, region: 'Jawa Tengah', source: 'Kementan', date: '2026-05-15' },
];

// ========================================
// Dummy Data — Orders
// ========================================
export const dummyOrders: Order[] = [
  {
    id: 'ORD-2026-001',
    buyerId: 'b1',
    items: [
      { id: 'oi1', productId: 'p1', productName: 'Beras Mentik Wangi', farmerId: 'f1', farmerName: 'Pak Suroyo', quantity: 10, unitPrice: 13500 },
      { id: 'oi2', productId: 'p2', productName: 'Cabai Merah Keriting', farmerId: 'f2', farmerName: 'Kelompok Tani Makmur', quantity: 2, unitPrice: 45000 },
    ],
    status: 'in_transit',
    totalPrice: 225000,
    shippingCost: 15000,
    paymentStatus: 'paid',
    logisticsId: 'l1',
    createdAt: '2026-05-14T10:30:00Z',
  },
  {
    id: 'ORD-2026-002',
    buyerId: 'b1',
    items: [
      { id: 'oi3', productId: 'p4', productName: 'Bawang Merah Brebes', farmerId: 'f4', farmerName: 'Koperasi Tani Jaya', quantity: 5, unitPrice: 25000 },
    ],
    status: 'delivered',
    totalPrice: 125000,
    shippingCost: 12000,
    paymentStatus: 'paid',
    logisticsId: 'l1',
    createdAt: '2026-05-12T08:00:00Z',
  },
  {
    id: 'ORD-2026-003',
    buyerId: 'b2',
    items: [
      { id: 'oi4', productId: 'p3', productName: 'Tomat Sayur Segar', farmerId: 'f3', farmerName: 'Bu Ningsih', quantity: 20, unitPrice: 8000 },
    ],
    status: 'packed',
    totalPrice: 160000,
    shippingCost: 10000,
    paymentStatus: 'paid',
    createdAt: '2026-05-15T06:00:00Z',
  },
];

// ========================================
// Dummy Data — Reviews
// ========================================
export const dummyReviews: Review[] = [
  { id: 'r1', orderId: 'ORD-2026-002', buyerId: 'b1', buyerName: 'Dewi Rahayu', productId: 'p4', rating: 5, comment: 'Bawang merahnya segar banget, ukurannya besar-besar. Pasti pesan lagi!', createdAt: '2026-05-13T14:00:00Z' },
  { id: 'r2', orderId: 'ORD-2026-001', buyerId: 'b1', buyerName: 'Dewi Rahayu', productId: 'p1', rating: 5, comment: 'Beras mentik wangi-nya memang wangi banget. Pulen, keluarga suka.', createdAt: '2026-05-14T18:00:00Z' },
  { id: 'r3', orderId: 'ORD-2026-001', buyerId: 'b2', buyerName: 'Andi Prasetyo', productId: 'p2', rating: 4, comment: 'Cabainya segar tapi agak kecil-kecil ukurannya. Overall puas.', createdAt: '2026-05-15T08:00:00Z' },
];

// ========================================
// Dummy Data — Dashboard Stats
// ========================================
export const dummyDashboardStats: DashboardStats = {
  totalTransactions: 12450,
  totalVolume: 84500,
  activeUsers: 3240,
  gmv: 1850000000,
  verifiedFarmers: 892,
  pendingVerifications: 34,
};

// ========================================
// Dummy Data — Users
// ========================================
export const dummyUsers: User[] = [
  { id: 'f1', name: 'Pak Suroyo', email: 'suroyo@nusatani.id', phone: '081234567890', role: 'farmer', isVerified: true, location: 'Klaten, Jawa Tengah', createdAt: '2025-11-01' },
  { id: 'f2', name: 'Kelompok Tani Makmur', email: 'tanimakmur@nusatani.id', phone: '081234567891', role: 'farmer', isVerified: true, location: 'Garut, Jawa Barat', createdAt: '2025-12-15' },
  { id: 'f3', name: 'Bu Ningsih', email: 'ningsih@nusatani.id', phone: '081234567892', role: 'farmer', isVerified: false, location: 'Bandung, Jawa Barat', createdAt: '2026-01-20' },
  { id: 'b1', name: 'Dewi Rahayu', email: 'dewi@mail.com', phone: '082345678901', role: 'buyer', isVerified: true, createdAt: '2025-11-10' },
  { id: 'l1', name: 'Hendra Kurir', email: 'hendra@logistik.id', phone: '083456789012', role: 'logistics', isVerified: true, createdAt: '2025-12-01' },
  { id: 'a1', name: 'Admin Dinas', email: 'admin@kementan.go.id', phone: '084567890123', role: 'admin', isVerified: true, createdAt: '2025-10-01' },
];

// ========================================
// Category list
// ========================================
export const categories = [
  { name: 'Semua', icon: '🌾', count: 8 },
  { name: 'Beras & Serealia', icon: '🍚', count: 3 },
  { name: 'Sayuran', icon: '🥬', count: 3 },
  { name: 'Bumbu & Rempah', icon: '🧄', count: 1 },
  { name: 'Kacang-kacangan', icon: '🥜', count: 1 },
  { name: 'Buah-buahan', icon: '🍉', count: 0 },
];
