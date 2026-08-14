import { Link } from "react-router-dom";
import { ArrowRight, HandHeart, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Confiance",
    text: "Chaque intervenant est vérifié et formé avant d'intervenir chez vous.",
  },
  {
    icon: HandHeart,
    title: "Bienveillance",
    text: "Un accompagnement humain, à l'écoute de vos besoins réels.",
  },
  {
    icon: Sparkles,
    title: "Exigence",
    text: "Un travail soigné, sans compromis sur la qualité de service.",
  },
];

const STATS = [
  { value: "2015", label: "année de création" },
  { value: "2 000+", label: "familles accompagnées" },
  { value: "120", label: "intervenants qualifiés" },
  { value: "4,8/5", label: "satisfaction moyenne" },
];

export function AboutPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-14 sm:gap-20">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <div>
          <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
            À propos
          </div>
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            Le soin du quotidien, en toute confiance.
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
            AuPetitSoin est né d'une conviction simple : chacun mérite de
            souffler un peu. Depuis 2015, nous accompagnons les familles avec
            des intervenants qualifiés, pour un ménage, une garde d'enfant ou
            un coup de main administratif.
          </p>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Chaque prestation ouvre droit à 50 % de crédit d'impôt et n'est
            jamais débitée avant votre validation. Le soin, sans la charge
            mentale.
          </p>
        </div>
        <div className="h-[420px] w-full overflow-hidden rounded-2xl border border-border">
          <img
            src="/hero-home-care.webp"
            alt="Intervenante AuPetitSoin lors d'une prestation à domicile"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {VALUES.map((v) => (
          <div key={v.title} className="rounded-2xl border border-border bg-card p-7">
            <span className="mb-4 flex size-12 items-center justify-center rounded-xl bg-accent">
              <v.icon className="size-6 text-primary" />
            </span>
            <div className="mb-2 text-xl font-bold">{v.title}</div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {v.text}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-y-8 rounded-2xl bg-secondary/40 p-8 text-center sm:grid-cols-4 sm:divide-x sm:divide-border sm:p-11">
        {STATS.map((s) => (
          <div key={s.label}>
            <div className="text-3xl font-bold text-primary sm:text-4xl">
              {s.value}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4 rounded-2xl bg-primary px-6 py-12 text-center text-primary-foreground sm:px-10">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Envie de nous rejoindre ou d'en savoir plus ?
        </h2>
        <p className="max-w-lg text-lg text-primary-foreground/85">
          Notre équipe vous répond sous 24 h ouvrées.
        </p>
        <Button size="lg" className="mt-2 bg-card text-primary hover:bg-card/90" asChild>
          <Link to="/contact">
            Nous contacter
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
