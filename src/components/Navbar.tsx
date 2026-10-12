"use client";

import { motion } from "framer-motion";
import { SHOP, waLink } from "@/lib/data";
import { useCart } from "@/context/CartContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/#specialities", label: "Specialities" },
  { href: "/menu", label: "Menu" },
];

export default function Navbar() {
  const { itemCount } = useCart();

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-x-0 top-0 z-40 border-b border-choc/10 bg-cream/80 backdrop-blur"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        {/* Logo */}
        <a
          href="/"
          className="font-display text-xl font-bold text-choc"
        >
          {SHOP.name}
          <span className="text-caramel">.</span>
        </a>

        {/* Navigation */}
        <ul className="hidden gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-semibold text-choc/80 transition hover:text-caramel"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {itemCount > 0 ? (
            <motion.a
              href="/cart"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Open cart with ${itemCount} ${
                itemCount === 1 ? "item" : "items"
              }`}
              className="relative flex h-11 w-11 items-center justify-center rounded-full bg-choc text-xl text-cream shadow-md transition hover:bg-caramel"
            >
              🛒

              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-caramel px-1 text-[10px] font-bold text-cream ring-2 ring-cream">
                {itemCount}
              </span>
            </motion.a>
          ) : (
            <a
              href={waLink(
                "Hi! I'd like to order from The Baker Ri.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-choc px-5 py-2 text-sm font-semibold text-cream transition hover:bg-caramel"
            >
              Order
            </a>
          )}
        </div>
      </nav>
    </motion.header>
  );
}