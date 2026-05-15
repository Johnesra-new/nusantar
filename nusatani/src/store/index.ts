import { create } from 'zustand';
import { CartItem, Product, UserRole } from '@/types';

// ========================================
// Cart Store
// ========================================
interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.product.id === product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { product, quantity: 1 }] };
    }),
  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.product.id !== productId),
    })),
  updateQuantity: (productId, qty) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.product.id === productId ? { ...i, quantity: Math.max(1, qty) } : i
      ),
    })),
  clearCart: () => set({ items: [] }),
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
  setRole: (role: UserRole) => void;
  login: (name: string, role: UserRole) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  currentRole: 'buyer',
  isLoggedIn: false,
  userName: '',
  setRole: (role) => set({ currentRole: role }),
  login: (name, role) => set({ isLoggedIn: true, userName: name, currentRole: role }),
  logout: () => set({ isLoggedIn: false, userName: '', currentRole: 'buyer' }),
}));

// ========================================
// UI Store (mobile menu, modals, etc)
// ========================================
interface UIState {
  mobileMenuOpen: boolean;
  cartDrawerOpen: boolean;
  toggleMobileMenu: () => void;
  toggleCartDrawer: () => void;
  closeMobileMenu: () => void;
  closeCartDrawer: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  mobileMenuOpen: false,
  cartDrawerOpen: false,
  toggleMobileMenu: () => set((s) => ({ mobileMenuOpen: !s.mobileMenuOpen })),
  toggleCartDrawer: () => set((s) => ({ cartDrawerOpen: !s.cartDrawerOpen })),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
  closeCartDrawer: () => set({ cartDrawerOpen: false }),
}));
