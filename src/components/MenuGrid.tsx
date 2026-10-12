"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import Photo from "./Photo";
import { useCart } from "@/context/CartContext";
import type { Item, Option } from "@/lib/types";

function Card({
  it,
  index,
  onOpen,
}: {
  it: Item;
  index: number;
  onOpen: (item: Item) => void;
}) {
  const [si, setSi] = useState(0);
  const [hovered, setHovered] = useState(false);

  const reducedMotion = useReducedMotion();

  const {
    addToCart,
    items: cartItems,
  } = useCart();

  const size = it.sizes[si];

  const isAdded =
    !!size &&
    cartItems.some(
      (cartItem) =>
        cartItem.itemId === it.id &&
        cartItem.sizeLabel === size.label,
    );

  function handleAddToCart() {
    if (!size || isAdded) return;
    addToCart(it, size);
  }

  return (
    <motion.div
      initial={
        reducedMotion
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 45, scale: 0.96 }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.18,
        margin: "0px 0px -80px 0px",
      }}
      transition={{
        duration: reducedMotion ? 0 : 0.7,
        delay: reducedMotion ? 0 : (index % 4) * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      animate={
        hovered && !reducedMotion
          ? { y: -6 }
          : undefined
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(it)}
      className={`group relative cursor-pointer rounded-3xl ${
        hovered ? "z-50" : "z-10"
      }`}
    >
      {/* Bear */}

      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center"
        aria-hidden="true"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={
                reducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 38 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                reducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 35 }
              }
              transition={{
                duration: reducedMotion ? 0 : 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative -translate-y-[34px]"
            >
              <motion.div
                animate={
                  reducedMotion
                    ? undefined
                    : {
                        rotate: [-2, 2, -1, 0],
                        y: [0, -2, 0],
                      }
                }
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <div className="relative z-20 text-[58px] leading-none">
                  🧸
                </div>

                <motion.div
                  animate={
                    reducedMotion
                      ? undefined
                      : { rotate: [-10, 5, -4, 0] }
                  }
                  transition={{
                    duration: 0.7,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-1 -left-5 z-40 text-[28px]"
                >
                  🖐️
                </motion.div>

                <motion.div
                  animate={
                    reducedMotion
                      ? undefined
                      : { rotate: [10, -5, 4, 0] }
                  }
                  transition={{
                    duration: 0.7,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-1 -right-5 z-40 -scale-x-100 text-[28px]"
                >
                  🖐️
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card */}

      <div
        className={`relative z-20 flex h-full flex-col overflow-visible rounded-3xl bg-white/90 shadow-lg shadow-caramel/10 transition-shadow duration-300 ${
          hovered ? "shadow-xl shadow-caramel/20" : ""
        } ${it.available ? "" : "opacity-60"}`}
      >
        <div className="relative overflow-hidden rounded-t-3xl">
          <div className="relative aspect-square">
            <Photo
              src={it.photos[0]?.url}
              alt={it.name}
              className="h-full w-full transition duration-700 group-hover:scale-110"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-choc/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {!it.available && (
              <span className="absolute left-3 top-3 rounded-full bg-choc px-3 py-1 text-xs font-bold text-cream">
                Sold out
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          {it.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {it.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gold/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h3 className="font-display text-xl font-bold transition-colors duration-300 group-hover:text-caramel">
            {it.name}
          </h3>

          {it.description && (
            <p className="line-clamp-2 text-sm text-choc/75">
              {it.description}
            </p>
          )}

          {it.sizes.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {it.sizes.map((s, k) => (
                <motion.button
                  key={s.label + k}
                  type="button"
                  whileTap={
                    reducedMotion
                      ? undefined
                      : { scale: 0.92 }
                  }
                  onClick={(event) => {
                    event.stopPropagation();
                    setSi(k);
                  }}
                  className={`rounded-full border-2 border-caramel px-3 py-0.5 text-xs font-semibold transition-all ${
                    k === si
                      ? "bg-caramel text-cream"
                      : "text-caramel hover:bg-caramel/10"
                  }`}
                >
                  {s.label}
                </motion.button>
              ))}
            </div>
          )}

          <div className="mt-auto flex items-center justify-between gap-2 pt-3">
            <span className="font-display text-2xl font-bold text-caramel">
              {size && Number(size.price) > 0
                ? `₹${Number(size.price)}`
                : ""}
            </span>

            {it.available ? (
              <motion.button
                type="button"
                whileTap={
                  reducedMotion
                    ? undefined
                    : { scale: 0.94 }
                }
                onClick={(event) => {
                  event.stopPropagation();
                  handleAddToCart();
                }}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isAdded
                    ? "bg-caramel text-cream"
                    : "bg-choc text-cream hover:bg-caramel"
                }`}
              >
                {isAdded ? "✓ Added" : "Add to Cart"}
              </motion.button>
            ) : (
              <span className="text-sm font-semibold text-choc/60">
                Unavailable
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

type MenuGridProps = {
  items: Item[];
  categories: Option[];
  tags: Option[];
};

export default function MenuGrid({
  items,
  categories,
  tags,
}: MenuGridProps) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All");

  const [selectedItem, setSelectedItem] =
    useState<Item | null>(null);

  const [modalSizeIndex, setModalSizeIndex] =
    useState(0);

  const reducedMotion = useReducedMotion();

  const {
    addToCart,
    items: cartItems,
    updateQuantity,
  } = useCart();

  const cats = [
    "All",
    ...categories.map((category) => category.name),
  ];

  const shown = useMemo(() => {
    const search = q.trim().toLowerCase();

    return items.filter((it) => {
      const matchesCategory =
        cat === "All" || it.category === cat;

      const matchesTag =
        selectedTag === "All" ||
        it.tags.includes(selectedTag);

      const matchesSearch =
        !search ||
        `${it.name} ${it.description} ${it.category} ${it.tags.join(
          " ",
        )}`
          .toLowerCase()
          .includes(search);

      return (
        matchesCategory &&
        matchesTag &&
        matchesSearch
      );
    });
  }, [items, q, cat, selectedTag]);

  function openItem(item: Item) {
    setSelectedItem(item);
    setModalSizeIndex(0);
  }

  function closeItem() {
    setSelectedItem(null);
  }

  useEffect(() => {
    if (!selectedItem) return;

    const previous =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeItem();
      }
    }

    window.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, [selectedItem]);

  const modalSize =
    selectedItem?.sizes[modalSizeIndex];

  const modalCartItem =
    selectedItem && modalSize
      ? cartItems.find(
          (cartItem) =>
            cartItem.itemId === selectedItem.id &&
            cartItem.sizeLabel === modalSize.label,
        )
      : undefined;

  function handleModalAdd() {
    if (!selectedItem || !modalSize) return;

    if (!modalCartItem) {
      addToCart(selectedItem, modalSize);
    }
  }

  return (
    <>
      {/* Filters */}

      <motion.div
        initial={
          reducedMotion
            ? undefined
            : { opacity: 0, y: 20 }
        }
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mx-auto mt-12 flex max-w-3xl flex-col gap-4"
      >
        <input
          value={q}
          onChange={(event) =>
            setQ(event.target.value)
          }
          placeholder="Search cakes, flavours, nuts..."
          className="w-full rounded-full border border-choc/20 bg-white px-6 py-3 outline-none transition placeholder:text-choc/40 focus:border-caramel"
        />

        <div className="flex flex-wrap justify-center gap-2">
          {cats.map((category, index) => (
            <motion.button
              key={category}
              type="button"
              initial={
                reducedMotion
                  ? undefined
                  : { opacity: 0, y: 10 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: reducedMotion
                  ? 0
                  : index * 0.04,
              }}
              whileTap={
                reducedMotion
                  ? undefined
                  : { scale: 0.94 }
              }
              onClick={() => setCat(category)}
              className={`rounded-full border-2 border-caramel px-5 py-1.5 text-sm font-semibold transition ${
                category === cat
                  ? "bg-caramel text-cream"
                  : "text-caramel hover:bg-caramel/10"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {tags.length > 0 && (
          <motion.div
            initial={
              reducedMotion
                ? undefined
                : { opacity: 0, y: 10 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.15,
            }}
            className="flex flex-wrap justify-center gap-2"
          >
            <button
              type="button"
              onClick={() =>
                setSelectedTag("All")
              }
              className={`rounded-full border px-4 py-1 text-xs font-semibold transition ${
                selectedTag === "All"
                  ? "border-choc bg-choc text-cream"
                  : "border-choc/20 text-choc hover:border-caramel"
              }`}
            >
              All tags
            </button>

            {tags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() =>
                  setSelectedTag(tag.name)
                }
                className={`rounded-full border px-4 py-1 text-xs font-semibold transition ${
                  selectedTag === tag.name
                    ? "border-choc bg-choc text-cream"
                    : "border-choc/20 text-choc hover:border-caramel"
                }`}
              >
                {tag.name}
              </button>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Products */}

      {shown.length ? (
        <motion.div
          initial={
            reducedMotion
              ? undefined
              : { opacity: 0 }
          }
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="relative z-0 mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {shown.map((it, i) => (
            <Card
              key={it.id}
              it={it}
              index={i}
              onOpen={openItem}
            />
          ))}
        </motion.div>
      ) : (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 text-center text-choc/70"
        >
          {items.length
            ? "No cakes match your search. Try another word."
            : "Menu coming soon. Fresh cakes are being added!"}
        </motion.p>
      )}

      {/* ================================================= */}
      {/* COMPACT PRODUCT DETAIL                            */}
      {/* ================================================= */}

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-choc/35 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeItem}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedItem.name} details`}
              initial={
                reducedMotion
                  ? { opacity: 1 }
                  : {
                      opacity: 0,
                      y: 25,
                      scale: 0.96,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={
                reducedMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      y: 20,
                      scale: 0.96,
                    }
              }
              transition={{
                duration: reducedMotion ? 0 : 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
              className="relative w-full max-w-[760px] overflow-hidden rounded-[28px] bg-cream shadow-2xl"
            >
              {/* Close */}

              <button
                type="button"
                onClick={closeItem}
                aria-label="Close"
                className="absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg font-bold text-choc shadow-md transition hover:bg-caramel hover:text-cream"
              >
                ×
              </button>

              <div className="grid sm:grid-cols-[42%_58%]">
                {/* PHOTO */}

                <div className="relative h-[250px] sm:h-[430px]">
                  <Photo
                    src={
                      selectedItem.photos[0]?.url
                    }
                    alt={selectedItem.name}
                    className="h-full w-full object-cover"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-choc/25 to-transparent" />

                  {!selectedItem.available && (
                    <span className="absolute bottom-4 left-4 rounded-full bg-choc px-3 py-1 text-xs font-bold text-cream">
                      Sold out
                    </span>
                  )}
                </div>

                {/* DETAILS */}

                <div className="flex min-h-[430px] flex-col p-6 sm:p-7">
                  <p className="font-hand text-xl text-caramel">
                    Freshly baked ♡
                  </p>

                  <h2 className="mt-1 font-display text-3xl font-bold leading-tight text-choc">
                    {selectedItem.name}
                  </h2>

                  {/* Tags */}

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-parchment px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-caramel">
                      {selectedItem.category}
                    </span>

                    {selectedItem.tags.map(
                      (tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-gold/30 px-3 py-1 text-[10px] font-semibold text-choc"
                        >
                          {tag}
                        </span>
                      ),
                    )}
                  </div>

                  {/* Description */}

                  {selectedItem.description && (
                    <p className="mt-5 text-sm leading-6 text-choc/70">
                      {selectedItem.description}
                    </p>
                  )}

                  {/* Sizes */}

                  {selectedItem.sizes.length > 0 && (
                    <div className="mt-5">
                      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-choc/50">
                        Choose size
                      </p>

                      <div className="space-y-2">
                        {selectedItem.sizes.map(
                          (s, index) => (
                            <button
                              key={
                                s.label + index
                              }
                              type="button"
                              onClick={() =>
                                setModalSizeIndex(
                                  index,
                                )
                              }
                              className={`flex w-full items-center justify-between rounded-2xl border px-4 py-2.5 text-sm transition ${
                                index ===
                                modalSizeIndex
                                  ? "border-caramel bg-parchment shadow-sm"
                                  : "border-choc/10 bg-white/60 hover:border-caramel/50"
                              }`}
                            >
                              <span className="font-semibold text-choc">
                                {s.label}
                              </span>

                              <span className="font-bold text-caramel">
                                ₹
                                {Number(
                                  s.price,
                                ).toLocaleString(
                                  "en-IN",
                                )}
                              </span>
                            </button>
                          ),
                        )}
                      </div>
                    </div>
                  )}

                  {/* Bottom */}

                  <div className="mt-auto pt-5">
                    <div className="flex items-center justify-between gap-3">
                      {modalCartItem ? (
                        <div className="flex items-center rounded-full bg-parchment p-1">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                modalCartItem.cartId,
                                modalCartItem.quantity -
                                  1,
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-full font-bold text-choc transition hover:bg-white"
                          >
                            −
                          </button>

                          <span className="w-8 text-center text-sm font-bold">
                            {
                              modalCartItem.quantity
                            }
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                modalCartItem.cartId,
                                modalCartItem.quantity +
                                  1,
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-full font-bold text-choc transition hover:bg-white"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <span className="font-display text-2xl font-bold text-caramel">
                          {modalSize
                            ? `₹${Number(
                                modalSize.price,
                              ).toLocaleString(
                                "en-IN",
                              )}`
                            : ""}
                        </span>
                      )}

                      {selectedItem.available ? (
                        <button
                          type="button"
                          onClick={handleModalAdd}
                          disabled={!!modalCartItem}
                          className={`rounded-full px-5 py-3 text-sm font-bold transition ${
                            modalCartItem
                              ? "bg-caramel text-cream"
                              : "bg-choc text-cream hover:bg-caramel"
                          }`}
                        >
                          {modalCartItem
                            ? "✓ Added"
                            : "Add to Cart"}
                        </button>
                      ) : (
                        <span className="rounded-full bg-choc/10 px-5 py-3 text-sm font-semibold text-choc/50">
                          Unavailable
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}