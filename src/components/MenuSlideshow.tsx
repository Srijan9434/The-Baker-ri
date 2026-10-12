"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Photo from "./Photo";
import { waLink } from "@/lib/data";
import type { Item } from "@/lib/types";

const variants = {
  enter: (d: number) => ({ x: d * 90, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d * -90, opacity: 0 }),
};

export default function MenuSlideshow({ items }: { items: Item[] }) {
  const list = items.filter((it) => it.available).slice(0, 6);
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const [sizeIdx, setSizeIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(0);

  const change = (next: number, d: number) => {
    setDir(d);
    setI(next);
    setSizeIdx(0);
    setPhotoIdx(0);
  };
  const go = (d: number) => change((i + d + list.length) % list.length, d);

  useEffect(() => {
    if (paused || list.length < 2) return;
    const t = setInterval(() => {
      setDir(1);
      setI((p) => (p + 1) % list.length);
      setSizeIdx(0);
      setPhotoIdx(0);
    }, 5000);
    return () => clearInterval(t);
  }, [paused, list.length]);

  const header = (
    <div className="text-center">
      <p className="font-hand text-3xl text-caramel">Fresh from our oven</p>
      <h2 className="font-display text-4xl font-bold sm:text-5xl">Explore the menu</h2>
    </div>
  );

  if (!list.length) {
    return (
      <section id="menu" className="mx-auto max-w-6xl px-5 py-24">
        {header}
        <div className="mt-12 rounded-[2rem] border border-dashed border-choc/30 bg-parchment/60 p-14 text-center">
          <div className="text-6xl">🍰</div>
          <p className="mt-4 font-display text-2xl font-bold">Menu coming soon</p>
          <p className="mt-1 text-choc/70">Fresh cakes are being added. Check back shortly!</p>
        </div>
      </section>
    );
  }

  const c = list[Math.min(i, list.length - 1)];
  const size = c.sizes[sizeIdx];
  const photo = c.photos[photoIdx]?.url;
  const msg = `Hi! I'd like to order ${c.name}${size ? ` (${size.label}) - Rs ${Number(size.price)}` : ""}.`;

  return (
    <section id="menu" className="mx-auto max-w-6xl px-5 py-24">
      {header}

      <div
        className="relative mt-12 overflow-hidden rounded-[2rem] border border-choc/10 bg-parchment/60 p-5 sm:p-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
      >
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={c.id}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45 }}
            className="grid items-center gap-8 md:grid-cols-2"
          >
            <div>
              <Photo src={photo} alt={c.name} className="aspect-[4/3] w-full rounded-3xl shadow-xl" />
              {c.photos.length > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto">
                  {c.photos.map((p, k) => (
                    <button
                      key={p.path}
                      onClick={() => setPhotoIdx(k)}
                      aria-label={`Photo ${k + 1}`}
                      className={`h-14 w-14 flex-none overflow-hidden rounded-xl border-2 ${k === photoIdx ? "border-caramel" : "border-transparent opacity-70"}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.url} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              {c.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <span key={t} className="rounded-full bg-gold/40 px-3 py-1 text-xs font-bold uppercase tracking-wide">{t}</span>
                  ))}
                </div>
              )}
              <h3 className="mt-3 font-display text-3xl font-bold">{c.name}</h3>
              {c.description && <p className="mt-3 text-lg text-choc/80">{c.description}</p>}

              {c.sizes.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {c.sizes.map((s, k) => (
                    <button
                      key={s.label + k}
                      onClick={() => setSizeIdx(k)}
                      className={`rounded-full border-2 border-caramel px-4 py-1 text-sm font-semibold transition ${k === sizeIdx ? "bg-caramel text-cream" : "text-caramel"}`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
              {size && Number(size.price) > 0 && (
                <p className="mt-4 font-display text-4xl font-bold text-caramel">₹{Number(size.price)}</p>
              )}

                            <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={waLink(msg)}
                  target="_blank"
                  className="inline-block rounded-full bg-caramel px-7 py-3 font-semibold text-cream transition hover:-translate-y-1 hover:bg-choc"
                >
                  Order on WhatsApp
                </a>
                <a
                  href="/menu"
                  className="inline-block rounded-full border-2 border-choc px-7 py-3 font-semibold transition hover:bg-choc hover:text-cream"
                >
                  See all cakes
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {list.length > 1 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <button onClick={() => go(-1)} aria-label="Previous" className="h-11 w-11 rounded-full bg-choc text-cream transition hover:bg-caramel">←</button>
            <div className="flex gap-2">
              {list.map((it, k) => (
                <button
                  key={it.id}
                  onClick={() => change(k, k > i ? 1 : -1)}
                  aria-label={it.name}
                  className={`h-2.5 rounded-full transition-all ${k === i ? "w-8 bg-caramel" : "w-2.5 bg-choc/30"}`}
                />
              ))}
            </div>
            <button onClick={() => go(1)} aria-label="Next" className="h-11 w-11 rounded-full bg-choc text-cream transition hover:bg-caramel">→</button>
          </div>
        )}
      </div>
    </section>
  );
}