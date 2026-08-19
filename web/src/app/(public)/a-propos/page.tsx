import Link from "next/link";
import { Heart } from "lucide-react";
import { getSiteSetting } from "@/lib/data";
import { ABOUT_PHOTO_KEY } from "@/lib/settings";

export const dynamic = "force-dynamic";

const VALUES = [
  {
    title: "Un visage constant",
    text: "C'est moi qui viens, d'une visite à l'autre. Vous savez toujours qui passe la porte.",
  },
  {
    title: "Un interlocuteur unique",
    text: "Je prends les demandes, cale les plannings et vous rappelle en cas d'imprévu.",
  },
  {
    title: "Un cadre clair",
    text: "Un devis gratuit avant toute intervention, sans engagement de votre part.",
  },
];

export default async function AboutPage() {
  const photo = await getSiteSetting(ABOUT_PHOTO_KEY);

  return (
    <>
      <section className="mx-auto grid w-full max-w-[1360px] items-center gap-[72px] px-6 pb-16 pt-9 sm:px-12 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <div className="text-[13px] uppercase tracking-[0.1em] text-muted">À propos</div>
          <h1 className="mt-4 text-[42px] leading-[1.02] tracking-tight sm:text-[66px]">
            Aïssata, et une idée simple du soin.
          </h1>
          <p className="mt-6 max-w-[520px] text-[18.5px] leading-relaxed text-foreground-soft text-pretty">
            Aux Petits Soins est née d&apos;un constat : trouver quelqu&apos;un de
            confiance pour son intérieur ou ses enfants demande souvent plus
            d&apos;énergie que la tâche elle-même.
          </p>
        </div>
        <div className="h-[320px] overflow-hidden rounded-[220px_24px_220px_24px] bg-tint sm:h-[520px]">
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photo}
              alt="Aïssata, fondatrice d'Aux Petits Soins"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Heart className="size-10 text-accent-soft" />
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1360px] px-6 pb-24 sm:px-12">
        <div className="grid gap-[72px] border-t border-border pt-10 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="text-[32px] leading-tight sm:text-[38px]">Le parcours</h2>
          <div className="flex max-w-[660px] flex-col gap-5.5">
            <p className="text-[17.5px] leading-[1.7] text-foreground-soft text-pretty">
              J&apos;ai lancé Aux Petits Soins pour travailler autrement : peu de
              clients, un suivi direct, et la même personne d&apos;une visite à
              l&apos;autre.
            </p>
            <p className="text-[17.5px] leading-[1.7] text-foreground-soft text-pretty">
              Je reste votre interlocutrice unique : c&apos;est moi qui prends les
              demandes, cale les plannings et vous rappelle en cas d&apos;imprévu.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-foreground text-background">
        <div className="mx-auto w-full max-w-[1360px] px-6 py-16 sm:px-12 sm:py-[92px]">
          <h2 className="text-[34px] tracking-tight sm:text-[44px]">Trois engagements</h2>
          <div className="mt-12 grid gap-12 md:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.title} className="border-t border-background/20 pt-6">
                <h3 className="text-[21px] font-medium">{v.title}</h3>
                <p className="mt-2.5 text-[16px] leading-relaxed text-background/70">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1360px] px-6 py-24 sm:px-12">
        <div className="rounded-[26px] bg-tint px-8 py-16 text-center sm:py-18">
          <h2 className="text-[32px] leading-[1.06] tracking-tight sm:text-[48px]">
            Parlons de votre besoin
          </h2>
          <p className="mx-auto mt-4.5 max-w-[520px] text-[18px] leading-relaxed text-foreground-soft text-pretty">
            Un appel de dix minutes suffit à savoir si je suis la bonne personne pour
            vous.
          </p>
          <div className="mt-7.5 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-foreground px-7 py-4 text-[15.5px] font-medium text-background"
            >
              Me contacter
            </Link>
            <Link
              href="/services"
              className="rounded-full border border-input px-7 py-[15px] text-[15.5px] font-medium"
            >
              Voir le catalogue
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
