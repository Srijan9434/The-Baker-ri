"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SHOP, waLink } from "@/lib/data";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "Our Story" },
  { href: "#specialities", label: "Specialities" },
  { href: "#menu", label: "Menu" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-choc/10 bg-cream/95 backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-5">
        <a
          href="#home"
          onClick={() => setMenuOpen(false)}
          className="relative z-50 font-display text-xl font-bold text-choc sm:text-2xl"
        >
          {SHOP.name}
          <span className="text-caramel">.</span>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-semibold text-choc/80 transition-colors hover:text-caramel"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Order Button */}
        <a
          href={waLink("Hi! I'd like to order from The Baker Ri.")}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-choc px-5 py-2 text-sm font-semibold text-cream transition hover:bg-caramel md:inline-flex"
        >
          Order on WhatsApp
        </a>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-choc/15 text-choc transition hover:bg-caramel/10 md:hidden"
        >
          <span className="sr-only">
            {menuOpen ? "Close menu" : "Open menu"}
          </span>

          <div className="flex w-5 flex-col gap-1.5">
            <motion.span
              animate={
                menuOpen
                  ? { rotate: 45, y: 6 }
                  : { rotate: 0, y: 0 }
              }
              className="h-0.5 w-5 rounded-full bg-choc"
            />

            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              className="h-0.5 w-5 rounded-full bg-choc"
            />

            <motion.span
              animate={
                menuOpen
                  ? { rotate: -45, y: -6 }
                  : { rotate: 0, y: 0 }
              }
              className="h-0.5 w-5 rounded-full bg-choc"
            />
          </div>
        </button>
      </nav>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-choc/10 bg-cream md:hidden"
          >
            <div className="px-5 pb-5 pt-3">
              <ul className="flex flex-col">
                {links.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-choc/10 last:border-b-0"
                  >
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-3 font-semibold text-choc transition-colors hover:text-caramel"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <a
                href={waLink("Hi! I'd like to order from The Baker Ri.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex w-full items-center justify-center rounded-full bg-caramel px-5 py-3 font-semibold text-cream transition hover:bg-choc"
              >
                Order on WhatsApp ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}