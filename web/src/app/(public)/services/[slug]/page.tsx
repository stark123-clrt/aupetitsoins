import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getApprovedCommentsForService,
  getServiceBySlug,
  getServiceRatingSummary,
} from "@/lib/data";
import { formatDateLong, initials, stars } from "@/lib/format";
import { ServiceGallery } from "@/components/site/service-gallery";
import { CommentForm } from "@/components/site/comment-form";
import { Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ServiceDetailPage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const [comments, rating] = await Promise.all([
    getApprovedCommentsForService(service.id),
    getServiceRatingSummary(service.id),
  ]);

  return (
    <>
      <section className="mx-auto w-full max-w-[1360px] px-6 pt-8 sm:px-12">
        <div className="flex gap-2 text-[14px] text-muted">
          <Link href="/services" className="text-muted">
            Catalogue
          </Link>
          <span>/</span>
          <span>{service.category.name}</span>
        </div>

        <div className="mt-7 grid gap-14 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <div>
            <h1 className="text-[38px] leading-[1.05] tracking-tight sm:text-[56px]">
              {service.title}
            </h1>
            <div className="mt-4.5 flex flex-wrap items-center gap-3.5 text-[15px] text-muted">
              {rating.count > 0 ? (
                <>
                  <span className="tracking-[0.04em] text-accent">
                    {stars(rating.average)}
                  </span>
                  <span>
                    {rating.average.toFixed(1)}/5 · {rating.count} avis
                  </span>
                  <span className="text-border">|</span>
                </>
              ) : null}
              <span>{service.durationLabel}</span>
            </div>

            <div className="mt-7">
              {service.media.length > 0 ? (
                <ServiceGallery media={service.media} title={service.title} />
              ) : (
                <div className="flex h-[300px] items-center justify-center rounded-[22px] bg-tint sm:h-[470px]">
                  <Sparkles className="size-8 text-accent-soft" />
                </div>
              )}
            </div>

            <div className="mt-11 border-t border-border pt-8">
              <h2 className="text-[28px] sm:text-[34px]">La prestation</h2>
              <p className="mt-4.5 max-w-[660px] text-[17px] leading-relaxed text-foreground-soft text-pretty">
                {service.description}
              </p>
            </div>
          </div>

          <aside className="rounded-[22px] border border-border-2 bg-surface p-7.5 lg:sticky lg:top-7">
            <div className="text-[13px] uppercase tracking-[0.1em] text-muted">
              Tarif
            </div>
            <div className="mt-3 font-display text-[40px] leading-tight">Sur devis</div>
            <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
              Tarif confirmé après échange, avant tout paiement. 50 % déductibles en
              crédit d&apos;impôt.
            </p>
            <div className="mt-6 flex flex-col gap-2.5">
              <Link
                href="/contact"
                className="rounded-full bg-foreground px-6 py-3.5 text-center text-[15.5px] font-medium text-background"
              >
                Demander cette prestation
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-input px-6 py-3.5 text-center text-[15.5px] font-medium"
              >
                Poser une question
              </Link>
            </div>
            <div className="mt-6.5 flex flex-col gap-3 border-t border-border pt-5 text-[14.5px] text-foreground-soft">
              <div>La même personne, d&apos;une visite à l&apos;autre</div>
              <div>Devis gratuit et sans engagement</div>
              <div>Attestation fiscale en janvier</div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1360px] px-6 py-19 sm:px-12">
        <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <div>
            <div className="flex items-end justify-between gap-6 border-t border-border pt-8">
              <h2 className="text-[28px] sm:text-[34px]">Avis des visiteurs</h2>
              <div className="text-[14.5px] text-muted">
                {comments.length} avis publié{comments.length > 1 ? "s" : ""}
              </div>
            </div>

            {comments.length === 0 ? (
              <p className="mt-7 text-muted">Aucun avis pour le moment.</p>
            ) : (
              <div className="mt-7 flex flex-col gap-4">
                {comments.map((c) => (
                  <article
                    key={c.id}
                    className="rounded-[18px] border border-border-2 bg-surface p-6"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="flex size-9 items-center justify-center rounded-full bg-tint text-[12px] font-semibold text-accent">
                          {initials(c.authorName)}
                        </span>
                        <span className="text-[16.5px] font-medium">{c.authorName}</span>
                      </div>
                      <span className="text-[13.5px] text-muted-2">
                        {formatDateLong(c.createdAt)}
                      </span>
                    </div>
                    <div className="mt-2 tracking-[0.06em] text-accent">
                      {stars(c.rating)}
                    </div>
                    <p className="mt-3 text-[16px] leading-relaxed text-foreground-soft">
                      {c.content}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-[22px] bg-tint p-7.5">
            <h3 className="text-[26px] sm:text-[28px]">Laisser un avis</h3>
            <p className="mt-2.5 text-[14.5px] leading-relaxed text-foreground-soft">
              Votre avis est publié après ma validation.
            </p>
            <div className="mt-5.5">
              <CommentForm slug={service.slug} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
