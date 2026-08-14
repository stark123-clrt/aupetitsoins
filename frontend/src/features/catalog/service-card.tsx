import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import type { Service } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PriceDisplay } from "@/components/shared/price-display";
import {
  CATEGORY_LABELS,
  computeTtcCents,
  formatDuration,
} from "@/lib/format";
import { CATEGORY_ICON, CATEGORY_PHOTO } from "@/lib/category";

export function ServiceCard({ service }: { service: Service }) {
  const ttc = computeTtcCents(service.priceHtCents, service.vatRate);
  const Icon = CATEGORY_ICON[service.category];
  const photo = CATEGORY_PHOTO[service.category];

  return (
    <Card className="gap-0 overflow-hidden rounded-2xl pt-0 transition-shadow hover:shadow-md">
      <div className="relative h-[150px] bg-accent">
        {photo ? (
          <img
            src={photo}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Icon className="size-9 text-primary/40" />
          </div>
        )}
        <Badge className="absolute left-3 top-3 gap-1.5 rounded-full border-transparent bg-popover/90 text-foreground shadow-sm backdrop-blur">
          <Icon className="size-3.5 text-primary" />
          {CATEGORY_LABELS[service.category]}
        </Badge>
      </div>
      <CardContent className="flex-1 space-y-3 p-6">
        <h3 className="text-lg font-semibold leading-tight">{service.title}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {service.description}
        </p>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Clock className="size-4" />
          {formatDuration(service.durationMinutes)}
        </div>
        <PriceDisplay ttcCents={ttc} prefix="à partir de" size="md" showTaxCredit />
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button className="w-full" asChild>
          <Link to={`/services/${service.slug}`}>Voir le détail</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
