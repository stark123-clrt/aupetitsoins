import { useState } from "react";
import { Film, ImageOff } from "lucide-react";
import type { Media } from "@/types";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function MediaGallery({ media }: { media: Media[] }) {
  const [open, setOpen] = useState<Media | null>(null);

  if (media.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {media.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setOpen(item)}
            className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-accent"
          >
            {item.type === "PHOTO" ? (
              <img
                src={item.url}
                alt=""
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            ) : (
              <>
                <video src={item.url} className="h-full w-full object-cover" muted />
                <span className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Film className="size-8 text-white drop-shadow" />
                </span>
              </>
            )}
          </button>
        ))}
      </div>

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogTitle className="sr-only">Média</DialogTitle>
          {open?.type === "PHOTO" ? (
            <img src={open.url} alt="" className="max-h-[70vh] w-full rounded-lg object-contain" />
          ) : open ? (
            <video
              src={open.url}
              controls
              autoPlay
              className="max-h-[70vh] w-full rounded-lg"
            />
          ) : (
            <ImageOff className="size-8" />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
