// ========================================
// NusaTani Type Definitions
// ========================================

export type UserRole = 'farmer' | 'buyer' | 'logistics' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  isVerified: boolean;
  avatar?: string;
  location?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerLocation: string;
  farmerVerified: boolean;
  name: string;
  category: string;
  description: string;
  price: number;
  marketPrice?: number;
  stock: number;
  unit: string;
  images: string[];
  rating: number;
  reviewCount: number;
  harvestDate?: string;
  status: 'active' | 'sold_out' | 'draft';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  buyerId: string;
  items: OrderItem[];
  status: OrderStatus;
  totalPrice: number;
  shippingCost: number;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  logisticsId?: string;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  farmerId: string;
  farmerName: string;
  quantity: number;
  unitPrice: number;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'packed'
  | 'picked_up'
  | 'in_transit'
  | 'delivered'
  | 'cancelled';

export interface Shipment {
  id: string;
  orderId: string;
  driverId: string;
  driverName: string;
  status: OrderStatus;
  pickupTime?: string;
  deliveredAt?: string;
  route?: { lat: number; lng: number; label: string }[];
}

export interface PriceReference {
  id: string;
  commodity: string;
  price: number;
  region: string;
  source: string;
  date: string;
}

export interface Review {
  id: string;
  orderId: string;
  buyerId: string;
  buyerName: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface DashboardStats {
  totalTransactions: number;
  totalVolume: number;
  activeUsers: number;
  gmv: number;
  verifiedFarmers: number;
  pendingVerifications: number;
}
