import "server-only";
import { randomBytes } from "crypto";
import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import { slugify } from "./format";

export const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export const VIDEO_TYPES: Record<string, string> = {
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/quicktime": "mov",
};

export const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
export const MAX_VIDEO_BYTES = 200 * 1024 * 1024;

/**
 * Écrit un fichier téléversé dans public/uploads/<dir> et renvoie son URL
 * publique. Le nom est slugifié puis suffixé pour éviter toute collision.
 */
export async function saveUploadedFile(
  file: File,
  ext: string,
  dir: string
): Promise<string> {
  const baseName = slugify(file.name.replace(/\.[^.]+$/, "")) || "fichier";
  const fileName = `${baseName}-${randomBytes(6).toString("hex")}.${ext}`;

  const uploadDir = path.join(process.cwd(), "public", "uploads", dir);
  await mkdir(uploadDir, { recursive: true });
  await writeFile(
    path.join(uploadDir, fileName),
    Buffer.from(await file.arrayBuffer())
  );

  return `/uploads/${dir}/${fileName}`;
}

/** Supprime le fichier correspondant à une URL publique. Sans effet s'il a déjà disparu. */
export async function removeUploadedFile(publicUrl: string): Promise<void> {
  try {
    await unlink(path.join(process.cwd(), "public", publicUrl));
  } catch {
    // fichier déjà absent : rien à faire
  }
}
