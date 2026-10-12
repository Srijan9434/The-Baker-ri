import { createClient } from "@/lib/supabase/server";
import type { Item, Option, Photo, Size } from "@/lib/types";

type Row = Omit<Item, "sizes" | "photos"> & {
  sizes: (Size & { sort_order: number })[];
  photos: (Photo & { sort_order: number })[];
};

const normalize = (r: Row): Item => ({
  ...r,
  sizes: [...(r.sizes ?? [])].sort((a, b) => a.sort_order - b.sort_order),
  photos: [...(r.photos ?? [])].sort((a, b) => a.sort_order - b.sort_order),
});

// All items for the public site (anyone can read the menu)
export async function getMenuItems(): Promise<Item[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("items")
    .select("*, sizes(*), photos(*)")
    .order("created_at", { ascending: false });
  return ((data ?? []) as Row[]).map(normalize);
}

// One item, for its detail page
export async function getMenuItem(id: string): Promise<Item | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("items")
    .select("*, sizes(*), photos(*)")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) return null;
  return normalize(data as Row);
}

// Category and tag lists, in the order she set
export async function getOptions(): Promise<{ categories: Option[]; tags: Option[] }> {
  const supabase = await createClient();
  const [c, t] = await Promise.all([
    supabase.from("categories").select("*").order("sort_order").order("name"),
    supabase.from("tags").select("*").order("sort_order").order("name"),
  ]);
  return { categories: (c.data ?? []) as Option[], tags: (t.data ?? []) as Option[] };
}