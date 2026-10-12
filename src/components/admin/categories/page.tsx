import OptionsManager from "@/components/admin/OptionsManager";
import { getOptions } from "@/lib/menu";

export default async function CategoriesPage() {
  const { categories, tags } = await getOptions();

  return (
    <div className="space-y-10">
      <div>
        <p className="font-hand text-lg text-caramel">Menu management</p>
        <h1 className="font-display text-3xl font-bold text-choc">
          Categories & Tags
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-choc/65">
          Add, rename, remove and reorder the categories and tags used by your
          bakery menu.
        </p>
      </div>

      <section className="space-y-4">
        <div>
          <h2 className="font-display text-xl font-bold text-choc">
            Categories
          </h2>
          <p className="mt-1 text-sm text-choc/60">
            Categories are used to group your menu items.
          </p>
        </div>

        <OptionsManager
          type="categories"
          initialOptions={categories}
        />
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="font-display text-xl font-bold text-choc">
            Tags
          </h2>
          <p className="mt-1 text-sm text-choc/60">
            Tags help customers identify the style or flavour of an item.
          </p>
        </div>

        <OptionsManager
          type="tags"
          initialOptions={tags}
        />
      </section>
    </div>
  );
}