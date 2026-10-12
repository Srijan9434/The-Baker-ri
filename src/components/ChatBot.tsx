"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { SHOP, waLink } from "@/lib/data";

type Msg = {
  from: "bot" | "me";
  text: string;
};

const quick = [
  "What's popular?",
  "Show me the menu",
  "Sizes and prices",
  "How do I order?",
  "What can I customize?",
  "Tell me about Ridhima",
];

function normalize(text: string) {
  return text.toLowerCase().trim();
}

export default function ChatBot() {
  const { items, itemCount, subtotal, clearCart } = useCart();

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const [msgs, setMsgs] = useState<Msg[]>([
    {
      from: "bot",
      text: `Hi! I'm your ${SHOP.name} helper ♡ Ask me about our cakes, prices, sizes, ordering, customization or anything about the bakery.`,
    },
  ]);

  const cartSummary = useMemo(() => {
    if (!items.length) {
      return "Your cart is currently empty.";
    }

    const lines = items.map(
      (item) =>
        `• ${item.name} — ${item.sizeLabel} × ${item.quantity} = ₹${(
          item.price * item.quantity
        ).toLocaleString("en-IN")}`,
    );

    return `${lines.join("\n")}\n\nSubtotal: ₹${subtotal.toLocaleString(
      "en-IN",
    )}`;
  }, [items, subtotal]);

  function getWhatsAppOrderMessage() {
    if (!items.length) {
      return "Hi! I'd like to know more about The Baker Ri.";
    }

    const orderLines = items.map(
      (item) =>
        `${item.name} — ${item.sizeLabel} × ${item.quantity} — ₹${(
          item.price * item.quantity
        ).toLocaleString("en-IN")}`,
    );

    return `Hi Ridhima! I'd like to place an order from The Baker Ri. ♡

${orderLines.join("\n")}

Estimated subtotal: ₹${subtotal.toLocaleString("en-IN")}

Please confirm availability and the next steps.`;
  }

  function replyTo(text: string): string {
    const q = normalize(text);

    /* CART */
    if (
      q.includes("cart") ||
      q.includes("basket") ||
      q.includes("my order") ||
      q.includes("what did i add")
    ) {
      if (!items.length) {
        return "Your cart is empty right now ♡ Head to the menu and add something delicious!";
      }

      return `Here's what's currently in your cart:\n\n${cartSummary}\n\nYou can open the cart to edit quantities or remove items.`;
    }

    if (
      q.includes("total") ||
      q.includes("subtotal") ||
      q.includes("how much") ||
      q.includes("cost")
    ) {
      if (!items.length) {
        return "Your cart is empty, so there's no total yet ♡";
      }

      return `Your current cart subtotal is ₹${subtotal.toLocaleString(
        "en-IN",
      )} for ${itemCount} item${itemCount === 1 ? "" : "s"}.`;
    }

    if (
      q.includes("clear cart") ||
      q.includes("empty cart") ||
      q.includes("remove everything")
    ) {
      if (!items.length) {
        return "Your cart is already empty ♡";
      }

      clearCart();

      return "Done ♡ I've cleared your cart. You can start adding your favourites again whenever you're ready.";
    }

    /* MENU */
    if (
      q.includes("menu") ||
      q.includes("what do you sell") ||
      q.includes("what do you have") ||
      q.includes("cakes") ||
      q.includes("items")
    ) {
      return "You can explore the complete menu with cakes, cookies and treats, including available sizes, prices, categories and tags.";
    }

    if (
      q.includes("popular") ||
      q.includes("best") ||
      q.includes("favourite") ||
      q.includes("favorite")
    ) {
      return "Looking for something special? ♡ Start with our menu and look for the flavours and treats that match your mood. If you tell me what you like — chocolate, fruity, nutty, classic or festive — I can help narrow it down.";
    }

    /* PRICES */
    if (
      q.includes("price") ||
      q.includes("prices") ||
      q.includes("cost") ||
      q.includes("rate") ||
      q.includes("₹") ||
      q.includes("rupee")
    ) {
      return "Prices depend on the cake or treat and the size you choose. Open the Menu to see the current size-wise prices for each item.";
    }

    if (
      q.includes("size") ||
      q.includes("sizes") ||
      q.includes("serves") ||
      q.includes("serving")
    ) {
      return "Each cake can have its own available size options. Open a product from the Menu to see its available sizes and prices.";
    }

    /* ORDERING */
    if (
      q.includes("how do i order") ||
      q.includes("how to order") ||
      q.includes("place order") ||
      q.includes("buy") ||
      q === "order"
    ) {
      return "It's super easy ♡ Choose your favourite item from the Menu, select a size, add it to your cart, review your order, then place it through WhatsApp so Ridhima can personally confirm everything.";
    }

    if (
      q.includes("whatsapp") ||
      q.includes("contact") ||
      q.includes("talk to") ||
      q.includes("message")
    ) {
      return "Absolutely ♡ You can chat directly with Ridhima on WhatsApp. She'll personally help you with your order, availability and any special requests.";
    }

    /* CUSTOMIZATION */
    if (
      q.includes("custom") ||
      q.includes("personal") ||
      q.includes("theme") ||
      q.includes("design") ||
      q.includes("birthday") ||
      q.includes("occasion")
    ) {
      return "For custom designs, themes or special occasions, the best option is to message Ridhima directly on WhatsApp. Tell her your occasion, preferred design, flavour and any inspiration you have ♡";
    }

    /* BAKERY */
    if (
      q.includes("about") ||
      q.includes("ridhima") ||
      q.includes("baker") ||
      q.includes("who made") ||
      q.includes("owner")
    ) {
      return "The Baker Ri is a homemade bakery lovingly run by Ridhima ♡ Every bake is made with a personal, handcrafted touch. You can visit the About page to know more about her story and the bakery.";
    }

    if (
      q.includes("homemade") ||
      q.includes("home bakery") ||
      q.includes("handmade")
    ) {
      return "The Baker Ri is all about homemade baking — warm, personal and handcrafted. Every order is prepared with care rather than feeling like something mass-produced ♡";
    }

    if (
      q.includes("story") ||
      q.includes("journey") ||
      q.includes("started")
    ) {
      return "Want the full story? ♡ Visit the About page to meet Ridhima and discover the story behind The Baker Ri.";
    }

    /* DELIVERY / AVAILABILITY */
    if (
      q.includes("delivery") ||
      q.includes("deliver") ||
      q.includes("shipping") ||
      q.includes("pickup") ||
      q.includes("pick up")
    ) {
      return "For delivery or pickup details, please contact Ridhima on WhatsApp. Availability and arrangements can depend on the order and occasion.";
    }

    if (
      q.includes("available") ||
      q.includes("availability") ||
      q.includes("in stock")
    ) {
      return "You can check the current availability directly on the Menu. For a specific date or custom order, WhatsApp is the best way to confirm with Ridhima.";
    }

    /* RECOMMENDATIONS */
    if (
      q.includes("chocolate") ||
      q.includes("choco") ||
      q.includes("cocoa")
    ) {
      return "Chocolate lover? 🍫 Look through the Menu for items tagged Chocolate. If you're choosing for a celebration, you can also ask Ridhima about custom options.";
    }

    if (
      q.includes("fruit") ||
      q.includes("fruity") ||
      q.includes("berry") ||
      q.includes("strawberry")
    ) {
      return "If you love fruity flavours 🍓, check the Fruity-tagged options in the Menu. You can also tell Ridhima what fruit you prefer for a special request.";
    }

    if (
      q.includes("nut") ||
      q.includes("nuts") ||
      q.includes("almond") ||
      q.includes("pista") ||
      q.includes("pistachio")
    ) {
      return "For a nutty flavour 🌰, check the Nutty options in the Menu. If you have a specific nut preference, Ridhima can guide you through WhatsApp.";
    }

    if (
      q.includes("classic") ||
      q.includes("simple") ||
      q.includes("traditional")
    ) {
      return "For something timeless ♡, explore the Classic-tagged options in the Menu.";
    }

    if (
      q.includes("festive") ||
      q.includes("festival") ||
      q.includes("christmas") ||
      q.includes("diwali")
    ) {
      return "For celebrations and festive occasions ✨, check the Festive options in the Menu or message Ridhima for a custom idea.";
    }

    /* WEBSITE HELP */
    if (
      q.includes("where is menu") ||
      q.includes("open menu") ||
      q.includes("show menu")
    ) {
      return "Of course ♡ Use the Menu button below to explore everything available.";
    }

    if (
      q.includes("where is about") ||
      q.includes("open about")
    ) {
      return "You can visit the About page to meet Ridhima and learn more about The Baker Ri ♡";
    }

    if (
      q.includes("where is cart") ||
      q.includes("open cart")
    ) {
      return items.length
        ? "Your cart is ready ♡ Tap the cart button below to review your items."
        : "Your cart is empty right now. Add something from the Menu first ♡";
    }

    /* GREETINGS */
    if (
      q === "hi" ||
      q === "hello" ||
      q === "hey" ||
      q.includes("good morning") ||
      q.includes("good evening")
    ) {
      return "Hey! ♡ Welcome to The Baker Ri. What are you craving today?";
    }

    /* THANKS */
    if (
      q.includes("thank") ||
      q.includes("thanks")
    ) {
      return "You're very welcome ♡ Happy baking, happy ordering!";
    }

    /* FALLBACK */
    return "I'd love to help ♡ Try asking me about our menu, prices, sizes, popular treats, customization, ordering, Ridhima, your cart or WhatsApp.";
  }

  function send(text: string) {
    const trimmed = text.trim();

    if (!trimmed) return;

    setMsgs((current) => [
      ...current,
      {
        from: "me",
        text: trimmed,
      },
    ]);

    setInput("");

    window.setTimeout(() => {
      setMsgs((current) => [
        ...current,
        {
          from: "bot",
          text: replyTo(trimmed),
        },
      ]);
    }, 350);
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.94 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 z-50 flex h-[min(38rem,calc(100vh-7rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-choc/10 bg-cream shadow-2xl"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between bg-choc px-4 py-3 text-cream">
              <div>
                <p className="font-display font-bold">
                  Baker Ri Helper ♡
                </p>
                <p className="text-[11px] text-cream/70">
                  Your little bakery companion
                </p>
              </div>

              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-full px-2 py-1 text-lg transition hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {msgs.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`whitespace-pre-line max-w-[88%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    message.from === "me"
                      ? "ml-auto bg-caramel text-cream"
                      : "bg-parchment text-choc"
                  }`}
                >
                  {message.text}
                </motion.div>
              ))}

              {/* QUICK QUESTIONS */}
              <div className="pt-1">
                <p className="mb-2 text-xs font-semibold text-choc/50">
                  Try asking:
                </p>

                <div className="flex flex-wrap gap-2">
                  {quick.map((question) => (
                    <button
                      key={question}
                      onClick={() => send(question)}
                      className="rounded-full border border-caramel/50 bg-white/40 px-3 py-1.5 text-xs font-semibold text-caramel transition hover:bg-caramel hover:text-cream"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>

              {/* ACTIONS */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  href="/menu"
                  className="rounded-2xl bg-parchment px-3 py-2 text-center text-xs font-bold text-choc transition hover:bg-caramel hover:text-cream"
                >
                  🍰 Explore Menu
                </Link>

                <Link
                  href="/about"
                  className="rounded-2xl bg-parchment px-3 py-2 text-center text-xs font-bold text-choc transition hover:bg-caramel hover:text-cream"
                >
                  ♡ Meet Ridhima
                </Link>

                {items.length > 0 && (
                  <Link
                    href="/cart"
                    className="rounded-2xl bg-caramel px-3 py-2 text-center text-xs font-bold text-cream"
                  >
                    🛒 View Cart ({itemCount})
                  </Link>
                )}

                <a
                  href={waLink(getWhatsAppOrderMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    if (items.length) clearCart();
                  }}
                  className="rounded-2xl bg-choc px-3 py-2 text-center text-xs font-bold text-cream"
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>

            {/* INPUT */}
            <form
              onSubmit={(event) => {
                event.preventDefault();
                send(input);
              }}
              className="flex gap-2 border-t border-choc/10 bg-cream p-3"
            >
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask me anything..."
                className="min-w-0 flex-1 rounded-full border border-choc/20 bg-white px-4 py-2.5 text-sm text-choc outline-none transition placeholder:text-choc/40 focus:border-caramel"
              />

              <button
                type="submit"
                className="rounded-full bg-caramel px-4 text-sm font-semibold text-cream transition hover:bg-choc"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING BUTTON */}
      <motion.button
        onClick={() => setOpen((current) => !current)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label={open ? "Close chat" : "Open chat"}
        className="animate-pulse-ring fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-caramel text-2xl text-cream shadow-xl"
      >
        {open ? "✕" : "💬"}
      </motion.button>
    </>
  );
}