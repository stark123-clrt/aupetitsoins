import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { ServicesBoard } from "@/components/admin/services-board";

export default async function AdminServicesPage() {
  await requireAdmin();

  const [services, categories] = await Promise.all([
    prisma.service.findMany({
      orderBy: { title: "asc" },
      include: { media: { orderBy: { position: "asc" } }, category: true },
    }),
    prisma.category.findMany({ orderBy: { position: "asc" } }),
  ]);

  return <ServicesBoard services={services} categories={categories} />;
}
