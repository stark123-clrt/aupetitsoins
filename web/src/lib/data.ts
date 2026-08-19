import "server-only";
import { prisma } from "./prisma";

export async function getCategories() {
  return prisma.category.findMany({ orderBy: { position: "asc" } });
}

/** Catégories ayant au moins un service actif, pour les filtres publics. */
export async function getVisibleCategories() {
  return prisma.category.findMany({
    where: { services: { some: { active: true } } },
    orderBy: { position: "asc" },
  });
}

export async function getActiveServices(categorySlug?: string) {
  return prisma.service.findMany({
    where: {
      active: true,
      ...(categorySlug ? { category: { slug: categorySlug } } : {}),
    },
    orderBy: { title: "asc" },
    include: { media: { orderBy: { position: "asc" } }, category: true },
  });
}

export async function getServiceBySlug(slug: string) {
  return prisma.service.findFirst({
    where: { slug, active: true },
    include: { media: { orderBy: { position: "asc" } }, category: true },
  });
}

export async function getApprovedCommentsForService(serviceId: string) {
  return prisma.comment.findMany({
    where: { serviceId, approved: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getServiceRatingSummary(serviceId: string) {
  const approved = await prisma.comment.findMany({
    where: { serviceId, approved: true },
    select: { rating: true },
  });
  if (approved.length === 0) return { average: 0, count: 0 };
  const sum = approved.reduce((acc, c) => acc + c.rating, 0);
  return { average: sum / approved.length, count: approved.length };
}

export async function getRecentMedia(limit: number) {
  return prisma.media.findMany({
    where: { service: { active: true } },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: { service: { include: { category: true } } },
  });
}

export async function getSiteSetting(key: string): Promise<string | null> {
  const setting = await prisma.siteSetting.findUnique({ where: { key } });
  return setting?.value ?? null;
}

/**
 * Une photo représentative par catégorie, pour illustrer les cartes de la page
 * d'accueil. On privilégie les photos : une vignette de vidéo sans lecture
 * automatique s'affiche souvent comme un rectangle noir.
 */
export async function getCoverMediaByCategory() {
  const covers = await prisma.media.findMany({
    where: { type: "PHOTO", service: { active: true } },
    orderBy: { createdAt: "desc" },
    include: { service: { select: { categoryId: true } } },
  });

  const byCategory = new Map<string, (typeof covers)[number]>();
  for (const media of covers) {
    if (!byCategory.has(media.service.categoryId)) {
      byCategory.set(media.service.categoryId, media);
    }
  }
  return byCategory;
}
