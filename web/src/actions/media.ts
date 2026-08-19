"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import {
  IMAGE_TYPES,
  MAX_IMAGE_BYTES,
  MAX_VIDEO_BYTES,
  VIDEO_TYPES,
  removeUploadedFile,
  saveUploadedFile,
} from "@/lib/uploads";

export interface MediaFormState {
  error?: string;
}

export async function uploadMedia(
  serviceId: string,
  _prevState: MediaFormState,
  formData: FormData
): Promise<MediaFormState> {
  await requireAdmin();

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Choisissez un fichier." };
  }

  const service = await prisma.service.findUnique({ where: { id: serviceId } });
  if (!service) return { error: "Service introuvable." };

  const isImage = file.type in IMAGE_TYPES;
  const isVideo = file.type in VIDEO_TYPES;
  if (!isImage && !isVideo) {
    return { error: "Format non supporté. Utilisez JPEG, PNG, WebP, MP4, WebM ou MOV." };
  }

  const maxBytes = isImage ? MAX_IMAGE_BYTES : MAX_VIDEO_BYTES;
  if (file.size > maxBytes) {
    return { error: `Fichier trop volumineux (${Math.round(maxBytes / 1024 / 1024)} Mo maximum).` };
  }

  const ext = isImage ? IMAGE_TYPES[file.type] : VIDEO_TYPES[file.type];
  const url = await saveUploadedFile(file, ext, "media");

  const position = await prisma.media.count({ where: { serviceId } });
  await prisma.media.create({
    data: {
      serviceId,
      type: isImage ? "PHOTO" : "VIDEO",
      url,
      position,
    },
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath(`/services/${service.slug}`);
  revalidatePath("/");
  return {};
}

export async function deleteMedia(mediaId: string) {
  await requireAdmin();
  const media = await prisma.media.findUnique({
    where: { id: mediaId },
    include: { service: true },
  });
  if (!media) return;

  await removeUploadedFile(media.url);
  await prisma.media.delete({ where: { id: mediaId } });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath(`/services/${media.service.slug}`);
  revalidatePath("/");
}
