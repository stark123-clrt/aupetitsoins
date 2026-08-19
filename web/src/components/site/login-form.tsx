"use client";

import { useActionState } from "react";
import { login, type LoginFormState } from "@/actions/auth";

const INITIAL_STATE: LoginFormState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, INITIAL_STATE);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-[14px] text-foreground-soft">
        Identifiant
        <input
          type="email"
          name="email"
          required
          placeholder="contact@aupetit-soin.fr"
          className="rounded-xl border border-input bg-surface px-3.5 py-3.5 text-[15.5px] text-foreground outline-none focus:border-accent"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-[14px] text-foreground-soft">
        Mot de passe
        <input
          type="password"
          name="password"
          required
          placeholder="••••••••"
          className="rounded-xl border border-input bg-surface px-3.5 py-3.5 text-[15.5px] text-foreground outline-none focus:border-accent"
        />
      </label>

      {state.error && <p className="text-[14px] text-danger">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="mt-1 cursor-pointer rounded-full bg-foreground px-6 py-4 text-[15.5px] font-medium text-background disabled:opacity-60"
      >
        {pending ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
