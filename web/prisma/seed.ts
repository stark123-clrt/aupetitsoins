import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

type CategoryKey = "MENAGE" | "GARDE_ENFANT" | "AIDE_ADMIN";

const CATEGORIES: {
  key: CategoryKey;
  name: string;
  slug: string;
  description: string;
}[] = [
  {
    key: "MENAGE",
    name: "Ménage & repassage",
    slug: "menage-repassage",
    description:
      "Entretien régulier, grand ménage ou repassage : votre intérieur, impeccable.",
  },
  {
    key: "GARDE_ENFANT",
    name: "Garde d'enfant",
    slug: "garde-d-enfant",
    description:
      "Sortie d'école, soirée ou journée complète, confiées à une personne de confiance.",
  },
  {
    key: "AIDE_ADMIN",
    name: "Aide administrative",
    slug: "aide-administrative",
    description:
      "Démarches CAF, impôts, courrier : on démêle la paperasse avec vous.",
  },
];

const prisma = new PrismaClient();

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const SERVICES: {
  title: string;
  category: CategoryKey;
  durationLabel: string;
  description: string;
}[] = [
  {
    title: "Entretien régulier du logement",
    category: "MENAGE",
    durationLabel: "dès 2 h · hebdomadaire",
    description:
      "Un même intervenant vient chez vous à jour et heure fixes. La première visite sert à définir ensemble le plan de ménage : pièces prioritaires, produits utilisés, rangements à ne pas toucher.",
  },
  {
    title: "Grand ménage de printemps",
    category: "MENAGE",
    durationLabel: "dès 4 h · ponctuel",
    description:
      "Vitres, placards, électroménager : remise à neuf complète du logement.",
  },
  {
    title: "Repassage et pliage",
    category: "MENAGE",
    durationLabel: "dès 1 h 30",
    description: "Linge repassé, plié et rangé, à domicile ou en dépôt.",
  },
  {
    title: "Sortie d'école et devoirs",
    category: "GARDE_ENFANT",
    durationLabel: "dès 1 h 30 · en semaine",
    description:
      "Récupération à l'école, goûter et accompagnement aux devoirs.",
  },
  {
    title: "Garde en soirée",
    category: "GARDE_ENFANT",
    durationLabel: "dès 3 h · soirs & week-ends",
    description: "Repas, bain et coucher pendant votre soirée, jusqu'à minuit.",
  },
  {
    title: "Journée complète",
    category: "GARDE_ENFANT",
    durationLabel: "dès 6 h",
    description:
      "Vacances scolaires, jour de télétravail chargé ou enfant malade.",
  },
  {
    title: "Démarches CAF et impôts",
    category: "AIDE_ADMIN",
    durationLabel: "dès 1 h",
    description:
      "Constitution du dossier, saisie en ligne et suivi jusqu'à la réponse.",
  },
  {
    title: "Tri et suivi du courrier",
    category: "AIDE_ADMIN",
    durationLabel: "dès 1 h · hebdomadaire",
    description: "Classement, relances et rappels d'échéances, une fois par semaine.",
  },
  {
    title: "Aide à la rédaction",
    category: "AIDE_ADMIN",
    durationLabel: "dès 1 h",
    description: "Courriers, réclamations et candidatures rédigés avec vous.",
  },
];

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "aissata@aupetitsoin.fr";
  const password = process.env.ADMIN_PASSWORD ?? "demo1234";
  const fullName = process.env.ADMIN_NAME ?? "Aïssata Diallo";

  const existingAdmin = await prisma.user.findUnique({ where: { email } });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { email, passwordHash, fullName, role: "ADMIN" },
    });
    console.log(`Compte admin créé : ${email} / ${password}`);
  } else {
    console.log("Compte admin déjà présent, non recréé.");
  }

  const categoryIds = new Map<CategoryKey, string>();
  for (const [i, c] of CATEGORIES.entries()) {
    const category = await prisma.category.upsert({
      where: { slug: c.slug },
      create: {
        name: c.name,
        slug: c.slug,
        description: c.description,
        position: i,
      },
      update: {},
    });
    categoryIds.set(c.key, category.id);
  }
  console.log(`${CATEGORIES.length} catégorie(s) en place.`);

  let created = 0;
  for (const s of SERVICES) {
    const slug = slugify(s.title);
    const existing = await prisma.service.findUnique({ where: { slug } });
    if (existing) continue;
    await prisma.service.create({
      data: {
        title: s.title,
        slug,
        categoryId: categoryIds.get(s.category)!,
        durationLabel: s.durationLabel,
        description: s.description,
        active: true,
      },
    });
    created++;
  }
  console.log(`${created} service(s) créé(s), ${SERVICES.length - created} déjà existants.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
