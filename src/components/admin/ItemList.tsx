"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { BUCKET, type Item } from "@/lib/types";

export default function ItemList({ items }: { items: Item[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const sb = createClient();

  async function toggle(it: Item) {
    setBusy(it.id);
    await sb.from("items").update({ available: !it.available }).eq("id", it.id);
    setBusy(null);
    router.refresh();
  }

  async function remove(it: Item) {
    if (!confirm(`Delete "${it.name}"? This cannot be undone.`)) return;
    setBusy(it.id);
    const paths = it.photos.map((p) => p.path);
    if (paths.length) await sb.storage.from(BUCKET).remove(paths);
    await sb.from("items").delete().eq("id", it.id);
    setBusy(null);
    router.refresh();
  }

  if (!items.length)
    return <p className="rounded-3xl border border-dashed border-choc/30 p-10 text-center text-choc/70">No items yet. Tap "+ Add item" to start.</p>;

  return (
    <div className="space-y-3">
      {items.map((it) => {
        const prices = it.sizes.map((s) => Number(s.price)).filter((n) => n > 0);
        const range = prices.length ? `₹${Math.min(...prices)}${prices.length > 1 ? ` – ₹${Math.max(...prices)}` : ""}` : "No price";
        const cover = it.photos[0]?.url;
        return (
          <div key={it.id} className={`flex items-center gap-4 rounded-2xl border border-choc/10 bg-white/70 p-3 ${busy === it.id ? "opacity-50" : ""}`}>
            {cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={cover} alt={it.name} className="h-20 w-20 flex-none rounded-xl object-cover" />
            ) : (
              <div className="flex h-20 w-20 flex-none items-center justify-center rounded-xl bg-parchment text-3xl">🍰</div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-lg font-bold">{it.name}</p>
              <p className="text-sm text-choc/70">{it.category} · {range}</p>
              <label className="mt-1 flex cursor-pointer items-center gap-2 text-sm font-semibold">
                <input type="checkbox" checked={it.available} onChange={() => toggle(it)} className="h-4 w-4 accent-[#b8672a]" />
                {it.available ? "Available" : "Sold out"}
              </label>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link href={`/admin/items/${it.id}`} className="rounded-full bg-choc px-4 py-2 text-center text-sm font-semibold text-cream hover:bg-caramel">Edit</Link>
              <button onClick={() => remove(it)} className="rounded-full border border-red-700/50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-700 hover:text-white">Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}