"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function approveComment(id: string) {
  await requireAdmin();
  const comment = await prisma.comment.update({
    where: { id },
    data: { approved: true },
    include: { service: true },
  });
  revalidatePath("/admin/avis");
  revalidatePath(`/services/${comment.service.slug}`);
}

export async function deleteComment(id: string) {
  await requireAdmin();
  const comment = await prisma.comment.findUnique({
    where: { id },
    include: { service: true },
  });
  if (!comment) return;
  await prisma.comment.delete({ where: { id } });
  revalidatePath("/admin/avis");
  revalidatePath(`/services/${comment.service.slug}`);
}
