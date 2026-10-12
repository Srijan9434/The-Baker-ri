"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { waLink } from "@/lib/data";

export default function CartPage() {
  const {
    items,
    itemCount,
    subtotal,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  function handlePlaceOrder() {
    const orderLines = items.map(
      (item) =>
        `• ${item.name} — ${item.sizeLabel} × ${item.quantity} = ₹${(
          item.price * item.quantity
        ).toLocaleString("en-IN")}`,
    );

    const message = [
      "Hi! I'd like to place an order from The Baker Ri. ♡",
      "",
      "My order:",
      ...orderLines,
      "",
      `Total items: ${itemCount}`,
      `Total: ₹${subtotal.toLocaleString("en-IN")}`,
      "",
      "Please let me know the next steps. Thank you! 🧁",
    ].join("\n");

    window.open(waLink(message), "_blank", "noopener,noreferrer");

    clearCart();
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-cream px-5 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-hand text-3xl text-caramel">
            Your basket is waiting ♡
          </p>

          <h1 className="mt-2 font-display text-4xl font-bold text-choc">
            Your cart is empty
          </h1>

          <p className="mx-auto mt-4 max-w-md text-choc/70">
            Add something delicious from our menu and come back here to
            review your order.
          </p>

          <Link
            href="/menu"
            className="mt-8 inline-flex rounded-full bg-choc px-6 py-3 font-semibold text-cream transition hover:bg-caramel"
          >
            Browse Menu
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream px-5 pb-24 pt-28">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="font-hand text-3xl text-caramel">
            Almost ready ♡
          </p>

          <h1 className="font-display text-4xl font-bold text-choc sm:text-5xl">
            Your cart
          </h1>

          <p className="mt-2 text-choc/65">
            {itemCount} {itemCount === 1 ? "item" : "items"} in your basket
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* Cart items */}
          <div className="space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.cartId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className="flex gap-4 rounded-3xl bg-white/90 p-4 shadow-md shadow-caramel/10"
              >
                {/* Image */}
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-parchment sm:h-28 sm:w-28">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>

                {/* Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-display text-xl font-bold text-choc">
                        {item.name}
                      </h2>

                      <p className="mt-1 text-sm text-choc/60">
                        Size: {item.sizeLabel}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.cartId)}
                      className="text-sm font-semibold text-choc/45 transition hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    {/* Quantity */}
                    <div className="flex items-center rounded-full border border-choc/15 bg-cream">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.cartId,
                            item.quantity - 1,
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-full text-lg font-bold text-choc transition hover:bg-parchment"
                      >
                        −
                      </button>

                      <span className="w-8 text-center text-sm font-bold text-choc">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.cartId,
                            item.quantity + 1,
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-full text-lg font-bold text-choc transition hover:bg-parchment"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <p className="font-display text-xl font-bold text-caramel">
                      ₹
                      {(
                        item.price * item.quantity
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="h-fit rounded-3xl bg-white/90 p-6 shadow-lg shadow-caramel/10 lg:sticky lg:top-24"
          >
            <p className="font-hand text-2xl text-caramel">
              Order summary
            </p>

            <div className="mt-5 flex items-center justify-between border-b border-choc/10 pb-4">
              <span className="text-choc/70">
                Items
              </span>

              <span className="font-semibold text-choc">
                {itemCount}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="font-semibold text-choc">
                Total
              </span>

              <span className="font-display text-2xl font-bold text-caramel">
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>

            <button
              type="button"
              onClick={handlePlaceOrder}
              className="mt-6 w-full rounded-full bg-choc px-5 py-3 font-semibold text-cream transition hover:bg-caramel"
            >
              Place Order on WhatsApp
            </button>

            <Link
              href="/menu"
              className="mt-3 block text-center text-sm font-semibold text-caramel hover:underline"
            >
              ← Continue shopping
            </Link>
          </motion.aside>
        </div>
      </div>
    </main>
  );
}