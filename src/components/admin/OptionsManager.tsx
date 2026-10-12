"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Option } from "@/lib/types";

type OptionType = "categories" | "tags";

type OptionsManagerProps = {
  type: OptionType;
  initialOptions: Option[];
};

export default function OptionsManager({
  type,
  initialOptions,
}: OptionsManagerProps) {
  const supabase = createClient();

  const [options, setOptions] = useState<Option[]>(initialOptions);
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const table = type === "categories" ? "categories" : "tags";
  const label = type === "categories" ? "category" : "tag";

  function showMessage(text: string) {
    setMessage(text);
    setTimeout(() => setMessage(null), 3000);
  }

  async function addOption() {
    const name = newName.trim();

    if (!name) {
      showMessage(`Please enter a ${label} name.`);
      return;
    }

    if (
      options.some(
        (option) => option.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      showMessage(`That ${label} already exists.`);
      return;
    }

    setLoading(true);

    const nextSortOrder =
      options.length > 0
        ? Math.max(...options.map((option) => option.sort_order)) + 1
        : 0;

    const { data, error } = await supabase
      .from(table)
      .insert({
        name,
        sort_order: nextSortOrder,
      })
      .select("id, name, sort_order")
      .single();

    setLoading(false);

    if (error) {
      showMessage(error.message);
      return;
    }

    setOptions((current) => [...current, data as Option]);
    setNewName("");
    showMessage(`${label} added.`);
  }

  function startEditing(option: Option) {
    setEditingId(option.id);
    setEditingName(option.name);
  }

  function cancelEditing() {
    setEditingId(null);
    setEditingName("");
  }

  async function saveRename(option: Option) {
    const name = editingName.trim();

    if (!name) {
      showMessage(`Please enter a ${label} name.`);
      return;
    }

    if (
      options.some(
        (item) =>
          item.id !== option.id &&
          item.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      showMessage(`That ${label} already exists.`);
      return;
    }

    if (name === option.name) {
      cancelEditing();
      return;
    }

    setLoading(true);

    const { error: optionError } = await supabase
      .from(table)
      .update({ name })
      .eq("id", option.id);

    if (optionError) {
      setLoading(false);
      showMessage(optionError.message);
      return;
    }

    if (type === "categories") {
      const { error } = await supabase
        .from("items")
        .update({ category: name })
        .eq("category", option.name);

      if (error) {
        setLoading(false);
        showMessage(error.message);
        return;
      }
    } else {
      const { data: items, error: fetchError } = await supabase
        .from("items")
        .select("id, tags")
        .contains("tags", [option.name]);

      if (fetchError) {
        setLoading(false);
        showMessage(fetchError.message);
        return;
      }

      for (const item of items ?? []) {
        const updatedTags = (item.tags ?? []).map((tag: string) =>
          tag === option.name ? name : tag,
        );

        const { error } = await supabase
          .from("items")
          .update({ tags: updatedTags })
          .eq("id", item.id);

        if (error) {
          setLoading(false);
          showMessage(error.message);
          return;
        }
      }
    }

    setOptions((current) =>
      current.map((item) =>
        item.id === option.id ? { ...item, name } : item,
      ),
    );

    setLoading(false);
    cancelEditing();
    showMessage(`${label} renamed.`);
  }

  async function deleteOption(option: Option) {
    const { data: items, error: fetchError } =
      type === "categories"
        ? await supabase
            .from("items")
            .select("id")
            .eq("category", option.name)
        : await supabase
            .from("items")
            .select("id")
            .contains("tags", [option.name]);

    if (fetchError) {
      showMessage(fetchError.message);
      return;
    }

    if (items && items.length > 0) {
      showMessage(
        `Cannot delete "${option.name}" because ${items.length} item${
          items.length === 1 ? " uses" : "s use"
        } this ${label}.`,
      );
      return;
    }

    if (!window.confirm(`Delete "${option.name}"?`)) {
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from(table)
      .delete()
      .eq("id", option.id);

    setLoading(false);

    if (error) {
      showMessage(error.message);
      return;
    }

    setOptions((current) =>
      current.filter((item) => item.id !== option.id),
    );

    showMessage(`${label} deleted.`);
  }

  async function moveOption(index: number, direction: -1 | 1) {
    const newIndex = index + direction;

    if (newIndex < 0 || newIndex >= options.length) {
      return;
    }

    const current = options[index];
    const target = options[newIndex];

    setLoading(true);

    const { error: firstError } = await supabase
      .from(table)
      .update({ sort_order: target.sort_order })
      .eq("id", current.id);

    if (firstError) {
      setLoading(false);
      showMessage(firstError.message);
      return;
    }

    const { error: secondError } = await supabase
      .from(table)
      .update({ sort_order: current.sort_order })
      .eq("id", target.id);

    if (secondError) {
      setLoading(false);
      showMessage(secondError.message);
      return;
    }

    const reordered = [...options];
    [reordered[index], reordered[newIndex]] = [
      reordered[newIndex],
      reordered[index],
    ];

    setOptions(reordered);
    setLoading(false);
  }

  return (
    <section className="space-y-5">
      {message && (
        <div className="rounded-2xl border border-choc/10 bg-parchment px-4 py-3 text-sm text-choc">
          {message}
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              addOption();
            }
          }}
          placeholder={`New ${label} name`}
          className="min-w-0 flex-1 rounded-full border border-choc/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-caramel"
          disabled={loading}
        />

        <button
          type="button"
          onClick={addOption}
          disabled={loading}
          className="rounded-full bg-choc px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-caramel disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add {label}
        </button>
      </div>

      <div className="space-y-3">
        {options.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-choc/15 px-4 py-8 text-center text-sm text-choc/60">
            No {label}s yet.
          </p>
        ) : (
          options.map((option, index) => (
            <div
              key={option.id}
              className="flex flex-col gap-3 rounded-2xl border border-choc/10 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
            >
              {editingId === option.id ? (
                <input
                  value={editingName}
                  onChange={(event) => setEditingName(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      saveRename(option);
                    }

                    if (event.key === "Escape") {
                      cancelEditing();
                    }
                  }}
                  autoFocus
                  className="min-w-0 flex-1 rounded-full border border-choc/15 px-4 py-2 text-sm outline-none focus:border-caramel"
                  disabled={loading}
                />
              ) : (
                <span className="flex-1 font-semibold text-choc">
                  {option.name}
                </span>
              )}

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => moveOption(index, -1)}
                  disabled={loading || index === 0}
                  className="rounded-full border border-choc/15 px-3 py-1.5 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-30"
                >
                  ↑
                </button>

                <button
                  type="button"
                  onClick={() => moveOption(index, 1)}
                  disabled={loading || index === options.length - 1}
                  className="rounded-full border border-choc/15 px-3 py-1.5 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-30"
                >
                  ↓
                </button>

                {editingId === option.id ? (
                  <>
                    <button
                      type="button"
                      onClick={() => saveRename(option)}
                      disabled={loading}
                      className="rounded-full bg-caramel px-4 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
                    >
                      Save
                    </button>

                    <button
                      type="button"
                      onClick={cancelEditing}
                      disabled={loading}
                      className="rounded-full border border-choc/15 px-4 py-1.5 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => startEditing(option)}
                    disabled={loading}
                    className="rounded-full border border-choc/15 px-4 py-1.5 text-xs font-semibold"
                  >
                    Rename
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => deleteOption(option)}
                  disabled={loading}
                  className="rounded-full border border-red-200 px-4 py-1.5 text-xs font-semibold text-red-600 disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}