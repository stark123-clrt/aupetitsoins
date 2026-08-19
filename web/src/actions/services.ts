"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/format";

export interface ServiceFormState {
  error?: string;
}

async function categoryExists(categoryId: string): Promise<boolean> {
  if (!categoryId) return false;
  return (await prisma.category.count({ where: { id: categoryId } })) > 0;
}

async function uniqueSlug(title: string, ignoreId?: string): Promise<string> {
  const base = slugify(title) || "service";
  let slug = base;
  let suffix = 2;
  while (true) {
    const existing = await prisma.service.findUnique({ where: { slug } });
    if (!existing || existing.id === ignoreId) return slug;
    slug = `${base}-${suffix++}`;
  }
}

function readServiceFields(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "");
  const durationLabel = String(formData.get("durationLabel") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const active = formData.get("active") === "on";
  return { title, categoryId, durationLabel, description, active };
}

export async function createService(
  _prevState: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  await requireAdmin();
  const { title, categoryId, durationLabel, description, active } =
    readServiceFields(formData);

  if (!title || title.length > 120) {
    return { error: "Le titre est requis (120 caractères maximum)." };
  }
  if (!(await categoryExists(categoryId))) {
    return { error: "Catégorie invalide." };
  }
  if (!durationLabel) {
    return { error: "La durée / fréquence est requise." };
  }
  if (!description) {
    return { error: "La description est requise." };
  }

  const slug = await uniqueSlug(title);
  await prisma.service.create({
    data: { title, slug, categoryId, durationLabel, description, active },
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
  return {};
}

export async function updateService(
  id: string,
  _prevState: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  await requireAdmin();
  const { title, categoryId, durationLabel, description, active } =
    readServiceFields(formData);

  if (!title || title.length > 120) {
    return { error: "Le titre est requis (120 caractères maximum)." };
  }
  if (!(await categoryExists(categoryId))) {
    return { error: "Catégorie invalide." };
  }
  if (!durationLabel) {
    return { error: "La durée / fréquence est requise." };
  }
  if (!description) {
    return { error: "La description est requise." };
  }

  const current = await prisma.service.findUnique({ where: { id } });
  if (!current) return { error: "Service introuvable." };

  const slug =
    current.title === title ? current.slug : await uniqueSlug(title, id);

  await prisma.service.update({
    where: { id },
    data: { title, slug, categoryId, durationLabel, description, active },
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath(`/services/${slug}`);
  revalidatePath("/");
  return {};
}

export async function toggleServiceActive(id: string, active: boolean) {
  await requireAdmin();
  await prisma.service.update({ where: { id }, data: { active } });
  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
}

export async function deleteService(id: string) {
  await requireAdmin();
  await prisma.service.delete({ where: { id } });
  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
}
