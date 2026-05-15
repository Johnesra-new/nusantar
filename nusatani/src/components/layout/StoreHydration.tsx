'use client';

import { useEffect } from 'react';
import {
  useCartStore,
  useAuthStore,
  useProductStore,
  useOrderStore,
  useReviewStore,
  useNotificationStore,
  useWishlistStore,
  useUIStore,
} from '@/store';

export default function StoreHydration() {
  useEffect(() => {
    useCartStore.getState().hydrate();
    useAuthStore.getState().hydrate();
    useProductStore.getState().hydrate();
    useOrderStore.getState().hydrate();
    useReviewStore.getState().hydrate();
    useNotificationStore.getState().hydrate();
    useWishlistStore.getState().hydrate();
    useUIStore.getState().hydrate();
  }, []);

  return null;
}
