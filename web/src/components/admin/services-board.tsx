"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteService, toggleServiceActive } from "@/actions/services";
import { ServiceForm } from "./service-form";
import type { Category, Media, Service } from "@prisma/client";

type ServiceWithMedia = Service & { media: Media[]; category: Category };

export function ServicesBoard({
  services,
  categories,
}: {
  services: ServiceWithMedia[];
  categories: Category[];
}) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [pending, startTransition] = useTransition();

  const activeCount = services.filter((s) => s.active).length;
  const editingService =
    editingId && editingId !== "new" ? services.find((s) => s.id === editingId) ?? null : null;

  function handleToggle(id: string, active: boolean) {
    startTransition(async () => {
      await toggleServiceActive(id, active);
      router.refresh();
    });
  }

  function handleDelete(id: string, title: string) {
    if (!confirm(`Supprimer « ${title} » et tous ses médias associés ?`)) return;
    startTransition(async () => {
      await deleteService(id);
      if (editingId === id) setEditingId(null);
      router.refresh();
    });
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="text-[36px] sm:text-[40px]">Gestion des services</h1>
          <p className="mt-2.5 text-[15.5px] text-muted">
            {services.length} prestations · {activeCount} actives ·{" "}
            {services.length - activeCount} désactivées
          </p>
        </div>
        <button
          type="button"
          onClick={() => setEditingId("new")}
          className="cursor-pointer rounded-full bg-foreground px-5.5 py-3.25 text-[15px] font-medium text-background"
        >
          + Nouvelle prestation
        </button>
      </div>

      <div className="mt-7 overflow-hidden rounded-[18px] border border-border bg-surface">
        <div className="grid grid-cols-[2.2fr_1.3fr_0.8fr_1.2fr] gap-4 bg-[#F5F1E9] px-6 py-3.5 text-[12px] uppercase tracking-[0.08em] text-muted sm:grid-cols-[2.2fr_1.3fr_0.8fr_0.9fr_1.2fr]">
          <div>Prestation</div>
          <div>Catégorie</div>
          <div className="hidden sm:block">Médias</div>
          <div>Statut</div>
          <div className="text-right">Actions</div>
        </div>
        {services.map((s) => (
          <div
            key={s.id}
            className="grid grid-cols-[2.2fr_1.3fr_0.8fr_1.2fr] items-center gap-4 border-t border-[#F0E8DA] px-6 py-4.5 sm:grid-cols-[2.2fr_1.3fr_0.8fr_0.9fr_1.2fr]"
          >
            <div>
              <div className="text-[16px] font-medium">{s.title}</div>
              <div className="mt-0.5 text-[13.5px] text-muted-2">{s.durationLabel}</div>
            </div>
            <div className="text-[14.5px] text-foreground-soft">{s.category.name}</div>
            <div className="hidden text-[14.5px] text-foreground-soft sm:block">
              {s.media.length} média{s.media.length > 1 ? "s" : ""}
            </div>
            <div>
              <span
                className={
                  "rounded-full px-3 py-1.5 text-[13px] " +
                  (s.active ? "bg-success-bg text-success-fg" : "bg-tint text-muted")
                }
              >
                {s.active ? "Active" : "Désactivée"}
              </span>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingId(s.id)}
                className="cursor-pointer rounded-full border border-input px-3.5 py-2 text-[13.5px]"
              >
                Modifier
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={() => handleToggle(s.id, !s.active)}
                className="cursor-pointer rounded-full border border-input px-3.5 py-2 text-[13.5px] text-muted disabled:opacity-60"
              >
                {s.active ? "Désactiver" : "Activer"}
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={() => handleDelete(s.id, s.title)}
                className="cursor-pointer rounded-full border border-danger/35 px-3.5 py-2 text-[13.5px] text-danger disabled:opacity-60"
              >
                Suppr.
              </button>
            </div>
          </div>
        ))}
        {services.length === 0 && (
          <div className="px-6 py-10 text-center text-muted">
            Aucun service. Créez votre première prestation.
          </div>
        )}
      </div>

      {editingId && categories.length === 0 && (
        <p className="mt-7 rounded-[18px] border border-border bg-surface px-6 py-5 text-[15px] text-muted">
          Créez d&apos;abord une catégorie dans l&apos;onglet « Catégories » : chaque
          prestation doit en avoir une.
        </p>
      )}

      {editingId && categories.length > 0 && (
        <ServiceForm
          key={editingId}
          service={editingId === "new" ? null : editingService}
          categories={categories}
          onClose={() => setEditingId(null)}
        />
      )}
    </div>
  );
}
