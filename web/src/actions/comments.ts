"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export interface CommentFormState {
  error?: string;
  success?: boolean;
}

export async function postComment(
  slug: string,
  _prevState: CommentFormState,
  formData: FormData
): Promise<CommentFormState> {
  const authorName = String(formData.get("authorName") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const ratingRaw = Number(formData.get("rating"));
  const rating = Number.isFinite(ratingRaw) ? Math.min(5, Math.max(1, ratingRaw)) : 5;

  if (!authorName || authorName.length > 80) {
    return { error: "Merci d'indiquer votre nom (80 caractères maximum)." };
  }
  if (!content || content.length > 2000) {
    return { error: "Merci de rédiger un message (2000 caractères maximum)." };
  }

  const service = await prisma.service.findFirst({
    where: { slug, active: true },
    select: { id: true },
  });
  if (!service) {
    return { error: "Ce service n'existe plus." };
  }

  await prisma.comment.create({
    data: { serviceId: service.id, authorName, content, rating, approved: false },
  });

  revalidatePath(`/services/${slug}`);
  return { success: true };
}
