import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ItemList from "@/components/admin/ItemList";
import type { Item } from "@/lib/types";

export default async function AdminHome() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("items")
    .select("*, sizes(*), photos(*)")
    .order("created_at", { ascending: false });

  const items = ((data ?? []) as Item[]).map((it) => ({
    ...it,
    sizes: [...(it.sizes ?? [])],
    photos: [...(it.photos ?? [])],
  }));

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Your menu</h1>
          <p className="text-choc/70">{items.length} items</p>
        </div>
        <Link href="/admin/items/new" className="rounded-full bg-caramel px-6 py-3 font-semibold text-cream shadow-lg transition hover:bg-choc">
          + Add item
        </Link>
      </div>
      <ItemList items={items} />
    </>
  );
}