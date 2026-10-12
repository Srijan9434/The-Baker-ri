"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SHOP, waLink } from "@/lib/data";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } };
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } };

export default function Hero({ photos }: { photos: string[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (photos.length < 2) return;
    const t = setInterval(() => setI((p) => (p + 1) % photos.length), 3500);
    return () => clearInterval(t);
  }, [photos.length]);

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-28">
      <div className="animate-float absolute -left-10 top-32 h-40 w-40 rounded-full bg-gold/30 blur-2xl" />
      <div className="animate-float-slow absolute bottom-10 right-0 h-56 w-56 rounded-full bg-caramel/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="font-hand text-3xl text-caramel">
            Homemade with love ♡
          </motion.p>
          <motion.h1 variants={item} className="mt-2 font-display text-5xl font-bold leading-tight sm:text-7xl">
            {SHOP.name}
          </motion.h1>
          <motion.p variants={item} className="mt-5 max-w-md text-lg text-choc/80">
            Soft, golden dry cakes and little homemade treats, baked fresh with simple ingredients and a lot less sugar. {SHOP.tagline.toLowerCase()}.
          </motion.p>
          <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
            <a href="#menu" className="rounded-full bg-caramel px-7 py-3 font-semibold text-cream shadow-lg transition hover:-translate-y-1 hover:bg-choc">
              Explore the menu
            </a>
            <a
              href={waLink("Hi! I'd like to order from The Baker Ri.")}
              target="_blank"
              className="rounded-full border-2 border-choc px-7 py-3 font-semibold transition hover:-translate-y-1 hover:bg-choc hover:text-cream"
            >
              Order on WhatsApp
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="relative mx-auto"
        >
          <div className="relative aspect-[3/4] w-72 overflow-hidden rounded-t-full border-8 border-choc bg-parchment shadow-2xl sm:w-96">
            {photos.length ? (
              <AnimatePresence>
                <motion.img
                  key={photos[i]}
                  src={photos[i]}
                  alt="Fresh cakes from The Baker Ri"
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9 }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-parchment to-gold/50 text-7xl">
                🍰
              </div>
            )}
            {photos.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2">
                {photos.map((_, k) => (
                  <span key={k} className={`h-2 rounded-full transition-all ${k === i ? "w-6 bg-cream" : "w-2 bg-cream/60"}`} />
                ))}
              </div>
            )}
          </div>
          <div className="animate-float absolute -bottom-4 -left-6 rotate-[-8deg] rounded-2xl bg-gold px-4 py-2 font-hand text-2xl text-choc shadow-xl">
            Freshly baked daily
          </div>
        </motion.div>
      </div>
    </section>
  );
}