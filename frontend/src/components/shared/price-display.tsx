import { cn } from "@/lib/utils";
import { afterTaxCreditCents, formatPrice } from "@/lib/format";

export function PriceDisplay({
  ttcCents,
  prefix,
  showTaxCredit = false,
  size = "md",
  className,
}: {
  ttcCents: number;
  prefix?: string;
  showTaxCredit?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "text-base font-semibold",
    md: "text-2xl font-bold",
    lg: "text-4xl font-bold",
  };
  return (
    <div className={className}>
      <div className="flex items-baseline gap-1.5">
        {prefix && (
          <span className="text-xs text-muted-foreground">{prefix}</span>
        )}
        <span className={cn("tracking-tight text-foreground", sizes[size])}>
          {formatPrice(ttcCents)}
        </span>
        <span className="text-xs text-muted-foreground">TTC</span>
      </div>
      {showTaxCredit && (
        <p className="mt-1 text-sm text-primary">
          soit {formatPrice(afterTaxCreditCents(ttcCents))} après crédit d'impôt
          de 50 %
        </p>
      )}
    </div>
  );
}
