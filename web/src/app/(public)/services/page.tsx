import Link from "next/link";
import { getActiveServices, getVisibleCategories } from "@/lib/data";
import { MediaFrame } from "@/components/site/media-frame";

export const dynamic = "force-dynamic";

export default async function CataloguePage({
  searchParams,
}: PageProps<"/services">) {
  const params = await searchParams;
  const raw = typeof params.categorie === "string" ? params.categorie : undefined;

  const categories = await getVisibleCategories();
  const category = categories.some((c) => c.slug === raw) ? raw : undefined;

  const services = await getActiveServices(category);

  return (
    <>
      <section className="mx-auto w-full max-w-[1360px] px-6 pt-9 sm:px-12">
        <div className="text-[13px] uppercase tracking-[0.1em] text-muted">Catalogue</div>
        <h1 className="mt-3.5 max-w-[720px] text-[40px] leading-[1.05] tracking-tight sm:text-[62px]">
          Toutes nos prestations à domicile
        </h1>
        <p className="mt-5 max-w-[560px] text-[18px] leading-relaxed text-foreground-soft text-pretty">
          Filtrez par catégorie et ouvrez une fiche pour voir le détail, les photos et
          les avis.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-b border-border pb-5.5">
          <div className="flex flex-wrap gap-2.5">
            <FilterChip href="/services" active={!category} label="Toutes" />
            {categories.map((c) => (
              <FilterChip
                key={c.id}
                href={`/services?categorie=${c.slug}`}
                active={category === c.slug}
                label={c.name}
              />
            ))}
          </div>
          <div className="text-[14.5px] text-muted">
            {services.length} prestation{services.length > 1 ? "s" : ""}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1360px] px-6 py-11 sm:px-12">
        {services.length === 0 ? (
          <p className="text-muted">Aucune prestation dans cette catégorie pour le moment.</p>
        ) : (
          <div className="grid gap-6.5 md:grid-cols-3">
            {services.map((s) => {
              const hasVideo = s.media.some((m) => m.type === "VIDEO");
              return (
                <article
                  key={s.id}
                  className="flex flex-col overflow-hidden rounded-[20px] border border-border-2 bg-surface"
                >
                  <div className="relative h-[200px]">
                    <MediaFrame media={s.media[0]} alt={s.title} className="h-full w-full" />
                    {hasVideo && (
                      <span className="absolute right-3.5 top-3.5 rounded-full bg-foreground/75 px-3 py-1.5 text-[11.5px] uppercase tracking-[0.08em] text-background">
                        Vidéo
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <div className="text-[12px] uppercase tracking-[0.08em] text-muted">
                      {s.category.name}
                    </div>
                    <h3 className="text-[25px] leading-tight">{s.title}</h3>
                    <p className="flex-1 text-[15.5px] leading-relaxed text-foreground-soft line-clamp-2">
                      {s.description}
                    </p>
                    <div className="mt-1 flex items-center justify-between border-t border-border pt-3.5">
                      <span className="text-[14.5px] text-muted">{s.durationLabel}</span>
                      <Link
                        href={`/services/${s.slug}`}
                        className="text-[15px] font-medium text-accent"
                      >
                        Voir la fiche →
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}

function FilterChip({
  href,
  active,
  label,
}: {
  href: string;
  active: boolean;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={
        "rounded-full border px-4.5 py-2.5 text-[14.5px] transition-colors " +
        (active
          ? "border-foreground bg-foreground text-background"
          : "border-input text-foreground-soft hover:border-accent")
      }
    >
      {label}
    </Link>
  );
}
