"use client";

import { useActionState, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { login, type LoginFormState } from "@/actions/auth";

const INITIAL_STATE: LoginFormState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, INITIAL_STATE);
  const [visible, setVisible] = useState(false);

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
        <div className="relative">
          <input
            type={visible ? "text" : "password"}
            name="password"
            required
            placeholder="••••••••"
            className="w-full rounded-xl border border-input bg-surface py-3.5 pl-3.5 pr-12 text-[15.5px] text-foreground outline-none focus:border-accent"
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={
              visible ? "Masquer le mot de passe" : "Afficher le mot de passe"
            }
            className="absolute inset-y-0 right-0 flex w-12 cursor-pointer items-center justify-center text-muted hover:text-foreground"
          >
            {visible ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
          </button>
        </div>
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
