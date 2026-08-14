import { useSearchParams } from "react-router-dom";
import type { ServiceCategory } from "@/types";
import { useServices } from "@/hooks/use-services";
import { ServiceCard } from "./service-card";
import { CardGridSkeleton } from "@/components/shared/page-skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { CATEGORY_LABELS } from "@/lib/format";
import { cn } from "@/lib/utils";

const FILTERS: { value: string; label: string }[] = [
  { value: "ALL", label: "Tous" },
  { value: "MENAGE", label: CATEGORY_LABELS.MENAGE },
  { value: "GARDE_ENFANT", label: CATEGORY_LABELS.GARDE_ENFANT },
  { value: "AIDE_ADMIN", label: CATEGORY_LABELS.AIDE_ADMIN },
];

export function CatalogPage() {
  const [params, setParams] = useSearchParams();
  const active = params.get("categorie") ?? "ALL";
  const category = active === "ALL" ? undefined : (active as ServiceCategory);
  const { data, isLoading, isError, refetch } = useServices(category);

  const setCategory = (value: string) => {
    if (value === "ALL") setParams({});
    else setParams({ categorie: value });
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Nos services</h1>
        <p className="text-muted-foreground">
          Des prestations à domicile ouvrant droit à 50 % de crédit d'impôt.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setCategory(f.value)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              active === f.value
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <CardGridSkeleton />
      ) : isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : !data || data.length === 0 ? (
        <EmptyState
          title="Aucun service disponible"
          description="Aucun service ne correspond à cette catégorie pour le moment."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}
