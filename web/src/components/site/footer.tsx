import Link from "next/link";
import Image from "next/image";
import { getVisibleCategories } from "@/lib/data";

export async function SiteFooter() {
  const categories = await getVisibleCategories();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid w-full max-w-[1360px] gap-12 px-6 py-16 sm:px-12 sm:grid-cols-4">
        <div>
          <Image
            src="/brand/logo-full.png"
            alt="Aux Petits Soins — prendre soin de vous, tout simplement."
            width={1143}
            height={881}
            className="h-auto w-[190px]"
          />
          <p className="mt-4 max-w-[300px] text-[15px] leading-relaxed text-muted">
            Services à domicile de confiance : ménage, garde d&apos;enfant et aide
            administrative.
          </p>
        </div>
        <div>
          <div className="text-[12.5px] uppercase tracking-[0.1em] text-muted">
            Services
          </div>
          <div className="mt-4 flex flex-col gap-2.5 text-[15px]">
            {categories.map((c) => (
              <Link key={c.id} href={`/services?categorie=${c.slug}`}>
                {c.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[12.5px] uppercase tracking-[0.1em] text-muted">
            À savoir
          </div>
          <div className="mt-4 flex flex-col gap-2.5 text-[15px] text-foreground-soft">
            <span>50 % de crédit d&apos;impôt</span>
            <span>Interlocutrice unique</span>
            <span>Devis gratuit et sans engagement</span>
          </div>
        </div>
        <div>
          <div className="text-[12.5px] uppercase tracking-[0.1em] text-muted">
            Contact
          </div>
          <div className="mt-4 flex flex-col gap-2.5 text-[15px]">
            <a href="mailto:contact@aupetit-soin.fr">contact@aupetit-soin.fr</a>
            <a href="tel:+33651736150">06 51 73 61 50</a>
          </div>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-[1360px] items-center justify-between gap-6 px-6 pb-11 sm:px-12 text-[13.5px] text-muted-2">
        <span>© {new Date().getFullYear()} Aux Petits Soins</span>
        <Link href="/connexion" className="text-muted-2">
          Espace admin
        </Link>
      </div>
    </footer>
  );
}
