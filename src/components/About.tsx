"use client";
import { motion } from "framer-motion";
import { cakes, treats } from "@/lib/data";

const fade = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } };

export default function About() {
  const stats = [
    { n: cakes.length, label: "Dry cakes" },
    { n: treats.length, label: "Homemade treats" },
    { n: "100%", label: "Baked with love" },
  ];
  return (
    <section id="about" className="mx-auto max-w-5xl px-5 py-24 text-center">
      <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
        <p className="font-hand text-3xl text-caramel">Our story</p>
        <h2 className="font-display text-4xl font-bold sm:text-5xl">A little kitchen, a lot of heart</h2>
        {/* TODO: replace this with her real story */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-choc/80">
          The Baker Ri started in a home kitchen with one simple idea: good cake does not need fancy ingredients, just care. Every loaf is baked in small batches, with real ingredients, less sugar and plenty of love.
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="rounded-3xl border border-choc/10 bg-parchment/60 p-5"
          >
            <div className="font-display text-3xl font-bold text-caramel sm:text-5xl">{s.n}</div>
            <div className="mt-1 text-sm font-semibold text-choc/70">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}