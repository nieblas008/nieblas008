'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, PRODUCTS } from '../data/products';

interface StoreState {
  items: CartItem[];
  addItem: (product: Product, qty?: number) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clearCart: () => void;
  count: number;
  subtotal: number;
  drawerOpen: boolean;
  searchOpen: boolean;
  menuOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openMenu: () => void;
  closeMenu: () => void;
}

const StoreContext = createContext<StoreState | null>(null);

const DEFAULT_ITEMS: CartItem[] = [
  { product: PRODUCTS[0], qty: 1 }, // Linen Vessel
  { product: PRODUCTS[4], qty: 1 }, // Field Plate
];

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(DEFAULT_ITEMS);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('vv-cart');
    if (stored) {
      try { setItems(JSON.parse(stored)); } catch { /* ignore malformed */ }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem('vv-cart', JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = (product: Product, qty = 1) => {
    setItems(prev => {
      const idx = prev.findIndex(it => it.product.id === product.id);
      if (idx >= 0) {
        return prev.map((it, i) => i === idx ? { ...it, qty: it.qty + qty } : it);
      }
      return [...prev, { product, qty }];
    });
  };

  const removeItem = (id: string) =>
    setItems(prev => prev.filter(it => it.product.id !== id));

  const setQty = (id: string, qty: number) => {
    if (qty < 1) { removeItem(id); return; }
    setItems(prev => prev.map(it => it.product.id === id ? { ...it, qty } : it));
  };

  const clearCart = () => setItems([]);

  const count    = items.reduce((s, it) => s + it.qty, 0);
  const subtotal = items.reduce((s, it) => s + it.product.price * it.qty, 0);

  return (
    <StoreContext.Provider value={{
      items, addItem, removeItem, setQty, clearCart,
      count, subtotal,
      drawerOpen, searchOpen, menuOpen,
      openDrawer:  () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      openSearch:  () => setSearchOpen(true),
      closeSearch: () => setSearchOpen(false),
      openMenu:    () => setMenuOpen(true),
      closeMenu:   () => setMenuOpen(false),
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore(): StoreState {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be inside StoreProvider');
  return ctx;
}
