"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { createService, updateService, type ServiceFormState } from "@/actions/services";
import { MediaManager } from "./media-manager";
import type { Category, Media, Service } from "@prisma/client";

const INITIAL_STATE: ServiceFormState = {};

const inputClass =
  "rounded-xl border border-input bg-[#F5F1E9] px-3.5 py-3.5 text-[15.5px] text-foreground outline-none focus:border-accent";

export function ServiceForm({
  service,
  categories,
  onClose,
}: {
  service: (Service & { media: Media[] }) | null;
  categories: Category[];
  onClose: () => void;
}) {
  const router = useRouter();
  const isEdit = !!service;
  const action = isEdit ? updateService.bind(null, service.id) : createService;
  const [state, formAction, pending] = useActionState(action, INITIAL_STATE);

  return (
    <div className="mt-7.5 rounded-[20px] border border-border bg-surface p-8">
      <div className="flex items-center justify-between gap-6 border-b border-border pb-5">
        <div>
          <div className="text-[12px] uppercase tracking-[0.08em] text-muted">
            {isEdit ? "Modifier la prestation" : "Nouvelle prestation"}
          </div>
          <h2 className="mt-2 text-[28px]">{isEdit ? service.title : "Créer une prestation"}</h2>
        </div>
        <button type="button" onClick={onClose} className="cursor-pointer text-[14px] text-muted">
          Fermer ✕
        </button>
      </div>

      <form
        action={async (formData) => {
          await formAction(formData);
          router.refresh();
        }}
        className="mt-6 grid grid-cols-1 gap-4.5 sm:grid-cols-2"
      >
        <label className="flex flex-col gap-1.5 text-[14px] text-foreground-soft">
          Titre de la prestation
          <input
            name="title"
            required
            defaultValue={service?.title}
            placeholder="Entretien régulier du logement"
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-[14px] text-foreground-soft">
          Catégorie
          <select
            name="categoryId"
            defaultValue={service?.categoryId ?? categories[0]?.id ?? ""}
            className={inputClass}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-[14px] text-foreground-soft">
          Durée minimale / fréquence
          <input
            name="durationLabel"
            required
            defaultValue={service?.durationLabel}
            placeholder="dès 2 h · hebdomadaire"
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-[14px] text-foreground-soft">
          Visibilité sur le site
          <label className="flex items-center gap-2.5 rounded-xl border border-input bg-[#F5F1E9] px-3.5 py-3.5 text-[15px]">
            <input
              type="checkbox"
              name="active"
              defaultChecked={service?.active ?? true}
              className="size-4 accent-foreground"
            />
            Visible dans le catalogue
          </label>
        </label>
        <label className="col-span-full flex flex-col gap-1.5 text-[14px] text-foreground-soft">
          Description publique
          <textarea
            name="description"
            required
            rows={4}
            defaultValue={service?.description}
            placeholder="Ce que comprend la prestation, ce qui est fourni…"
            className={`resize-y ${inputClass}`}
          />
        </label>

        {state.error && <p className="col-span-full text-[14px] text-danger">{state.error}</p>}

        <div className="col-span-full flex items-center gap-3">
          <button
            type="submit"
            disabled={pending}
            className="cursor-pointer rounded-full bg-foreground px-6 py-3.5 text-[15px] font-medium text-background disabled:opacity-60"
          >
            {pending ? "Enregistrement…" : "Enregistrer"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-full border border-input px-5.5 py-3.5 text-[15px]"
          >
            Annuler
          </button>
        </div>
      </form>

      {isEdit ? (
        <MediaManager serviceId={service.id} media={service.media} />
      ) : (
        <p className="mt-7 border-t border-border pt-6 text-[14.5px] text-muted">
          Enregistrez le service pour pouvoir ajouter des photos et vidéos.
        </p>
      )}
    </div>
  );
}
