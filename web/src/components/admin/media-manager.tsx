"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteMedia, uploadMedia, type MediaFormState } from "@/actions/media";
import type { Media } from "@prisma/client";

export function MediaManager({ serviceId, media }: { serviceId: string; media: Media[] }) {
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
      const result: MediaFormState = await uploadMedia(serviceId, {}, formData);
      if (result.error) setError(result.error);
      if (fileInput.current) fileInput.current.value = "";
      router.refresh();
    });
  }

  function handleRemove(id: string) {
    startTransition(async () => {
      await deleteMedia(id);
      router.refresh();
    });
  }

  return (
    <div className="border-t border-border pt-6 mt-7">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h3 className="text-[24px]">Médias de la prestation</h3>
          <p className="mt-2 text-[14.5px] text-muted">
            Photos (JPEG/PNG/WebP, 8 Mo max) ou vidéos (MP4/WebM/MOV, 200 Mo max).
          </p>
        </div>
        <button
          type="button"
          onClick={() => fileInput.current?.click()}
          disabled={pending}
          className="cursor-pointer rounded-full border border-input px-4 py-2.5 text-[13.5px] disabled:opacity-60"
        >
          {pending ? "Envoi…" : "+ Ajouter un fichier"}
        </button>
        <input
          ref={fileInput}
          type="file"
          accept="image/jpeg,image/png,image/webp,video/mp4,video/webm,video/quicktime"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {error && <p className="mt-3 text-[14px] text-danger">{error}</p>}

      {media.length > 0 && (
        <div className="mt-5.5 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {media.map((m) => (
            <div key={m.id} className="rounded-2xl border border-border bg-[#F5F1E9] p-3">
              <div className="relative h-32 overflow-hidden rounded-[11px] bg-tint">
                {m.type === "PHOTO" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.url} alt="" className="h-full w-full object-cover" />
                ) : (
                  <video
                    src={`${m.url}#t=0.1`}
                    className="h-full w-full object-cover"
                    preload="metadata"
                    muted
                    playsInline
                  />
                )}
                <span className="absolute left-2 top-2 rounded-full bg-foreground/75 px-2.5 py-1 text-[10.5px] uppercase tracking-[0.08em] text-background">
                  {m.type === "PHOTO" ? "Photo" : "Vidéo"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(m.id)}
                disabled={pending}
                className="mt-2.5 cursor-pointer text-[13px] text-danger disabled:opacity-60"
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
