import { SHOP, waLink } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-choc/10 bg-parchment/70 py-10 text-center">
      <p className="font-display text-2xl font-bold">{SHOP.name}<span className="text-caramel">.</span></p>
      <p className="mt-1 font-hand text-2xl text-caramel">Baked with love, always homemade</p>
      <a href={waLink("Hi!")} target="_blank" className="mt-4 inline-block rounded-full bg-choc px-6 py-2 text-sm font-semibold text-cream hover:bg-caramel">
        Message us on WhatsApp
      </a>
      <p className="mt-6 text-xs text-choc/60">© {new Date().getFullYear()} {SHOP.name}</p>
    </footer>
  );
}