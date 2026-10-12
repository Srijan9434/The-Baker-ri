"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { SHOP, waLink } from "@/lib/data";

const qualities = [
  {
    emoji: "🧁",
    title: "Homemade",
    text: "Every treat begins in a real home kitchen, made with patience and care.",
  },
  {
    emoji: "✨",
    title: "Small Batches",
    text: "We keep things personal, giving every batch the attention it deserves.",
  },
  {
    emoji: "🤎",
    title: "Made With Care",
    text: "From mixing to the final little detail, every step matters.",
  },
  {
    emoji: "🎀",
    title: "Thoughtfully Finished",
    text: "Because the little details are what make a homemade cake feel special.",
  },
];

const journey = [
  {
    emoji: "🥣",
    title: "Mix",
    text: "It starts with simple ingredients and a little patience.",
  },
  {
    emoji: "🔥",
    title: "Bake",
    text: "The oven does its magic while we wait for that perfect moment.",
  },
  {
    emoji: "✨",
    title: "Finish",
    text: "Every cake gets its own final little touch.",
  },
  {
    emoji: "🎁",
    title: "Pack",
    text: "Then it is carefully packed and ready to make someone's day.",
  },
];

function FloatingEmoji({
  emoji,
  className,
  delay = 0,
}: {
  emoji: string;
  className: string;
  delay?: number;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0.45, 1, 0.45],
        y: [0, -12, 0],
        rotate: [-5, 5, -5],
        scale: [1, 1.08, 1],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`pointer-events-none absolute select-none text-2xl ${className}`}
    >
      {emoji}
    </motion.span>
  );
}

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="overflow-hidden bg-cream text-choc">
        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
          <motion.video
            autoPlay
            muted
            loop
            playsInline
            poster="/ridhima.jpeg"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 12,
              ease: "easeOut",
            }}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/about-baking.mp4" type="video/mp4" />
          </motion.video>

          <div className="absolute inset-0 bg-choc/30" />

          <div className="absolute inset-0 bg-gradient-to-b from-choc/65 via-choc/15 to-cream" />

          <div className="absolute inset-0 bg-gradient-to-r from-choc/45 via-transparent to-choc/25" />

          <div className="absolute inset-0 bg-black/5" />

          <FloatingEmoji
            emoji="🧁"
            delay={0}
            className="left-[12%] top-[28%]"
          />

          <FloatingEmoji
            emoji="✨"
            delay={0.8}
            className="right-[15%] top-[25%]"
          />

          <FloatingEmoji
            emoji="🤎"
            delay={1.5}
            className="bottom-[25%] left-[18%]"
          />

          <FloatingEmoji
            emoji="🎀"
            delay={2}
            className="bottom-[30%] right-[12%]"
          />

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10 mx-auto max-w-4xl px-6 text-center text-cream"
          >
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="font-hand text-3xl text-gold sm:text-4xl"
            >
              The story behind every cake ♡
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-3 font-display text-5xl font-bold leading-[0.95] sm:text-7xl md:text-8xl"
            >
              Made at home.
              <br />
              Made with love.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="mx-auto mt-7 max-w-xl text-base leading-7 text-cream/85 sm:text-lg"
            >
              Behind every order is a little time, a little patience,
              and a whole lot of heart.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.7 }}
              className="mt-9"
            >
              <a
                href="#story"
                className="inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-bold text-choc shadow-lg transition hover:bg-gold"
              >
                Discover our story
                <span>↓</span>
              </a>
            </motion.div>
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
        </section>

        {/* =====================================================
            STORY — THE BAKER
        ===================================================== */}

        <section
          id="story"
          className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32"
        >
          <div className="grid items-center gap-14 md:grid-cols-2">
            {/* Baker photo */}
            <motion.div
              initial={{ opacity: 0, x: -45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative mx-auto w-full max-w-md"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-parchment shadow-xl shadow-caramel/10">
                <motion.img
                  src="/ridhima.jpeg"
                  alt="Ridhima, the baker behind The Baker Ri"
                  initial={{ scale: 1.05 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="h-full w-full object-cover"
                />
              </div>

              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotate: [-3, -1, -3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-7 -right-5 rounded-3xl bg-white px-5 py-4 shadow-xl sm:-right-8"
              >
                <p className="font-hand text-2xl text-caramel">
                  baked with love ♡
                </p>
              </motion.div>

              <FloatingEmoji
                emoji="✨"
                className="-left-4 top-12"
                delay={0.4}
              />

              <FloatingEmoji
                emoji="🧁"
                className="-right-4 top-20"
                delay={1.2}
              />
            </motion.div>

            {/* Story */}
            <motion.div
              initial={{ opacity: 0, x: 45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p className="font-hand text-3xl text-caramel">
                Meet the baker
              </p>

              <h2 className="mt-2 font-display text-4xl font-bold leading-tight sm:text-5xl">
                Hi, I&apos;m Ridhima.
              </h2>

              <p className="mt-6 text-lg leading-8 text-choc/70">
                The Baker Ri started with something simple — a love
                for baking and a dream of creating something of my own.
              </p>

              <p className="mt-5 leading-7 text-choc/65">
                There are countless little moments behind every cake:
                measuring ingredients, waiting for the oven, checking
                the texture, adding the finishing touches and finally
                packing it with care.
              </p>

              <p className="mt-5 leading-7 text-choc/65">
                It may look like just a cake when it reaches you, but
                behind it is time, patience, learning and a lot of love.
              </p>

              <div className="mt-7 rounded-3xl border border-gold/50 bg-parchment/60 p-5">
                <p className="font-hand text-2xl leading-8 text-choc">
                  &ldquo;One cake at a time, I&apos;m turning a little
                  dream into something real.&rdquo;
                </p>

                <p className="mt-2 text-xs font-bold uppercase tracking-widest text-caramel">
                  — Ridhima
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =====================================================
            WHY THE BAKER RI
        ===================================================== */}

        <section className="relative bg-parchment/55 px-5 py-24 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-2xl text-center"
            >
              <p className="font-hand text-3xl text-caramel">
                Why us?
              </p>

              <h2 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
                The little things matter.
              </h2>

              <p className="mt-5 leading-7 text-choc/65">
                Good cakes take more than a recipe. They take patience,
                attention to detail and someone who genuinely cares
                about every order.
              </p>
            </motion.div>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {qualities.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 35,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  whileHover={{
                    y: -7,
                  }}
                  className="rounded-3xl bg-white/80 p-6 text-center shadow-md shadow-caramel/5"
                >
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                      rotate: [-3, 3, -3],
                    }}
                    transition={{
                      duration: 3,
                      delay: index * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-4xl"
                  >
                    {item.emoji}
                  </motion.div>

                  <h3 className="mt-4 font-display text-xl font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-choc/60">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            HOMEMADE MESSAGE
        ===================================================== */}

        <section className="px-5 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.8,
            }}
            className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] bg-choc px-7 py-14 text-center text-cream shadow-2xl shadow-choc/20 sm:px-14 sm:py-20"
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-gold blur-3xl" />
              <div className="absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-caramel blur-3xl" />
            </div>

            <FloatingEmoji
              emoji="🧁"
              className="left-8 top-8"
              delay={0}
            />

            <FloatingEmoji
              emoji="✨"
              className="right-10 top-12"
              delay={1}
            />

            <FloatingEmoji
              emoji="🤎"
              className="bottom-8 left-14"
              delay={1.8}
            />

            <div className="relative z-10">
              <p className="font-hand text-3xl text-gold">
                There&apos;s a difference you can feel.
              </p>

              <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
                Not rushed.
                <br />
                Not mass-made.
                <br />
                Just homemade.
              </h2>

              <p className="mx-auto mt-6 max-w-2xl leading-7 text-cream/70">
                Every batch is made with care, every detail gets
                attention, and every order carries a little piece of
                our home kitchen with it.
              </p>
            </div>
          </motion.div>
        </section>

        {/* =====================================================
            BAKING JOURNEY
        ===================================================== */}

        <section className="px-5 pb-24 sm:pb-32">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <p className="font-hand text-3xl text-caramel">
                Behind the scenes
              </p>

              <h2 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
                From bowl to box.
              </h2>
            </div>

            <div className="relative mt-14 grid gap-6 md:grid-cols-4">
              <div className="absolute left-[12%] right-[12%] top-12 hidden h-px bg-gold/50 md:block" />

              {journey.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.12,
                  }}
                  className="relative z-10 text-center"
                >
                  <motion.div
                    whileHover={{
                      scale: 1.08,
                      rotate: 4,
                    }}
                    className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-cream bg-parchment text-4xl shadow-md"
                  >
                    {step.emoji}
                  </motion.div>

                  <h3 className="mt-5 font-display text-xl font-bold">
                    {step.title}
                  </h3>

                  <p className="mx-auto mt-2 max-w-[210px] text-sm leading-6 text-choc/60">
                    {step.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            THANK YOU
        ===================================================== */}

        <section className="relative overflow-hidden bg-white/70 px-5 py-24 sm:py-32">
          <FloatingEmoji
            emoji="✨"
            className="left-[10%] top-16"
            delay={0}
          />

          <FloatingEmoji
            emoji="🤎"
            className="right-[10%] top-24"
            delay={1}
          />

          <FloatingEmoji
            emoji="🧁"
            className="bottom-20 left-[18%]"
            delay={2}
          />

          <FloatingEmoji
            emoji="🎀"
            className="bottom-14 right-[18%]"
            delay={1.4}
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.8,
            }}
            className="relative mx-auto max-w-2xl text-center"
          >
            <p className="font-hand text-3xl text-caramel">
              A little note from us ♡
            </p>

            <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
              Thank you.
            </h2>

            <p className="mt-7 text-lg leading-8 text-choc/70">
              Thank you for choosing a small home bakery.
            </p>

            <p className="mt-4 leading-7 text-choc/60">
              Every order, every message, every recommendation and
              every kind word means more than you know.
            </p>

            <p className="mt-4 leading-7 text-choc/60">
              When you choose The Baker Ri, you are not just ordering
              a cake. You are supporting a little dream and becoming
              part of its story.
            </p>

            <motion.p
              animate={{
                scale: [1, 1.04, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mt-8 font-hand text-3xl text-caramel"
            >
              Thank you for being here. 🤎
            </motion.p>
          </motion.div>
        </section>

        {/* =====================================================
            FINAL CTA
        ===================================================== */}

        <section className="relative overflow-hidden bg-cream px-5 py-24 text-center sm:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="mx-auto max-w-2xl"
          >
            <p className="font-hand text-3xl text-caramel">
              Something sweet is waiting ♡
            </p>

            <h2 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
              Ready to find your favourite?
            </h2>

            <p className="mt-5 text-choc/65">
              Explore our homemade cakes, cookies and treats.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/menu"
                className="rounded-full bg-choc px-7 py-3 text-sm font-bold text-cream shadow-md transition hover:bg-caramel"
              >
                Explore Menu
              </Link>

              <a
                href={waLink(
                  "Hi! I'd like to order from The Baker Ri. ♡",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-caramel px-7 py-3 text-sm font-bold text-caramel transition hover:bg-caramel hover:text-cream"
              >
                Order on WhatsApp
              </a>
            </div>

            <p className="mt-8 font-hand text-2xl text-caramel">
              {SHOP.name} ♡
            </p>
          </motion.div>
        </section>
      </main>
    </>
  );
}