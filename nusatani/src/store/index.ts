import { create } from 'zustand';
import { CartItem, Product, UserRole, Order, Review, OrderStatus } from '@/types';

// ========================================
// Helper: localStorage
// ========================================
function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key: string, data: unknown) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {}
}

// ========================================
// Cart Store
// ========================================
interface CartState {
  items: CartItem[];
  _hydrated: boolean;
  hydrate: () => void;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  _hydrated: false,
  hydrate: () => {
    const items = loadFromStorage<CartItem[]>('nusatani_cart', []);
    set({ items, _hydrated: true });
  },
  addItem: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.product.id === product.id);
      let newItems: CartItem[];
      if (existing) {
        newItems = state.items.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        newItems = [...state.items, { product, quantity: 1 }];
      }
      saveToStorage('nusatani_cart', newItems);
      return { items: newItems };
    }),
  removeItem: (productId) =>
    set((state) => {
      const newItems = state.items.filter((i) => i.product.id !== productId);
      saveToStorage('nusatani_cart', newItems);
      return { items: newItems };
    }),
  updateQuantity: (productId, qty) =>
    set((state) => {
      const newItems = state.items.map((i) =>
        i.product.id === productId ? { ...i, quantity: Math.max(1, qty) } : i
      );
      saveToStorage('nusatani_cart', newItems);
      return { items: newItems };
    }),
  clearCart: () => {
    saveToStorage('nusatani_cart', []);
    set({ items: [] });
  },
  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
  totalPrice: () =>
    get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
}));

// ========================================
// Auth Store
// ========================================
interface AuthState {
  currentRole: UserRole;
  isLoggedIn: boolean;
  userName: string;
  userId: string;
  setRole: (role: UserRole) => void;
  login: (name: string, role: UserRole) => void;
  logout: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  currentRole: 'buyer',
  isLoggedIn: false,
  userName: '',
  userId: '',
  setRole: (role) => {
    set({ currentRole: role });
    const auth = loadFromStorage('nusatani_auth', {});
    saveToStorage('nusatani_auth', { ...auth, currentRole: role });
  },
  login: (name, role) => {
    const roleIdMap: Record<UserRole, string> = {
      buyer: 'b1',
      farmer: 'f1',
      logistics: 'l1',
      admin: 'a1',
    };
    const state = { isLoggedIn: true, userName: name, currentRole: role, userId: roleIdMap[role] };
    set(state);
    saveToStorage('nusatani_auth', state);
  },
  logout: () => {
    set({ isLoggedIn: false, userName: '', currentRole: 'buyer', userId: '' });
    localStorage.removeItem('nusatani_auth');
  },
  hydrate: () => {
    const auth = loadFromStorage<any>('nusatani_auth', null);
    if (auth && auth.isLoggedIn) {
      set({
        isLoggedIn: auth.isLoggedIn,
        userName: auth.userName,
        currentRole: auth.currentRole,
        userId: auth.userId || '',
      });
    }
  },
}));

// ========================================
// Product Store (Farmer CRUD)
// ========================================
interface ProductState {
  products: Product[];
  hydrate: () => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  reduceStock: (id: string, qty: number) => void;
  getProductsByFarmer: (farmerId: string) => Product[];
  getAllActiveProducts: () => Product[];
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  hydrate: () => {
    const saved = loadFromStorage<Product[]>('nusatani_products', []);
    if (saved.length === 0) {
      // Load default dummy data on first run
      import('@/lib/data').then(({ dummyProducts }) => {
        set({ products: dummyProducts });
        saveToStorage('nusatani_products', dummyProducts);
      });
    } else {
      set({ products: saved });
    }
  },
  addProduct: (product) =>
    set((state) => {
      const newProducts = [...state.products, product];
      saveToStorage('nusatani_products', newProducts);
      return { products: newProducts };
    }),
  updateProduct: (id, updates) =>
    set((state) => {
      const newProducts = state.products.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      );
      saveToStorage('nusatani_products', newProducts);
      return { products: newProducts };
    }),
  deleteProduct: (id) =>
    set((state) => {
      const newProducts = state.products.filter((p) => p.id !== id);
      saveToStorage('nusatani_products', newProducts);
      return { products: newProducts };
    }),
  reduceStock: (id, qty) =>
    set((state) => {
      const newProducts = state.products.map((p) => {
        if (p.id === id) {
          const newStock = Math.max(0, p.stock - qty);
          return {
            ...p,
            stock: newStock,
            status: newStock === 0 ? 'sold_out' as const : p.status,
          };
        }
        return p;
      });
      saveToStorage('nusatani_products', newProducts);
      return { products: newProducts };
    }),
  getProductsByFarmer: (farmerId) =>
    get().products.filter((p) => p.farmerId === farmerId),
  getAllActiveProducts: () =>
    get().products.filter((p) => p.status === 'active'),
}));

// ========================================
// Order Store (Persistent)
// ========================================
interface OrderState {
  orders: Order[];
  hydrate: () => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrdersByBuyer: (buyerId: string) => Order[];
  getOrdersByFarmer: (farmerId: string) => Order[];
  getOrdersByStatus: (status: OrderStatus) => Order[];
  getPackedOrders: () => Order[];
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  hydrate: () => {
    const saved = loadFromStorage<Order[]>('nusatani_orders', []);
    if (saved.length === 0) {
      import('@/lib/data').then(({ dummyOrders }) => {
        set({ orders: dummyOrders });
        saveToStorage('nusatani_orders', dummyOrders);
      });
    } else {
      set({ orders: saved });
    }
  },
  addOrder: (order) =>
    set((state) => {
      const newOrders = [order, ...state.orders];
      saveToStorage('nusatani_orders', newOrders);
      return { orders: newOrders };
    }),
  updateOrderStatus: (orderId, status) =>
    set((state) => {
      const newOrders = state.orders.map((o) =>
        o.id === orderId ? { ...o, status } : o
      );
      saveToStorage('nusatani_orders', newOrders);
      return { orders: newOrders };
    }),
  getOrdersByBuyer: (buyerId) =>
    get().orders.filter((o) => o.buyerId === buyerId),
  getOrdersByFarmer: (farmerId) =>
    get().orders.filter((o) =>
      o.items.some((item) => item.farmerId === farmerId)
    ),
  getOrdersByStatus: (status) =>
    get().orders.filter((o) => o.status === status),
  getPackedOrders: () =>
    get().orders.filter((o) => o.status === 'packed'),
}));

// ========================================
// Review Store
// ========================================
interface ReviewState {
  reviews: Review[];
  hydrate: () => void;
  addReview: (review: Review) => void;
  getReviewsByProduct: (productId: string) => Review[];
  getAverageRating: (productId: string) => number;
  hasReviewed: (orderId: string, productId: string) => boolean;
}

export const useReviewStore = create<ReviewState>((set, get) => ({
  reviews: [],
  hydrate: () => {
    const saved = loadFromStorage<Review[]>('nusatani_reviews', []);
    if (saved.length === 0) {
      import('@/lib/data').then(({ dummyReviews }) => {
        set({ reviews: dummyReviews });
        saveToStorage('nusatani_reviews', dummyReviews);
      });
    } else {
      set({ reviews: saved });
    }
  },
  addReview: (review) =>
    set((state) => {
      const newReviews = [review, ...state.reviews];
      saveToStorage('nusatani_reviews', newReviews);
      return { reviews: newReviews };
    }),
  getReviewsByProduct: (productId) =>
    get().reviews.filter((r) => r.productId === productId),
  getAverageRating: (productId) => {
    const reviews = get().reviews.filter((r) => r.productId === productId);
    if (reviews.length === 0) return 0;
    return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  },
  hasReviewed: (orderId, productId) =>
    get().reviews.some((r) => r.orderId === orderId && r.productId === productId),
}));

// ========================================
// Notification Store
// ========================================
export interface Notification {
  id: string;
  message: string;
  type: 'order' | 'delivery' | 'review' | 'system' | 'verification';
  read: boolean;
  createdAt: string;
  targetRole: UserRole;
}

interface NotificationState {
  notifications: Notification[];
  hydrate: () => void;
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  getUnreadCount: (role: UserRole) => number;
  getByRole: (role: UserRole) => Notification[];
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  hydrate: () => {
    const saved = loadFromStorage<Notification[]>('nusatani_notifications', []);
    if (saved.length === 0) {
      const defaults: Notification[] = [
        { id: 'n1', message: 'Order baru masuk dari Dewi Rahayu — 10kg Beras Mentik Wangi', type: 'order', read: false, createdAt: '2026-05-15T10:30:00Z', targetRole: 'farmer' },
        { id: 'n2', message: 'Pesanan ORD-2026-001 sedang dikemas oleh Pak Suroyo', type: 'delivery', read: false, createdAt: '2026-05-15T11:00:00Z', targetRole: 'buyer' },
        { id: 'n3', message: 'Ada 3 order baru siap diambil hari ini di area Klaten', type: 'order', read: false, createdAt: '2026-05-15T06:00:00Z', targetRole: 'logistics' },
        { id: 'n4', message: 'Pengajuan verifikasi baru dari Bu Ningsih — menunggu review', type: 'verification', read: false, createdAt: '2026-05-15T09:00:00Z', targetRole: 'admin' },
        { id: 'n5', message: 'Dewi Rahayu memberikan rating ⭐⭐⭐⭐⭐ untuk Bawang Merah Brebes', type: 'review', read: false, createdAt: '2026-05-14T18:00:00Z', targetRole: 'farmer' },
        { id: 'n6', message: 'Pesanan ORD-2026-002 telah terkirim. Konfirmasi penerimaan Anda.', type: 'delivery', read: true, createdAt: '2026-05-14T15:00:00Z', targetRole: 'buyer' },
        { id: 'n7', message: 'Harga Cabai Merah naik 12% dalam 3 hari terakhir', type: 'system', read: false, createdAt: '2026-05-15T08:00:00Z', targetRole: 'admin' },
        { id: 'n8', message: 'Stok Beras Mentik Wangi hampir habis — tersisa 15kg', type: 'system', read: false, createdAt: '2026-05-15T07:00:00Z', targetRole: 'farmer' },
      ];
      set({ notifications: defaults });
      saveToStorage('nusatani_notifications', defaults);
    } else {
      set({ notifications: saved });
    }
  },
  addNotification: (notification) =>
    set((state) => {
      const newNotifs = [notification, ...state.notifications];
      saveToStorage('nusatani_notifications', newNotifs);
      return { notifications: newNotifs };
    }),
  markAsRead: (id) =>
    set((state) => {
      const newNotifs = state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      );
      saveToStorage('nusatani_notifications', newNotifs);
      return { notifications: newNotifs };
    }),
  markAllAsRead: () =>
    set((state) => {
      const newNotifs = state.notifications.map((n) => ({ ...n, read: true }));
      saveToStorage('nusatani_notifications', newNotifs);
      return { notifications: newNotifs };
    }),
  getUnreadCount: (role) =>
    get().notifications.filter((n) => n.targetRole === role && !n.read).length,
  getByRole: (role) =>
    get().notifications.filter((n) => n.targetRole === role),
}));

// ========================================
// Wishlist Store
// ========================================
interface WishlistState {
  wishlistIds: string[];
  hydrate: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  wishlistIds: [],
  hydrate: () => {
    const saved = loadFromStorage<string[]>('nusatani_wishlist', []);
    set({ wishlistIds: saved });
  },
  toggleWishlist: (productId) =>
    set((state) => {
      const exists = state.wishlistIds.includes(productId);
      const newIds = exists
        ? state.wishlistIds.filter((id) => id !== productId)
        : [...state.wishlistIds, productId];
      saveToStorage('nusatani_wishlist', newIds);
      return { wishlistIds: newIds };
    }),
  isWishlisted: (productId) => get().wishlistIds.includes(productId),
}));

// ========================================
// UI Store
// ========================================
interface UIState {
  mobileMenuOpen: boolean;
  cartDrawerOpen: boolean;
  darkMode: boolean;
  hasSeenOnboarding: boolean;
  toggleMobileMenu: () => void;
  toggleCartDrawer: () => void;
  closeMobileMenu: () => void;
  closeCartDrawer: () => void;
  toggleDarkMode: () => void;
  setOnboardingSeen: () => void;
  hydrate: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  mobileMenuOpen: false,
  cartDrawerOpen: false,
  darkMode: false,
  hasSeenOnboarding: false,
  toggleMobileMenu: () => set((s) => ({ mobileMenuOpen: !s.mobileMenuOpen })),
  toggleCartDrawer: () => set((s) => ({ cartDrawerOpen: !s.cartDrawerOpen })),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
  closeCartDrawer: () => set({ cartDrawerOpen: false }),
  toggleDarkMode: () =>
    set((s) => {
      const newMode = !s.darkMode;
      saveToStorage('nusatani_darkmode', newMode);
      return { darkMode: newMode };
    }),
  setOnboardingSeen: () => {
    saveToStorage('nusatani_onboarding', true);
    set({ hasSeenOnboarding: true });
  },
  hydrate: () => {
    const dark = loadFromStorage('nusatani_darkmode', false);
    const onboarding = loadFromStorage('nusatani_onboarding', false);
    set({ darkMode: dark, hasSeenOnboarding: onboarding });
  },
}));
