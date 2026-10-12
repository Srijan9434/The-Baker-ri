"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { compressImage } from "@/lib/image";
import {
  BUCKET,
  type Item,
  type Option,
  type Photo,
  type Size,
} from "@/lib/types";

const field =
  "w-full rounded-xl border border-choc/20 bg-white px-4 py-3 outline-none focus:border-caramel";

type ItemFormProps = {
  item?: Item;
  categories: Option[];
  tags: Option[];
};

export default function ItemForm({
  item,
  categories,
  tags: tagOptions,
}: ItemFormProps) {
  const router = useRouter();
  const sb = createClient();

  const [name, setName] = useState(item?.name ?? "");
  const [description, setDescription] = useState(item?.description ?? "");

  const firstCategory = categories[0]?.name ?? "";
  const itemCategoryExists = item?.category
    ? categories.some((c) => c.name === item.category)
    : false;

  const [category, setCategory] = useState(
    itemCategoryExists ? item!.category : firstCategory,
  );

  const [selectedTags, setSelectedTags] = useState<string[]>(item?.tags ?? []);
  const [available, setAvailable] = useState(item?.available ?? true);

  const [sizes, setSizes] = useState<Size[]>(
    item?.sizes?.length
      ? item.sizes
      : [
          { label: "Mini tub", price: "" },
          { label: "Large tub", price: "" },
        ],
  );

  const [photos, setPhotos] = useState<Photo[]>(item?.photos ?? []);
  const [removed, setRemoved] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  async function onFiles(files: FileList | null) {
    if (!files?.length) return;

    setUploading(true);
    setErr("");

    try {
      const added: Photo[] = [];

      for (const f of Array.from(files)) {
        const blob = await compressImage(f);
        const path = `${crypto.randomUUID()}.jpg`;

        const { error } = await sb.storage
          .from(BUCKET)
          .upload(path, blob, {
            contentType: "image/jpeg",
          });

        if (error) throw error;

        added.push({
          path,
          url: sb.storage.from(BUCKET).getPublicUrl(path).data.publicUrl,
        });
      }

      setPhotos((p) => [...p, ...added]);
    } catch (e) {
      setErr("Photo upload failed: " + (e as Error).message);
    }

    setUploading(false);
  }

  const makeCover = (i: number) =>
    setPhotos((p) => [p[i], ...p.filter((_, k) => k !== i)]);

  const removePhoto = (i: number) => {
    setRemoved((r) => [...r, photos[i].path]);
    setPhotos((p) => p.filter((_, k) => k !== i));
  };

  const toggleTag = (tag: string) =>
    setSelectedTags((current) =>
      current.includes(tag)
        ? current.filter((value) => value !== tag)
        : [...current, tag],
    );

  const setSize = (i: number, patch: Partial<Size>) =>
    setSizes((s) =>
      s.map((z, k) => (k === i ? { ...z, ...patch } : z)),
    );

  async function save() {
    if (!name.trim()) {
      setErr("Please enter a name");
      return;
    }

    if (!category) {
      setErr("Please select a category");
      return;
    }

    setSaving(true);
    setErr("");

    try {
      const payload = {
        name: name.trim(),
        description,
        category,
        tags: selectedTags,
        available,
      };

      let id = item?.id;

      if (id) {
        const { error } = await sb
          .from("items")
          .update(payload)
          .eq("id", id);

        if (error) throw error;
      } else {
        const { data, error } = await sb
          .from("items")
          .insert(payload)
          .select("id")
          .single();

        if (error) throw error;

        id = data.id;
      }

      await sb.from("sizes").delete().eq("item_id", id);

      const sizeRows = sizes
        .filter((s) => s.label.trim())
        .map((s, i) => ({
          item_id: id,
          label: s.label.trim(),
          price: Number(s.price) || 0,
          sort_order: i,
        }));

      if (sizeRows.length) {
        const { error } = await sb.from("sizes").insert(sizeRows);

        if (error) throw error;
      }

      await sb.from("photos").delete().eq("item_id", id);

      if (photos.length) {
        const { error } = await sb.from("photos").insert(
          photos.map((p, i) => ({
            item_id: id,
            url: p.url,
            path: p.path,
            sort_order: i,
          })),
        );

        if (error) throw error;
      }

      if (removed.length) {
        await sb.storage.from(BUCKET).remove(removed);
      }

      router.push("/admin");
      router.refresh();
    } catch (e) {
      setErr("Could not save: " + (e as Error).message);
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 pb-24">
      <section className="space-y-3 rounded-3xl border border-choc/10 bg-white/70 p-5">
        <h2 className="font-display text-xl font-bold">Details</h2>

        <input
          className={field}
          placeholder="Name (e.g. Plum Cake)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className={field}
          rows={4}
          placeholder="Description. What makes it special?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className={field}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {!category && <option value="">Select a category</option>}

          {item?.category && !itemCategoryExists && (
            <option value={item.category}>
              {item.category} (no longer in categories)
            </option>
          )}

          {categories.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>

        <div className="flex flex-wrap gap-2">
          {tagOptions.map((option) => (
            <button
              type="button"
              key={option.id}
              onClick={() => toggleTag(option.name)}
              className={`rounded-full border-2 px-4 py-1 text-sm font-semibold ${
                selectedTags.includes(option.name)
                  ? "border-caramel bg-caramel text-cream"
                  : "border-caramel text-caramel"
              }`}
            >
              {option.name}
            </button>
          ))}

          {item?.tags
            .filter(
              (tag) => !tagOptions.some((option) => option.name === tag),
            )
            .map((tag) => (
              <button
                type="button"
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`rounded-full border-2 px-4 py-1 text-sm font-semibold ${
                  selectedTags.includes(tag)
                    ? "border-caramel bg-caramel text-cream"
                    : "border-red-400 text-red-600"
                }`}
              >
                {tag} (no longer available)
              </button>
            ))}
        </div>

        <label className="flex items-center gap-2 font-semibold">
          <input
            type="checkbox"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
            className="h-5 w-5 accent-[#b8672a]"
          />
          Available now
        </label>
      </section>

      <section className="space-y-3 rounded-3xl border border-choc/10 bg-white/70 p-5">
        <h2 className="font-display text-xl font-bold">Sizes and prices</h2>

        {sizes.map((s, i) => (
          <div key={i} className="flex gap-2">
            <input
              className={field}
              placeholder="Size (e.g. Mini tub)"
              value={s.label}
              onChange={(e) =>
                setSize(i, { label: e.target.value })
              }
            />

            <input
              className={`${field} max-w-32`}
              type="number"
              min="0"
              placeholder="₹ Price"
              value={s.price}
              onChange={(e) =>
                setSize(i, { price: e.target.value })
              }
            />

            <button
              type="button"
              onClick={() =>
                setSizes((x) => x.filter((_, k) => k !== i))
              }
              className="rounded-xl border border-red-700/50 px-3 text-red-700"
              aria-label="Remove size"
            >
              ✕
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            setSizes((x) => [...x, { label: "", price: "" }])
          }
          className="rounded-full border-2 border-caramel px-4 py-1.5 text-sm font-semibold text-caramel"
        >
          + Add size
        </button>
      </section>

      <section className="space-y-3 rounded-3xl border border-choc/10 bg-white/70 p-5">
        <h2 className="font-display text-xl font-bold">Photos</h2>

        <p className="text-sm text-choc/70">
          The first photo is the cover.
        </p>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {photos.map((p, i) => (
            <div key={p.path} className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.url}
                alt=""
                className="aspect-square w-full rounded-xl object-cover"
              />

              {i === 0 && (
                <span className="absolute left-1 top-1 rounded-full bg-gold px-2 text-xs font-bold">
                  Cover
                </span>
              )}

              <div className="mt-1 flex gap-1 text-xs font-semibold">
                {i !== 0 && (
                  <button
                    type="button"
                    onClick={() => makeCover(i)}
                    className="flex-1 rounded-full border border-choc/30 py-1"
                  >
                    Make cover
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => removePhoto(i)}
                  className="flex-1 rounded-full border border-red-700/50 py-1 text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <label className="block cursor-pointer rounded-2xl border-2 border-dashed border-caramel p-6 text-center font-semibold text-caramel">
          {uploading ? "Uploading..." : "📷 Tap to add photos"}

          <input
            type="file"
            accept="image/*"
            multiple
            hidden
            disabled={uploading}
            onChange={(e) => {
              onFiles(e.target.files);
              e.target.value = "";
            }}
          />
        </label>
      </section>

      {err && (
        <p className="rounded-xl bg-red-100 p-3 font-semibold text-red-800">
          {err}
        </p>
      )}

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-choc/10 bg-cream/95 p-3 backdrop-blur">
        <div className="mx-auto flex max-w-5xl gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="rounded-full border-2 border-choc px-6 py-3 font-semibold"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={save}
            disabled={saving || uploading}
            className="flex-1 rounded-full bg-caramel py-3 font-semibold text-cream hover:bg-choc disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save item"}
          </button>
        </div>
      </div>
    </div>
  );
}