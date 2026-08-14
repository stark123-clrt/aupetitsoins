import { Link } from "react-router-dom";
import {
  ArrowRight,
  Baby,
  BadgeCheck,
  Clock,
  FileText,
  Percent,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { useServices } from "@/hooks/use-services";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CATEGORY_LABELS,
  computeTtcCents,
  formatDuration,
  formatPrice,
} from "@/lib/format";

const CATEGORIES = [
  {
    icon: Sparkles,
    title: "Ménage & repassage",
    description:
      "Entretien régulier, grand ménage ou repassage : votre intérieur, impeccable.",
    to: "/services?categorie=MENAGE",
  },
  {
    icon: Baby,
    title: "Garde d'enfant",
    description:
      "Sortie d'école, soirée ou journée complète, avec des intervenants de confiance.",
    to: "/services?categorie=GARDE_ENFANT",
  },
  {
    icon: FileText,
    title: "Aide administrative",
    description:
      "Démarches CAF, impôts, courrier : on démêle la paperasse avec vous.",
    to: "/services?categorie=AIDE_ADMIN",
  },
];

const STEPS = [
  {
    n: 1,
    title: "Découvrez nos prestations",
    text: "Parcourez le catalogue, les photos et vidéos de nos réalisations.",
  },
  {
    n: 2,
    title: "Contactez-nous",
    text: "Décrivez votre besoin, nous revenons vers vous sous 24 h ouvrées.",
  },
  {
    n: 3,
    title: "On s'occupe du reste",
    text: "Votre intervenant arrive à l'heure, avec tout le soin nécessaire.",
  },
];

const REASSURANCE = [
  { icon: Users, value: "2 000+", label: "familles accompagnées" },
  { icon: Star, value: "4,8/5", label: "satisfaction moyenne" },
  { icon: Percent, value: "50 %", label: "de crédit d'impôt" },
  { icon: ShieldCheck, value: "100 %", label: "intervenants vérifiés" },
];

function Stars() {
  return (
    <div className="flex text-amber-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-4 fill-current" />
      ))}
    </div>
  );
}

export function LandingPage() {
  const featured = useServices();
  const featuredServices = (featured.data ?? []).slice(0, 3);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-4 py-14 sm:gap-24">
      {/* HERO */}
      <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <div>
          <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
            Services à domicile de confiance
          </div>
          <h1 className="text-5xl font-bold leading-[1.03] tracking-tight sm:text-6xl">
            Le quotidien,
            <br />
            allégé.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
            Ménage, garde d'enfant et aide administrative par des intervenants
            qualifiés. 50 % de crédit d'impôt sur chaque prestation.
          </p>
          <div className="mb-7 mt-8 flex flex-wrap gap-3.5">
            <Button size="lg" asChild>
              <Link to="/services">
                Voir nos services
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/contact">Nous contacter</Link>
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Stars />
            <span className="text-sm text-muted-foreground">
              <strong className="text-foreground">4,8/5</strong> · 2 000
              familles accompagnées
            </span>
          </div>
        </div>
        <div className="relative">
          <div className="h-[460px] w-full overflow-hidden rounded-2xl border border-border">
            <img
              src="/hero-garde-enfant.jpg"
              alt="Intervenante jouant avec un enfant à domicile"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -left-4 bottom-6 flex items-center gap-3 rounded-2xl border border-border bg-popover p-4 shadow-lg">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent">
              <BadgeCheck className="size-5 text-primary" />
            </span>
            <div>
              <div className="text-sm font-bold">Intervenant vérifié</div>
              <div className="text-xs text-muted-foreground">Assuré &amp; formé</div>
            </div>
          </div>
          <div className="absolute -right-3.5 top-6 rounded-2xl border border-border bg-popover px-4 py-3 text-center shadow-lg">
            <div className="text-2xl font-bold leading-none text-primary">
              -50 %
            </div>
            <div className="mt-0.5 text-xs text-muted-foreground">
              crédit d'impôt
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section>
        <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
          Nos univers
        </div>
        <h2 className="mb-6 text-3xl font-bold tracking-tight">
          Un accompagnement pour chaque besoin
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.title}
              to={cat.to}
              className="rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="mb-3 flex size-12 items-center justify-center rounded-xl bg-accent">
                <cat.icon className="size-6 text-primary" />
              </span>
              <h3 className="mb-2 text-xl font-bold">{cat.title}</h3>
              <p className="mb-3.5 text-sm leading-relaxed text-muted-foreground">
                {cat.description}
              </p>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-primary">
                Découvrir <ArrowRight className="size-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* COMMENT CA MARCHE */}
      <section>
        <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
          Comment ça marche
        </div>
        <h2 className="mb-6 text-3xl font-bold tracking-tight">
          Réservez en trois étapes
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-2xl border border-border bg-card p-6">
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-lg font-bold text-primary-foreground">
                {s.n}
              </span>
              <div className="mb-1.5 mt-4 text-lg font-bold">{s.title}</div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* POPULAIRES */}
      <section>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
              Populaires
            </div>
            <h2 className="text-3xl font-bold tracking-tight">
              Prestations les plus réservées
            </h2>
          </div>
          <Link
            to="/services"
            className="flex items-center gap-1.5 text-sm font-semibold text-primary"
          >
            Tout voir <ArrowRight className="size-4" />
          </Link>
        </div>
        {featured.isLoading ? (
          <div className="grid gap-5 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-40 w-full rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-3">
            {featuredServices.map((svc) => {
              const ttc = computeTtcCents(svc.priceHtCents, svc.vatRate);
              return (
                <Link
                  key={svc.id}
                  to={`/services/${svc.slug}`}
                  className="rounded-xl border border-l-4 border-border border-l-primary bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span className="inline-flex rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                    {CATEGORY_LABELS[svc.category]}
                  </span>
                  <div className="mb-1.5 mt-3.5 text-lg font-bold leading-tight">
                    {svc.title}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="size-3.5" />
                    Durée : {formatDuration(svc.durationMinutes)}
                  </div>
                  <div className="mt-4 flex items-baseline justify-between">
                    <span className="text-lg font-bold">
                      {formatPrice(ttc)}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-semibold text-primary">
                      Voir <ArrowRight className="size-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* REASSURANCE */}
      <section className="grid grid-cols-2 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card sm:grid-cols-4 sm:divide-x sm:divide-y-0">
        {REASSURANCE.map((r) => (
          <div key={r.label} className="p-7 text-center">
            <r.icon className="mx-auto size-6 text-primary" />
            <div className="mt-2 text-2xl font-bold">{r.value}</div>
            <div className="mt-0.5 text-xs text-muted-foreground">
              {r.label}
            </div>
          </div>
        ))}
      </section>

      {/* CTA BAND */}
      <section className="flex flex-col items-center gap-4 rounded-2xl bg-secondary/40 px-6 py-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Prêt à alléger votre quotidien ?
        </h2>
        <p className="max-w-lg text-lg text-muted-foreground">
          Réservez en quelques minutes, sans engagement — et profitez de 50 %
          de crédit d'impôt.
        </p>
        <Button size="lg" className="mt-2" asChild>
          <Link to="/services">
            Voir nos services
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </section>
    </div>
  );
}
