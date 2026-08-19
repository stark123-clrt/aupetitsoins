"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/format";

export interface CategoryFormState {
  error?: string;
}

async function uniqueSlug(name: string, ignoreId?: string): Promise<string> {
  const base = slugify(name) || "categorie";
  let slug = base;
  let suffix = 2;
  while (true) {
    const existing = await prisma.category.findUnique({ where: { slug } });
    if (!existing || existing.id === ignoreId) return slug;
    slug = `${base}-${suffix++}`;
  }
}

function readFields(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
  };
}

function revalidateAll() {
  revalidatePath("/admin/categories");
  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
}

export async function createCategory(
  _prevState: CategoryFormState,
  formData: FormData
): Promise<CategoryFormState> {
  await requireAdmin();
  const { name, description } = readFields(formData);

  if (!name || name.length > 80) {
    return { error: "Le nom est requis (80 caractères maximum)." };
  }

  const last = await prisma.category.findFirst({ orderBy: { position: "desc" } });
  await prisma.category.create({
    data: {
      name,
      description,
      slug: await uniqueSlug(name),
      position: (last?.position ?? -1) + 1,
    },
  });

  revalidateAll();
  return {};
}

export async function updateCategory(
  id: string,
  _prevState: CategoryFormState,
  formData: FormData
): Promise<CategoryFormState> {
  await requireAdmin();
  const { name, description } = readFields(formData);

  if (!name || name.length > 80) {
    return { error: "Le nom est requis (80 caractères maximum)." };
  }

  const current = await prisma.category.findUnique({ where: { id } });
  if (!current) return { error: "Catégorie introuvable." };

  // Le slug sert d'URL de filtre : on ne le change que si le nom change.
  const slug = current.name === name ? current.slug : await uniqueSlug(name, id);

  await prisma.category.update({
    where: { id },
    data: { name, description, slug },
  });

  revalidateAll();
  return {};
}

export async function deleteCategory(id: string): Promise<CategoryFormState> {
  await requireAdmin();

  // Une catégorie encore utilisée ne peut pas partir : les services deviendraient
  // orphelins. On demande de les déplacer d'abord.
  const used = await prisma.service.count({ where: { categoryId: id } });
  if (used > 0) {
    return {
      error: `Cette catégorie contient ${used} prestation(s). Déplacez-les avant de la supprimer.`,
    };
  }

  await prisma.category.delete({ where: { id } });
  revalidateAll();
  return {};
}

/** Décale une catégorie d'un cran dans l'ordre d'affichage. */
export async function moveCategory(id: string, direction: "up" | "down") {
  await requireAdmin();

  const all = await prisma.category.findMany({ orderBy: { position: "asc" } });
  const index = all.findIndex((c) => c.id === id);
  if (index === -1) return;

  const target = direction === "up" ? index - 1 : index + 1;
  if (target < 0 || target >= all.length) return;

  // Les positions stockées peuvent comporter des trous : on les réécrit toutes
  // après permutation, ce qui garantit un ordre cohérent.
  const reordered = [...all];
  [reordered[index], reordered[target]] = [reordered[target], reordered[index]];

  await prisma.$transaction(
    reordered.map((c, i) =>
      prisma.category.update({ where: { id: c.id }, data: { position: i } })
    )
  );

  revalidateAll();
}
