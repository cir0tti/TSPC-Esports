import React from "react";
import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [openCart, setOpenCart] = useState(false);

  const addToCart = (plan) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === plan.id);

      if (found) {
        return prev.map((p) =>
          p.id === plan.id ? { ...p, qty: p.qty + 1 } : p
        );
      }

      return [...prev, { ...plan, qty: 1 }];
    });

    setOpenCart(true);
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) {
      setCart((c) => c.filter((i) => i.id !== id));
    } else {
      setCart((c) =>
        c.map((i) => (i.id === id ? { ...i, qty } : i))
      );
    }
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        openCart,
        setOpenCart,
        addToCart,
        updateQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe usarse dentro de <CartProvider>");
  }

  return context;
}
