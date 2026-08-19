import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  getActiveServices,
  getCoverMediaByCategory,
  getRecentMedia,
  getVisibleCategories,
} from "@/lib/data";
import { MediaFrame } from "@/components/site/media-frame";

export const dynamic = "force-dynamic";

const STEPS = [
  {
    n: 1,
    title: "Choisissez une prestation",
    text: "Parcourez le catalogue et sélectionnez le service adapté à votre besoin.",
  },
  {
    n: 2,
    title: "Contactez-nous",
    text: "Décrivez votre besoin, Aïssata vous rappelle pour un devis sans engagement.",
  },
  {
    n: 3,
    title: "On s'occupe du reste",
    text: "Aïssata arrive à l'heure, avec tout le soin nécessaire.",
  },
];

// Engagements vérifiables plutôt que des chiffres : l'activité est individuelle,
// afficher un nombre de clients ou une note moyenne serait inventé.
const COMMITMENTS = [
  { value: "50 %", label: "de crédit d'impôt", accent: true },
  { value: "Devis", label: "gratuit et sans engagement" },
  { value: "Aïssata", label: "votre interlocutrice unique" },
];

export default async function HomePage() {
  const [services, media, categoryCovers, categories] = await Promise.all([
    getActiveServices(),
    getRecentMedia(4),
    getCoverMediaByCategory(),
    getVisibleCategories(),
  ]);
  const featured = services.slice(0, 3);
  const mainMedia = media[0];
  const thumbMedia = media.slice(1, 4);

  return (
    <>
      {/* HERO */}
      <section className="mx-auto grid w-full max-w-[1360px] items-center gap-[72px] px-6 py-10 sm:px-12 sm:py-16 lg:grid-cols-[1.02fr_1fr]">
        <div>
          <div className="inline-flex items-center gap-2.5 rounded-full border border-border px-4 py-2 text-[13px] uppercase tracking-[0.08em] text-muted">
            <span className="size-1.5 rounded-full bg-accent" />
            Services à domicile de confiance
          </div>
          <h1 className="mt-6 text-[56px] leading-[0.96] tracking-tight sm:text-[84px] sm:leading-[0.94]">
            Le quotidien,
            <br />
            <em className="text-accent not-italic italic">allégé.</em>
          </h1>
          <p className="mt-6 max-w-[470px] text-[18.5px] leading-relaxed text-foreground-soft text-pretty">
            Ménage, garde d&apos;enfant et aide administrative, assurés par Aïssata
            en personne. 50 % de crédit d&apos;impôt sur chaque prestation.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <Link
              href="/services"
              className="rounded-full bg-foreground px-7 py-4 text-[15.5px] font-medium text-background"
            >
              Voir nos services
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-input px-7 py-[15px] text-[15.5px] font-medium"
            >
              Nous contacter
            </Link>
          </div>
          <div className="mt-8 text-[14.5px] text-muted">
            Devis gratuit · Sans engagement · Interlocutrice unique
          </div>
        </div>

        <div className="relative">
          <div className="h-[400px] overflow-hidden rounded-t-[180px] rounded-b-3xl bg-tint sm:h-[560px] sm:rounded-t-[220px]">
            <MediaFrame
              media={mainMedia}
              alt="Une intervention Aux Petits Soins"
              className="h-full w-full"
            />
          </div>
          <div className="absolute left-2 top-8 rounded-2xl border border-border-2 bg-background px-4.5 py-3.5 shadow-lg sm:-left-7 sm:top-10">
            <div className="text-[14.5px] font-medium">Toujours Aïssata</div>
            <div className="mt-0.5 text-[13px] text-muted">D&apos;une visite à l&apos;autre</div>
          </div>
          <div className="absolute bottom-8 right-2 rounded-2xl bg-foreground px-5 py-3.5 text-center text-background shadow-lg sm:-right-6">
            <div className="font-display text-[30px] leading-none">-50 %</div>
            <div className="mt-0.5 text-[12.5px] opacity-75">crédit d&apos;impôt</div>
          </div>
        </div>
      </section>

      {/* NOS UNIVERS */}
      <section id="services" className="mx-auto w-full max-w-[1360px] px-6 pb-24 pt-9 sm:px-12">
        <div className="border-t border-border pt-8">
          <div className="text-[13px] uppercase tracking-[0.1em] text-muted">Nos univers</div>
          <h2 className="mt-3 text-[34px] leading-tight tracking-tight sm:text-[46px]">
            Un accompagnement pour chaque besoin
          </h2>
        </div>

        <div className="mt-11 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <article
              key={cat.id}
              className="flex flex-col overflow-hidden rounded-[20px] border border-border-2 bg-surface"
            >
              <MediaFrame
                media={categoryCovers.get(cat.id) ?? null}
                alt={cat.name}
                className="h-[210px] w-full"
              />
              <div className="flex flex-1 flex-col gap-3 p-6.5">
                <h3 className="text-[27px] leading-tight">{cat.name}</h3>
                {cat.description && (
                  <p className="flex-1 text-[15.5px] leading-relaxed text-foreground-soft">
                    {cat.description}
                  </p>
                )}
                <Link
                  href={`/services?categorie=${cat.slug}`}
                  className="mt-auto text-[15px] font-medium text-accent"
                >
                  Découvrir →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* EN IMAGES */}
      <section className="mx-auto w-full max-w-[1360px] px-6 pb-24 sm:px-12">
        <div className="border-t border-border pt-8">
          <div className="text-[13px] uppercase tracking-[0.1em] text-muted">
            Nos services en images
          </div>
          <h2 className="mt-3 text-[34px] leading-tight tracking-tight sm:text-[46px]">
            Voyez une prestation avant de nous contacter
          </h2>
        </div>

        {!mainMedia ? (
          <div className="mt-10 rounded-[22px] border border-dashed border-input bg-surface p-16 text-center">
            <Sparkles className="mx-auto size-7 text-accent-soft" />
            <p className="mt-4 text-[15.5px] text-muted">
              Les photos et vidéos de nos prestations apparaîtront ici au fil des
              interventions.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-7 lg:grid-cols-[1.55fr_1fr] lg:items-start">
            <div>
              <Link href={`/services/${mainMedia.service.slug}`}>
                <MediaFrame
                  media={mainMedia}
                  alt={mainMedia.service.title}
                  className="h-[300px] w-full rounded-[22px] sm:h-[480px]"
                  showPlay={mainMedia.type === "VIDEO"}
                />
              </Link>
              <h3 className="mt-6 text-[26px] sm:text-[30px]">
                Une prestation en toute transparence
              </h3>
              <p className="mt-3 max-w-[620px] text-[16.5px] leading-relaxed text-foreground-soft text-pretty">
                Chaque photo ou vidéo montre le résultat réel d&apos;une intervention,
                pour que vous sachiez exactement à quoi vous attendre.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {thumbMedia.map((m) => (
                <Link
                  key={m.id}
                  href={`/services/${m.service.slug}`}
                  className="flex items-center gap-4 rounded-[18px] border border-border-2 bg-surface p-3.5"
                >
                  <MediaFrame
                    media={m}
                    alt={m.service.title}
                    className="h-[92px] w-[132px] shrink-0 rounded-xl"
                    showPlay={m.type === "VIDEO"}
                  />
                  <div>
                    <div className="text-[12px] uppercase tracking-[0.08em] text-muted">
                      {m.service.category.name}
                    </div>
                    <h4 className="mt-1.5 text-[17px] font-medium">
                      {m.service.title}
                    </h4>
                  </div>
                </Link>
              ))}
              <Link href="/services" className="pl-1 text-[15px] font-medium text-accent">
                Voir toutes les prestations →
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* COMMENT CA MARCHE */}
      <section className="bg-foreground text-background">
        <div className="mx-auto w-full max-w-[1360px] px-6 py-16 sm:px-12 sm:py-24">
          <div className="text-[13px] uppercase tracking-[0.1em] text-background/55">
            Comment ça marche
          </div>
          <h2 className="mt-3 text-[34px] leading-tight tracking-tight sm:text-[46px]">
            Trois étapes, sans engagement
          </h2>
          <div className="mt-14 grid gap-12 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="border-t border-background/20 pt-6">
                <div className="font-display text-[40px] leading-none text-accent-soft">
                  {s.n}
                </div>
                <h3 className="mt-4 text-[21px] font-medium">{s.title}</h3>
                <p className="mt-2.5 text-[16px] leading-relaxed text-background/70">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAIRES */}
      <section className="mx-auto w-full max-w-[1360px] px-6 pt-24 sm:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-[13px] uppercase tracking-[0.1em] text-muted">
              Populaires
            </div>
            <h2 className="mt-3 text-[34px] leading-tight tracking-tight sm:text-[46px]">
              Prestations les plus demandées
            </h2>
          </div>
          <Link href="/services" className="border-b border-input pb-1 text-[15px] font-medium">
            Tout voir
          </Link>
        </div>

        {featured.length === 0 ? (
          <p className="mt-10 text-muted">Aucun service pour le moment.</p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featured.map((svc) => (
              <Link key={svc.id} href={`/services/${svc.slug}`} className="flex flex-col gap-4">
                <MediaFrame
                  media={svc.media[0]}
                  alt={svc.title}
                  className="h-[260px] w-full rounded-[18px]"
                />
                <div>
                  <div className="text-[12.5px] uppercase tracking-[0.08em] text-muted">
                    {svc.category.name}
                  </div>
                  <h3 className="mt-2 text-[25px] leading-tight">{svc.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-20 grid divide-y divide-border border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {COMMITMENTS.map((s) => (
            <div key={s.label} className="px-7 py-10">
              <div className={`font-display text-[40px] ${s.accent ? "text-accent" : ""}`}>
                {s.value}
              </div>
              <div className="mt-2 text-[14.5px] text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-[1360px] px-6 py-24 sm:px-12">
        <div className="rounded-[26px] bg-tint px-8 py-16 text-center sm:py-20">
          <h2 className="text-[36px] leading-[1.06] tracking-tight text-balance sm:text-[54px]">
            Prêt à alléger votre quotidien ?
          </h2>
          <p className="mx-auto mt-4.5 max-w-[560px] text-[18px] leading-relaxed text-foreground-soft text-pretty">
            Un appel de dix minutes suffit à savoir si nous sommes le bon service pour
            vous.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-4 text-[15.5px] font-medium text-background"
          >
            Nous contacter
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
