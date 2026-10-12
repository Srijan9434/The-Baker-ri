"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function BakeryDoodles() {
  const reducedMotion = useReducedMotion();

  const float = (duration: number, delay = 0) => ({
    duration: reducedMotion ? 0 : duration,
    delay: reducedMotion ? 0 : delay,
    repeat: reducedMotion ? 0 : Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut" as const,
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* ───────── TOP LEFT ───────── */}

      {/* Whisk */}
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                y: [0, -10, 0],
                rotate: [-6, 4, -6],
              }
        }
        transition={float(4)}
        className="absolute left-[3%] top-32 hidden text-4xl text-caramel/25 sm:block"
      >
        𓌉◯𓇋
      </motion.div>

      {/* Small stars */}
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                scale: [1, 1.2, 1],
                rotate: [0, 12, 0],
              }
        }
        transition={float(2.8, 0.4)}
        className="absolute left-[13%] top-48 text-2xl text-gold/40"
      >
        ✦
      </motion.div>

      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                scale: [1, 0.8, 1],
              }
        }
        transition={float(2.2, 1)}
        className="absolute left-[19%] top-60 text-lg text-caramel/25"
      >
        ✧
      </motion.div>

      {/* ───────── TOP RIGHT ───────── */}

      {/* Rolling pin */}
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                y: [0, -7, 0],
                rotate: [5, -3, 5],
              }
        }
        transition={float(4.5, 0.5)}
        className="absolute right-[4%] top-32 hidden text-4xl text-choc/15 lg:block"
      >
        ─╾━╼─
      </motion.div>

      {/* Sparkle */}
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                scale: [1, 1.25, 1],
                rotate: [0, 15, 0],
              }
        }
        transition={float(2.5)}
        className="absolute right-[10%] top-48 text-3xl text-gold/45"
      >
        ✦
      </motion.div>

      {/* Heart */}
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                y: [0, -8, 0],
                rotate: [-5, 5, -5],
              }
        }
        transition={float(3.5, 0.8)}
        className="absolute right-[17%] top-60 text-2xl text-caramel/25"
      >
        ♡
      </motion.div>

      {/* ───────── LEFT SIDE ───────── */}

      {/* Floating heart */}
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                y: [0, 12, 0],
                rotate: [5, -5, 5],
              }
        }
        transition={float(4, 0.3)}
        className="absolute left-[4%] top-[43%] hidden text-4xl text-caramel/25 lg:block"
      >
        ♡
      </motion.div>

      {/* Spoon */}
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                y: [0, -8, 0],
                rotate: [-8, 5, -8],
              }
        }
        transition={float(4.2, 0.7)}
        className="absolute left-[9%] top-[55%] hidden text-3xl text-choc/15 lg:block"
      >
        🥄
      </motion.div>

      {/* Dotted trail */}
      <div className="absolute left-[14%] top-[65%] hidden text-lg tracking-[0.35em] text-caramel/20 lg:block">
        · · ·
      </div>

      {/* ───────── RIGHT SIDE ───────── */}

      {/* Cupcake */}
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                y: [0, -10, 0],
                rotate: [-3, 3, -3],
              }
        }
        transition={float(4, 1)}
        className="absolute right-[6%] top-[43%] hidden text-4xl opacity-30 lg:block"
      >
        🧁
      </motion.div>

      {/* Cookie */}
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                y: [0, 9, 0],
                rotate: [0, 8, 0],
              }
        }
        transition={float(3.8, 0.4)}
        className="absolute right-[12%] top-[55%] hidden text-3xl opacity-25 lg:block"
      >
        🍪
      </motion.div>

      {/* Tiny stars */}
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                scale: [1, 1.3, 1],
              }
        }
        transition={float(2.4, 0.5)}
        className="absolute right-[17%] top-[65%] text-xl text-gold/35"
      >
        ✧
      </motion.div>

      {/* ───────── LOWER AREA ───────── */}

      {/* Cake */}
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                y: [0, 9, 0],
                rotate: [2, -2, 2],
              }
        }
        transition={float(4.5, 0.2)}
        className="absolute bottom-[12%] right-[7%] hidden text-4xl opacity-25 lg:block"
      >
        🍰
      </motion.div>

      {/* Croissant */}
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                y: [0, -7, 0],
                rotate: [-3, 3, -3],
              }
        }
        transition={float(4.2, 1)}
        className="absolute bottom-[20%] left-[8%] hidden text-3xl opacity-25 lg:block"
      >
        🥐
      </motion.div>

      {/* Strawberry */}
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                y: [0, 6, 0],
                rotate: [4, -4, 4],
              }
        }
        transition={float(3.2, 0.6)}
        className="absolute bottom-[30%] right-[20%] hidden text-2xl opacity-20 lg:block"
      >
        🍓
      </motion.div>

      {/* Bottom sparkle */}
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                scale: [1, 1.2, 1],
                rotate: [0, 10, 0],
              }
        }
        transition={float(2.7)}
        className="absolute bottom-[18%] left-[20%] text-2xl text-gold/35"
      >
        ✦
      </motion.div>

      {/* ───────── LITTLE HAND-DRAWN DETAILS ───────── */}

      <div className="absolute left-[23%] top-[30%] text-xl text-choc/10">
        • •
      </div>

      <div className="absolute right-[24%] top-[28%] text-xl tracking-widest text-caramel/15">
        · · ·
      </div>

      <div className="absolute bottom-[38%] left-[17%] text-lg text-gold/25">
        ✧
      </div>

      <div className="absolute bottom-[42%] right-[14%] text-lg text-caramel/20">
        •
      </div>
    </div>
  );
}