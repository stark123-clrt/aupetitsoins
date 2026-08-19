"use client";

import { useActionState, useState } from "react";
import { postComment, type CommentFormState } from "@/actions/comments";

const INITIAL_STATE: CommentFormState = {};

export function CommentForm({ slug }: { slug: string }) {
  const action = postComment.bind(null, slug);
  const [state, formAction, pending] = useActionState(action, INITIAL_STATE);
  const [rating, setRating] = useState(5);

  if (state.success) {
    return (
      <div className="rounded-xl border border-success-fg/25 bg-surface px-4 py-3.5 text-[14.5px] text-success-fg">
        Merci, votre avis est en attente de modération.
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-[14px] text-foreground-soft">
        Votre nom
        <input
          type="text"
          name="authorName"
          required
          maxLength={80}
          placeholder="Prénom et initiale"
          className="rounded-xl border border-input bg-surface px-3.5 py-3 text-[15.5px] text-foreground outline-none focus:border-accent"
        />
      </label>

      <div className="flex flex-col gap-2 text-[14px] text-foreground-soft">
        Votre note
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              className="flex size-10.5 items-center justify-center rounded-xl border border-input bg-surface text-xl leading-none"
              style={{ color: n <= rating ? "var(--accent)" : "var(--input)" }}
              aria-label={`${n} étoile${n > 1 ? "s" : ""}`}
            >
              ★
            </button>
          ))}
        </div>
        <input type="hidden" name="rating" value={rating} />
      </div>

      <label className="flex flex-col gap-1.5 text-[14px] text-foreground-soft">
        Votre message
        <textarea
          name="content"
          required
          maxLength={2000}
          rows={5}
          placeholder="Ce qui s'est bien passé, ce qui pourrait être amélioré…"
          className="resize-y rounded-xl border border-input bg-surface px-3.5 py-3 text-[15.5px] text-foreground outline-none focus:border-accent"
        />
      </label>

      {state.error && <p className="text-[14px] text-danger">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="cursor-pointer rounded-full bg-foreground px-6 py-3.5 text-[15.5px] font-medium text-background disabled:opacity-60"
      >
        {pending ? "Envoi…" : "Envoyer mon avis"}
      </button>
    </form>
  );
}
