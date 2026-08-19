"use client";

import { useActionState } from "react";
import { submitContactRequest, type ContactFormState } from "@/actions/contact";
import type { Category } from "@prisma/client";

const INITIAL_STATE: ContactFormState = {};

const inputClass =
  "rounded-xl border border-input bg-background px-3.5 py-3.5 text-[15.5px] text-foreground outline-none focus:border-accent";

export function ContactForm({ categories }: { categories: Category[] }) {
  const [state, formAction, pending] = useActionState(
    submitContactRequest,
    INITIAL_STATE
  );

  return (
    <div className="rounded-[22px] border border-border-2 bg-surface p-9">
      <h2 className="text-[26px] sm:text-[30px]">Formulaire de contact</h2>
      <p className="mt-2.5 text-[15px] text-muted">
        Décrivez brièvement votre besoin, Aïssata vous rappelle.
      </p>

      {state.success ? (
        <div className="mt-6 rounded-xl border border-success-fg/25 bg-background px-4 py-3.5 text-[14.5px] text-success-fg">
          Demande envoyée. Aïssata vous recontacte dès que possible.
        </div>
      ) : (
        <form action={formAction} className="mt-6.5 grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1.5 text-[14px] text-foreground-soft">
            Nom et prénom
            <input name="fullName" required placeholder="Aïssata Diallo" className={inputClass} />
          </label>
          <label className="flex flex-col gap-1.5 text-[14px] text-foreground-soft">
            Téléphone
            <input name="phone" required placeholder="06 12 34 56 78" className={inputClass} />
          </label>
          <label className="col-span-2 flex flex-col gap-1.5 text-[14px] text-foreground-soft">
            E-mail
            <input
              type="email"
              name="email"
              placeholder="vous@exemple.fr"
              className={inputClass}
            />
          </label>
          <label className="col-span-2 flex flex-col gap-1.5 text-[14px] text-foreground-soft">
            Prestation souhaitée
            <select
              name="desiredCategory"
              defaultValue={categories[0]?.name ?? ""}
              className={inputClass}
            >
              {categories.map((c) => (
                // On enregistre le nom : la demande reste lisible même si la
                // catégorie est renommée ou supprimée par la suite.
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
              <option value="">Je ne sais pas encore</option>
            </select>
          </label>
          <label className="col-span-2 flex flex-col gap-1.5 text-[14px] text-foreground-soft">
            Votre message
            <textarea
              name="message"
              required
              rows={6}
              placeholder="Fréquence souhaitée, jours disponibles, surface du logement…"
              className={`resize-y ${inputClass}`}
            />
          </label>

          {state.error && (
            <p className="col-span-2 text-[14px] text-danger">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="col-span-2 mt-1 cursor-pointer rounded-full bg-foreground px-6 py-4 text-[15.5px] font-medium text-background disabled:opacity-60"
          >
            {pending ? "Envoi…" : "Envoyer ma demande"}
          </button>
        </form>
      )}

      <div className="mt-4 text-[13px] leading-relaxed text-muted-2">
        Vos coordonnées servent uniquement à traiter votre demande.
      </div>
    </div>
  );
}
