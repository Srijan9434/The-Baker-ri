"use client";
import { motion } from "framer-motion";
import { treats } from "@/lib/data";

const items = [
  { icon: "🏡", title: "Homemade", text: "Made in a home kitchen, in small batches, never in a factory." },
  { icon: "🍯", title: "Less sugar", text: "Just enough sweetness. Less sugar, more happiness." },
  { icon: "🌾", title: "Simple ingredients", text: "Butter, flour, fruit and nuts. Nothing you can't pronounce." },
  { icon: "🔥", title: "Fresh daily", text: "Baked fresh so every slice is soft and flavourful." },
];

export default function Specialities() {
  return (
    <section id="specialities" className="bg-choc py-24 text-cream">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center">
          <p className="font-hand text-3xl text-gold">What makes us special</p>
          <h2 className="font-display text-4xl font-bold sm:text-5xl">Simple ingredients, big happiness</h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="rounded-3xl border border-gold/30 bg-cream/5 p-7 text-center"
            >
              <div className="text-5xl">{it.icon}</div>
              <h3 className="mt-4 font-display text-xl font-bold text-gold">{it.title}</h3>
              <p className="mt-2 text-cream/80">{it.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="font-hand text-2xl text-gold">Special homemade treats</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {treats.map((t) => (
              <span key={t} className="rounded-full border border-gold/40 px-4 py-2 text-sm font-semibold">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}