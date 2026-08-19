import { createReadStream } from "fs";
import { stat } from "fs/promises";
import path from "path";
import type { ReadStream } from "fs";

/**
 * Sert les fichiers téléversés depuis le disque.
 *
 * Next.js dresse la liste du dossier public/ à la compilation : un fichier
 * déposé ensuite n'est jamais servi par le serveur de production. Les médias
 * ajoutés depuis l'administration doivent donc passer par cette route.
 */

const UPLOADS_ROOT = path.join(process.cwd(), "public", "uploads");

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
};

function toWebStream(stream: ReadStream): ReadableStream<Uint8Array> {
  return new ReadableStream({
    start(controller) {
      stream.on("data", (chunk) =>
        controller.enqueue(
          new Uint8Array(
            typeof chunk === "string" ? Buffer.from(chunk) : chunk
          )
        )
      );
      stream.on("end", () => controller.close());
      stream.on("error", (err) => controller.error(err));
    },
    cancel() {
      stream.destroy();
    },
  });
}

export async function GET(
  request: Request,
  ctx: RouteContext<"/uploads/[...path]">
) {
  const { path: segments } = await ctx.params;

  // Les segments viennent de l'URL : on refuse tout ce qui pourrait sortir du
  // dossier des téléversements (../, chemins absolus, octet nul).
  if (
    segments.some(
      (s) => !s || s.includes("..") || s.includes("\0") || path.isAbsolute(s)
    )
  ) {
    return new Response("Chemin invalide", { status: 400 });
  }

  const filePath = path.join(UPLOADS_ROOT, ...segments);
  const resolved = path.resolve(filePath);
  if (resolved !== UPLOADS_ROOT && !resolved.startsWith(UPLOADS_ROOT + path.sep)) {
    return new Response("Chemin invalide", { status: 400 });
  }

  let info;
  try {
    info = await stat(resolved);
  } catch {
    return new Response("Fichier introuvable", { status: 404 });
  }
  if (!info.isFile()) {
    return new Response("Fichier introuvable", { status: 404 });
  }

  const contentType =
    CONTENT_TYPES[path.extname(resolved).toLowerCase()] ??
    "application/octet-stream";

  const headers: Record<string, string> = {
    "Content-Type": contentType,
    // Le nom des fichiers contient un suffixe aléatoire : leur contenu ne
    // change jamais, on peut donc les mettre en cache durablement.
    "Cache-Control": "public, max-age=31536000, immutable",
    "Accept-Ranges": "bytes",
  };

  // Les requêtes partielles permettent de se déplacer dans une vidéo sans
  // devoir la télécharger entièrement.
  const range = request.headers.get("range");
  const match = range?.match(/^bytes=(\d*)-(\d*)$/);

  if (match) {
    const start = match[1] ? Number(match[1]) : 0;
    const end = match[2] ? Number(match[2]) : info.size - 1;

    if (
      Number.isNaN(start) ||
      Number.isNaN(end) ||
      start > end ||
      start >= info.size
    ) {
      return new Response("Plage demandée invalide", {
        status: 416,
        headers: { "Content-Range": `bytes */${info.size}` },
      });
    }

    const last = Math.min(end, info.size - 1);
    return new Response(
      toWebStream(createReadStream(resolved, { start, end: last })),
      {
        status: 206,
        headers: {
          ...headers,
          "Content-Range": `bytes ${start}-${last}/${info.size}`,
          "Content-Length": String(last - start + 1),
        },
      }
    );
  }

  return new Response(toWebStream(createReadStream(resolved)), {
    status: 200,
    headers: { ...headers, "Content-Length": String(info.size) },
  });
}
