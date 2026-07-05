"use client";

import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { Product } from "@/lib/types";

interface StoreContextValue {
  cartCount: number;
  addToCart: (qty?: number) => void;
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  swatchOpen: boolean;
  openSwatchRequest: () => void;
  closeSwatchRequest: () => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [swatchOpen, setSwatchOpen] = useState(false);

  const value = useMemo<StoreContextValue>(
    () => ({
      cartCount,
      addToCart: (qty = 1) => setCartCount((c) => c + qty),
      quickViewProduct,
      openQuickView: (product) => setQuickViewProduct(product),
      closeQuickView: () => setQuickViewProduct(null),
      swatchOpen,
      openSwatchRequest: () => setSwatchOpen(true),
      closeSwatchRequest: () => setSwatchOpen(false),
    }),
    [cartCount, quickViewProduct, swatchOpen]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
