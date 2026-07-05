"use client";

import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { Product } from "@/lib/types";

export interface CartLine {
  key: string;
  product: Product;
  size: string;
  color: string;
  qty: number;
}

interface StoreContextValue {
  cartItems: CartLine[];
  cartCount: number;
  cartTotal: number;
  cartOpen: boolean;
  addToCart: (product: Product, size: string, color: string, qty?: number) => void;
  removeFromCart: (key: string) => void;
  updateQty: (key: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  swatchOpen: boolean;
  openSwatchRequest: () => void;
  closeSwatchRequest: () => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [swatchOpen, setSwatchOpen] = useState(false);

  const value = useMemo<StoreContextValue>(() => {
    const cartCount = cartItems.reduce((sum, line) => sum + line.qty, 0);
    const cartTotal = cartItems.reduce((sum, line) => sum + line.qty * line.product.price, 0);

    return {
      cartItems,
      cartCount,
      cartTotal,
      cartOpen,
      addToCart: (product, size, color, qty = 1) => {
        const key = `${product.id}__${size}__${color}`;
        setCartItems((items) => {
          const existing = items.find((line) => line.key === key);
          if (existing) {
            return items.map((line) => (line.key === key ? { ...line, qty: line.qty + qty } : line));
          }
          return [...items, { key, product, size, color, qty }];
        });
      },
      removeFromCart: (key) => setCartItems((items) => items.filter((line) => line.key !== key)),
      updateQty: (key, qty) =>
        setCartItems((items) =>
          qty <= 0
            ? items.filter((line) => line.key !== key)
            : items.map((line) => (line.key === key ? { ...line, qty } : line))
        ),
      clearCart: () => setCartItems([]),
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      quickViewProduct,
      openQuickView: (product) => setQuickViewProduct(product),
      closeQuickView: () => setQuickViewProduct(null),
      swatchOpen,
      openSwatchRequest: () => setSwatchOpen(true),
      closeSwatchRequest: () => setSwatchOpen(false),
    };
  }, [cartItems, cartOpen, quickViewProduct, swatchOpen]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
