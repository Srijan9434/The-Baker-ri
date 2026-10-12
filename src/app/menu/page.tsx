import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import MenuGrid from "@/components/MenuGrid";
import { getMenuItems, getOptions } from "@/lib/menu";

export const metadata: Metadata = { title: "Menu | The Baker Ri" };

const sweet = [
  "Baked in a home kitchen, one small batch at a time.",
  "Every slice carries a little bit of love.",
  "Less sugar, more happiness.",
];

export default async function MenuPage() {
  const [items, { categories, tags }] = await Promise.all([
    getMenuItems(),
    getOptions(),
  ]);

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-6xl px-5 pb-24 pt-32">
        <div className="text-center">
          <p className="font-hand text-3xl text-caramel">
            From our home kitchen to yours ♡
          </p>

          <h1 className="mt-1 font-display text-4xl font-bold sm:text-6xl">
            The full menu
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-choc/80">
            Every cake here is made at home with simple ingredients, patience
            and a lot of love. Pick your favourite, choose a size, and message
            us on WhatsApp. We&apos;ll take it from there.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {sweet.map((s) => (
              <span
                key={s}
                className="rounded-full border border-gold/60 bg-parchment/70 px-5 py-2 font-hand text-xl text-choc"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <MenuGrid
          items={items}
          categories={categories}
          tags={tags}
        />

        <p className="mt-16 text-center font-hand text-2xl text-caramel">
          Can&apos;t find what you&apos;re craving? Message us, we love custom
          requests ♡
        </p>
      </main>

      <Footer />
      <ChatBot />
    </>
  );
}