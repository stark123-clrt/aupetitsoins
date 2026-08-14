import { Link, useParams } from "react-router-dom";
import { ArrowRight, BadgeCheck, Clock, Home, Info, Sparkles } from "lucide-react";
import { useService } from "@/hooks/use-services";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PriceDisplay } from "@/components/shared/price-display";
import { PageSkeleton } from "@/components/shared/page-skeleton";
import { ErrorState } from "@/components/shared/error-state";
import {
  CATEGORY_LABELS,
  computeTtcCents,
  formatDuration,
} from "@/lib/format";
import { CATEGORY_ICON, CATEGORY_PHOTO } from "@/lib/category";
import { MediaGallery } from "./media-gallery";
import { CommentSection } from "./comment-section";

export function ServiceDetailPage() {
  const { slug = "" } = useParams();
  const { data: service, isLoading, isError, refetch } = useService(slug);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12">
      {isLoading ? (
        <PageSkeleton rows={2} />
      ) : isError || !service ? (
        <ErrorState
          title="Service introuvable"
          description="Ce service n'existe pas ou n'est plus disponible."
          onRetry={() => refetch()}
        />
      ) : (
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            {(() => {
              const photo = CATEGORY_PHOTO[service.category];
              const Icon = CATEGORY_ICON[service.category];
              return photo ? (
                <div className="relative h-72 overflow-hidden rounded-2xl border border-border">
                  <img src={photo} alt="" className="h-full w-full object-cover" />
                  <Badge className="absolute left-4 top-4 gap-1.5 rounded-full border-transparent bg-popover/90 text-foreground shadow-sm backdrop-blur">
                    <Icon className="size-3.5 text-primary" />
                    {CATEGORY_LABELS[service.category]}
                  </Badge>
                </div>
              ) : (
                <Badge variant="secondary" className="rounded-full">
                  {CATEGORY_LABELS[service.category]}
                </Badge>
              );
            })()}
            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tight">
                {service.title}
              </h1>
              <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Clock className="size-4" />
                  Durée : {formatDuration(service.durationMinutes)}
                </span>
                <span className="flex items-center gap-1.5">
                  <BadgeCheck className="size-4 text-primary" />
                  Intervenant vérifié
                </span>
                <span className="flex items-center gap-1.5">
                  <Home className="size-4" />À votre domicile
                </span>
              </div>
            </div>
            <Separator />
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Description</h2>
              <p className="leading-7 text-muted-foreground">
                {service.description}
              </p>
            </div>

            {service.media.length > 0 && (
              <>
                <Separator />
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold">Photos & vidéos</h2>
                  <MediaGallery media={service.media} />
                </div>
              </>
            )}

            <Card className="rounded-2xl border-secondary/40 bg-secondary/10">
              <CardContent className="flex gap-3 p-5">
                <Sparkles className="mt-0.5 size-5 shrink-0 text-primary" />
                <p className="text-sm text-muted-foreground">
                  Cette prestation ouvre droit au{" "}
                  <span className="font-semibold text-foreground">
                    crédit d'impôt de 50 %
                  </span>
                  . Votre coût réel est divisé par deux.
                </p>
              </CardContent>
            </Card>

            <Separator />
            <CommentSection slug={service.slug} />
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <Card className="rounded-2xl">
              <CardContent className="space-y-5 p-6">
                <PriceDisplay
                  ttcCents={computeTtcCents(
                    service.priceHtCents,
                    service.vatRate
                  )}
                  size="lg"
                  showTaxCredit
                />
                <Separator />
                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Info className="mt-0.5 size-3.5 shrink-0" />
                  TVA {service.vatRate} % incluse.
                </div>
                <Button size="lg" className="w-full" asChild>
                  <Link to="/contact">
                    Nous contacter
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
