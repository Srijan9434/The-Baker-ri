"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Item, Size } from "@/lib/types";

export type CartItem = {
  cartId: string;
  itemId: string;
  name: string;
  description: string;
  image: string;
  sizeLabel: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;

  addToCart: (item: Item, size: Size) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

const STORAGE_KEY = "the-baker-ri-cart";

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(items),
    );
  }, [items, loaded]);

  function addToCart(item: Item, size: Size) {
    const price = Number(size.price);
    const cartId = `${item.id}-${size.label}`;

    setItems((current) => {
      const existing = current.find(
        (cartItem) => cartItem.cartId === cartId,
      );

      if (existing) {
        return current.map((cartItem) =>
          cartItem.cartId === cartId
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem,
        );
      }

      return [
        ...current,
        {
          cartId,
          itemId: item.id,
          name: item.name,
          description: item.description,
          image: item.photos[0]?.url ?? "",
          sizeLabel: size.label,
          price,
          quantity: 1,
        },
      ];
    });
  }

  function removeFromCart(cartId: string) {
    setItems((current) =>
      current.filter(
        (item) => item.cartId !== cartId,
      ),
    );
  }

  function updateQuantity(
    cartId: string,
    quantity: number,
  ) {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }

    setItems((current) =>
      current.map((item) =>
        item.cartId === cartId
          ? {
              ...item,
              quantity,
            }
          : item,
      ),
    );
  }

  function clearCart() {
    setItems([]);
  }

  const itemCount = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.quantity,
        0,
      ),
    [items],
  );

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total + item.price * item.quantity,
        0,
      ),
    [items],
  );

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        addToCart,
        removeFromCart,
        updateQuantity,
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
    throw new Error(
      "useCart must be used inside CartProvider",
    );
  }

  return context;
}