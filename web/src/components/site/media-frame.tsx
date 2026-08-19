import { Sparkles, Play } from "lucide-react";
import type { Media } from "@prisma/client";

export function MediaFrame({
  media,
  alt,
  className = "",
  showPlay = false,
}: {
  media: Media | null | undefined;
  alt: string;
  className?: string;
  showPlay?: boolean;
}) {
  if (!media) {
    return (
      <div className={`flex items-center justify-center bg-tint ${className}`}>
        <Sparkles className="size-8 text-accent-soft" />
      </div>
    );
  }

  return (
    <div className={`relative bg-tint ${className}`}>
      {media.type === "PHOTO" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={media.url} alt={alt} className="h-full w-full object-cover" />
      ) : (
        // #t=0.1 : demande au navigateur de se caler sur la première frame,
        // sinon la vidéo s'affiche comme un rectangle vide tant qu'on ne la lit pas.
        <video
          src={`${media.url}#t=0.1`}
          className="h-full w-full object-cover"
          preload="metadata"
          muted
          playsInline
        />
      )}
      {showPlay && (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-surface/90 shadow-lg">
            <Play className="size-6 translate-x-0.5 fill-foreground text-foreground" />
          </span>
        </span>
      )}
      {media.type === "VIDEO" && !showPlay && (
        <span className="pointer-events-none absolute bottom-2 left-2 rounded-full bg-foreground/75 px-2.5 py-1 text-[10.5px] uppercase tracking-[0.08em] text-background">
          Vidéo
        </span>
      )}
    </div>
  );
}
