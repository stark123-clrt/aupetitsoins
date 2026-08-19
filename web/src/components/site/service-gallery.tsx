"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import type { Media } from "@prisma/client";

export function ServiceGallery({ media, title }: { media: Media[]; title: string }) {
  const [current, setCurrent] = useState(0);
  const active = media[current];

  return (
    <div>
      <div className="relative h-[300px] overflow-hidden rounded-[22px] bg-tint sm:h-[470px]">
        {active.type === "PHOTO" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={active.url} alt={title} className="h-full w-full object-cover" />
        ) : (
          <video
            src={`${active.url}#t=0.1`}
            className="h-full w-full object-cover"
            preload="metadata"
            controls
            playsInline
          />
        )}
        {active.type === "VIDEO" && (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="flex size-[78px] items-center justify-center rounded-full bg-surface/90 shadow-lg">
              <Play className="size-6 translate-x-0.5 fill-foreground text-foreground" />
            </span>
          </span>
        )}
      </div>

      {media.length > 1 && (
        <div className="mt-3.5 grid grid-cols-4 gap-3.5">
          {media.map((m, i) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setCurrent(i)}
              className="relative h-[104px] overflow-hidden rounded-[14px] bg-tint p-0"
              style={{
                border: `2px solid ${i === current ? "var(--foreground)" : "transparent"}`,
              }}
            >
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
              {m.type === "VIDEO" && (
                <span className="absolute bottom-2 left-2 rounded-full bg-foreground/75 px-2.5 py-1 text-[10.5px] uppercase tracking-[0.08em] text-background">
                  Vidéo
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
