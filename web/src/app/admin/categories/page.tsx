import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { CategoriesBoard } from "@/components/admin/categories-board";

export default async function AdminCategoriesPage() {
  await requireAdmin();

  const categories = await prisma.category.findMany({
    orderBy: { position: "asc" },
    include: { _count: { select: { services: true } } },
  });

  return <CategoriesBoard categories={categories} />;
}
