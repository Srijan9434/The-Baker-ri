import ItemForm from "@/components/admin/ItemForm";
import { getOptions } from "@/lib/menu";

export default async function NewItem() {
  const { categories, tags } = await getOptions();

  return (
    <>
      <h1 className="mb-6 font-display text-3xl font-bold">
        Add a new item
      </h1>

      <ItemForm categories={categories} tags={tags} />
    </>
  );
}