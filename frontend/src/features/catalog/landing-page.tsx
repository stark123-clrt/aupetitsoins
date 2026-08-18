import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, Film, Play } from "lucide-react";
import { useRecentMedia, useServices } from "@/hooks/use-services";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import {
  CATEGORY_LABELS,
  computeTtcCents,
  formatDuration,
  formatPrice,
} from "@/lib/format";
import { CATEGORY_ICON, CATEGORY_PHOTO } from "@/lib/category";

const CATEGORIES = [
  {
    value: "MENAGE" as const,
    title: "Ménage & repassage",
    description:
      "Entretien régulier, grand ménage ou repassage : votre intérieur, impeccable.",
    to: "/services?categorie=MENAGE",
  },
  {
    value: "GARDE_ENFANT" as const,
    title: "Garde d'enfant",
    description:
      "Sortie d'école, soirée ou journée complète, avec des intervenants de confiance.",
    to: "/services?categorie=GARDE_ENFANT",
  },
  {
    value: "AIDE_ADMIN" as const,
    title: "Aide administrative",
    description:
      "Démarches CAF, impôts, courrier : on démêle la paperasse avec vous.",
    to: "/services?categorie=AIDE_ADMIN",
  },
];

const STEPS = [
  {
    n: 1,
    title: "Choisissez une prestation",
    text: "Parcourez le catalogue et repérez le service adapté à votre besoin.",
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
  { value: "2 000+", label: "familles accompagnées" },
  { value: "4,8/5", label: "satisfaction moyenne" },
  { value: "50 %", label: "de crédit d'impôt", accent: true },
  { value: "100 %", label: "intervenants vérifiés" },
];

function Stars() {
  return (
    <span className="tracking-[0.04em] text-accent-foreground">
      {"★★★★★"}
    </span>
  );
}

export function LandingPage() {
  const featured = useServices();
  const featuredServices = (featured.data ?? []).slice(0, 3);
  const recentMedia = useRecentMedia(6);

  const mediaItems = recentMedia.data ?? [];
  const mainMedia = mediaItems.find((m) => m.type === "VIDEO") ?? mediaItems[0];
  const thumbMedia = mediaItems.filter((m) => m.id !== mainMedia?.id).slice(0, 3);

  return (
    <div className="w-full">
      {/* HERO */}
      <section className="mx-auto grid w-full max-w-6xl items-center gap-16 px-6 py-16 lg:grid-cols-[1.02fr_1fr] lg:py-20">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[13px] uppercase tracking-[0.08em] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-accent-foreground" />
            Services à domicile de confiance
          </div>
          <h1 className="mt-6 text-6xl leading-[0.94] tracking-tight sm:text-7xl">
            Le quotidien,
            <br />
            <em className="text-accent-foreground not-italic italic">
              allégé.
            </em>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground text-pretty">
            Ménage, garde d'enfant et aide administrative par des
            intervenants qualifiés. 50 % de crédit d'impôt sur chaque
            prestation.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <Button size="lg" className="rounded-full px-7" asChild>
              <Link to="/services">
                Voir nos services
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-7"
              asChild
            >
              <Link to="/contact">Nous contacter</Link>
            </Button>
          </div>
          <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
            <Stars />
            4,8/5 · 2 000 familles accompagnées
          </div>
        </div>

        <div className="relative">
          <div className="h-[520px] w-full overflow-hidden rounded-t-[200px] rounded-b-3xl border border-border bg-secondary">
            <img
              src="/hero-garde-enfant.jpg"
              alt="Intervenante jouant avec un enfant à domicile"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -left-4 top-10 flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-lg">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent">
              <BadgeCheck className="size-5 text-accent-foreground" />
            </span>
            <div>
              <div className="text-sm font-medium">Intervenant vérifié</div>
              <div className="text-xs text-muted-foreground">
                Assuré &amp; formé
              </div>
            </div>
          </div>
          <div className="absolute -right-4 bottom-8 rounded-2xl bg-primary px-5 py-3.5 text-center text-primary-foreground shadow-lg">
            <div className="text-3xl leading-none">-50 %</div>
            <div className="mt-1 text-xs opacity-75">crédit d'impôt</div>
          </div>
        </div>
      </section>

      {/* NOS UNIVERS */}
      <section className="mx-auto w-full max-w-6xl border-t border-border px-6 py-16">
        <div className="text-[13px] uppercase tracking-[0.1em] text-muted-foreground">
          Nos univers
        </div>
        <h2 className="mt-3 text-4xl tracking-tight sm:text-5xl">
          Un accompagnement pour chaque besoin
        </h2>

        <div className="mt-11 grid gap-6 md:grid-cols-3">
          {CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICON[cat.value];
            const photo = CATEGORY_PHOTO[cat.value];
            return (
              <Link
                key={cat.value}
                to={cat.to}
                className="flex flex-col overflow-hidden rounded-[20px] border border-border bg-card transition-shadow hover:shadow-md"
              >
                <div className="h-[210px] bg-accent">
                  {photo ? (
                    <img
                      src={photo}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Icon className="size-10 text-accent-foreground/50" />
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h3 className="text-2xl">{cat.title}</h3>
                  <p className="flex-1 text-[15px] leading-relaxed text-muted-foreground">
                    {cat.description}
                  </p>
                  <span className="text-sm font-medium text-accent-foreground">
                    Découvrir →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* EN IMAGES / VIDÉOS */}
      <section className="mx-auto w-full max-w-6xl border-t border-border px-6 py-16">
        <div className="text-[13px] uppercase tracking-[0.1em] text-muted-foreground">
          Nos services en images
        </div>
        <h2 className="mt-3 text-4xl tracking-tight sm:text-5xl">
          Voyez une prestation avant de nous contacter
        </h2>

        {recentMedia.isLoading ? (
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.55fr_1fr]">
            <Skeleton className="h-[480px] w-full rounded-[22px]" />
            <div className="space-y-4">
              <Skeleton className="h-24 w-full rounded-2xl" />
              <Skeleton className="h-24 w-full rounded-2xl" />
              <Skeleton className="h-24 w-full rounded-2xl" />
            </div>
          </div>
        ) : !mainMedia ? (
          <div className="mt-10">
            <EmptyState
              title="Bientôt en photos et vidéos"
              description="Les photos et vidéos de nos prestations apparaîtront ici au fil des interventions."
              icon={<Film className="size-6" />}
            />
          </div>
        ) : (
          <div className="mt-10 grid gap-7 lg:grid-cols-[1.55fr_1fr] lg:items-start">
            <div>
              <Link
                to={`/services/${mainMedia.serviceSlug}`}
                className="group relative block h-[480px] w-full overflow-hidden rounded-[22px] border border-border bg-accent"
              >
                {mainMedia.type === "PHOTO" ? (
                  <img
                    src={mainMedia.url}
                    alt={mainMedia.serviceTitle}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <video
                    src={mainMedia.url}
                    className="h-full w-full object-cover"
                    muted
                  />
                )}
                {mainMedia.type === "VIDEO" && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <span className="flex size-20 items-center justify-center rounded-full bg-card/90 shadow-lg">
                      <Play className="size-7 translate-x-0.5 fill-primary text-primary" />
                    </span>
                  </span>
                )}
                <span className="absolute left-5 top-5 rounded-full bg-primary/80 px-3.5 py-1.5 text-xs uppercase tracking-[0.08em] text-primary-foreground">
                  {mainMedia.serviceTitle}
                </span>
              </Link>
              <h3 className="mt-6 text-3xl">
                Une prestation en toute transparence
              </h3>
              <p className="mt-3 max-w-xl text-[16.5px] leading-relaxed text-muted-foreground text-pretty">
                Chaque photo ou vidéo montre le résultat réel d'une
                prestation, pour que vous sachiez exactement à quoi vous
                attendre.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {thumbMedia.map((m) => (
                <Link
                  key={m.id}
                  to={`/services/${m.serviceSlug}`}
                  className="flex items-center gap-4 rounded-[18px] border border-border bg-card p-3.5"
                >
                  <div className="relative h-[92px] w-[132px] shrink-0 overflow-hidden rounded-xl bg-accent">
                    {m.type === "PHOTO" ? (
                      <img
                        src={m.url}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <>
                        <video
                          src={m.url}
                          className="h-full w-full object-cover"
                          muted
                        />
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="flex size-8 items-center justify-center rounded-full bg-card/90">
                            <Play className="size-3.5 translate-x-0.5 fill-primary text-primary" />
                          </span>
                        </span>
                      </>
                    )}
                  </div>
                  <div>
                    <h4 className="text-[17px] font-medium">
                      {m.serviceTitle}
                    </h4>
                    <div className="mt-1 text-[13.5px] text-muted-foreground">
                      {m.type === "PHOTO" ? "Photo" : "Vidéo"}
                    </div>
                  </div>
                </Link>
              ))}
              <Link
                to="/services"
                className="pl-1 text-sm font-medium text-accent-foreground"
              >
                Voir toutes les prestations →
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* COMMENT CA MARCHE */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="text-[13px] uppercase tracking-[0.1em] text-primary-foreground/55">
            Comment ça marche
          </div>
          <h2 className="mt-3 text-4xl tracking-tight sm:text-5xl">
            Un accompagnement en trois étapes
          </h2>
          <div className="mt-14 grid gap-12 md:grid-cols-3">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="border-t border-primary-foreground/20 pt-6"
              >
                <div className="text-4xl text-accent-foreground">{s.n}</div>
                <h3 className="mt-4 text-xl font-medium">{s.title}</h3>
                <p className="mt-2.5 text-[15.5px] leading-relaxed text-primary-foreground/70">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAIRES */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-[13px] uppercase tracking-[0.1em] text-muted-foreground">
              Populaires
            </div>
            <h2 className="mt-3 text-4xl tracking-tight sm:text-5xl">
              Prestations les plus demandées
            </h2>
          </div>
          <Link
            to="/services"
            className="border-b border-border pb-1 text-sm font-medium"
          >
            Tout voir
          </Link>
        </div>

        {featured.isLoading ? (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-72 w-full rounded-[18px]" />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featuredServices.map((svc) => {
              const ttc = computeTtcCents(svc.priceHtCents, svc.vatRate);
              return (
                <Link
                  key={svc.id}
                  to={`/services/${svc.slug}`}
                  className="flex flex-col gap-4"
                >
                  <div className="h-[260px] overflow-hidden rounded-[18px] bg-accent">
                    {CATEGORY_PHOTO[svc.category] ? (
                      <img
                        src={CATEGORY_PHOTO[svc.category]}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        {(() => {
                          const Icon = CATEGORY_ICON[svc.category];
                          return (
                            <Icon className="size-10 text-accent-foreground/50" />
                          );
                        })()}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-[12.5px] uppercase tracking-[0.08em] text-muted-foreground">
                      {CATEGORY_LABELS[svc.category]}
                    </div>
                    <h3 className="mt-2 text-2xl leading-tight">
                      {svc.title}
                    </h3>
                    <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
                      <span>{formatDuration(svc.durationMinutes)}</span>
                      <span className="font-medium text-foreground">
                        {formatPrice(ttc)}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <div className="mt-20 grid grid-cols-2 divide-y divide-border border-y border-border sm:grid-cols-4 sm:divide-x sm:divide-y-0">
          {REASSURANCE.map((r) => (
            <div key={r.label} className="px-7 py-10">
              <div
                className={
                  "text-4xl " + (r.accent ? "text-accent-foreground" : "")
                }
              >
                {r.value}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {r.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BAND */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <div className="flex flex-col items-center gap-5 rounded-[26px] bg-secondary px-8 py-20 text-center">
          <h2 className="max-w-2xl text-5xl leading-[1.05] tracking-tight text-balance">
            Prêt à alléger votre quotidien ?
          </h2>
          <p className="max-w-lg text-lg text-muted-foreground text-pretty">
            Contactez-nous en quelques minutes — et profitez de 50 % de
            crédit d'impôt.
          </p>
          <Button size="lg" className="mt-3 rounded-full px-8" asChild>
            <Link to="/services">
              Voir nos services
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
