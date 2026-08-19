"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  createCategory,
  deleteCategory,
  moveCategory,
  updateCategory,
  type CategoryFormState,
} from "@/actions/categories";
import type { Category } from "@prisma/client";

type CategoryRow = Category & { _count: { services: number } };

const inputClass =
  "w-full rounded-[10px] border border-input bg-surface px-3.5 py-2.5 text-[15px] outline-none focus:border-accent";

function CategoryForm({
  category,
  onDone,
}: {
  category?: CategoryRow;
  onDone: () => void;
}) {
  const router = useRouter();
  const action = category
    ? updateCategory.bind(null, category.id)
    : createCategory;
  const [state, formAction, pending] = useActionState<CategoryFormState, FormData>(
    action,
    {}
  );

  // Le serveur ne renvoie rien en cas de succès : on referme et on rafraîchit
  // seulement quand l'action s'est terminée sans erreur.
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    if (submitted && !pending && !state.error) {
      router.refresh();
      onDone();
    }
  }, [submitted, pending, state.error, router, onDone]);

  return (
    <form
      action={formAction}
      onSubmit={() => setSubmitted(true)}
      className="mt-5 rounded-2xl border border-border bg-surface p-6"
    >
      <h3 className="text-[20px]">
        {category ? "Modifier la catégorie" : "Nouvelle catégorie"}
      </h3>

      <div className="mt-4 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-[13.5px] text-muted">Nom</span>
          <input
            name="name"
            defaultValue={category?.name ?? ""}
            maxLength={80}
            required
            placeholder="Aide aux personnes âgées"
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-[13.5px] text-muted">
            Description <span className="text-muted-2">(affichée sur l&apos;accueil)</span>
          </span>
          <textarea
            name="description"
            defaultValue={category?.description ?? ""}
            rows={2}
            placeholder="Accompagnement, courses, présence : le quotidien facilité."
            className={inputClass}
          />
        </label>
      </div>

      {state.error && <p className="mt-3 text-[14px] text-danger">{state.error}</p>}

      <div className="mt-5 flex gap-3">
        <button
          type="submit"
          disabled={pending}
          className="cursor-pointer rounded-full bg-foreground px-5 py-2.5 text-[14px] text-background disabled:opacity-60"
        >
          {pending ? "Enregistrement…" : "Enregistrer"}
        </button>
        <button
          type="button"
          onClick={onDone}
          className="cursor-pointer rounded-full border border-input px-5 py-2.5 text-[14px]"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}

export function CategoriesBoard({ categories }: { categories: CategoryRow[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<string | "new" | null>(null);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleDelete(row: CategoryRow) {
    if (!confirm(`Supprimer la catégorie « ${row.name} » ?`)) return;
    setError(null);
    startTransition(async () => {
      const result = await deleteCategory(row.id);
      if (result.error) setError(result.error);
      router.refresh();
    });
  }

  function handleMove(id: string, direction: "up" | "down") {
    startTransition(async () => {
      await moveCategory(id, direction);
      router.refresh();
    });
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <h1 className="text-[34px] leading-tight">Catégories</h1>
          <p className="mt-2 text-[15px] text-muted">
            Les univers affichés sur l&apos;accueil et les filtres du catalogue.
            L&apos;ordre ci-dessous est celui du site.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setEditing(editing === "new" ? null : "new")}
          className="cursor-pointer rounded-full bg-foreground px-5 py-2.5 text-[14px] text-background"
        >
          + Nouvelle catégorie
        </button>
      </div>

      {error && <p className="mt-4 text-[14px] text-danger">{error}</p>}

      {editing === "new" && (
        <CategoryForm key="new" onDone={() => setEditing(null)} />
      )}

      <div className="mt-7 overflow-hidden rounded-2xl border border-border bg-surface">
        {categories.length === 0 ? (
          <p className="px-6 py-8 text-[15px] text-muted">
            Aucune catégorie. Créez-en une pour pouvoir ajouter des prestations.
          </p>
        ) : (
          categories.map((row, i) => (
            <div key={row.id} className="border-b border-border last:border-b-0">
              <div className="flex flex-wrap items-center gap-4 px-6 py-4">
                <div className="flex flex-col gap-0.5">
                  <button
                    type="button"
                    onClick={() => handleMove(row.id, "up")}
                    disabled={pending || i === 0}
                    aria-label={`Monter ${row.name}`}
                    className="cursor-pointer px-1 text-[12px] leading-none text-muted disabled:opacity-25"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(row.id, "down")}
                    disabled={pending || i === categories.length - 1}
                    aria-label={`Descendre ${row.name}`}
                    className="cursor-pointer px-1 text-[12px] leading-none text-muted disabled:opacity-25"
                  >
                    ▼
                  </button>
                </div>

                <div className="min-w-[220px] flex-1">
                  <div className="text-[16.5px]">{row.name}</div>
                  {row.description && (
                    <div className="mt-0.5 max-w-[520px] text-[13.5px] text-muted">
                      {row.description}
                    </div>
                  )}
                </div>

                <div className="text-[13.5px] text-muted">
                  {row._count.services} prestation
                  {row._count.services > 1 ? "s" : ""}
                </div>

                <div className="flex gap-3 text-[13.5px]">
                  <button
                    type="button"
                    onClick={() => setEditing(editing === row.id ? null : row.id)}
                    className="cursor-pointer"
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(row)}
                    disabled={pending}
                    className="cursor-pointer text-danger disabled:opacity-60"
                  >
                    Suppr.
                  </button>
                </div>
              </div>

              {editing === row.id && (
                <div className="px-6 pb-6">
                  <CategoryForm
                    key={row.id}
                    category={row}
                    onDone={() => setEditing(null)}
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
