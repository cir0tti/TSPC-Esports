import React from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartButton() {
  const { cart, setOpenCart } = useCart();

  return (
    <button
      onClick={() => setOpenCart(true)}
      className="relative group"
      aria-label="Open cart"
    >
      <ShoppingCart className="text-white/70 group-hover:text-white transition" />

      {cart.length > 0 && (
        <span
          className="
            absolute -top-2 -right-2
            w-5 h-5
            bg-gradient-to-r from-fuchsia-500 to-cyan-400
            text-black text-xs font-black
            rounded-full
            flex items-center justify-center
          "
        >
          {cart.length}
        </span>
      )}
    </button>
  );
}
