import { Link } from "react-router-dom";
import {
  ArrowRight,
  Baby,
  BadgeCheck,
  CalendarCheck,
  Clock,
  Film,
  FileText,
  Heart,
  MessageSquareQuote,
  Percent,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { useRecentComments, useRecentMedia, useServices } from "@/hooks/use-services";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { EmptyState } from "@/components/shared/empty-state";
import {
  CATEGORY_LABELS,
  computeTtcCents,
  formatDuration,
  formatPrice,
  formatRelative,
  initials,
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

const VALUES = [
  { icon: Sparkles, label: "Ménage" },
  { icon: Baby, label: "Garde d'enfant" },
  { icon: FileText, label: "Aide administrative" },
  { icon: ShieldCheck, label: "Confiance" },
  { icon: CalendarCheck, label: "Disponibilité" },
];

const REASSURANCE = [
  { icon: Users, value: "2 000+", label: "familles accompagnées", to: "/a-propos" },
  { icon: Star, value: "4,8/5", label: "satisfaction moyenne", to: "/a-propos" },
  { icon: Percent, value: "50 %", label: "de crédit d'impôt", to: "/services" },
  { icon: ShieldCheck, value: "100 %", label: "intervenants vérifiés", to: "/a-propos" },
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
  const recentMedia = useRecentMedia(6);
  const recentComments = useRecentComments(4);

  return (
    <div className="flex w-full flex-col">
      {/* HERO */}
      <div className="mx-auto w-full max-w-6xl px-4 py-14">
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
      </div>

      {/* QUOTE STRIP */}
      <section className="bg-primary py-6 text-primary-foreground">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-center gap-3 px-4 text-center">
          <Quote className="size-5 shrink-0 opacity-70" />
          <p className="text-base font-medium italic sm:text-lg">
            « Prendre soin de vous, tout simplement. »
          </p>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-4 py-20 sm:gap-24">
        {/* SÉRÉNITÉ */}
        <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="h-80 w-full overflow-hidden rounded-2xl border border-border lg:order-2">
            <img
              src="/hero-home-care.webp"
              alt="Intervenante réalisant une prestation de ménage à domicile"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="lg:order-1">
            <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
              Notre approche
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              Découvrez la sérénité au quotidien
            </h2>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              Chez Aux Petits Soins, chaque prestation est pensée pour vous
              libérer du temps et de la charge mentale. Nos intervenants
              qualifiés interviennent chez vous avec soin, ponctualité et
              discrétion.
            </p>
            <Button asChild>
              <Link to="/services">
                Voir nos services
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* VALEURS - icon row */}
        <section className="grid grid-cols-2 gap-6 border-y border-border py-10 sm:grid-cols-5">
          {VALUES.map((v) => (
            <div key={v.label} className="flex flex-col items-center gap-2 text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-accent">
                <v.icon className="size-6 text-primary" />
              </span>
              <span className="text-sm font-medium">{v.label}</span>
            </div>
          ))}
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

        {/* ACCOMPAGNEMENT CHALEUREUX */}
        <section className="grid items-center gap-10 overflow-hidden rounded-2xl bg-secondary/30 lg:grid-cols-2">
          <div className="h-72 w-full overflow-hidden lg:h-full">
            <img
              src="/hero-garde-enfant.jpg"
              alt="Un moment chaleureux entre une intervenante et un enfant"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-8 lg:p-10">
            <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
              Depuis 2015
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              Trouvez un accompagnement chaleureux ici
            </h2>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              Aux Petits Soins accompagne les familles avec des intervenants
              qualifiés et bienveillants, pour un ménage, une garde d'enfant
              ou un coup de main administratif — toujours avec la même
              exigence de confiance.
            </p>
            <Button variant="outline" asChild>
              <Link to="/a-propos">
                Notre histoire
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* MISSION + QUOTE */}
        <section className="grid gap-10 lg:grid-cols-2">
          <p className="leading-relaxed text-muted-foreground">
            Notre conviction est simple : chacun mérite de souffler un peu.
            Depuis 2015, nous mettons en relation des familles avec des
            intervenants qualifiés, formés et vérifiés, pour des prestations
            fiables et sans mauvaise surprise.
          </p>
          <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6">
            <Quote className="mt-1 size-6 shrink-0 text-primary" />
            <div>
              <p className="mb-3 italic leading-relaxed text-muted-foreground">
                « Chaque famille que nous accompagnons mérite le même soin
                que nous apporterions à la nôtre. »
              </p>
              <div className="flex items-center gap-3">
                <Avatar className="size-9">
                  <AvatarFallback className="bg-primary/15 text-xs font-semibold text-primary">
                    AD
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-semibold">Aïssata Diallo</div>
                  <div className="text-xs text-muted-foreground">Fondatrice</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* CTA DARK BAND */}
      <section className="relative overflow-hidden bg-foreground py-20 text-background">
        <img
          src="/hero-home-care.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start gap-5 px-4">
          <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
            À votre écoute
          </div>
          <h2 className="max-w-xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Nos intervenants vous accompagnent au quotidien
          </h2>
          <p className="max-w-lg text-background/80">
            Une équipe vérifiée, formée et disponible pour prendre soin de
            votre foyer comme du vôtre.
          </p>
          <Button size="lg" className="mt-2" asChild>
            <Link to="/services">
              Voir nos services
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-4 py-20 sm:gap-24">
        {/* NOS RÉALISATIONS */}
        <section>
          <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
            En images
          </div>
          <h2 className="mb-6 text-3xl font-bold tracking-tight">
            Nos réalisations
          </h2>
          {recentMedia.isLoading ? (
            <div className="grid gap-4 sm:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-56 w-full rounded-2xl" />
              ))}
            </div>
          ) : !recentMedia.data || recentMedia.data.length === 0 ? (
            <EmptyState
              title="Bientôt en photos et vidéos"
              description="Les photos et vidéos de nos prestations apparaîtront ici au fil des interventions."
              icon={<Sparkles className="size-6" />}
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-3">
              {recentMedia.data.map((m) => (
                <Link
                  key={m.id}
                  to={`/services/${m.serviceSlug}`}
                  className="group relative aspect-square overflow-hidden rounded-2xl border border-border bg-accent"
                >
                  {m.type === "PHOTO" ? (
                    <img
                      src={m.url}
                      alt={m.serviceTitle}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <>
                      <video src={m.url} className="h-full w-full object-cover" muted />
                      <span className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Film className="size-8 text-white drop-shadow" />
                      </span>
                    </>
                  )}
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-sm font-medium text-white">
                    {m.serviceTitle}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* SUPPORT / CONTACT QUOTE */}
        <section className="flex flex-col items-center gap-5 rounded-2xl border border-border bg-card p-8 text-center sm:p-12">
          <span className="flex size-12 items-center justify-center rounded-full bg-accent">
            <MessageSquareQuote className="size-6 text-primary" />
          </span>
          <h2 className="max-w-lg text-2xl font-bold tracking-tight">
            Une question, un besoin particulier ?
          </h2>
          <p className="max-w-md text-muted-foreground">
            Notre équipe est là pour vous. Écrivez-nous, nous répondons sous
            24 h ouvrées.
          </p>
          <Button asChild>
            <Link to="/contact">
              Nous contacter
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </section>

        {/* CRÉDIT D'IMPÔT SPLIT */}
        <section className="grid items-center gap-10 rounded-2xl bg-secondary/30 p-8 lg:grid-cols-2 lg:p-12">
          <div>
            <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
              Avantage fiscal
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              Votre coût réel divisé par deux
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Chaque prestation à domicile ouvre droit à 50 % de crédit
              d'impôt. Simple, automatique, et déjà pris en compte dans nos
              tarifs affichés.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-card p-8 text-center shadow-sm">
            <Percent className="size-8 text-primary" />
            <div className="text-5xl font-bold text-primary">-50 %</div>
            <div className="text-sm text-muted-foreground">
              sur toutes vos prestations
            </div>
          </div>
        </section>

        {/* ENSEMBLE - icon links + center image */}
        <section className="grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
          <div className="grid gap-6 sm:grid-cols-2">
            {REASSURANCE.slice(0, 2).map((r) => (
              <Link
                key={r.label}
                to={r.to}
                className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-6 text-center transition-colors hover:border-primary/40"
              >
                <r.icon className="size-6 text-primary" />
                <div className="text-2xl font-bold">{r.value}</div>
                <div className="text-xs text-muted-foreground">{r.label}</div>
              </Link>
            ))}
          </div>
          <div className="h-64 w-full overflow-hidden rounded-2xl border border-border lg:h-80 lg:w-56">
            <img
              src="/hero-garde-enfant.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {REASSURANCE.slice(2, 4).map((r) => (
              <Link
                key={r.label}
                to={r.to}
                className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-6 text-center transition-colors hover:border-primary/40"
              >
                <r.icon className="size-6 text-primary" />
                <div className="text-2xl font-bold">{r.value}</div>
                <div className="text-xs text-muted-foreground">{r.label}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* AVIS DE NOS VISITEURS */}
        <section>
          <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
            Témoignages
          </div>
          <h2 className="mb-6 text-3xl font-bold tracking-tight">
            Avis de nos visiteurs
          </h2>
          {recentComments.isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 2 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-full rounded-2xl" />
              ))}
            </div>
          ) : !recentComments.data || recentComments.data.length === 0 ? (
            <EmptyState
              title="Aucun avis pour le moment"
              description="Les avis laissés sur nos services apparaîtront ici."
              icon={<Heart className="size-6" />}
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {recentComments.data.map((c) => (
                <Link
                  key={c.id}
                  to={`/services/${c.serviceSlug}`}
                  className="flex gap-3 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
                >
                  <Avatar className="size-10 shrink-0">
                    <AvatarFallback className="bg-primary/15 text-xs font-semibold text-primary">
                      {initials(c.authorName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="font-semibold">{c.authorName}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatRelative(c.createdAt)}
                      </span>
                    </div>
                    <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {c.content}
                    </p>
                    <span className="inline-flex text-xs font-medium text-primary">
                      {c.serviceTitle}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* HORAIRES BANNER */}
      <section className="relative flex h-64 items-center justify-center overflow-hidden">
        <img
          src="/hero-home-care.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/70" />
        <div className="relative flex flex-col items-center gap-2 px-4 text-center text-background">
          <div className="text-[11px] font-semibold uppercase tracking-[0.08em]">
            Nos horaires
          </div>
          <div className="text-3xl font-bold tracking-tight sm:text-4xl">
            Lun. – Sam. · 8h00 – 19h00
          </div>
          <p className="max-w-md text-sm text-background/80">
            « Prendre soin de vous, tout simplement. »
          </p>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-4 py-20 sm:gap-24">
        {/* POPULAIRES */}
        <section>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
                Nos services
              </div>
              <h2 className="text-3xl font-bold tracking-tight">
                Prestations les plus demandées
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

        {/* CTA BAND */}
        <section className="flex flex-col items-center gap-4 rounded-2xl bg-secondary/40 px-6 py-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Prêt à alléger votre quotidien ?
          </h2>
          <p className="max-w-lg text-lg text-muted-foreground">
            Contactez-nous en quelques minutes — et profitez de 50 % de
            crédit d'impôt.
          </p>
          <Button size="lg" className="mt-2" asChild>
            <Link to="/services">
              Voir nos services
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
