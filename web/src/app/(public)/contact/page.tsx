import { ContactForm } from "@/components/site/contact-form";
import { getVisibleCategories } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const categories = await getVisibleCategories();

  return (
    <section className="mx-auto w-full max-w-[1360px] px-6 pb-24 pt-9 sm:px-12">
      <div className="text-[13px] uppercase tracking-[0.1em] text-muted">Contact</div>
      <h1 className="mt-3.5 max-w-[620px] text-[40px] leading-[1.02] tracking-tight sm:text-[62px]">
        Parlons de votre besoin
      </h1>

      <div className="mt-12 grid gap-16 lg:grid-cols-[1fr_1.15fr] lg:items-start">
        <div className="flex flex-col gap-8">
          <div className="border-t border-border pt-5.5">
            <div className="text-[12.5px] uppercase tracking-[0.1em] text-muted">
              Téléphone
            </div>
            <a href="tel:+33651736150" className="mt-2.5 block font-display text-[34px]">
              06 51 73 61 50
            </a>
          </div>
          <div className="border-t border-border pt-5.5">
            <div className="text-[12.5px] uppercase tracking-[0.1em] text-muted">
              E-mail
            </div>
            <a
              href="mailto:contact@aupetit-soin.fr"
              className="mt-2.5 block font-display text-[30px]"
            >
              contact@aupetit-soin.fr
            </a>
          </div>
          <div className="border-t border-border pt-5.5">
            <div className="text-[12.5px] uppercase tracking-[0.1em] text-muted">
              Bon à savoir
            </div>
            <div className="mt-3 flex flex-col gap-2.5 text-[16px] text-foreground-soft">
              <span>50 % de crédit d&apos;impôt sur chaque prestation</span>
              <span>Devis gratuit et sans engagement</span>
              <span>Aïssata, votre interlocutrice unique</span>
            </div>
          </div>
        </div>

        <ContactForm categories={categories} />
      </div>
    </section>
  );
}
