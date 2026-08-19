"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import {
  IMAGE_TYPES,
  MAX_IMAGE_BYTES,
  removeUploadedFile,
  saveUploadedFile,
} from "@/lib/uploads";
import { ABOUT_PHOTO_KEY } from "@/lib/settings";

export interface SettingFormState {
  error?: string;
  success?: boolean;
}

export async function uploadAboutPhoto(
  _prevState: SettingFormState,
  formData: FormData
): Promise<SettingFormState> {
  await requireAdmin();

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Choisissez une image." };
  }

  if (!(file.type in IMAGE_TYPES)) {
    return { error: "Format non supporté. Utilisez JPEG, PNG ou WebP." };
  }

  if (file.size > MAX_IMAGE_BYTES) {
    return {
      error: `Image trop volumineuse (${Math.round(
        MAX_IMAGE_BYTES / 1024 / 1024
      )} Mo maximum).`,
    };
  }

  const previous = await prisma.siteSetting.findUnique({
    where: { key: ABOUT_PHOTO_KEY },
  });

  const url = await saveUploadedFile(file, IMAGE_TYPES[file.type], "site");

  await prisma.siteSetting.upsert({
    where: { key: ABOUT_PHOTO_KEY },
    create: { key: ABOUT_PHOTO_KEY, value: url },
    update: { value: url },
  });

  // L'ancienne photo n'est plus référencée : on libère le disque.
  if (previous) await removeUploadedFile(previous.value);

  revalidatePath("/a-propos");
  revalidatePath("/admin/apparence");
  return { success: true };
}

export async function deleteAboutPhoto(): Promise<void> {
  await requireAdmin();

  const existing = await prisma.siteSetting.findUnique({
    where: { key: ABOUT_PHOTO_KEY },
  });
  if (!existing) return;

  await removeUploadedFile(existing.value);
  await prisma.siteSetting.delete({ where: { key: ABOUT_PHOTO_KEY } });

  revalidatePath("/a-propos");
  revalidatePath("/admin/apparence");
}
