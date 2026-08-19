"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  deleteAboutPhoto,
  uploadAboutPhoto,
  type SettingFormState,
} from "@/actions/site-settings";

export function AboutPhotoManager({ photo }: { photo: string | null }) {
  const router = useRouter();
  const fileInput = useRef<HTMLInputElement>(null);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    const formData = new FormData();
    formData.append("file", file);
    startTransition(async () => {
      const result: SettingFormState = await uploadAboutPhoto({}, formData);
      if (result.error) setError(result.error);
      if (fileInput.current) fileInput.current.value = "";
      router.refresh();
    });
  }

  function handleRemove() {
    startTransition(async () => {
      await deleteAboutPhoto();
      router.refresh();
    });
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-7">
      <h2 className="text-[24px]">Photo de la page « À propos »</h2>
      <p className="mt-2 max-w-[560px] text-[14.5px] text-muted">
        Le portrait affiché à côté du texte de présentation. JPEG, PNG ou WebP,
        8 Mo maximum. Une image verticale rend mieux dans ce cadre.
      </p>

      <div className="mt-6 flex flex-wrap items-start gap-6">
        <div className="h-[220px] w-[160px] shrink-0 overflow-hidden rounded-[110px_16px_110px_16px] bg-tint">
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center px-4 text-center text-[13px] text-muted">
              Aucune photo
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            disabled={pending}
            className="cursor-pointer rounded-full border border-input px-5 py-2.5 text-[14px] disabled:opacity-60"
          >
            {pending ? "Envoi…" : photo ? "Remplacer la photo" : "Ajouter une photo"}
          </button>
          {photo && (
            <button
              type="button"
              onClick={handleRemove}
              disabled={pending}
              className="cursor-pointer text-left text-[13.5px] text-danger disabled:opacity-60"
            >
              Supprimer la photo
            </button>
          )}
          {error && <p className="text-[14px] text-danger">{error}</p>}
        </div>

        <input
          ref={fileInput}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
