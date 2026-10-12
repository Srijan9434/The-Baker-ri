import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getOptions } from "@/lib/menu";
import ItemForm from "@/components/admin/ItemForm";
import type { Item } from "@/lib/types";

export default async function EditItem({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const [{ data }, { categories, tags }] = await Promise.all([
    supabase
      .from("items")
      .select("*, sizes(*), photos(*)")
      .eq("id", id)
      .single(),
    getOptions(),
  ]);

  if (!data) notFound();

  const item = {
    ...data,
    sizes: [...(data.sizes ?? [])].sort(
      (a, b) => a.sort_order - b.sort_order,
    ),
    photos: [...(data.photos ?? [])].sort(
      (a, b) => a.sort_order - b.sort_order,
    ),
  } as Item;

  return (
    <>
      <h1 className="mb-6 font-display text-3xl font-bold">
        Edit {item.name}
      </h1>

      <ItemForm
        item={item}
        categories={categories}
        tags={tags}
      />
    </>
  );
}