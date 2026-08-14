import type { ReactNode } from "react";
import { BadgeCheck, ShieldCheck, Sprout, Sparkles, Star } from "lucide-react";
import { Logo } from "@/components/shared/logo";

const BULLETS = [
  { icon: BadgeCheck, label: "Gérez vos prestations en toute simplicité" },
  { icon: Sparkles, label: "Ajoutez photos et vidéos de vos réalisations" },
  { icon: ShieldCheck, label: "Modérez les avis de vos visiteurs" },
];

export function AuthCard({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-primary p-14 text-primary-foreground lg:flex">
        <div className="absolute -right-16 -top-16 size-72 rounded-full bg-white/10" />
        <div className="absolute -left-10 bottom-16 size-44 rounded-full bg-white/[0.06]" />
        <div className="relative flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl border border-white/25 bg-white/15">
            <Sprout className="size-6" />
          </span>
          <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            AuPetitSoin
          </span>
        </div>
        <div className="relative">
          <h2 className="mb-5 text-[44px] font-bold leading-[1.08] tracking-tight">
            Le quotidien,
            <br />
            allégé.
          </h2>
          <div className="flex max-w-sm flex-col gap-4">
            {BULLETS.map((b) => (
              <div key={b.label} className="flex items-center gap-3">
                <b.icon className="size-5 shrink-0" />
                <span className="text-base text-white/90">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative flex items-center gap-3 text-sm text-white/80">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-current" />
            ))}
          </div>
          4,8/5 · 2 000 familles accompagnées
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          <h1 className="mb-1.5 text-[32px] font-bold tracking-tight">{title}</h1>
          <p className="mb-7 text-muted-foreground">{description}</p>

          <div className="space-y-4">{children}</div>
          {footer && (
            <p className="mt-6 text-center text-sm text-muted-foreground">
              {footer}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
